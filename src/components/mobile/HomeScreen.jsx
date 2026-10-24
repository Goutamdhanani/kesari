import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import HomeSkeletonScreen from './HomeSkeletonScreen';
import { FloatingBottomNav } from '../common/ControlWidgets';
import './HomeScreen.css';

// 5 Interactive Stage Vibes (inspired by the mood log in reference image 2)
const VIBE_SPECTRUM = [
  { id: 'all', label: 'All', emoji: '✦', color: '#12131A', bg: '#EDE8DF', decibels: '92dB' },
  { id: 'rock', label: 'Rock', emoji: '⚡', color: '#12131A', bg: '#F3E294', decibels: '98dB', stage: 'Main Stage' },
  { id: 'jazz', label: 'Jazz', emoji: '🎷', color: '#12131A', bg: '#D7DCFA', decibels: '82dB', stage: 'Sunset Stage' },
  { id: 'electronic', label: 'Rave', emoji: '🎛️', color: '#12131A', bg: '#CFE7DE', decibels: '102dB', stage: 'Warehouse' },
  { id: 'acoustic', label: 'Lounge', emoji: '🌿', color: '#12131A', bg: '#F0BBB0', decibels: '74dB', stage: 'Garden' }
];

// High-impact Event Posters (Real concert photography + pastel editorial tokens)
const STAGE_PASSES = [
  {
    id: 'rock',
    vibeId: 'rock',
    bg: '#F3E294',
    badgeText: '⚡ Main Stage',
    stage: 'Main Stage • 21:00',
    title: 'Rock Legends Reunion',
    artist: 'The Velvet Echoes & Guests',
    price: '€28.00',
    timing: 'Now Live • 1h 45m left',
    image: '/assets/events/ev_rock.jpg',
    tag: 'Headliner'
  },
  {
    id: 'jazz',
    vibeId: 'jazz',
    bg: '#D7DCFA',
    badgeText: '🎷 Sunset Stage',
    stage: 'Sunset Stage • 18:30',
    title: 'Jazz & Blues Festival',
    artist: 'Miles Davis Tribute Quartet',
    price: '€22.50',
    timing: 'In 45 mins • 6:30 PM',
    image: '/assets/events/ev_jazz.jpg',
    tag: 'Fast Pass'
  },
  {
    id: 'hiphop',
    vibeId: 'rock',
    bg: '#F0BBB0',
    badgeText: '🎤 Deck Stage',
    stage: 'Deck Stage • 20:15',
    title: 'Hip Hop Showcase Live',
    artist: 'Apex Rhymes & DJ Metro',
    price: '€25.00',
    timing: 'Tonight • 8:15 PM',
    image: '/assets/concert_crowd.jpg',
    tag: 'Trending'
  },
  {
    id: 'electronic',
    vibeId: 'electronic',
    bg: '#CFE7DE',
    badgeText: '🎛️ Warehouse 7',
    stage: 'Warehouse 7 • 23:00',
    title: 'Neon Horizon Rave',
    artist: 'Klangwelt Live Modular',
    price: '€32.00',
    timing: 'Late Night • 11:00 PM',
    image: '/assets/fluid_art.jpg',
    tag: '360° Visuals'
  },
  {
    id: 'acoustic',
    vibeId: 'acoustic',
    bg: '#EDE8DF',
    badgeText: '🌿 Garden Stage',
    stage: 'Garden Terrace • 17:00',
    title: 'Sunset Acoustic Sessions',
    artist: 'Sarah Vaughan Trio',
    price: '€18.00',
    timing: 'Sunset Lounge Set',
    image: '/assets/events/ev_openmic.jpg',
    tag: 'Unplugged'
  }
];

// Stage Schedule List Items for Tonight at Riverfront Pavilion
const TONIGHT_SCHEDULE = [
  {
    id: 'jazz',
    stage: 'Sunset Stage',
    time: '18:30',
    title: 'Jazz & Blues Improv',
    artist: 'Miles Davis Tribute Quartet',
    price: '€22.50',
    image: '/assets/events/ev_jazz.jpg',
    status: 'Starting Soon'
  },
  {
    id: 'hiphop',
    stage: 'Deck Stage',
    time: '20:15',
    title: 'Hip Hop Showcase Live',
    artist: 'Apex Rhymes & DJ Metro',
    price: '€25.00',
    image: '/assets/concert_crowd.jpg',
    status: 'Tickets Fast'
  },
  {
    id: 'rock',
    stage: 'Main Stage',
    time: '21:00',
    title: 'Rock Legends Reunion',
    artist: 'The Velvet Echoes',
    price: '€28.00',
    image: '/assets/events/ev_rock.jpg',
    status: 'Headline Set'
  },
  {
    id: 'electronic',
    stage: 'Warehouse 7',
    time: '23:00',
    title: 'Neon Horizon Rave 2026',
    artist: 'Klangwelt Collective',
    price: '€32.00',
    image: '/assets/fluid_art.jpg',
    status: 'Late Hangar'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.02
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.24, ease: [0.19, 1, 0.22, 1] }
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
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const triggerRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {/* ── 1. The Obsidian Curved Stage Dome (Inspired by Reference Image 1) ── */}
            <header className="home-curved-dome-header">
              {/* Top Navigation Row */}
              <div className="dome-top-nav">
                <motion.div 
                  className="dome-venue-capsule"
                  onClick={onOpenCitySelector}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="dome-live-beacon" />
                  <span className="dome-venue-name">Riverfront Pavilion</span>
                  <AppIcon name="chevron-right" size={8} color="#9AA0AF" className="rotate-90" />
                </motion.div>

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
                      <span className="dome-live-tag">NOW LIVE • MAIN STAGE</span>
                    </div>
                    <span className="dome-db-badge">98 dB Peak</span>
                  </div>

                  <div className="dome-headline-row">
                    <h1 className="dome-act-title">The Velvet Echoes</h1>
                    {/* Delicate Animated Soundwave Equalizer */}
                    <div className="dome-soundwave-bars" aria-label="Live audio waveform">
                      <span className="wave-bar bar-1" />
                      <span className="wave-bar bar-2" />
                      <span className="wave-bar bar-3" />
                      <span className="wave-bar bar-4" />
                      <span className="wave-bar bar-5" />
                    </div>
                  </div>

                  <div className="dome-footer-row">
                    <div className="dome-timing-info">
                      <span className="dome-subtext">Rock Legends Reunion • 1h 45m left</span>
                    </div>
                    
                    <motion.button 
                      className="dome-tune-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <span>Pass €18.89</span>
                      <AppIcon name="arrow-up-right" size={11} color="#12131A" strokeWidth={2.6} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </header>

            {/* ── 2. The Warm Alabaster Sheet ── */}
            <main className="home-warm-sheet">
              {/* Vibe Spectrum / Acoustic Mood Bar (from Reference Image 2) */}
              <motion.section className="venue-vibe-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Acoustic Stage Vibe</span>
                  <span className="section-meta">4 Live Stages</span>
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
                          <span className="vibe-emoji">{vibe.emoji}</span>
                        </div>
                        <span className="vibe-orb-label">{vibe.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.section>

              {/* Event Poster Cards (Horizontal Stage Passes Carousel) */}
              <motion.section className="stage-passes-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Stage Passes & Posters</span>
                  <span className="section-meta-action" onClick={() => onNavigate('explore')}>
                    All Stages &rsaquo;
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
                        {/* High-Resolution Event Artwork / Poster Background */}
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

              {/* Asymmetric Bento Spotlight & Venue Capacity (from Reference Image 2) */}
              <motion.section className="venue-bento-duo-section" variants={itemVariants}>
                {/* Bento Card 1: Sunset Acoustic Lounge with Real Photo Poster */}
                <motion.div 
                  className="bento-poster-card"
                  onClick={() => onSelectEvent('jazz')}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="bento-poster-bg"
                    style={{ backgroundImage: `url('/assets/events/ev_openmic.jpg')` }}
                  />
                  <div className="bento-poster-overlay" />

                  <div className="bento-poster-content">
                    <span className="bento-mini-tag">Garden Terrace • 17:00</span>
                    <h4 className="bento-poster-title">Sunset Acoustic Sessions</h4>
                    <p className="bento-poster-sub">Sarah Vaughan Trio • Unplugged</p>
                    
                    <div className="bento-poster-footer">
                      <span className="bento-badge-free">Free with pass</span>
                      <div className="bento-icon-btn">
                        <AppIcon name="arrow-up-right" size={11} color="#12131A" strokeWidth={2.6} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bento Card 2: Giant Stat Capacity & Live Sound Meter */}
                <div className="bento-metric-card">
                  <div className="metric-header-row">
                    <span className="metric-eyebrow">Venue Capacity</span>
                    <span className="metric-live-dot" />
                  </div>
                  
                  <div className="metric-giant-number">
                    <span>92</span>
                    <span className="metric-pct">%</span>
                  </div>

                  <p className="metric-subtext">Riverfront Gate 2 Check-in Fast Track Open</p>

                  <div className="metric-sound-meter">
                    <div className="meter-info">
                      <span className="meter-label">Sound Level</span>
                      <span className="meter-db">88 dB</span>
                    </div>
                    <div className="meter-bars">
                      <span className="m-bar mb-1" />
                      <span className="m-bar mb-2" />
                      <span className="m-bar mb-3" />
                      <span className="m-bar mb-4" />
                      <span className="m-bar mb-5" />
                    </div>
                  </div>

                  <div className="metric-dots-matrix" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className={`matrix-dot ${i < 10 ? 'filled' : ''}`} />
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* ── 3. Tonight's Stage Schedule (Editorial Poster Lineup List) ── */}
              <motion.section className="venue-schedule-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Tonight's Pavilion Schedule</span>
                  <span className="section-meta">All Stages Active</span>
                </div>

                <div className="schedule-cards-list">
                  {TONIGHT_SCHEDULE.map((item) => (
                    <motion.div
                      key={item.id}
                      className="schedule-row-item"
                      onClick={() => onSelectEvent(item.id)}
                      whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
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

              {/* Bottom Spacer */}
              <div style={{ height: 36, flexShrink: 0 }} />
            </main>

            {/* ── 4. Minimal Frosted Bottom Navigation (from Reference Image 2) ── */}
            <div className="mobile-bottom-nav-wrapper">
              <FloatingBottomNav 
                activeTab={activeTab} 
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  if (tab === 'search') onNavigate('search');
                  else if (tab === 'calendar') onNavigate('explore');
                  else if (tab === 'ticket') onOpenTicket();
                  else if (tab === 'profile') onNavigate('profile');
                  else if (tab === 'home') onNavigate('home');
                }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
