import { maison } from '../data/maison'
export default function Univers() {
  return (
    <section id="univers" className="sec">
      <div className="wrap split">
        <div className="copy">
          <h2>Notre univers</h2>
          <p className="lead">Maison Naël est une adresse accueillante, pensée pour prendre son temps : une pâtisserie fine, un salon de thé et un brunch dans un cadre doux et raffiné.</p>
          <p>Ici, on vient pour une pause café, un goûter entre amies, un brunch en famille ou simplement pour le plaisir d’une belle assiette.</p>
          <ul className="chips">
            <li>Pâtisserie fine</li><li>Salon de thé</li><li>Brunch</li><li>Budget : {maison.budget}</li>
          </ul>
        </div>
        <img className="photo tall" src="/assets/bowl-terrasse.jpg" alt="Tuna Bowl servi en terrasse sur une table en bois" loading="lazy" />
      </div>
    </section>
  )
}
