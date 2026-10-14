package tn.maisonnael.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * API abuse protection (in memory, per instance):
 *  - request bodies larger than 20 KB are refused (413), chunked bodies without a length are refused (411);
 *  - POST /api/contact: 5 requests per hour per client address;
 *  - /api/admin/**: an address with 10 failed logins in 15 minutes is blocked (429) until the window passes.
 */
public class RateLimitFilter extends OncePerRequestFilter {
    private static final long MAX_BODY = 20_000L;
    private static final long HOUR = 3_600_000L, QUARTER = 900_000L;
    private static final Set<String> WRITES = Set.of("POST", "PUT", "PATCH");
    private final Map<String, Deque<Long>> contact = new ConcurrentHashMap<>();
    private final Map<String, Deque<Long>> failures = new ConcurrentHashMap<>();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest r) {
        return !r.getRequestURI().startsWith("/api/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        long now = System.currentTimeMillis();
        String ip = req.getRemoteAddr();
        String uri = req.getRequestURI();
        if (contact.size() > 10_000) contact.clear();     // crude memory guards
        if (failures.size() > 10_000) failures.clear();

        if (WRITES.contains(req.getMethod())) {
            long len = req.getContentLengthLong();
            if (len > MAX_BODY) { reject(res, 413, "payload_too_large"); return; }
            if (len < 0 && req.getHeader("Transfer-Encoding") != null) { reject(res, 411, "length_required"); return; }
        }
        if ("POST".equals(req.getMethod()) && "/api/contact".equals(uri)) {
            if (hit(contact, ip, now, 5, HOUR, true)) { reject(res, 429, "too_many_requests"); return; }
            chain.doFilter(req, res);
            return;
        }
        if (uri.startsWith("/api/admin")) {
            if (hit(failures, ip, now, 10, QUARTER, false)) { reject(res, 429, "too_many_attempts"); return; }
            chain.doFilter(req, res);
            if (req.getHeader("Authorization") != null && res.getStatus() == 401) hit(failures, ip, now, Integer.MAX_VALUE, QUARTER, true);
            return;
        }
        chain.doFilter(req, res);
    }

    /** Returns true if the key already reached {@code max} hits in the window; otherwise records a hit when {@code record} is set. */
    private static boolean hit(Map<String, Deque<Long>> m, String key, long now, int max, long window, boolean record) {
        Deque<Long> q = m.computeIfAbsent(key, k -> new ArrayDeque<>());
        synchronized (q) {
            while (!q.isEmpty() && now - q.peekFirst() > window) q.pollFirst();
            if (q.size() >= max) return true;
            if (record) q.addLast(now);
            return false;
        }
    }

    private static void reject(HttpServletResponse res, int status, String code) throws IOException {
        res.setStatus(status);
        res.setContentType("application/json");
        res.getWriter().write("{\"error\":\"" + code + "\"}");
    }
}
