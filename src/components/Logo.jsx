import { Link } from 'react-router-dom'
// Official Maison Naël logo (public/assets/logo.jpg), used unmodified (only resized).
export default function Logo({ onClick }) {
  return (
    <Link className="logo" to="/" onClick={onClick} aria-label="Maison Naël, accueil">
      <img className="logo-img" src="/assets/logo.jpg" alt="" width="46" height="46" />
      <span className="logo-text">
        <span className="logo-name">Maison Naël</span>
        <span className="logo-tag">Pâtisserie · Salon de thé · Brunch</span>
      </span>
    </Link>
  )
}
