import { maison, nav } from '../data/maison'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Instagram, Facebook } from './Icons'
export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap fgrid">
        <div><Logo /><p className="fine">{maison.address.join(', ')}</p></div>
        <nav aria-label="Navigation du pied de page">{nav.map(([t, h]) => <Link key={h} to={h}>{t}</Link>)}</nav>
        <div className="fsoc">
          <a href={maison.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Maison Naël"><Instagram /></a>
          <a href={maison.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Maison Naël"><Facebook /></a>
        </div>
      </div>
      <p className="copy-line">© {new Date().getFullYear()} Maison Naël. Tous droits réservés.</p>
    </footer>
  )
}
