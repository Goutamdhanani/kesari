import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import HomeSkeletonScreen from './HomeSkeletonScreen';
import { FloatingBottomNav } from '../common/ControlWidgets';
import './HomeScreen.css';

const STAGE_FILTERS = ['All Stages', 'Main Stage', 'Sunset Stage', 'Deck Stage', 'Warehouse'];

const HEADLINER_SET = {
  id: 'rock',
  stage: 'Main Stage • 21:00 PM',
  title: 'Rock Legends Reunion',
  subtitle: 'The Velvet Echoes & Sonic Revival',
  date: 'Tonight • Sep 5',
  price: 'From $18.89',
  badge: '★ Headliner Set',
  image: '/assets/rock_concert_bg.png'
};

const VENUE_BENTO_SETS = [
  {
    id: 'jazz',
    colorKey: 'lilac',
    stage: 'Sunset Stage • 18:30 PM',
    stageFilter: 'Sunset Stage',
    title: 'Jazz & Blues Festival',
    act: 'Miles Quartet Live Improv',
    price: 'From $22.50',
    tag: 'Live Acoustic'
  },
  {
    id: 'hiphop',
    colorKey: 'butter',
    stage: 'Deck Stage • 20:15 PM',
    stageFilter: 'Deck Stage',
    title: 'Hip Hop Showcase Live',
    act: 'Apex Rhymes & DJ Metro',
    price: 'From $25.00',
    tag: 'Cypher Stage'
  },
  {
    id: 'electronic',
    colorKey: 'mint',
    stage: 'Warehouse • 22:45 PM',
    stageFilter: 'Warehouse',
    title: 'Neon Horizon Rave',
    act: 'Klangwelt Live Modular',
    price: 'From $45.00',
    tag: 'Laser Array'
  },
  {
    id: 'jazz',
    colorKey: 'peach',
    stage: 'Garden Terrace • 17:00 PM',
    stageFilter: 'Sunset Stage',
    title: 'Sunset Acoustic Sessions',
    act: 'Sarah Vaughan Trio',
    price: 'Free with pass',
    tag: 'Lounge Set'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.22, ease: [0.19, 1, 0.22, 1] }
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
  const [activeStage, setActiveStage] = useState('All Stages');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated quick initial load for skeleton demonstration
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

  // Filter bento cards based on stage filter and search query
  const filteredSets = VENUE_BENTO_SETS.filter(item => {
    const matchesStage = activeStage === 'All Stages' || item.stageFilter === activeStage;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.act.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const showHeadliner = (activeStage === 'All Stages' || activeStage === 'Main Stage') &&
    (searchQuery === '' || HEADLINER_SET.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
            {/* 1. Minimal Header */}
            <header className="mobile-home-header">
              <div className="header-left-group">
                <motion.button 
                  className="user-avatar-circle" 
                  title="My Profile" 
                  aria-label="My Profile" 
                  onClick={() => onNavigate('profile')}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <img src="/assets/gregory_face.png" alt="Gregory" />
                </motion.button>
                
                <motion.div 
                  className="venue-pill-badge"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenCitySelector}
                >
                  <span className="venue-live-indicator" />
                  <span className="venue-name">Riverfront Pavilion</span>
                  <AppIcon name="chevron-right" size={9} color="#737682" className="rotate-90" />
                </motion.div>
              </div>

              <div className="header-right-group">
                <motion.button
                  className="header-refresh-btn"
                  onClick={triggerRefresh}
                  whileHover={{ rotate: 90, scale: 1.08 }}
                  whileTap={{ rotate: 360, scale: 0.88 }}
                  title="Refresh Schedule"
                  aria-label="Refresh Schedule"
                >
                  <AppIcon name="refresh" size={13} color="#12131A" strokeWidth={2.2} />
                </motion.button>

                <motion.button 
                  className="header-bell-button" 
                  onClick={onOpenNotifications}
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Notifications"
                >
                  <AppIcon name="bell" size={14} color="#12131A" strokeWidth={2.2} />
                  {unreadCount > 0 && <span className="bell-badge-dot" />}
                </motion.button>
              </div>
            </header>

            {/* 2. Venue Greeting & Status */}
            <motion.section className="mobile-greeting-section" variants={itemVariants}>
              <div className="greeting-eyebrow">
                <span>Tonight's Venue Schedule</span>
                <span className="eyebrow-divider">•</span>
                <span className="eyebrow-highlight">Live Stages</span>
              </div>
              <h1 className="greeting-headline">
                Hello, <em>Gregory</em>
              </h1>
              <p className="greeting-subtext">4 curated stages at Riverfront Pavilion</p>
            </motion.section>

            {/* 3. Minimal Search Bar */}
            <motion.div 
              className="venue-search-capsule" 
              variants={itemVariants}
            >
              <AppIcon name="search" size={13} color="#737682" strokeWidth={2.4} />
              <input 
                type="text"
                className="venue-search-input"
                placeholder="Find a set, stage, or artist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search schedule"
              />
              {searchQuery ? (
                <button 
                  className="search-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <AppIcon name="close" size={11} color="#737682" />
                </button>
              ) : (
                <div className="search-filter-icon">
                  <AppIcon name="filter" size={11} color="#12131A" strokeWidth={2.4} />
                </div>
              )}
            </motion.div>

            {/* 4. Stage Filter Chips */}
            <motion.div 
              className="venue-stage-chips-row" 
              role="tablist" 
              aria-label="Filter by stage"
              variants={itemVariants}
            >
              {STAGE_FILTERS.map(stage => {
                const isActive = activeStage === stage;
                return (
                  <motion.button
                    key={stage}
                    role="tab"
                    aria-selected={isActive}
                    className={`stage-chip ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStage(stage)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    {isActive && (
                      <motion.div 
                        className="active-stage-backdrop" 
                        layoutId="activeStageGlow" 
                        transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                      />
                    )}
                    <span className="chip-label">{stage}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* 5. Spotlight Headliner Set (Hero Card) */}
            {showHeadliner && (
              <motion.section 
                className="spotlight-headliner-section" 
                variants={itemVariants}
              >
                <div 
                  className="spotlight-card"
                  onClick={() => onSelectEvent(HEADLINER_SET.id)}
                >
                  <img 
                    src={HEADLINER_SET.image} 
                    alt={HEADLINER_SET.title} 
                    className="spotlight-card-bg"
                  />
                  <div className="spotlight-card-overlay" />
                  
                  <div className="spotlight-top-row">
                    <span className="spotlight-stage-badge">{HEADLINER_SET.stage}</span>
                    <span className="spotlight-star-tag">{HEADLINER_SET.badge}</span>
                  </div>

                  <div className="spotlight-bottom-content">
                    <div className="spotlight-title-group">
                      <h2 className="spotlight-title">{HEADLINER_SET.title}</h2>
                      <p className="spotlight-subtitle">{HEADLINER_SET.subtitle}</p>
                    </div>

                    <div className="spotlight-action-row">
                      <span className="spotlight-price">{HEADLINER_SET.price}</span>
                      <motion.button 
                        className="spotlight-arrow-btn"
                        aria-label="View Headliner Pass"
                        whileHover={{ scale: 1.12, rotate: 12 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AppIcon name="arrow-up-right" size={13} color="#12131A" strokeWidth={2.6} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* 6. Venue Live Sets (Pastel Bento Grid from Reference Image) */}
            <motion.section className="venue-bento-section" variants={itemVariants}>
              <div className="bento-section-header">
                <h3 className="bento-section-title">Stage Sets Today</h3>
                <span className="bento-count-badge">{filteredSets.length} Sets</span>
              </div>

              {filteredSets.length > 0 ? (
                <div className="bento-grid-2x2">
                  {filteredSets.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      className={`bento-card bento-${item.colorKey}`}
                      onClick={() => onSelectEvent(item.id)}
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    >
                      <div className="bento-card-top">
                        <span className="bento-stage-tag">{item.stage}</span>
                        <span className="bento-pill-indicator" />
                      </div>

                      <div className="bento-card-body">
                        <h4 className="bento-title">{item.title}</h4>
                        <p className="bento-act">{item.act}</p>
                      </div>

                      <div className="bento-card-footer">
                        <span className="bento-price">{item.price}</span>
                        <motion.button 
                          className="bento-arrow-circle"
                          aria-label={`Open ${item.title}`}
                          whileHover={{ scale: 1.15, rotate: 12 }}
                          whileTap={{ scale: 0.88 }}
                        >
                          <AppIcon name="arrow-up-right" size={11} color="#12131A" strokeWidth={2.6} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bento-empty-hint">
                  <p>No sets match "{searchQuery}" on this stage</p>
                </div>
              )}
            </motion.section>

            {/* Spacer for bottom navigation */}
            <div style={{ height: 32, flexShrink: 0 }} />

            {/* 7. Floating Bottom Navigation Bar (Frosted Capsule from Image 2) */}
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
