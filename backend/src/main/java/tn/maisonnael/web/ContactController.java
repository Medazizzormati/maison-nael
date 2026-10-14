package tn.maisonnael.web;

import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tn.maisonnael.model.ContactMessage;
import tn.maisonnael.repo.ContactMessageRepository;
import tn.maisonnael.web.Dtos.ContactRequest;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactMessageRepository repo;

    public ContactController(ContactMessageRepository repo) { this.repo = repo; }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> send(@Valid @RequestBody ContactRequest req) {
        // Honeypot filled in: pretend success, store nothing.
        if (req.website() != null && !req.website().isBlank()) return Map.of("status", "received");
        ContactMessage m = new ContactMessage();
        m.setName(req.name().trim());
        m.setEmail(req.email().trim());
        m.setMessage(req.message().trim());
        repo.save(m);
        return Map.of("status", "received");
    }
}
