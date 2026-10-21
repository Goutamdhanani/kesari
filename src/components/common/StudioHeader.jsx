import React, {useEffect, useRef} from 'react';
import {ArrowUpRight, CalendarDays, Compass, Menu, Ticket, UserRound, X} from 'lucide-react';

const links = [
 {id: 'events', label: 'Events', icon: CalendarDays},
 {id: 'discover', label: 'Discover', icon: Compass},
 {id: 'profile', label: 'My profile', icon: UserRound},
 {id: 'tickets', label: 'My tickets', icon: Ticket},
];

export default function StudioHeader({menuOpen, onMenuOpenChange}) {
 const header = useRef(null), toggle = useRef(null);
 useEffect(() => {
  if (!menuOpen) return;
  header.current.querySelector('.landing-nav-panel a')?.focus({preventScroll: true});
  const escape = e => {
   if (e.key !== 'Escape') return;
   e.preventDefault(); onMenuOpenChange(false); toggle.current?.focus({preventScroll: true});
  };
  document.addEventListener('keydown', escape);
  return () => document.removeEventListener('keydown', escape);
 }, [menuOpen, onMenuOpenChange]);
 return <>
  <header ref={header} className="landing-header"
   onClick={e => {e.stopPropagation(); if (e.target.closest('a')) onMenuOpenChange(false);}}
   onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()}
   onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()}
   onBlur={e => {if (!e.currentTarget.contains(e.relatedTarget)) onMenuOpenChange(false);}}>
   <div className="landing-header-bar">
    <a className="landing-brand" href="#/" aria-label="Kesari — The Memory Studio home"><img src="/assets/kesari-logo.png" alt="Kesari — The Memory Studio" width="2080" height="608"/></a>
    <button ref={toggle} className="landing-menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'}
     aria-expanded={menuOpen} aria-controls="landing-navigation" onClick={() => onMenuOpenChange(!menuOpen)}>
     {menuOpen ? <X aria-hidden="true" size={22}/> : <Menu aria-hidden="true" size={22}/>}</button>
   </div>
   {menuOpen && <nav id="landing-navigation" className="landing-nav-panel" aria-label="Kesari navigation">
    <p>MAKE A MEMORY</p>
    {links.map(item => {const Icon = item.icon;return <a key={item.id} href={'#/' + item.id}><Icon size={18}/><span>{item.label}</span><ArrowUpRight size={17}/></a>;})}
    <a className="landing-team-link" href="#/admin">Team space <ArrowUpRight size={14}/></a>
   </nav>}
  </header>
  {menuOpen && <button className="landing-menu-dismiss" type="button" tabIndex={-1} aria-label="Dismiss navigation"
   onPointerDown={e => {e.preventDefault(); e.stopPropagation();}}
   onClick={() => {onMenuOpenChange(false); toggle.current?.focus({preventScroll: true});}}/>}
 </>;
}
