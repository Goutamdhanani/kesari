import React, {useEffect, useRef, useState} from 'react';
import {CalendarDays, ChevronLeft, ChevronRight, Compass, Ticket, UserRound} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {selectLandingEvents, dateLabel, eventImage} from '../../lib/events';
import StudioFrame from '../common/StudioFrame';
import StudioHeader from '../common/StudioHeader';
import './LandingScreen.css';

const menuItems = [
 {id: 'events', label: 'Events', icon: CalendarDays},
 {id: 'discover', label: 'Discover', icon: Compass},
 {id: 'profile', label: 'My\nProfile', icon: UserRound},
 {id: 'tickets', label: 'My\nTickets', icon: Ticket},
];
const variants = {
 enter: d => ({x: d > 0 ? '100%' : '-100%', opacity: .65}),
 active: {x: 0, opacity: 1},
 exit: d => ({x: d > 0 ? '-100%' : '100%', opacity: .65}),
};

function LandingMenu({onNavigate}) {
 const rail = useRef(null), drag = useRef(null), lastSwipe = useRef(0), step = useRef(0);
 const [selected, setSelected] = useState(1);
 const reduced = useReducedMotion();
 const menuStep = () => step.current || 1;
 function scrollToMenu(index, behavior = reduced ? 'instant' : 'smooth') {
  rail.current.scrollTo({left: Math.max(0, Math.min(menuItems.length - 1, index)) * menuStep(), behavior});
 }
 useEffect(() => {
  const element = rail.current;
  // Keep the centre card aligned when the phone changes size.
  const align = () => {const [first, second] = element.querySelectorAll('button');step.current = second.offsetLeft - first.offsetLeft;element.scrollLeft = Number(element.dataset.selected) * step.current;};
  const observer = new ResizeObserver(align);
  align();
  observer.observe(element);
  return () => observer.disconnect();
 }, []);
 function finishDrag(e) {
  if (drag.current?.dragging) {
   lastSwipe.current = Date.now();
   e.currentTarget.classList.remove('is-dragging');
   scrollToMenu(Math.round(e.currentTarget.scrollLeft / menuStep()));
  }
  drag.current = null;
 }
 return <nav ref={rail} className="landing-cards" aria-label="Main menu" data-selected={selected}
  onClick={e => e.stopPropagation()}
  onScroll={e => setSelected(Math.round(e.currentTarget.scrollLeft / menuStep()))}
  onKeyDown={e => {
   e.stopPropagation();
   if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
   e.preventDefault();
   const next = Math.max(0, Math.min(menuItems.length - 1, selected + (e.key === 'ArrowRight' ? 1 : -1)));
   scrollToMenu(next);
   rail.current.querySelectorAll('button')[next].focus({preventScroll: true});
  }}
  onTouchStart={e => {e.stopPropagation(); drag.current = {x: e.touches[0].clientX};}}
  onTouchEnd={e => {
   e.stopPropagation();
   if (drag.current && Math.abs(e.changedTouches[0].clientX - drag.current.x) > 8) lastSwipe.current = Date.now();
   drag.current = null;
  }}
  onTouchCancel={e => {e.stopPropagation(); drag.current = null;}}
  onPointerDown={e => {
   e.stopPropagation();
   if (e.pointerType === 'mouse' && e.button === 0) drag.current = {x: e.clientX, y: e.clientY, left: e.currentTarget.scrollLeft, dragging: false};
  }}
  onPointerMove={e => {
   if (e.pointerType !== 'mouse' || !drag.current) return;
   const dx = e.clientX - drag.current.x;
   if (!drag.current.dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - drag.current.y)) {
    drag.current.dragging = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.classList.add('is-dragging');
   }
   if (drag.current.dragging) e.currentTarget.scrollLeft = drag.current.left - dx;
  }}
  onPointerUp={e => {e.stopPropagation(); if (e.pointerType === 'mouse') finishDrag(e);}}
  onPointerCancel={e => {e.stopPropagation(); if (e.pointerType === 'mouse') finishDrag(e);}}>
  {menuItems.map((item, index) => {
   const Icon = item.icon;
   return <button key={item.id} type="button" data-menu-id={item.id}
    className={`landing-glass-card ${index === selected ? 'selected landing-primary' : index < selected ? 'card-before' : 'card-after'}`}
    aria-label={item.label.replace('\n', ' ')}
    onFocus={() => scrollToMenu(index)}
    onClick={() => {if (Date.now() - lastSwipe.current > 350) onNavigate(item.id);}}>
    <span className="landing-card-icon"><Icon size={20} strokeWidth={1.7}/></span>
    <span className="landing-card-title">{item.label}</span>
   </button>;
  })}
 </nav>;
}

export default function LandingScreen({onNavigate, events = [], loading = false, error = '', embedded = false}) {
 const slides = selectLandingEvents(events);
 const [activeId, setActiveId] = useState(null), [direction, setDirection] = useState(1);
 const [menuOpen, setMenuOpen] = useState(false);
 const swipeStart = useRef(null), lastSwipe = useRef(0), reduced = useReducedMotion();
 const ordering = slides.map(e => `${e.id}:${e.featured}:${e.featureOrder}`).join('|');
 useEffect(() => {setActiveId(slides[0]?.id || null);}, [ordering]);
 const found = slides.findIndex(e => e.id === activeId), activeIndex = found < 0 ? 0 : found, active = slides[activeIndex];
 function select(index) {
  if (slides.length < 2) return;
  const next = (index + slides.length) % slides.length;
  setDirection(index > activeIndex ? 1 : -1);
  setActiveId(slides[next].id);
 }
 function open() {
  if (menuOpen) return;
  if (Date.now() - lastSwipe.current < 350) return;
  onNavigate(active ? 'event/' + active.id : 'events');
 }
 function start(x, y) {swipeStart.current = menuOpen ? null : {x, y};}
 function end(x, y) {
  const previous = swipeStart.current;
  swipeStart.current = null;
  if (!previous) return;
  const dx = x - previous.x, dy = y - previous.y;
  if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.25) {
   lastSwipe.current = Date.now();
   select(activeIndex + (dx < 0 ? 1 : -1));
  }
 }
 const screen = <section className={`memory-landing ${embedded ? 'is-embedded' : ''}`} tabIndex={0}
  aria-label={active ? `Book ${active.title}` : 'Kesari events'} aria-roledescription="Event carousel"
  onClick={e => {if (!e.target.closest('button,a,input,.landing-cards,.landing-carousel-controls')) open();}}
  onKeyDown={e => {
   if (e.target !== e.currentTarget) return;
   if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault(); select(activeIndex + (e.key === 'ArrowRight' ? 1 : -1));
   } else if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); open();}
  }}
  onTouchStart={e => start(e.touches[0].clientX, e.touches[0].clientY)}
  onTouchEnd={e => end(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
  onTouchCancel={() => {swipeStart.current = null;}}
  onPointerDown={e => {if (e.pointerType === 'mouse') start(e.clientX, e.clientY);}}
  onPointerUp={e => {if (e.pointerType === 'mouse') end(e.clientX, e.clientY);}}
  onPointerCancel={() => {swipeStart.current = null;}}>
  <div className="landing-stage">
   <AnimatePresence initial={false} custom={direction}>
    <motion.div className="landing-event-slide" key={active?.id || 'empty'} data-event-id={active?.id || ''}
     custom={direction} variants={variants} initial="enter" animate="active" exit="exit"
     transition={{duration: reduced ? 0 : .38, ease: [.22, 1, .36, 1]}}>
     <div className="landing-managed-art" aria-hidden="true"><img src={active ? active.landingImage || eventImage(active) : '/assets/kesari-hall.webp'} alt="" draggable="false" fetchPriority="high"/></div>
    </motion.div>
   </AnimatePresence>
   <div className="landing-glass-top" aria-hidden="true"/>
   <div className="landing-glass-bottom" aria-hidden="true"/>
   <StudioHeader menuOpen={menuOpen} onMenuOpenChange={setMenuOpen}/>
   <h1 className="landing-screen-reader">Kesari — The Memory Studio</h1>
   <div className="landing-event-caption">
    <span>{active ? `${active.featured ? 'Featured · ' : ''}${dateLabel(active.date)}` : 'AT KESARI'}</span>
    <h2>{active ? active.title : loading ? 'Loading events…' : error ? 'Reconnect to view events' : 'New memories coming soon'}</h2>
   </div>
   <LandingMenu onNavigate={onNavigate}/>
   <div className="landing-carousel-controls">
    <button className="landing-circle previous" onClick={() => select(activeIndex - 1)} disabled={slides.length < 2} aria-label="Previous event"><ChevronLeft size={20} strokeWidth={1.5}/></button>
    <div className="landing-pagination" role="group" aria-label="Event slides">{slides.map((e, i) => <button key={e.id} className={i === activeIndex ? 'active' : ''} onClick={() => select(i)} aria-label={`Show ${e.title}`} aria-pressed={i === activeIndex}/>)}</div>
    <button className="landing-circle next" onClick={() => select(activeIndex + 1)} disabled={slides.length < 2} aria-label="Next event"><ChevronRight size={20} strokeWidth={1.7}/></button>
   </div>
   <p className="landing-screen-reader" aria-live="polite">{active ? `${active.title}. ${dateLabel(active.date)}. Select the event photo to book.` : loading ? 'Loading events.' : 'No upcoming events are published.'}</p>
  </div>
 </section>;
 if (embedded) return screen;
 return <StudioFrame ambient={false} className="home-shell" onBackgroundClick={open}>{screen}</StudioFrame>;
}
