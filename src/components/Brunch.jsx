import { Link } from 'react-router-dom'
import { maison } from '../data/maison'
export default function Brunch() {
  return (
    <section id="brunch" className="sec">
      <div className="wrap split rev">
        <img className="photo" src="/assets/gaufre-rosti.jpg" alt="Gaufre Rösti au poulet crispy avec salade, servie en terrasse" loading="lazy" />
        <div className="copy">
          <h2>Le brunch</h2>
          <p className="lead">Un rendez-vous gourmand pour commencer la journée en douceur, ou la prolonger jusqu’au début d’après-midi.</p>
          <p className="hours">{maison.brunch}</p>
          <p className="fine">Horaires du brunch communiqués. Ce ne sont pas les horaires d’ouverture complets.</p>
          <div className="actions">
            <a className="btn solid" href={maison.instagram} target="_blank" rel="noopener noreferrer">Voir sur Instagram</a>
            <Link className="btn" to="/contact">Nous trouver</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
