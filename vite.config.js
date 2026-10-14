import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Content-Security-Policy injected at build time only (the dev server needs inline scripts for HMR).
// frame-ancestors cannot be set from a <meta>; it lives in the HTTP headers (public/_headers, vercel.json, deploy/nginx.conf).
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "font-src 'self' data:",
  "img-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityMeta = () => ({
  name: 'security-meta',
  apply: 'build',
  transformIndexHtml: (html) => html.replace('<head>',
    `<head>\n<meta http-equiv="Content-Security-Policy" content="${csp}">\n<meta name="referrer" content="strict-origin-when-cross-origin">`),
})

export default defineConfig({
  plugins: [react(), securityMeta()],
  esbuild: { drop: ['console', 'debugger'] },
  build: { sourcemap: false },
  server: { proxy: { '/api': 'http://localhost:8080' } },
})
