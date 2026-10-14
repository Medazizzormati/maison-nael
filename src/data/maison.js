// Maison Naël: single source of truth for content and links. Edit here.
export const maison = {
  name: 'Maison Naël',
  address: ['Immeuble Le Vicomte', 'Boulevard du 14 Janvier', 'Sousse, Tunisie'],
  plusCode: 'RJW9+XG4, Sousse',
  rating: 3.8,
  reviews: 74,
  budget: '10 – 50 DT par personne (indicatif)',
  brunch: '08:00 – 15:00',
  instagram: 'https://www.instagram.com/maisonnaelsousse/',
  facebook: 'https://www.facebook.com/p/Maison-Nael-61588804713587/',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('RJW9+XG4, Sousse'),
  place: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('RJW9+XG4, Sousse'),
  googleReviews: 'https://www.google.com/search?q=' + encodeURIComponent('Maison Naël Sousse avis'),
}
export const nav = [
  ['Accueil', '/'], ['Notre univers', '/univers'], ['Nos créations', '/creations'],
  ['Brunch', '/brunch'], ['Galerie', '/galerie'], ['Avis', '/avis'], ['Contact', '/contact'],
]
export const creations = [
  { title: 'Pâtisseries fines', text: 'Des douceurs délicates, pensées dans l’esprit de la pâtisserie française.', img: '/assets/millefeuille.jpg', alt: 'Mille-feuille décoré de crème et de noisettes sur une assiette Maison Naël' },
  { title: 'Gâteaux et desserts', text: 'Pour les grandes occasions comme pour une simple envie sucrée.', img: '/assets/gateau-pistache.jpg', alt: 'Part de gâteau à la pistache avec crumble' },
  { title: 'Viennoiseries', text: 'Le plaisir simple d’une viennoiserie, du petit-déjeuner au goûter.', img: '/assets/danish-assiette.jpg', alt: 'Danish Frostier garni, servi sur une assiette Maison Naël' },
  { title: 'Brunch', text: 'Un moment à partager, de 8 h à 15 h.', img: '/assets/croque-tomate.jpg', alt: 'Croque gratiné servi avec une salade colorée' },
  { title: 'Cafés et boissons chaudes', text: 'Café, thé et boissons chaudes pour accompagner chaque pause.', img: '/assets/frappe-pistache.jpg', alt: 'Frappé pistache nappé de crème fouettée' },
]
export const photos = [
  { src: '/assets/croque-truffe.jpg', alt: 'Croque Monsieur Truffe avec frites et salade' },
  { src: '/assets/gaufre-rosti.jpg', alt: 'Gaufre Rösti au poulet crispy et salade' },
  { src: '/assets/danish-frostier.jpg', alt: 'Danish Frostier sur une assiette Maison Naël' },
  { src: '/assets/danish-italien.jpg', alt: 'Danish Italien aux tomates et à la mozzarella' },
  { src: '/assets/salade-cesar.jpg', alt: 'Salade César avec œuf et copeaux de parmesan' },
  { src: '/assets/cheesecake-citron.jpg', alt: 'Part de cheesecake citron' },
  { src: '/assets/frappe-pistache.jpg', alt: 'Frappé pistache avec crème fouettée' },
  { src: '/assets/matcha-strawberry.jpg', alt: 'Matcha strawberry en verre' },
  { src: '/assets/gateau-pistache.jpg', alt: 'Gâteau à la pistache et crumble' },
  { src: '/assets/tarte-caramel.jpg', alt: 'Tarte au caramel sur une assiette Maison Naël' },
  { src: '/assets/danish-gros-plan.jpg', alt: 'Gros plan sur un Danish aux noix' },
  { src: '/assets/tuna-bowl.jpg', alt: 'Gros plan sur un Tuna Bowl' },
]
