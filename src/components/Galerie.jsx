import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPhoto, closePhoto, nextPhoto, prevPhoto } from '../store/gallerySlice'
import { maison } from '../data/maison'
export default function Galerie() {
  const dispatch = useDispatch()
  const { items, active } = useSelector((s) => s.gallery)
  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') dispatch(closePhoto())
      if (e.key === 'ArrowRight') dispatch(nextPhoto())
      if (e.key === 'ArrowLeft') dispatch(prevPhoto())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, dispatch])
  return (
    <section id="galerie" className="sec ivory2">
      <div className="wrap">
        <h2>Galerie</h2>
        <p className="lead">Un aperçu de l’univers Maison Naël. Retrouvez les photos officielles sur Instagram.</p>
        <div className="gal">
          {items.map((p, i) => (
            <button key={p.src + i} className="thumb" onClick={() => dispatch(openPhoto(i))} aria-label={`Agrandir : ${p.alt}`}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </button>
          ))}
        </div>
        <p className="center"><a className="btn" href={maison.instagram} target="_blank" rel="noopener noreferrer">Voir plus sur Instagram</a></p>
      </div>
      {active !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Photo agrandie" onClick={() => dispatch(closePhoto())}>
          <div onClick={(e) => e.stopPropagation()}>
            <img src={items[active].src} alt={items[active].alt} />
            <div className="bar">
              <button onClick={() => dispatch(prevPhoto())}>Précédente</button>
              <button onClick={() => dispatch(nextPhoto())}>Suivante</button>
              <button onClick={() => dispatch(closePhoto())}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
