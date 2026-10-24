import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import HomeSkeletonScreen from './HomeSkeletonScreen';
import { UpcomingEventCard, FeaturedHeroCard } from '../cards/EventCards';
import { FloatingBottomNav } from '../common/ControlWidgets';
import './HomeScreen.css';

const CATEGORIES = ['All', 'Music', 'Hip-Hop', 'Jazz', 'Rock', 'Electronic', 'Festivals'];

const DEFAULT_POPULAR = [
  {
    id: 'rock',
    category: 'Rock & Electric',
    title: 'Rock Legends Reunion',
    date: 'October 20',
    price: 'From $18.89',
    image: '/assets/rock_concert_bg.png'
  },
  {
    id: 'hiphop',
    category: 'Hip-Hop',
    title: 'Hip Hop Showcase Live',
    date: 'Nov 14',
    price: 'From $25.00',
    image: '/assets/concert_crowd.jpg'
  },
  {
    id: 'jazz',
    category: 'Jazz',
    title: 'Jazz & Blues Festival',
    date: 'Sep 5',
    price: 'From $22.50',
    image: '/assets/jazz_blues_pills.png'
  }
];

const DEFAULT_NEARBY = [
  {
    id: 'jazz',
    category: 'Jazz',
    title: 'Jazz & Blues Festival',
    date: 'Sep 5',
    distance: '0.3 mi',
    price: '$22.50',
    image: '/assets/jazz_blues_pills.png'
  },
  {
    id: 'hiphop',
    category: 'Hip-Hop',
    title: 'Hip Hop Showcase Live',
    date: 'Nov 14',
    distance: '1.2 mi',
    price: '$25.00',
    image: '/assets/concert_crowd.jpg'
  },
  {
    id: 'rock',
    category: 'Rock',
    title: 'Rock Legends Reunion',
    date: 'Oct 20',
    distance: '2.4 mi',
    price: '$18.89',
    image: '/assets/rock_concert_bg.png'
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
  selectedCity = 'San Francisco',
  unreadCount = 2
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated quick initial load for skeleton demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  const triggerRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  // Filter events by selected category chip
  const filteredPopular = DEFAULT_POPULAR.filter(e => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Music') return true;
    return e.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const filteredNearby = DEFAULT_NEARBY.filter(e => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Music') return true;
    return e.category.toLowerCase().includes(activeCategory.toLowerCase());
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
            {/* 1. Top Header */}
            <header className="mobile-home-header">
              <div className="header-user-badge">
                <motion.button 
                  className="user-avatar-circle" 
                  title="My profile" 
                  aria-label="My profile" 
                  onClick={() => onNavigate('profile')}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <img src="/assets/gregory_face.png" alt="Gregory" />
                </motion.button>
                
                <motion.button 
                  className="header-location-pill" 
                  onClick={onOpenCitySelector}
                  title="Change City"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <AppIcon name="pin" size={10} color="#0042D9" strokeWidth={2.5} />
                  <span className="location-name">{selectedCity}</span>
                  <AppIcon name="chevron-right" size={9} color="#64748B" className="rotate-90" />
                </motion.button>
              </div>

              <div className="header-actions-group">
                {/* Refresh Trigger (Demonstrates Skeleton Screen) */}
                <motion.button
                  className="header-refresh-btn"
                  onClick={triggerRefresh}
                  whileHover={{ rotate: 90, scale: 1.08 }}
                  whileTap={{ rotate: 360, scale: 0.88 }}
                  title="Refresh Stage Feeds"
                  aria-label="Refresh"
                >
                  <AppIcon name="refresh" size={13} color="#64748B" strokeWidth={2.2} />
                </motion.button>

                {/* JamAI Sparkle Pill */}
                <motion.button
                  className="header-ai-pill-btn"
                  onClick={() => onNavigate('ai')}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.92 }}
                  title="Ask JamAI Vibe Concierge"
                >
                  <AppIcon name="sparkles" size={11} color="#080808" strokeWidth={2.5} />
                  <span>JamAI</span>
                </motion.button>

                {/* Notifications Bell */}
                <motion.button 
                  className="header-bell-button" 
                  onClick={onOpenNotifications}
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Notifications"
                >
                  <AppIcon name="bell" size={14} color="#08080C" strokeWidth={2.2} />
                  {unreadCount > 0 && <span className="bell-badge-dot" />}
                </motion.button>
              </div>
            </header>

            {/* 2. Greeting Section */}
            <motion.section className="mobile-greeting-section" variants={itemVariants}>
              <div className="greeting-eyebrow">
                <span className="greeting-dot" />
                <span>Good evening</span>
              </div>
              <h1 className="greeting-headline">
                Hello, <em>Gregory!</em>
              </h1>
              <p className="greeting-subtext">Find your next live sound experience</p>
            </motion.section>

            {/* 3. Functional Tap-to-Search Bar */}
            <motion.div 
              className="mobile-search-bar" 
              onClick={() => onNavigate('search')}
              role="button"
              tabIndex={0}
              aria-label="Open Search"
              variants={itemVariants}
              whileHover={{ scale: 1.01, borderColor: 'rgba(0, 66, 217, 0.3)' }}
              whileTap={{ scale: 0.99 }}
            >
              <AppIcon name="search" size={13.5} color="#0042D9" strokeWidth={2.5} />
              <span className="search-bar-placeholder">Search concerts, artists, venues...</span>
              <motion.div 
                className="search-mic-btn" 
                aria-label="Ask JamAI"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('ai');
                }}
                whileHover={{ scale: 1.1, rotate: 6 }}
                whileTap={{ scale: 0.88 }}
              >
                <AppIcon name="sparkles" size={11} color="#080808" strokeWidth={2.5} />
              </motion.div>
            </motion.div>

            {/* 4. JamAI Vibe Concierge Feature Banner */}
            <motion.div 
              className="home-ai-vibe-banner"
              onClick={() => onNavigate('ai')}
              variants={itemVariants}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="ai-banner-content">
                <div className="ai-banner-tag">
                  <span className="ai-spark-dot" />
                  <span>JamAI Neural Concierge</span>
                </div>
                <h3 className="ai-banner-title">Match your live sound vibe</h3>
                <p className="ai-banner-desc">Describe your mood or artists to discover verified secret sets</p>
              </div>
              <div className="ai-banner-action">
                <motion.div 
                  className="ai-magic-circle"
                  whileHover={{ rotate: 45, scale: 1.1 }}
                >
                  <AppIcon name="arrow-up-right" size={14} color="#080808" strokeWidth={2.5} />
                </motion.div>
              </div>
            </motion.div>

            {/* 5. Category Pills Row */}
            <motion.div 
              className="mobile-categories-row" 
              role="tablist" 
              aria-label="Event categories"
              variants={itemVariants}
            >
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    className={`category-chip ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {isActive && (
                      <motion.div 
                        className="active-chip-backdrop" 
                        layoutId="activeChipGlow" 
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="chip-label">{cat}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* 6. Featured Upcoming Event */}
            <motion.section className="mobile-upcoming-section" variants={itemVariants}>
              <div className="upcoming-section-label">
                <span className="upcoming-pulse-dot" />
                <span>Your upcoming event • Sep 5</span>
              </div>
              <UpcomingEventCard 
                tag="Riverfront Park • Sunset Stage"
                title="Jazz & Blues Festival"
                image="/assets/upcoming_pill_thumb.png"
                onClick={() => onSelectEvent('jazz')}
              />
            </motion.section>

            {/* 7. Popular Now Carousel */}
            <motion.section className="mobile-popular-section" variants={itemVariants}>
              <div className="popular-section-header">
                <h2 className="popular-title">
                  Popular Now {activeCategory !== 'All' && <span className="filter-tag-pill">• {activeCategory}</span>}
                </h2>
                <motion.button 
                  className="popular-see-all-btn" 
                  onClick={() => onNavigate('explore')}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <span>See all</span>
                  <AppIcon name="arrow-right" size={11} color="#0042D9" strokeWidth={2.5} />
                </motion.button>
              </div>

              <div className="popular-cards-scroll">
                <AnimatePresence mode="popLayout">
                  {filteredPopular.length > 0 ? (
                    filteredPopular.map((event, i) => (
                      <motion.div 
                        key={event.id} 
                        className="popular-card-item"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.22, delay: i * 0.04 }}
                      >
                        <FeaturedHeroCard 
                          category={event.category}
                          title={event.title}
                          date={event.date}
                          price={event.price}
                          image={event.image}
                          onSelect={() => onSelectEvent(event.id)}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="category-empty-hint">
                      <span>No {activeCategory} concerts in Popular right now</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* 8. Nearby Events List */}
            <motion.section className="mobile-nearby-section" variants={itemVariants}>
              <div className="nearby-section-header">
                <h2 className="nearby-title">Nearby in {selectedCity}</h2>
                <motion.button 
                  className="nearby-see-all-btn" 
                  onClick={() => onNavigate('explore')}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <span>See all</span>
                  <AppIcon name="arrow-right" size={11} color="#0042D9" strokeWidth={2.5} />
                </motion.button>
              </div>

              <div className="nearby-events-list">
                <AnimatePresence mode="popLayout">
                  {filteredNearby.length > 0 ? (
                    filteredNearby.map((event, i) => (
                      <motion.div
                        key={event.id}
                        className="nearby-event-row"
                        onClick={() => onSelectEvent(event.id)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        whileHover={{ y: -2, backgroundColor: '#FFFFFF' }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="nearby-event-thumb"
                          onError={e => { e.target.style.background = '#EBF1FF'; }}
                        />
                        <div className="nearby-event-info">
                          <div className="nearby-event-cat">{event.category}</div>
                          <div className="nearby-event-title">{event.title}</div>
                          <div className="nearby-event-meta">
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                              <AppIcon name="calendar" size={10} color="#64748B" strokeWidth={2} />
                              {event.date}
                            </span>
                            <span className="nearby-event-meta-dot" />
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                              <AppIcon name="pin" size={10} color="#64748B" strokeWidth={2} />
                              {event.distance}
                            </span>
                          </div>
                        </div>
                        <div className="nearby-event-price">{event.price}</div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="category-empty-hint">
                      <span>No {activeCategory} concerts nearby</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* Spacer for bottom nav */}
            <div style={{ height: 24, flexShrink: 0 }} />

            {/* 9. Floating Bottom Navigation Bar */}
            <div className="mobile-bottom-nav-wrapper">
              <FloatingBottomNav 
                activeTab={activeTab} 
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  if (tab === 'search') onNavigate('search');
                  else if (tab === 'ai') onNavigate('ai');
                  else if (tab === 'calendar') onNavigate('explore');
                  else if (tab === 'ticket') onOpenTicket();
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
