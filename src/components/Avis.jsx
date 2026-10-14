import { maison } from '../data/maison'
export default function Avis() {
  const pct = (maison.rating / 5) * 100
  return (
    <section id="avis" className="sec">
      <div className="wrap center">
        <h2>Avis clients</h2>
        <div className="score">
          <span className="big">{String(maison.rating).replace('.', ',')}</span><span className="of">/ 5</span>
        </div>
        <div className="stars" role="img" aria-label={`Note Google : ${maison.rating} sur 5`}>
          <span className="base">★★★★★</span><span className="fill" style={{ width: pct + '%' }}>★★★★★</span>
        </div>
        <p className="lead">Note Google basée sur {maison.reviews} avis.</p>
        <a className="btn solid" href={maison.googleReviews} target="_blank" rel="noopener noreferrer">Lire les avis sur Google</a>
      </div>
    </section>
  )
}
