import { useSelector } from 'react-redux'
export default function Creations() {
  const creations = useSelector((s) => s.content.creations)
  return (
    <section id="creations" className="sec blush">
      <div className="wrap">
        <h2>Nos créations</h2>
        <p className="lead">Cinq univers gourmands à découvrir sur place.</p>
        <div className="grid">
          {creations.map((c) => (
            <article className="card" key={c.id ?? c.title}>
              <img src={c.img} alt={c.alt} loading="lazy" />
              <div className="card-body"><h3>{c.title}</h3><p>{c.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
