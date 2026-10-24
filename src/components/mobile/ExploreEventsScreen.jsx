import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './ExploreEventsScreen.css';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'tonight', label: 'Tonight' },
  { id: 'weekend', label: 'Weekend' },
  { id: 'upcoming', label: 'Upcoming' }
];

export default function ExploreEventsScreen({
  events = [],
  selectedCity = 'Bangalore',
  onSelectEvent = () => {},
  onBack = () => {},
  onOpenCitySelector = () => {}
}) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return events;
    if (activeTab === 'tonight') return events.filter(e => e.dateFilter === 'tonight');
    if (activeTab === 'weekend') return events.filter(e => e.dateFilter === 'weekend');
    if (activeTab === 'upcoming') {
      return events.filter(e => e.dateFilter !== 'tonight' && e.dateFilter !== 'weekend');
    }
    return events;
  }, [events, activeTab]);

  return (
    <div className="antique-explore-root">
      {/* Minimal Antique Header */}
      <header className="antique-header">
        <button 
          className="antique-back-btn" 
          onClick={onBack} 
          aria-label="Back"
        >
          <AppIcon name="chevron-left" size={20} color="#1C1917" strokeWidth={1.8} />
        </button>

        <div className="antique-header-center">
          <span className="antique-kicker">KESARI • BANGALORE</span>
          <h1 className="antique-title">Shows</h1>
        </div>

        <button 
          className="antique-location-link"
          onClick={onOpenCitySelector}
          aria-label="Location"
        >
          <span>Studio</span>
        </button>
      </header>

      {/* Minimal Understated Filter Tabs */}
      <nav className="antique-tabs-nav" aria-label="Event Filter">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`antique-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="antiqueTabUnderline" 
                  className="antique-tab-underline"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Spacious Event Stream */}
      <main className="antique-events-stream">
        {filtered.map((event, index) => {
          const mainArtist = event.lineup?.[0]?.name || '';
          
          return (
            <motion.article
              key={event.id}
              className="antique-event-item"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
              onClick={() => onSelectEvent(event.id)}
            >
              {/* Photo */}
              <div className="antique-image-wrap">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="antique-image" 
                  loading="lazy"
                />
              </div>

              {/* Editorial Details */}
              <div className="antique-info-row">
                <div className="antique-meta-line">
                  <span className="antique-date">
                    {event.date.replace(/•/g, '—')}
                  </span>
                  <span className="antique-time">{event.time?.split('-')[0]?.trim()}</span>
                </div>

                <h2 className="antique-event-title">{event.title}</h2>

                {mainArtist && (
                  <p className="antique-artist-line">{mainArtist}</p>
                )}

                <div className="antique-action-line">
                  <span className="antique-price">{event.priceLabel || `₹${event.price}`}</span>
                  <span className="antique-reserve-link">
                    Reserve <span>→</span>
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}

        {filtered.length === 0 && (
          <div className="antique-empty">
            <p>No shows scheduled in this view.</p>
            <button 
              className="antique-reset-btn" 
              onClick={() => setActiveTab('all')}
            >
              View all
            </button>
          </div>
        )}

        <footer className="antique-footer-note">
          <p>Kesari — The Memory Studio</p>
          <span>Music • Acoustics • Belonging</span>
        </footer>

        {/* Space for bottom navigation */}
        <div style={{ height: 96, flexShrink: 0 }} />
      </main>
    </div>
  );
}
