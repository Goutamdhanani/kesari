import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import HomeSkeletonScreen from './HomeSkeletonScreen';
import AuroraFluidCanvas from './AuroraFluidCanvas';
import RentGearSheet from './RentGearSheet';
import OrganiseEventModal from './OrganiseEventModal';
import RentSpaceModal from './RentSpaceModal';
import MonthlyPassModal from './MonthlyPassModal';
import { RENTAL_EQUIPMENT, MONTHLY_PASSES, KESARI_MEMBERSHIP_META, KESARI_CONTACT } from '../../data/kesariStudioData';
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
  { id: 'all', label: 'All', iconKey: 'all' },
  { id: 'music', label: 'Live Gigs', iconKey: 'rock' },
  { id: 'openmic', label: 'Open Mic', iconKey: 'acoustic' },
  { id: 'jam', label: 'Jam Sessions', iconKey: 'electronic' },
  { id: 'workshop', label: 'Workshops', iconKey: 'jazz' }
];

// Curated Studio Shows at Kesari - The Memory Studio Koramangala (No fake stages)
const STAGE_PASSES = [
  {
    id: 'rock',
    vibeId: 'music',
    badgeText: 'Live Studio Gig',
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
    badgeText: 'Acoustic Session',
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
    badgeText: 'Live Cypher',
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
    badgeText: 'Synth Immersion',
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
    badgeText: 'Open Mic Session',
    stage: 'Acoustic Lounge • 17:00',
    title: 'Sunset Acoustic & Open Mic',
    artist: 'Community Artists & Sarah Vaughan',
    price: '₹950',
    timing: 'Sunset Lounge Set',
    image: '/assets/events/ev_openmic.jpg',
    tag: 'Performer Slots'
  }
];

// Schedule for Tonight at Kesari Studio
const TONIGHT_SCHEDULE = [
  {
    id: 'jazz',
    stage: 'Acoustic Lounge • Kesari Studio',
    time: '18:30',
    title: 'Jazz & Blues Improv',
    artist: 'Miles Davis Tribute Quartet',
    price: '₹1,250',
    image: '/assets/events/ev_jazz.jpg',
    status: 'Starting Soon'
  },
  {
    id: 'hiphop',
    stage: 'Studio Floor • Kesari Studio',
    time: '20:15',
    title: 'Hip Hop Showcase Live',
    artist: 'Apex Rhymes & DJ Metro',
    price: '₹1,350',
    image: '/assets/concert_crowd.jpg',
    status: 'Fast Pass'
  },
  {
    id: 'rock',
    stage: 'Main Hall • Kesari Studio',
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
  events = [],
  onSelectEvent = () => {}, 
  onOpenTicket = () => {},
  onNavigate = () => {},
  onOpenNotifications = () => {},
  onOpenCitySelector = () => {},
  onOpenAdmin = () => {},
  unreadCount = 2
}) {
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showRentGear, setShowRentGear] = useState(false);
  const [showOrganiseModal, setShowOrganiseModal] = useState(false);
  const [showRentSpaceModal, setShowRentSpaceModal] = useState(false);
  const [showMonthlyPassModal, setShowMonthlyPassModal] = useState(false);
  const [selectedPassForModal, setSelectedPassForModal] = useState('pass-ritual');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, []);

  const triggerRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  const activePasses = useMemo(() => {
    if (events && events.length > 0) {
      return events.filter(e => e.isPublic !== false).map(e => ({
        id: e.id,
        vibeId: e.genre === 'rock' ? 'music' : e.genre === 'acoustic' ? 'openmic' : e.genre === 'electronic' ? 'jam' : 'music',
        badgeText: e.badge?.replace(/[^\w\s-]/gi, '').trim() || e.category || 'Live Studio',
        stage: `${e.venueShort || 'Kesari Studio'} • ${e.time?.split(' - ')[0] || e.time}`,
        title: e.title,
        artist: e.lineup?.[0]?.name ? `${e.lineup[0].name} Live` : (e.category || 'Live Studio Session'),
        price: e.priceLabel || `₹${e.price?.toLocaleString()}`,
        timing: e.date,
        image: e.image,
        tag: e.room?.split('(')[0]?.trim() || 'Studio Pass'
      }));
    }
    return STAGE_PASSES;
  }, [events]);

  const filteredPasses = activePasses.filter(pass => {
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

              {/* Top Navigation Row: Kesari Logo Branding & Actions */}
              <div className="dome-top-nav">
                <div className="dome-brand-group">
                  {/* Official Kesari Logo */}
                  <img 
                    src="/assets/kesari-logo.png" 
                    alt="Kesari Live" 
                    className="dome-kesari-brand-logo" 
                  />
                </div>

                <div className="dome-nav-actions">
                  {/* Studio Event CMS & Fast Fydo Import Trigger */}
                  <motion.button 
                    className="dome-glass-btn admin-cms-trigger" 
                    onClick={onOpenAdmin}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    title="Studio CMS & Fydo Fast Import"
                    aria-label="Studio Admin CMS"
                  >
                    <span style={{ fontSize: 13, lineHeight: 1 }}>⚡</span>
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

              {/* Main Stage Live Feature Display with Transparent Glass */}
              <motion.div 
                className="dome-hero-spotlight"
                onClick={() => onSelectEvent('rock')}
                whileTap={{ scale: 0.98 }}
              >
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
                      <span className="dome-subtext">Rock Legends Reunion • Live Studio Stage</span>
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
              {/* Minimal Vibe Filter */}
              <motion.section className="venue-vibe-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Studio Lineup</span>
                  <span className="section-meta">Live This Week</span>
                </div>

                <div className="vibe-pills-scroll">
                  {VIBE_SPECTRUM.map((vibe) => {
                    const isSelected = selectedVibe === vibe.id;
                    return (
                      <button
                        key={vibe.id}
                        className={`vibe-chip-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedVibe(vibe.id)}
                      >
                        <span className="vibe-chip-icon">
                          {VIBE_ICONS[vibe.iconKey]}
                        </span>
                        <span className="vibe-chip-label">{vibe.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.section>

              {/* Event Poster Cards (Horizontal Studio Passes Carousel) */}
              <motion.section className="stage-passes-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Passes & Shows</span>
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
                          <span className="poster-stage-badge">
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
                            <span className="poster-tag-chip">
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

              {/* ── Studio Bento Duo: Studio Services + Organise Your Event with Real Kesari Photography ── */}
              <motion.section className="venue-bento-duo-section" variants={itemVariants}>
                {/* Bento Card 1: Studio Services & Rentals (with Lounge Interior Preview) */}
                <div className="bento-services-card">
                  <div 
                    className="services-photo-preview"
                    style={{ backgroundImage: "url('/assets/events/kesari_lounge_inside.jpg')" }}
                    onClick={() => setShowRentSpaceModal(true)}
                  >
                    <div className="services-photo-overlay" />
                    <span className="services-photo-badge">KESARI LOUNGE</span>
                    <span className="services-photo-hint">Tap to View Spaces ›</span>
                  </div>

                  <div className="services-card-header">
                    <span className="services-card-eyebrow">STUDIO SERVICES</span>
                    <span className="services-card-tag">Studio Hub</span>
                  </div>

                  <div className="services-card-list">
                    <motion.button 
                      type="button"
                      className="service-item-row"
                      onClick={() => setShowRentGear(true)}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="service-item-left">
                        <span className="service-item-icon">🔊</span>
                        <div className="service-item-text">
                          <span className="service-item-title">Rent Sound Gear</span>
                          <span className="service-item-desc">13 Items • From ₹150</span>
                        </div>
                      </div>
                      <span className="service-item-arrow">›</span>
                    </motion.button>

                    <motion.button 
                      type="button"
                      className="service-item-row"
                      onClick={() => {
                        setSelectedPassForModal('pass-ritual');
                        setShowMonthlyPassModal(true);
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="service-item-left">
                        <span className="service-item-icon">🎟️</span>
                        <div className="service-item-text">
                          <span className="service-item-title">Kesari Membership</span>
                          <span className="service-item-desc">From ₹3,000 • Worth up to ₹53,700</span>
                        </div>
                      </div>
                      <span className="service-item-arrow">›</span>
                    </motion.button>

                    <motion.button 
                      type="button"
                      className="service-item-row"
                      onClick={() => setShowRentSpaceModal(true)}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="service-item-left">
                        <span className="service-item-icon">🏢</span>
                        <div className="service-item-text">
                          <span className="service-item-title">Rent Out Space</span>
                          <span className="service-item-desc">Hall & Lounge • ₹800/h</span>
                        </div>
                      </div>
                      <span className="service-item-arrow">›</span>
                    </motion.button>
                  </div>
                </div>

                {/* Bento Card 2: Organise Your Event (Atmospheric Real Stage Interior Photo) */}
                <motion.div 
                  className="bento-organise-card"
                  onClick={() => setShowOrganiseModal(true)}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Real Photo Background of Inside Kesari Stage */}
                  <div 
                    className="organise-card-bg"
                    style={{ backgroundImage: "url('/assets/events/kesari_stage_inside.jpg')" }}
                  />
                  {/* Frosted Dark Gradient Overlay for High Contrast Text */}
                  <div className="organise-card-gradient" />
                  
                  <div className="organise-card-content">
                    <div className="organise-card-header">
                      <span className="organise-pill-tag">✦ HOST AT KESARI</span>
                      <span className="organise-live-badge">Live Stage Hall</span>
                    </div>
                    
                    <div className="organise-card-text">
                      <h4 className="organise-card-title">Organise Your Event</h4>
                      <p className="organise-card-sub">
                        Host live gigs, acoustic sets & workshops inside our warm wood hall.
                      </p>
                    </div>

                    <div className="organise-cta-row">
                      <button 
                        type="button"
                        className="organise-plan-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowOrganiseModal(true);
                        }}
                      >
                        <span>Plan Your Event</span>
                        <span className="organise-plan-arrow">&rsaquo;</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.section>

              {/* Tonight's Stage Schedule (Editorial Poster Lineup List) */}
              <motion.section className="venue-schedule-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Tonight's Kesari Schedule</span>
                  <span className="section-meta">Live Tonight</span>
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
              initialPassId={selectedPassForModal}
              onClose={() => setShowMonthlyPassModal(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
