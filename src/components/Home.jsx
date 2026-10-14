import { Link } from 'react-router-dom'
import Hero from './Hero'
import Reveal from './Reveal'
import Page from './Page'
import { maison } from '../data/maison'
const tiles = [
  ['Notre univers', 'Un lieu doux pour prendre son temps.', '/univers', '/assets/bowl-terrasse.jpg', 'Tuna Bowl en terrasse'],
  ['Nos créations', 'Pâtisseries, gâteaux, viennoiseries et boissons.', '/creations', '/assets/millefeuille.jpg', 'Mille-feuille à la noisette'],
  ['Brunch', `Chaque jour de ${maison.brunch.replace(' – ', ' à ')}.`, '/brunch', '/assets/croque-tomate.jpg', 'Croque gratiné avec salade'],
  ['Galerie', 'Un aperçu en images.', '/galerie', '/assets/cheesecake-citron.jpg', 'Cheesecake citron'],
  ['Avis', `${String(maison.rating).replace('.', ',')}/5 sur ${maison.reviews} avis Google.`, '/avis', '/assets/tarte-caramel.jpg', 'Tarte au caramel'],
  ['Contact', 'Adresse, itinéraire et réseaux.', '/contact', '/assets/matcha-strawberry.jpg', 'Matcha strawberry'],
]
export default function Home() {
  return (
    <Page>
      <Hero />
      <Reveal>
        <section className="sec">
          <div className="wrap">
            <h2>Bienvenue chez Maison Naël</h2>
            <p className="lead">Explorez la maison, page après page.</p>
            <div className="tiles">
              {tiles.map(([t, d, to, img, alt]) => (
                <Link className="tile" to={to} key={to}>
                  <img src={img} alt={alt} loading="lazy" />
                  <div><h3>{t}</h3><p>{d}</p><span>Découvrir</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="band">
          <div className="wrap center">
            <h2>Brunch</h2>
            <p className="hours">{maison.brunch}</p>
            <p className="fine">Horaires de brunch communiqués, pas les horaires d’ouverture complets.</p>
            <div className="actions"><Link className="btn solid" to="/brunch">Découvrir le brunch</Link><Link className="btn" to="/contact">Nous trouver</Link></div>
          </div>
        </section>
      </Reveal>
    </Page>
  )
}
