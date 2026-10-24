import React, {useState} from 'react';
import {ArrowUpRight, Mail, MapPin, Phone} from 'lucide-react';
import {api} from '../../lib/api';

export function ContentState({loading, error, onRetry}) {
  if (error) return <div className="wa-error" role="alert"><p>{error}</p><button type="button" className="wa-button secondary" onClick={onRetry}>Try again</button></div>;
  if (loading) return <p className="wa-notice" role="status">Loading the latest events…</p>;
  return null;
}

export function EnquiryPage({venue, settings, profile, onNavigate}) {
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [result,setResult] = useState(null);
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError('');
    try {
      const values = Object.fromEntries(new FormData(event.currentTarget));
      const next = await api('/api/enquiries', {method:'POST', body:JSON.stringify({...values, kind:venue ? 'venue' : 'support'})});
      setResult(next);
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  return <div className="wa-page"><header className="wa-page-heading"><div><p className="wa-eyebrow">{venue ? 'YOUR SPACE, TOO' : 'WE’RE HERE TO HELP'}</p><h1>{venue ? 'Bring your people together.' : 'Contact Kesari'}</h1><p className="wa-muted">{venue ? 'Tell us about your occasion and we’ll help you plan a visit.' : 'A question about an event, a payment or your visit? Reach the team here.'}</p></div></header>
    <div className="wa-grid wa-grid-2"><section className="wa-card wa-contact-details">{venue && <img className="wa-venue-image" src="/assets/kesari-lounge.webp" alt="Lounge seating at Kesari"/>}<h2>{venue ? 'The Memory Studio' : 'Let’s talk.'}</h2><p className="wa-muted">{venue ? 'A place for music, workshops, celebrations and conversations. Ask us about the right space for your gathering, available dates and venue pricing.' : 'For a booking question, include your booking reference. Payment references are reviewed by the Kesari team.'}</p><p><MapPin size={18} aria-hidden="true"/>Koramangala, Bengaluru</p><a href={`mailto:${settings.email}`}><Mail size={18} aria-hidden="true"/>{settings.email}</a><a href={`tel:${settings.phone}`}><Phone size={18} aria-hidden="true"/>{settings.phone}</a><p className="wa-muted">Venue availability and booking requests are confirmed directly by the team.</p></section>
      <section className="wa-card">{result ? <div className="wa-success" role="status"><h2>We’ve received your enquiry.</h2><p>Your reference is <strong>{result.reference}</strong>. The team can contact you using the details you shared.</p><div className="wa-heading-actions"><button type="button" className="wa-button secondary" onClick={() => setResult(null)}>Send another enquiry</button><button type="button" className="wa-button" onClick={() => onNavigate('events')}>Browse events</button></div></div> : <form className="wa-form" onSubmit={submit}><h2>{venue ? 'Enquire about the venue' : 'Send an enquiry'}</h2><label className="wa-field"><span>Your name</span><input name="name" autoComplete="name" required maxLength={80} defaultValue={profile.name}/></label><label className="wa-field"><span>Email</span><input name="email" type="email" autoComplete="email" required maxLength={150} defaultValue={profile.email}/></label><label className="wa-field"><span>Phone</span><input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{10,18}" maxLength={18} defaultValue={profile.phone}/></label>{venue && <label className="wa-field"><span>Preferred date (optional)</span><input name="preferredDate" type="date" min={new Date(Date.now()+19800000).toISOString().slice(0,10)}/></label>}<label className="wa-field"><span>{venue ? 'Tell us about your occasion' : 'How can we help?'}</span><textarea name="message" required minLength={10} maxLength={3000} rows={5} placeholder={venue ? 'Your occasion, expected guests and any plans you have…' : 'Include your booking reference if you have one.'}/></label><p className="wa-muted">These details are sent to Kesari to respond to your enquiry.</p>{error && <p className="wa-error" role="alert">{error}</p>}<button type="submit" className="wa-button" disabled={busy}>{busy ? 'Sending…' : 'Send enquiry'}<ArrowUpRight size={16} aria-hidden="true"/></button></form>}</section>
    </div></div>;
}

export function NotFoundPage({onNavigate, title='Page not found', message='This link does not lead to a page in Kesari. Browse the events or return home.'}) {
  return <div className="wa-page"><section className="wa-empty"><span className="wa-eyebrow">KESARI</span><h1>{title}</h1><p className="wa-muted">{message}</p><div className="wa-heading-actions"><button type="button" className="wa-button" onClick={() => onNavigate('home')}>Back home</button><a className="wa-button secondary" href="#/events">Browse events</a><a className="wa-text-link" href="#/contact">Contact the team</a></div></section></div>;
}
