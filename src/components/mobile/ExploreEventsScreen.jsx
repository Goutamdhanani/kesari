import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import AuroraFluidCanvas from './AuroraFluidCanvas';
import ExploreSkeletonScreen from './ExploreSkeletonScreen';
import './ExploreEventsScreen.css';

const DATE_TABS = [
  { id: 'all', label: 'All Shows' },
  { id: 'tonight', label: 'Tonight' },
  { id: 'weekend', label: 'Weekend' },
  { id: 'upcoming', label: 'Upcoming' }
];

const VIBE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'rock', label: 'Live Gigs' },
  { id: 'acoustic', label: 'Acoustic' },
  { id: 'hiphop', label: 'Cyphers' },
  { id: 'electronic', label: 'Synth' }
];

export default function ExploreEventsScreen({
  events = [],
  selectedCity = 'Bangalore',
  onSelectEvent = () => {},
  onBack = () => {},
  onOpenCitySelector = () => {}
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateTab, setSelectedDateTab] = useState('all');
  const [selectedVibe, setSelectedVibe] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      // Date filter
      if (selectedDateTab === 'tonight' && e.dateFilter !== 'tonight') return false;
      if (selectedDateTab === 'weekend' && e.dateFilter !== 'weekend') return false;
      if (selectedDateTab === 'upcoming' && (e.dateFilter === 'tonight' || e.dateFilter === 'weekend')) return false;

      // Vibe filter
      if (selectedVibe !== 'all') {
        const matchesGenre = e.genre?.toLowerCase() === selectedVibe.toLowerCase();
        const matchesCategory = e.category?.toLowerCase().includes(selectedVibe.toLowerCase());
        if (!matchesGenre && !matchesCategory) return false;
      }

      return true;
    });
  }, [events, selectedDateTab, selectedVibe]);

  return (
    <div className="mobile-explore-screen-root" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <ExploreSkeletonScreen key="skeleton" />
        ) : (
          <motion.div 
            key="content"
            className="mobile-explore-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* ── 1. The Obsidian Curved Stage Dome Header (Matches Home Screen) ── */}
            <header className="explore-curved-dome-header">
        {/* Northern Lights Aurora Canvas Background */}
        <div className="explore-aurora-viewport">
          <AuroraFluidCanvas />
        </div>

        {/* Top Navigation Row */}
        <div className="explore-dome-nav-row">
          <button 
            className="explore-dome-back-btn" 
            onClick={onBack} 
            aria-label="Back to Home"
          >
            <AppIcon name="chevron-left" size={18} color="#FFFFFF" strokeWidth={2.4} />
          </button>

          <div className="explore-dome-titles">
            <div className="explore-dome-beacon">
              <span className="explore-live-dot" />
              <span className="explore-live-label">LIVE RADAR • BANGALORE</span>
            </div>
            <h1 className="explore-dome-heading">Explore Shows</h1>
          </div>

          <div 
            className="explore-dome-venue-pill"
            onClick={onOpenCitySelector}
            title="Studio Location"
          >
            <span className="explore-venue-dot" />
            <span className="explore-venue-name">Kesari Studio</span>
          </div>
        </div>

        {/* Dome Date Tabs */}
        <div className="explore-dome-date-row">
          {DATE_TABS.map(tab => {
            const isActive = selectedDateTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`explore-date-tab ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedDateTab(tab.id)}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="exploreActiveTabPill" 
                    className="explore-date-tab-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* ── 2. The Warm Alabaster Sheet (Matches Home Screen) ── */}
      <main className="explore-warm-sheet">
        {/* Minimal Vibe Pills */}
        <div className="explore-vibe-pills-row">
          {VIBE_FILTERS.map(vibe => {
            const isSelected = selectedVibe === vibe.id;
            return (
              <button
                key={vibe.id}
                className={`vibe-chip-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedVibe(vibe.id)}
              >
                <span className="vibe-chip-label">{vibe.label}</span>
              </button>
            );
          })}
        </div>

        {/* Shows Count Subtitle */}
        <div className="explore-shows-meta-row">
          <span className="explore-section-title">Studio Lineup</span>
          <span className="explore-section-count">{filteredEvents.length} Shows</span>
        </div>

        {/* Minimal Event Cards Stream (Matches Home Screen Poster Pass Language) */}
        <div className="explore-cards-stream">
          {filteredEvents.map((event, index) => {
            const mainArtist = event.lineup?.[0]?.name || '';

            return (
              <motion.article
                key={event.id}
                className="explore-poster-card"
                onClick={() => onSelectEvent(event.id)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, delay: index * 0.04 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Photography Layer */}
                <div 
                  className="explore-card-bg-img"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="explore-card-vignette" />

                {/* Top Floating Badge Row */}
                <div className="explore-card-top-row">
                  <span className="explore-stage-badge">
                    {event.room?.split('(')[0]?.trim() || event.category || 'Live Studio'}
                  </span>

                  <div className="explore-arrow-circle">
                    <AppIcon name="arrow-up-right" size={12} color="#FFFFFF" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Bottom Frosted Info Drawer */}
                <div className="explore-card-drawer">
                  <div className="explore-timing-row">
                    <span className="explore-timing-dot" />
                    <span className="explore-timing-text">{event.date} • {event.time?.split('-')[0]?.trim()}</span>
                  </div>

                  <h2 className="explore-card-title">{event.title}</h2>
                  {mainArtist && (
                    <p className="explore-card-artist">{mainArtist}</p>
                  )}

                  <div className="explore-card-footer">
                    <span className="explore-price-val">{event.priceLabel || `₹${event.price}`}</span>
                    <button 
                      className="explore-claim-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(event.id);
                      }}
                    >
                      <span>Pass</span>
                      <AppIcon name="chevron-right" size={10} color="#FFFFFF" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="explore-empty-box">
              <p>No shows scheduled for this filter.</p>
              <button 
                className="explore-empty-reset"
                onClick={() => {
                  setSelectedDateTab('all');
                  setSelectedVibe('all');
                }}
              >
                View all shows
              </button>
            </div>
          )}
        </div>

        {/* Space for Bottom Navigation */}
        <div className="explore-bottom-spacer" />
      </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
