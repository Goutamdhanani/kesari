import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import HomeSkeletonScreen from './HomeSkeletonScreen';
import { FloatingBottomNav } from '../common/ControlWidgets';
import './HomeScreen.css';

// 4 Interactive Stage Vibes (inspired by the mood log in reference image 2)
const VIBE_SPECTRUM = [
  { id: 'all', label: 'All', emoji: '✦', color: '#12131A', bg: '#EDE8DF', decibels: '92dB' },
  { id: 'rock', label: 'Rock', emoji: '⚡', color: '#12131A', bg: '#F3E294', decibels: '98dB', stage: 'Main Stage' },
  { id: 'jazz', label: 'Jazz', emoji: '🎷', color: '#12131A', bg: '#D7DCFA', decibels: '82dB', stage: 'Sunset Stage' },
  { id: 'electronic', label: 'Rave', emoji: '🎛️', color: '#12131A', bg: '#CFE7DE', decibels: '102dB', stage: 'Warehouse' },
  { id: 'acoustic', label: 'Lounge', emoji: '🌿', color: '#12131A', bg: '#F0BBB0', decibels: '74dB', stage: 'Garden' }
];

// Horizontal Stage Passes (inspired by the bills cards in reference image 1)
const STAGE_PASSES = [
  {
    id: 'jazz',
    vibeId: 'jazz',
    bg: '#D7DCFA',
    stage: 'Sunset Stage • 18:30',
    title: 'Jazz & Blues Festival',
    artist: 'Miles Davis Tribute Quartet',
    price: '€22.50',
    timing: 'In 45 mins',
    iconType: 'jazz'
  },
  {
    id: 'hiphop',
    vibeId: 'rock',
    bg: '#F3E294',
    stage: 'Deck Stage • 20:15',
    title: 'Hip Hop Showcase Live',
    artist: 'Apex Rhymes & DJ Metro',
    price: '€25.00',
    timing: 'Tonight • 8:15 PM',
    iconType: 'mic'
  },
  {
    id: 'electronic',
    vibeId: 'electronic',
    bg: '#CFE7DE',
    stage: 'Warehouse 7 • 22:45',
    title: 'Neon Horizon Rave',
    artist: 'Klangwelt Live Modular',
    price: '€45.00',
    timing: 'Late Night Set',
    iconType: 'sound'
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

              {/* Main Stage Live Feature Display */}
              <motion.div 
                className="dome-hero-spotlight"
                onClick={() => onSelectEvent('rock')}
                whileTap={{ scale: 0.98 }}
              >
                <div className="dome-eyebrow-row">
                  <span className="dome-live-tag">Now Live • Main Stage</span>
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
                    <span>Pass from €18.89</span>
                    <AppIcon name="arrow-up-right" size={11} color="#12131A" strokeWidth={2.6} />
                  </motion.button>
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

              {/* Today's Stage Passes (from Reference Image 1) */}
              <motion.section className="stage-passes-section" variants={itemVariants}>
                <div className="section-title-row">
                  <span className="section-label">Today's Stage Passes</span>
                  <span className="section-meta-action" onClick={() => onNavigate('explore')}>
                    All Sets &rsaquo;
                  </span>
                </div>

                <div className="stage-passes-scroll">
                  {filteredPasses.length > 0 ? (
                    filteredPasses.map((pass) => (
                      <motion.div
                        key={pass.id}
                        className="stage-pass-card"
                        style={{ backgroundColor: pass.bg }}
                        onClick={() => onSelectEvent(pass.id)}
                        whileHover={{ y: -3, scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="pass-card-top">
                          <span className="pass-timing-tag">{pass.timing}</span>
                          <motion.div 
                            className="pass-arrow-circle"
                            whileHover={{ rotate: 15, scale: 1.15 }}
                          >
                            <AppIcon name="arrow-up-right" size={11} color="#12131A" strokeWidth={2.6} />
                          </motion.div>
                        </div>

                        <div className="pass-card-mid">
                          <span className="pass-stage-name">{pass.stage}</span>
                          <h3 className="pass-event-title">{pass.title}</h3>
                          <p className="pass-artist-name">{pass.artist}</p>
                        </div>

                        <div className="pass-card-bottom">
                          <span className="pass-price-val">{pass.price}</span>
                          <span className="pass-chip">Fast Pass</span>
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

              {/* Asymmetric Bento Lineup & Venue Capacity (from Reference Image 2) */}
              <motion.section className="venue-bento-duo-section" variants={itemVariants}>
                {/* Bento Card 1: Sunset Acoustic Lounge with Delicate Vector Line Art */}
                <motion.div 
                  className="bento-artistic-card"
                  onClick={() => onSelectEvent('jazz')}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bento-art-content">
                    <span className="bento-mini-tag">Garden Terrace • 17:00</span>
                    <h4 className="bento-art-title">Sunset Acoustic Sessions</h4>
                    <p className="bento-art-sub">Sarah Vaughan Trio • Unplugged</p>
                    <div className="bento-art-footer">
                      <span className="bento-badge-free">Free with pass</span>
                      <div className="bento-icon-btn">
                        <AppIcon name="arrow-up-right" size={11} color="#12131A" strokeWidth={2.6} />
                      </div>
                    </div>
                  </div>

                  {/* Clean SVG Botanical Line Art (from Reference Image 2) */}
                  <svg className="bento-botanical-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 95V35M50 35C50 20 65 10 75 18C85 26 70 42 50 48M50 55C35 45 25 30 35 22C45 14 55 35 50 55M50 75C65 65 78 52 70 44C62 36 50 58 50 75" stroke="#12131A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
                    <circle cx="75" cy="18" r="4" fill="#F3E294" />
                    <circle cx="35" cy="22" r="3.5" fill="#D7DCFA" />
                  </svg>
                </motion.div>

                {/* Bento Card 2: Giant Stat Capacity (from Reference Image 2's "89% your progress") */}
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

                  <div className="metric-dots-matrix" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className={`matrix-dot ${i < 10 ? 'filled' : ''}`} />
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Bottom Spacer */}
              <div style={{ height: 36, flexShrink: 0 }} />
            </main>

            {/* ── 3. Minimal Frosted Bottom Navigation (from Reference Image 2) ── */}
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
