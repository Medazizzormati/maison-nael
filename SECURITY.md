# Sécurité de Maison Naël

## Déjà en place
**Front end**
- CSP stricte (scripts, styles, polices et images uniquement depuis le site lui-même), anti-clickjacking, HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP : `public/_headers`, `vercel.json`, `deploy/nginx.conf`.
- Polices auto-hébergées (aucune requête vers Google), pas de source maps, `console` et `debugger` retirés du build.
- Liens externes en `rel="noopener noreferrer"`, aucun HTML injecté (`dangerouslySetInnerHTML` non utilisé).

**Back end**
- Tout est refusé par défaut ; seuls `GET /api/creations`, `GET /api/photos` et `POST /api/contact` sont publics ; `/api/admin/**` exige le rôle ADMIN (HTTP Basic, mot de passe haché BCrypt).
- Démarrage refusé si `ADMIN_USER` ou `ADMIN_PASSWORD` manque, ou si le mot de passe fait moins de 12 caractères ou garde la valeur d'exemple.
- Blocage après 10 échecs de connexion admin en 15 min ; contact limité à 5 envois par heure et par adresse ; corps de requête limité à 20 Ko ; JSON limité en taille et profondeur.
- Validation stricte des champs, URL d'images limitées à `/assets/...` ou `https://`, requêtes SQL paramétrées (JPA), pas de détail d'erreur renvoyé, en-tête `Server` masqué, CORS limité à `CORS_ORIGINS`.

**Infrastructure**
- Conteneur API non-root, système de fichiers en lecture seule, toutes les capabilities retirées, `no-new-privileges`, limites mémoire et processus.
- PostgreSQL non publié sur la machine hôte ; l'API écoute sur 127.0.0.1 seulement.
- Dependabot (npm, Maven, Docker) pour les mises à jour de sécurité.

## À faire avant la mise en ligne
1. HTTPS obligatoire (reverse proxy), puis `FORWARD_HEADERS=native` côté API.
2. Mots de passe longs et uniques dans `.env` (jamais dans Git) ; `CORS_ORIGINS` = votre domaine exact.
3. Sauvegardes régulières de la base (`pg_dump`) et test de restauration.
4. `npm audit --omit=dev` et mises à jour Maven avant chaque déploiement.
5. Pare-feu : seuls les ports 80/443 ouverts.

## Limites à connaître
- Le code d'un site web reste visible dans le navigateur ; la sécurité repose sur le serveur, pas sur le masquage du code.
- Le blocage anti-abus est en mémoire : avec plusieurs instances de l'API, ajoutez une limite au niveau du proxy (nginx `limit_req`).
