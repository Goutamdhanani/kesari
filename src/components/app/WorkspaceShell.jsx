import React, {useEffect, useRef, useState} from 'react';
import {ArrowUpRight, CalendarDays, Compass, Heart, Home, LayoutDashboard, Mail, MapPin, Menu, Settings, Ticket, Users, UserRound, X} from 'lucide-react';

const publicLinks = [
  ['home','Home',Home], ['events','Events',CalendarDays], ['discover','Discover',Compass],
  ['saved','Saved events',Heart], ['tickets','My tickets',Ticket], ['profile','My profile',UserRound],
];
const adminLinks = [
  ['admin','Overview',LayoutDashboard], ['admin/events','Events',CalendarDays], ['admin/bookings','Bookings',Ticket],
  ['admin/attendees','Attendees',Users], ['admin/enquiries','Enquiries',Mail], ['admin/settings','Settings',Settings],
];
const href = route => route === 'home' ? '#/' : '#/' + route;
export default function WorkspaceShell({route, children, management=false}) {
  const [menuOpen,setMenuOpen] = useState(false);
  const header = useRef(null), menuButton = useRef(null);
  useEffect(() => {setMenuOpen(false);},[route]);
  useEffect(() => {
    if (!menuOpen) return;
    const outside = event => {if (!header.current?.contains(event.target)) setMenuOpen(false);};
    const escape = event => {if (event.key === 'Escape') {setMenuOpen(false);menuButton.current?.focus();}};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
    return () => {document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
  },[menuOpen]);
  const links = management ? adminLinks : publicLinks;
  const active = id => route === id || id === 'events' && route.startsWith('event/');
  const link = ([id,label,Icon], mobile=false) => <a key={id} className={`wa-nav-link${active(id) ? ' active' : ''}`} href={href(id)} aria-current={active(id) ? 'page' : undefined}><Icon size={19} aria-hidden="true"/><span>{mobile && id === 'saved' ? 'Saved' : mobile && id === 'tickets' ? 'Tickets' : mobile && id === 'profile' ? 'Profile' : label}</span></a>;
  return <div className={`workspace-app${management ? ' management' : ''}`}>
    <a className="wa-skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <header className="wa-header" ref={header}>
      <a href="#/" className="wa-brand" aria-label="Kesari home"><img className="wa-brand-logo" src="/assets/kesari-logo.png" alt=""/><span><strong>KESARI</strong><small>The Memory Studio</small></span></a>
      <div className="wa-header-context"><MapPin size={15} aria-hidden="true"/><span>Koramangala, Bengaluru</span></div>
      <div className="wa-header-actions"><a className="wa-button secondary wa-team-link wa-management-link" href={management ? '#/' : '#/admin'}>{management ? 'Public website' : 'Team space'}<ArrowUpRight size={15} aria-hidden="true"/></a><button type="button" ref={menuButton} className="wa-icon-button wa-menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="workspace-mobile-menu" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button></div>
      {menuOpen && <div className="wa-mobile-menu" id="workspace-mobile-menu"><nav aria-label="All pages">{[...links,...(!management ? [['venue','Our venue',MapPin],['contact','Contact us',Mail],['admin','Team space',LayoutDashboard]] : [['home','Public website',Home]])].map(item => link(item))}</nav></div>}
    </header>
    <div className="wa-shell-body">
      <aside className="wa-sidebar" aria-label={management ? 'Management navigation' : 'Main navigation'}>
        <p className="wa-sidebar-label">{management ? 'MANAGEMENT' : 'YOUR KESARI'}</p>
        <nav>{links.map(item => link(item))}</nav>
        {!management && <div className="wa-sidebar-secondary"><p className="wa-sidebar-label">THE STUDIO</p><nav>{[['venue','Our venue',MapPin],['contact','Contact us',Mail]].map(item => link(item))}</nav></div>}
        <p className="wa-sidebar-note">A space for music, creativity<br/>and a little connection.</p>
      </aside>
      <main className="wa-main" id="main-content" tabIndex={-1}>{children}<footer className="wa-footer"><span>Kesari · The Memory Studio</span><div><a href="#/venue">Our venue</a><a href="#/contact">Contact</a></div></footer></main>
    </div>
    <nav className="wa-mobile-nav" aria-label={management ? 'Management navigation' : 'Main navigation'}>{(management ? adminLinks : publicLinks.filter(item => item[0] !== 'discover')).map(item => link(item, true))}</nav>
  </div>;
}
