# Maison Naël: site web (React + Redux Toolkit + Vite)

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # dossier dist/

- Contenu, liens et horaires de brunch : `src/data/maison.js`
- Logo officiel : `public/assets/logo.jpg` (utilisé sans modification, redimensionné), composant `src/components/Logo.jsx`
- Images : photos Maison Naël dans `public/assets/` (références dans `src/data/maison.js`)
- Pages (HashRouter) : `src/App.jsx`, une page par section ; accueil : `src/components/Home.jsx`
- Slices Redux Toolkit : `src/store/` (menu mobile, galerie)

## Sécurité

- Les en-têtes de sécurité (CSP, anti-clickjacking, HSTS, nosniff, Permissions-Policy, COOP/CORP) sont dans `public/_headers` (Netlify, Cloudflare Pages), `vercel.json` (Vercel) et `deploy/nginx.conf` (auto-hébergement).
- Le build ajoute aussi une CSP en `<meta>`, supprime `console`/`debugger` et n'émet pas de source maps.
- Aucun secret n'est dans le code : tout ce qui est dans un site front-end est lisible par le navigateur. N'y mettez jamais de clé d'API ; passez par un backend.
- Avant chaque mise en ligne : `npm audit --omit=dev`.

## Back end (Spring Boot + PostgreSQL)

Dossier `backend/` : Spring Boot 3.3 (Java 21), Spring Data JPA, Flyway, Spring Security.

    cp .env.example .env            # puis remplir les mots de passe
    docker compose up --build       # PostgreSQL + API sur http://localhost:8080
    npm run dev                     # le front proxifie /api vers localhost:8080

Sécurité : voir `SECURITY.md`.

API publique : `GET /api/creations`, `GET /api/photos`, `POST /api/contact` (5 envois/heure/IP, champ piège anti-spam).
API admin (HTTP Basic, `ADMIN_USER` / `ADMIN_PASSWORD`) : messages (`GET/PATCH/DELETE /api/admin/messages`), créations et photos (`POST/PUT/DELETE /api/admin/creations|photos`).

    curl -u admin:VOTRE_MOT_DE_PASSE http://localhost:8080/api/admin/messages

Le schéma est créé par Flyway (`backend/src/main/resources/db/migration`). Sans API, le front retombe sur les données de `src/data/maison.js`.
En production, servez le front et l'API sur le même domaine (reverse proxy `/api` → API) : voir `deploy/nginx.conf`. Mettez `FORWARD_HEADERS=native` derrière un proxy de confiance.
