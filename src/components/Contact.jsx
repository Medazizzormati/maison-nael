import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendContact, resetContact } from '../store/contactSlice'
import { maison } from '../data/maison'
import { Instagram, Facebook } from './Icons'
export default function Contact() {
  const dispatch = useDispatch()
  const { status, error } = useSelector((s) => s.contact)
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const onSubmit = (e) => { e.preventDefault(); dispatch(sendContact(form)) }
  return (
    <section id="contact" className="sec blush">
      <div className="wrap">
        <h2>Contact et accès</h2>
        <div className="two">
          <div className="panel">
            <h3>Adresse</h3>
            <address>{maison.address.map((l) => <span key={l}>{l}<br /></span>)}</address>
            <p className="fine">Repère Google Maps : {maison.plusCode}</p>
            <a className="btn solid" href={maison.directions} target="_blank" rel="noopener noreferrer">Itinéraire Google Maps</a>
          </div>
          <div className="panel">
            <h3>Brunch</h3>
            <p className="hours sm">{maison.brunch}</p>
            <p className="fine">Horaires de brunch communiqués, pas les horaires d’ouverture complets. Suivez nos réseaux pour les informations à jour.</p>
            <div className="socials">
              <a className="btn" href={maison.instagram} target="_blank" rel="noopener noreferrer"><Instagram /> Instagram</a>
              <a className="btn" href={maison.facebook} target="_blank" rel="noopener noreferrer"><Facebook /> Facebook</a>
            </div>
          </div>
        </div>
        <div className="panel formpanel">
          <h3>Écrivez-nous</h3>
          {status === 'done' ? (
            <>
              <p className="ok" role="status">Merci, votre message a bien été envoyé.</p>
              <button className="btn" onClick={() => { dispatch(resetContact()); setForm({ name: '', email: '', message: '', website: '' }) }}>Envoyer un autre message</button>
            </>
          ) : (
            <form className="cform" onSubmit={onSubmit}>
              <label>Nom<input value={form.name} onChange={set('name')} required minLength={2} maxLength={100} autoComplete="name" /></label>
              <label>E-mail<input type="email" value={form.email} onChange={set('email')} required maxLength={150} autoComplete="email" /></label>
              <label>Message<textarea rows={5} value={form.message} onChange={set('message')} required minLength={10} maxLength={2000} /></label>
              <input className="hp" name="website" value={form.website} onChange={set('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {error && <p className="err" role="alert">{error}</p>}
              <button className="btn solid" disabled={status === 'loading'}>{status === 'loading' ? 'Envoi…' : 'Envoyer le message'}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
