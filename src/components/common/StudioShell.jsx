import React, {useEffect, useRef, useState} from 'react';
import {CalendarDays, Compass, Home, Ticket, UserRound} from 'lucide-react';
import StudioFrame from './StudioFrame';
import StudioHeader from './StudioHeader';
import '../landing/LandingScreen.css';
import './StudioShell.css';

const tabs = [
 {id: 'home', label: 'Home', icon: Home},
 {id: 'events', label: 'Events', icon: CalendarDays},
 {id: 'discover', label: 'Discover', icon: Compass},
 {id: 'profile', label: 'My profile', icon: UserRound},
 {id: 'tickets', label: 'My tickets', icon: Ticket},
];

export default function StudioShell({route, backdrop, onNavigate, children}) {
 const [menuOpen, setMenuOpen] = useState(false), content = useRef(null);
 const current = route.startsWith('event/') || route.startsWith('experience/') ? 'events' : route;
 useEffect(() => {setMenuOpen(false); content.current?.scrollTo({top: 0});}, [route]);
 return <StudioFrame className="studio-shell">
  <div className="kesari-app studio-screen">
   <img className="studio-backdrop" src={backdrop || '/assets/kesari-lounge.webp'} alt="" aria-hidden="true"/>
   <div className="studio-backdrop-wash" aria-hidden="true"/>
   <div className="landing-glass-top" aria-hidden="true"/>
   <div className="landing-glass-bottom" aria-hidden="true"/>
   <StudioHeader menuOpen={menuOpen} onMenuOpenChange={setMenuOpen}/>
   <main key={route} ref={content} className="studio-content" aria-label="Kesari content">{children}</main>
   <nav className="studio-dock" aria-label="Main navigation">
    {tabs.map(item => {const Icon = item.icon;return <button key={item.id} type="button" aria-label={item.label}
     className={current === item.id ? 'active' : ''} aria-current={current === item.id ? 'page' : undefined}
     onClick={() => onNavigate(item.id)}><Icon size={20} strokeWidth={1.7}/><span>{item.label}</span></button>;})}
   </nav>
  </div>
 </StudioFrame>;
}
