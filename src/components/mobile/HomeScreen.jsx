import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import HomeSkeletonScreen from './HomeSkeletonScreen';
import AuroraFluidCanvas from './AuroraFluidCanvas';
import RentGearSheet from './RentGearSheet';
import OrganiseEventModal from './OrganiseEventModal';
import RentSpaceModal from './RentSpaceModal';
import MonthlyPassModal from './MonthlyPassModal';
import { RENTAL_EQUIPMENT, MONTHLY_PASSES, KESARI_CONTACT } from '../../data/kesariStudioData';
import './HomeScreen.css';

// Bespoke Apple-grade SVG Micro-Icons for Stage Vibes (No emojis)
const VIBE_ICONS = {
  all: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" fillOpacity="0.18" />
    </svg>
  ),
  rock: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" fillOpacity="0.22" />
    </svg>
  ),
  jazz: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v10a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V7" />
      <circle cx="18" cy="5" r="2.5" fill="currentColor" fillOpacity="0.22" />
      <circle cx="8" cy="18" r="2.5" fill="currentColor" fillOpacity="0.22" />
      <path d="M10 10h4" />
      <path d="M10 7h4" />
    </svg>
  ),
  electronic: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" fillOpacity="0.15" />
      <circle cx="8.5" cy="8.5" r="2.5" />
      <circle cx="15.5" cy="15.5" r="2.5" />
      <path d="M8.5 15.5h.01M15.5 8.5h.01" strokeWidth="3" />
    </svg>
  ),
  acoustic: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22c1.25-6.5 6-12 13-14 3.5 4 4.5 9 1 14-4 2-9 1-14 0Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M9 15c2.5-3 5-4.5 8-5.5" />
    </svg>
  )
};

// 5 Event Experiences at Kesari - The Memory Studio Koramangala
const VIBE_SPECTRUM = [
  { id: 'all', label: 'All', iconKey: 'all', color: '#12131A', bg: '#EDE8DF' },
  { id: 'music', label: 'Live Gigs', iconKey: 'rock', color: '#12131A', bg: '#F3E294' },
  { id: 'openmic', label: 'Open Mic', iconKey: 'acoustic', color: '#12131A', bg: '#D7DCFA' },
  { id: 'jam', label: 'Jam Sessions', iconKey: 'electronic', color: '#12131A', bg: '#CFE7DE' },
  { id: 'workshop', label: 'Workshops', iconKey: 'jazz', color: '#12131A', bg: '#F0BBB0' }
];

// Curated Studio Shows at Kesari - The Memory Studio Koramangala (No fake stages)
const STAGE_PASSES = [
  {
    id: 'rock',
    vibeId: 'music',
    bg: '#F3E294',
    badgeText: '⚡ Live Studio Gig',
    stage: 'Kesari Studio • 21:00',
    title: 'Rock Legends Reunion',
    artist: 'The Velvet Echoes Live',
    price: '₹1,499',
    timing: 'Now Live • 1h 45m left',
    image: '/assets/events/ev_rock.jpg',
    tag: 'Studio Hall'
  },
  {
    id: 'jazz',
    vibeId: 'music',
    bg: '#D7DCFA',
    badgeText: '🎷 Acoustic Session',
    stage: 'Acoustic Lounge • 18:30',
    title: 'Jazz & Blues Evening',
    artist: 'Miles Davis Tribute Quartet',
    price: '₹1,250',
    timing: 'In 45 mins • 6:30 PM',
    image: '/assets/events/ev_jazz.jpg',
    tag: 'Lounge'
  },
  {
    id: 'hiphop',
    vibeId: 'music',
    bg: '#F0BBB0',
    badgeText: '🎤 Live Cypher',
    stage: 'Kesari Studio • 20:15',
    title: 'Hip Hop Showcase Live',
    artist: 'Apex Rhymes & DJ Metro',
    price: '₹1,350',
    timing: 'Tonight • 8:15 PM',
    image: '/assets/concert_crowd.jpg',
    tag: 'Cypher Floor'
  },
  {
    id: 'electronic',
    vibeId: 'jam',
    bg: '#CFE7DE',
    badgeText: '🎛️ Synth Immersion',
    stage: 'Kesari Studio • 22:00',
    title: 'Modular Synth & Ambient',
    artist: 'Klangwelt Live Modular',
    price: '₹1,850',
    timing: 'Late Night • 10:00 PM',
    image: '/assets/fluid_art.jpg',
    tag: '360° Visuals'
  },
  {
    id: 'soundwaves',
    vibeId: 'openmic',
    bg: '#EDE8DF',
    badgeText: '🌿 Open Mic',
    stage: 'Acoustic Lounge • 17:00',
    title: 'Sunset Acoustic & Open Mic',
    artist: 'Community Artists & Sarah Vaughan',
    price: '₹950',
    timing: 'Sunset Lounge Set',
    image: '/assets/events/ev_openmic.jpg',
    tag: 'Performer Slots'
  }
];

// Schedule for Tonight at Kesari Studio Koramangala
const TONIGHT_SCHEDULE = [
  {
    id: 'jazz',
    stage: 'Acoustic Lounge • Kesari Koramangala',
    time: '18:30',
    title: 'Jazz & Blues Improv',
    artist: 'Miles Davis Tribute Quartet',
    price: '₹1,250',
    image: '/assets/events/ev_jazz.jpg',
    status: 'Starting Soon'
  },
  {
    id: 'hiphop',
    stage: 'Studio Floor • Kesari Koramangala',
    time: '20:15',
    title: 'Hip Hop Showcase Live',
    artist: 'Apex Rhymes & DJ Metro',
    price: '₹1,350',
    image: '/assets/concert_crowd.jpg',
    status: 'Fast Pass'
  },
  {
    id: 'rock',
    stage: 'Main Hall • Kesari Koramangala',
    time: '21:00',
    title: 'Rock Legends Reunion',
    artist: 'The Velvet Echoes',
    price: '₹1,499',
    image: '/assets/events/ev_rock.jpg',
    status: 'Headline Set'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.01
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2, ease: [0.19, 1, 0.22, 1] }
  }
};

export default function HomeScreen({ 
  onSelectEvent = () => {}, 
  onOpenTicket = () => {},
  onNavigate = () => {},
  onOpenNotifications = () => {},
  onOpenCitySelector = () => {},
  unreadCount = 2
}) {
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showRentGear, setShowRentGear] = useState(false);
  const [showOrganiseModal, setShowOrganiseModal] = useState(false);
  const [showRentSpaceModal, setShowRentSpaceModal] = useState(false);
  const [showMonthlyPassModal, setShowMonthlyPassModal] = useState(false);

  const triggerRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  const filteredPasses = STAGE_PASSES.filter(pass => {
    if (selectedVibe === 'all') return true;
    return pass.vibeId === selectedVibe;
  });

  return (
    <div className="mobile-home-root-container">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <HomeSkeletonScreen key="skeleton" />
        ) : (
          <motion.div 
            key="content"
            className="mobile-home-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            {/* ── 1. The Obsidian Curved Stage Dome with Authentic Northern Lights Aurora Fluid ── */}
            <header className="home-curved-dome-header">
              {/* Authentic Northern Lights (Aurora Borealis) Fluid Simulation Canvas */}
              <AuroraFluidCanvas />

              {/* Top Navigation Row: Kesari Logo Branding & Koramangala Studio Venue */}
              <div className="dome-top-nav">
                <div className="dome-brand-group">
                  {/* Official Kesari Logo */}
                  <img 
                    src="/assets/kesari-logo.png" 
                    alt="Kesari Live" 
                    className="dome-kesari-brand-logo" 
                  />

                  {/* Koramangala Studio Venue Capsule */}
                  <motion.div 
                    className="dome-venue-capsule"
                    onClick={() => setShowRentSpaceModal(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="dome-live-beacon" />
                    <span className="dome-venue-name">Kesari Studio • Koramangala</span>
                    <AppIcon name="chevron-right" size={8} color="#9AA0AF" className="rotate-90" />
                  </motion.div>
                </div>

                <div className="dome-nav-actions">
                  <motion.button
                    className="dome-glass-btn"
                    onClick={triggerRefresh}
                    whileHover={{ rotate: 90, scale: 1.08 }}
                    whileTap={{ rotate: 360, scale: 0.88 }}
                    title="Refresh Live Schedule"
                    aria-label="Refresh Schedule"
                  >
                    <AppIcon name="refresh" size={13} color="#FFFFFF" strokeWidth={2.2} />
                  </motion.button>

                  <motion.button 
                    className="dome-glass-btn" 
                    onClick={onOpenNotifications}
                    whileHover={{ scale: 1.08, rotate: 6 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Notifications"
                  >
                    <AppIcon name="bell" size={13} color="#FFFFFF" strokeWidth={2.2} />
                    {unreadCount > 0 && <span className="dome-bell-dot" />}
                  </motion.button>

                  {/* Profile Avatar with Abstract Geometric Halo Ring */}
                  <motion.div 
                    className="dome-avatar-halo" 
                    onClick={() => onNavigate('profile')}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    title="Profile"
                  >
                    <div className="dome-halo-ring" />
                    <img src="/assets/gregory_face.png" alt="Gregory" className="dome-avatar-img" />
                  </motion.div>
                </div>
              </div>

              {/* Main Stage Live Feature Display with Real Concert Background Poster */}
              <motion.div 
                className="dome-hero-spotlight"
                onClick={() => onSelectEvent('rock')}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Concert Photography Layer */}
                <div 
                  className="dome-hero-backdrop-img"
                  style={{ backgroundImage: `url('/assets/events/ev_rock.jpg')` }}
                />
                <div className="dome-hero-vignette" />

                <div className="dome-hero-inner-content">
                  <div className="dome-eyebrow-row">
                    <div className="dome-live-pill">
                      <span className="live-pulse-dot" />
                      <span className="dome-live-tag">NOW LIVE • KESARI STUDIO</span>
                    </div>
                    <span className="dome-db-badge">98 dB Peak</span>
                  </div>

                  <div className="dome-headline-row">
                    <h1 className="dome-act-title">The Velvet Echoes</h1>
                    {/* Animated Soundwave Equalizer with Netflix Red Peak */}
                    <div className="dome-soundwave-bars" aria-label="Live audio waveform">
                      <span className="wave-bar bar-1" />
                      <span className="wave-bar bar-2 bar-netflix" />
                      <span className="wave-bar bar-3" />
                      <span className="wave-bar bar-4 bar-netflix" />
                      <span className="wave-bar bar-5" />
                    </div>
                  </div>

                  <div className="dome-footer-row">
                    <div className="dome-timing-info">
                      <span className="dome-subtext">Rock Legends Reunion • Kesari Studio Koramangala</span>
                    </div>
                    
                    <motion.button 
                      className="dome-tune-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <span>Pass ₹1,499</span>
                      <AppIcon name="arrow-up-right" size={11} color="#FFFFFF" strokeWidth={2.6} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </header>

            {/* ── 2. The Warm Alabaster Sheet ── */}
            <main className="home-warm-sheet">
              {/* ── Studio Quick-Action Hub: Sound System, Monthly Passes, Spaces, Organise ── */}
              <motion.section className="studio-quick-hub-section" variants={itemVariants}>
                <div className="studio-quick-hub-scroll">
                  <motion.button 
                    className="studio-hub-chip primary-rent-gear"
                    onClick={() => setShowRentGear(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hub-chip-icon">🔊</span>
                    <span className="hub-chip-title">Rent Sound Gear</span>
                    <span className="hub-chip-badge">13 Items</span>
                  </motion.button>

                  <motion.button 
                    className="studio-hub-chip monthly-pass-chip"
                    onClick={() => setShowMonthlyPassModal(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hub-chip-icon">🎟️</span>
                    <span className="hub-chip-title">Monthly Passes</span>
                    <span className="hub-chip-badge">3 Plans</span>
                  </motion.button>

                  <motion.button 
                    className="studio-hub-chip rent-space-chip"
                    onClick={() => setShowRentSpaceModal(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hub-chip-icon">🏢</span>
                    <span className="hub-chip-title">Rent Studio Space</span>
                    <span className="hub-chip-badge">From ₹800/h</span>
                  </motion.button>

                  <motion.button 
                    className="studio-hub-chip organise-event-chip"
                    onClick={() => setShowOrganiseModal(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hub-chip-icon">💬</span>
                    <span className="hub-chip-title">Organise Event</span>
                    <span className="hub-chip-badge">WhatsApp</span>
                  </motion.button>
                </div>
              </motion.section>

              {/* Vibe Spectrum with Bespoke Apple-grade Vector Icons */}
              <motion.section className="venue-vibe-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Studio Experiences</span>
                  <span className="section-meta">Kesari Koramangala</span>
                </div>

                <div className="vibe-pills-scroll">
                  {VIBE_SPECTRUM.map((vibe) => {
                    const isSelected = selectedVibe === vibe.id;
                    return (
                      <motion.button
                        key={vibe.id}
                        className={`vibe-orb-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedVibe(vibe.id)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                      >
                        <div 
                          className="vibe-orb-circle" 
                          style={{ backgroundColor: vibe.bg }}
                        >
                          <span className="vibe-svg-wrap">
                            {VIBE_ICONS[vibe.iconKey]}
                          </span>
                        </div>
                        <span className="vibe-orb-label">{vibe.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.section>

              {/* Event Poster Cards (Horizontal Studio Passes Carousel) */}
              <motion.section className="stage-passes-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Studio Passes & Lineup</span>
                  <span className="section-meta-action" onClick={() => onNavigate('explore')}>
                    All Shows &rsaquo;
                  </span>
                </div>

                <div className="stage-passes-scroll">
                  {filteredPasses.length > 0 ? (
                    filteredPasses.map((pass) => (
                      <motion.div
                        key={pass.id}
                        className="poster-pass-card"
                        onClick={() => onSelectEvent(pass.id)}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {/* High-Resolution Event Artwork Background */}
                        <div 
                          className="poster-card-image"
                          style={{ backgroundImage: `url(${pass.image})` }}
                        />
                        <div className="poster-card-vignette" />

                        {/* Top Floating Badge Row */}
                        <div className="poster-card-header">
                          <span 
                            className="poster-stage-badge"
                            style={{ backgroundColor: pass.bg }}
                          >
                            {pass.badgeText}
                          </span>

                          <motion.div 
                            className="poster-arrow-circle"
                            whileHover={{ rotate: 18, scale: 1.15 }}
                          >
                            <AppIcon name="arrow-up-right" size={11} color="#FFFFFF" strokeWidth={2.6} />
                          </motion.div>
                        </div>

                        {/* Bottom Frosted Editorial Info Drawer */}
                        <div className="poster-card-drawer">
                          <div className="poster-timing-row">
                            <span className="poster-timing-pulse" />
                            <span className="poster-timing-text">{pass.timing}</span>
                          </div>

                          <h3 className="poster-event-title">{pass.title}</h3>
                          <p className="poster-artist-name">{pass.artist}</p>

                          <div className="poster-card-footer">
                            <span className="poster-price-val">{pass.price}</span>
                            <span 
                              className="poster-tag-chip"
                              style={{ backgroundColor: pass.bg }}
                            >
                              {pass.tag}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="pass-empty-state">
                      <p>No sets on this vibe right now</p>
                    </div>
                  )}
                </div>
              </motion.section>

              {/* ── Studio Bento Duo: Rent Out Space + Organise Your Event (with WhatsApp) ── */}
              <motion.section className="venue-bento-duo-section" variants={itemVariants}>
                {/* Bento Card 1: Rent Out Studio Space in Koramangala */}
                <motion.div 
                  className="bento-space-card"
                  onClick={() => setShowRentSpaceModal(true)}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="bento-space-bg"
                    style={{ backgroundImage: `url('/assets/events/hall.webp')` }}
                  />
                  <div className="bento-space-overlay" />

                  <div className="bento-space-content">
                    <div className="bento-space-top">
                      <span className="bento-space-eyebrow">STUDIO SPACES</span>
                      <span className="bento-space-rate">From ₹800/h</span>
                    </div>

                    <h4 className="bento-space-title">Rent Out Space</h4>
                    <p className="bento-space-desc">Main Studio Hall (40-60 cap) & Jam Room in Koramangala</p>
                    
                    <div className="bento-space-footer">
                      <span className="bento-space-chip">Acoustic Treated</span>
                      <div className="bento-action-arrow">
                        <AppIcon name="arrow-up-right" size={11} color="#12131A" strokeWidth={2.6} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bento Card 2: Organise Your Event with WhatsApp Integration */}
                <div className="bento-organise-card">
                  <div className="organise-card-header">
                    <span className="organise-pill-tag">HOST AT KESARI</span>
                    <span className="organise-wa-pulse" title="WhatsApp Connected" />
                  </div>
                  
                  <h4 className="organise-card-title">Organise Your Event</h4>
                  <p className="organise-card-sub">Music gigs, workshops, open mics & private gatherings at Kesari Koramangala.</p>

                  <div className="organise-actions-stack">
                    <a 
                      href={KESARI_CONTACT.whatsappUrl('Hi Kesari - The Memory Studio Koramangala! I want to organise an event at the studio. Please let me know the available dates & pricing.')}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="organise-wa-btn"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.47-.28z"/>
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </a>

                    <button 
                      className="organise-custom-btn"
                      onClick={() => setShowOrganiseModal(true)}
                    >
                      <span>Customise Event Plan &rsaquo;</span>
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* ── 3. Sound System Available For Rent (Poster Catalog) ── */}
              <motion.section className="studio-gear-rental-section" variants={itemVariants}>
                <div className="section-title-row">
                  <div>
                    <span className="section-label">Sound System For Rent</span>
                    <p className="section-sub-pitch">High quality audio equipment for your events</p>
                  </div>
                  <span className="section-meta-action" onClick={() => setShowRentGear(true)}>
                    View All 13 Items &rsaquo;
                  </span>
                </div>

                {/* Horizontal Gear Showcase Scroll */}
                <div className="gear-showcase-scroll">
                  {RENTAL_EQUIPMENT.slice(0, 8).map(gear => (
                    <motion.div 
                      key={gear.id}
                      className="gear-mini-card"
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowRentGear(true)}
                    >
                      <div className="gear-mini-top">
                        <span className="gear-badge-tag">{gear.badge}</span>
                        <span className="gear-category-indicator">{gear.category}</span>
                      </div>
                      <h4 className="gear-mini-name">{gear.name}</h4>
                      <div className="gear-mini-bottom">
                        <div className="gear-price-wrap">
                          <span className="gear-currency">₹</span>
                          <span className="gear-cost">{gear.price.toLocaleString()}</span>
                          <span className="gear-unit">/{gear.priceUnit}</span>
                        </div>
                        <button className="gear-rent-add-btn" title="Add to Rental">
                          + Rent
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Poster Footer Note: Pick up & drop at Kesari Koramangala */}
                <div className="gear-pickup-banner">
                  <div className="pickup-info">
                    <span className="pickup-pin">📍</span>
                    <div>
                      <strong>Pick up & Drop:</strong> Kesari - The Memory Studio, Koramangala
                      <small className="pickup-sub">Call 7760539955 • GST & transport additional</small>
                    </div>
                  </div>
                  <button className="pickup-rent-cta" onClick={() => setShowRentGear(true)}>
                    Rent Gear
                  </button>
                </div>
              </motion.section>

              {/* ── 4. 3 Types of Monthly Passes ── */}
              <motion.section className="studio-passes-section" variants={itemVariants}>
                <div className="section-title-row">
                  <div>
                    <span className="section-label">Studio Monthly Passes</span>
                    <p className="section-sub-pitch">3 tiers for creators, performers & residencies</p>
                  </div>
                  <span className="section-meta-action" onClick={() => setShowMonthlyPassModal(true)}>
                    Compare Perks &rsaquo;
                  </span>
                </div>

                <div className="monthly-passes-grid">
                  {MONTHLY_PASSES.map(pass => (
                    <motion.div 
                      key={pass.id}
                      className={`monthly-pass-card ${pass.popular ? 'popular' : ''}`}
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowMonthlyPassModal(true)}
                    >
                      {pass.popular && <span className="pass-popular-ribbon">⭐ MOST POPULAR</span>}
                      <div className="pass-card-head">
                        <span className="pass-tier-badge">{pass.tierTag}</span>
                        <h4 className="pass-name">{pass.name}</h4>
                        <div className="pass-price-line">
                          <span className="pass-billing">{pass.billing}</span>
                        </div>
                      </div>
                      <p className="pass-highlight">{pass.highlight}</p>
                      <ul className="pass-perks-preview">
                        {pass.perks.slice(0, 2).map((perk, idx) => (
                          <li key={idx}>✓ {perk}</li>
                        ))}
                      </ul>
                      <button 
                        className="pass-card-wa-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          const msg = `Hi Kesari - The Memory Studio Koramangala!\nI want to get the *${pass.name}* (${pass.billing}). Please activate my pass.`;
                          window.open(KESARI_CONTACT.whatsappUrl(msg), '_blank');
                        }}
                      >
                        Get on WhatsApp &rsaquo;
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Tonight's Stage Schedule (Editorial Poster Lineup List) */}
              <motion.section className="venue-schedule-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Tonight's Kesari Schedule</span>
                  <span className="section-meta">Koramangala Studio</span>
                </div>

                <div className="schedule-cards-list">
                  {TONIGHT_SCHEDULE.map((item) => (
                    <motion.div
                      key={item.id}
                      className="schedule-row-item"
                      onClick={() => onSelectEvent(item.id)}
                      whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Thumbnail Poster */}
                      <div 
                        className="schedule-thumb-poster"
                        style={{ backgroundImage: `url(${item.image})` }}
                      >
                        <span className="schedule-time-badge">{item.time}</span>
                      </div>

                      {/* Details */}
                      <div className="schedule-row-info">
                        <span className="schedule-stage-name">{item.stage}</span>
                        <h4 className="schedule-item-title">{item.title}</h4>
                        <p className="schedule-item-artist">{item.artist}</p>
                      </div>

                      {/* Action */}
                      <div className="schedule-row-right">
                        <span className="schedule-price-tag">{item.price}</span>
                        <button className="schedule-quick-btn" title="View Pass">
                          <AppIcon name="arrow-up-right" size={10} color="#12131A" strokeWidth={2.6} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Bottom Spacer for Fixed Root Navigation */}
              <div style={{ height: 85, flexShrink: 0 }} />
            </main>

            {/* ── Studio Modals & Rental Equipment Drawer ── */}
            <RentGearSheet 
              isOpen={showRentGear} 
              onClose={() => setShowRentGear(false)} 
            />
            <OrganiseEventModal 
              isOpen={showOrganiseModal} 
              onClose={() => setShowOrganiseModal(false)} 
            />
            <RentSpaceModal 
              isOpen={showRentSpaceModal} 
              onClose={() => setShowRentSpaceModal(false)} 
            />
            <MonthlyPassModal 
              isOpen={showMonthlyPassModal} 
              onClose={() => setShowMonthlyPassModal(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
