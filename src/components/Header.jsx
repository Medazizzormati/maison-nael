import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu, closeMenu } from '../store/uiSlice'
import { NavLink } from 'react-router-dom'
import { nav } from '../data/maison'
import Logo from './Logo'
export default function Header() {
  const dispatch = useDispatch()
  const open = useSelector((s) => s.ui.menuOpen)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && dispatch(closeMenu())
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dispatch])
  return (
    <header className="hdr">
      <Logo onClick={() => dispatch(closeMenu())} />
      <nav className={open ? 'open' : ''} aria-label="Navigation principale">
        {nav.map(([t, h]) => <NavLink key={h} to={h} end={h === '/'} onClick={() => dispatch(closeMenu())}>{t}</NavLink>)}
      </nav>
      <button className="burger" aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => dispatch(toggleMenu())}>
        <span /><span /><span />
      </button>
    </header>
  )
}
