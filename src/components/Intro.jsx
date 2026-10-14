import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { finishIntro } from '../store/uiSlice'

// Full-screen video shown first. The site appears when the video ends or when the visitor skips it.
export default function Intro() {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const [blocked, setBlocked] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [muted, setMuted] = useState(true)
  const [pct, setPct] = useState(0)

  const finish = useCallback(() => {
    setLeaving(true)
    setTimeout(() => dispatch(finishIntro()), 700)
  }, [dispatch])

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { dispatch(finishIntro()); return }
    const v = ref.current
    const p = v && v.play()
    if (p && p.catch) p.catch(() => setBlocked(true))
  }, [dispatch])

  useEffect(() => { if (ref.current) ref.current.muted = muted }, [muted])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const start = () => { setBlocked(false); const v = ref.current; if (v) v.play().catch(finish) }

  return (
    <div className={`intro ${leaving ? 'leave' : ''}`} role="dialog" aria-label="Vidéo d’introduction de Maison Naël">
      <div className="intro-frame">
        <video ref={ref} className="intro-video" src="/assets/intro.mp4" poster="/assets/intro-poster.jpg"
          muted playsInline preload="auto" onEnded={finish} onError={finish}
          onTimeUpdate={(e) => setPct((e.target.currentTime / (e.target.duration || 1)) * 100)} />
        <button className="intro-btn intro-sound" onClick={() => setMuted(!muted)} aria-pressed={!muted}>{muted ? 'Activer le son' : 'Couper le son'}</button>
        <button className="intro-btn intro-skip" onClick={finish}>Passer l’intro</button>
        {blocked && <button className="intro-play" onClick={start} aria-label="Lancer la vidéo">Lancer la vidéo</button>}
        <div className="intro-bar" aria-hidden="true"><span style={{ width: pct + '%' }} /></div>
      </div>
    </div>
  )
}
