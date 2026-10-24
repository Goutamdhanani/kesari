import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import { UpcomingEventCard, FeaturedHeroCard } from '../cards/EventCards';
import { FloatingBottomNav } from '../common/ControlWidgets';
import './HomeScreen.css';

const CATEGORIES = ['All', 'Music', 'Hip-Hop', 'Jazz', 'Rock', 'Electronic', 'Festivals'];

const NEARBY_EVENTS = [
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
  }
];

export default function HomeScreen({ 
  onSelectEvent = () => {}, 
  onOpenTicket = () => {},
  onNavigate = () => {},
  onOpenNotifications = () => {} 
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');

  const popularEvents = [
    {
      id: 'rock',
      category: 'Music',
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

  return (
    <motion.div 
      className="mobile-home-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
    >
      {/* Top Header */}
      <header className="mobile-home-header">
        <div className="header-user-badge">
          <button 
            className="user-avatar-circle" 
            title="My profile" 
            aria-label="My profile" 
            onClick={() => onNavigate('profile')}
          >
            <img src="/assets/gregory_face.png" alt="Gregory" />
          </button>
          <div className="header-location-pill">
            <AppIcon name="pin" size={12} color="#0042D9" strokeWidth={2.5} />
            <span className="location-name">San Francisco</span>
            <AppIcon name="chevron-right" size={11} color="#6B7280" className="rotate-90" />
          </div>
        </div>

        <motion.button 
          className="header-bell-button" 
          onClick={onOpenNotifications}
          whileTap={{ scale: 0.9 }}
          aria-label="Notifications"
        >
          <AppIcon name="bell" size={17} color="#0C0D12" strokeWidth={2} />
          <span className="bell-badge-dot" />
        </motion.button>
      </header>

      {/* Greeting Section */}
      <section className="mobile-greeting-section">
        <div className="greeting-eyebrow">Good evening</div>
        <h1 className="greeting-headline">
          Hello, <em>Gregory!</em>
        </h1>
        <p className="greeting-subtext">Find your next live experience</p>
      </section>

      {/* Search Bar */}
      <div className="mobile-search-bar">
        <AppIcon name="search" size={16} color="#9CA3AF" strokeWidth={2} />
        <span className="search-bar-placeholder">Search concerts, artists, venues...</span>
        <div className="search-mic-btn" aria-label="Voice search">
          <AppIcon name="mic" size={14} color="#fff" strokeWidth={2} />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mobile-categories-row" role="tablist" aria-label="Event categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Upcoming Event */}
      <section className="mobile-upcoming-section">
        <div className="upcoming-section-label">Your upcoming event</div>
        <UpcomingEventCard 
          tag="Your upcoming event : Sep 5"
          title="Jazz & Blues Festival"
          image="/assets/upcoming_pill_thumb.png"
          onClick={() => onSelectEvent('jazz')}
        />
      </section>

      {/* Popular Now Carousel */}
      <section className="mobile-popular-section">
        <div className="popular-section-header">
          <h2 className="popular-title">Popular Now</h2>
          <button className="popular-see-all-btn" onClick={() => onSelectEvent('rock')}>
            See all
          </button>
        </div>

        <div className="popular-cards-scroll">
          {popularEvents.map((event, i) => (
            <motion.div 
              key={event.id} 
              className="popular-card-item"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
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
          ))}
        </div>
      </section>

      {/* Nearby Events List */}
      <section className="mobile-nearby-section">
        <div className="nearby-section-header">
          <h2 className="nearby-title">Nearby You</h2>
          <button className="nearby-see-all-btn">See all</button>
        </div>

        <div className="nearby-events-list">
          {NEARBY_EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              className="nearby-event-row"
              onClick={() => onSelectEvent(event.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, delay: 0.1 + i * 0.08 }}
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
                  <span>📅 {event.date}</span>
                  <span className="nearby-event-meta-dot" />
                  <span>📍 {event.distance}</span>
                </div>
              </div>
              <div className="nearby-event-price">{event.price}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spacer for bottom nav */}
      <div style={{ height: 20, flexShrink: 0 }} />

      {/* Floating Bottom Navigation Bar */}
      <div className="mobile-bottom-nav-wrapper">
        <FloatingBottomNav 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'ticket') onOpenTicket();
          }} 
        />
      </div>
    </motion.div>
  );
}
