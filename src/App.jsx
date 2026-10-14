import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContent } from './store/contentSlice'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Intro from './components/Intro'
import Header from './components/Header'
import Footer from './components/Footer'
import Reveal from './components/Reveal'
import Page from './components/Page'
import Home from './components/Home'
import Univers from './components/Univers'
import Creations from './components/Creations'
import Brunch from './components/Brunch'
import Galerie from './components/Galerie'
import Avis from './components/Avis'
import Contact from './components/Contact'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
const page = (title, el) => <Page title={title}><Reveal>{el}</Reveal></Page>

export default function App() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const introDone = useSelector((s) => s.ui.introDone)
  useEffect(() => { dispatch(fetchContent()) }, [dispatch])
  if (!introDone) return <Intro />
  return (
    <>
      <ScrollTop />
      <Header />
      <main key={pathname} className="pg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/univers" element={page('Notre univers', <Univers />)} />
          <Route path="/creations" element={page('Nos créations', <Creations />)} />
          <Route path="/brunch" element={page('Brunch', <Brunch />)} />
          <Route path="/galerie" element={page('Galerie', <Galerie />)} />
          <Route path="/avis" element={page('Avis clients', <Avis />)} />
          <Route path="/contact" element={page('Contact et accès', <Contact />)} />
          <Route path="*" element={page('Page introuvable', (
            <section className="sec"><div className="wrap center"><h2>Page introuvable</h2><Link className="btn solid" to="/">Retour à l’accueil</Link></div></section>
          ))} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
