import { Link } from 'react-router-dom'
export default function Hero() {
  return (
    <div className="hero" id="accueil">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <h1>Maison Naël</h1>
          <p className="sub">Pâtisserie fine, brunch &amp; instants gourmands</p>
          <p className="desc">Un lieu lumineux à Sousse pour savourer de belles pâtisseries, un brunch généreux et un café entre amis ou en famille.</p>
          <div className="actions">
            <Link className="btn solid" to="/creations">Découvrir nos créations</Link>
            <Link className="btn" to="/contact">Nous trouver</Link>
          </div>
        </div>
        <div className="hero-art">
          <img className="art-main" src="/assets/millefeuille.jpg" alt="Mille-feuille décoré de crème et de noisettes sur une assiette Maison Naël" fetchPriority="high" />
          <img className="art-small" src="/assets/tarte-caramel.jpg" alt="Tarte au caramel sur une assiette Maison Naël" />
        </div>
      </div>
    </div>
  )
}
