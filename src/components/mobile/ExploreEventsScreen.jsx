import React, { useState } from 'react';
import { motion } from 'motion/react';
import AppIcon from '../common/AppIcon';
import { FloatingBottomNav } from '../common/ControlWidgets';
import './ExploreEventsScreen.css';

const TIMELINES = ['All Dates', 'This Weekend', 'Next Week', 'Trending'];
const CATEGORIES = ['All', 'Rock', 'Jazz', 'Hip-Hop', 'Electronic', 'Festivals'];

export default function ExploreEventsScreen({
  events = [],
  selectedCity = 'San Francisco',
  onSelectEvent = () => {},
  onBack = () => {},
  onTabChange = () => {},
  onOpenCitySelector = () => {}
}) {
  const [selectedTimeline, setSelectedTimeline] = useState('All Dates');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = events.filter(e => {
    if (selectedCategory !== 'All' && 
        !e.category?.toLowerCase().includes(selectedCategory.toLowerCase()) &&
        !e.genre?.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <motion.div 
      className="mobile-explore-screen"
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.22 }}
    >
      {/* Top Header */}
      <header className="explore-header">
        <div className="explore-header-left">
          <button className="explore-back-btn" onClick={onBack} aria-label="Back">
            <AppIcon name="chevron-left" size={20} color="#0C0D12" strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="explore-title">Explore Events</h1>
            <p className="explore-subtitle">Live shows & festivals</p>
          </div>
        </div>

        <button className="explore-city-chip" onClick={onOpenCitySelector}>
          <AppIcon name="pin" size={12} color="#0042D9" strokeWidth={2.5} />
          <span>{selectedCity}</span>
          <AppIcon name="chevron-right" size={11} color="#64748B" className="rotate-90" />
        </button>
      </header>

      {/* Timeline Quick Filter */}
      <div className="explore-timeline-row">
        {TIMELINES.map(time => (
          <button 
            key={time}
            className={`timeline-chip ${selectedTimeline === time ? 'active' : ''}`}
            onClick={() => setSelectedTimeline(time)}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Category Pills Row */}
      <div className="explore-categories-row">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            className={`explore-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards Flow */}
      <div className="explore-events-stream">
        {filteredEvents.map((event, index) => (
          <motion.div 
            key={event.id}
            className="explore-event-card"
            onClick={() => onSelectEvent(event.id)}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="explore-card-media">
              <img src={event.image} alt={event.title} className="explore-card-img" />
              <div className="explore-card-gradient"></div>
              
              <div className="explore-badge-floating">
                <span>🎵 {event.category}</span>
              </div>

              <div className="explore-price-tag">
                <span className="price-label">From</span>
                <span className="price-amount">${event.price?.toFixed(2)}</span>
              </div>
            </div>

            <div className="explore-card-body">
              <div className="explore-card-meta-row">
                <span className="meta-badge">📅 {event.date}</span>
                <span className="meta-badge">📍 {event.venueShort || 'San Francisco'}</span>
              </div>

              <h3 className="explore-event-name">{event.title}</h3>
              <p className="explore-event-desc">{event.description}</p>

              <div className="explore-card-footer">
                <div className="explore-artists-preview">
                  {event.lineup?.slice(0, 3).map((artist, idx) => (
                    <img 
                      key={idx} 
                      src={artist.img} 
                      alt={artist.name} 
                      className="artist-tiny-avatar"
                      style={{ marginLeft: idx > 0 ? -8 : 0, zIndex: 3 - idx }}
                    />
                  ))}
                  <span className="lineup-count-label">
                    {event.lineup?.length || 3}+ Artists
                  </span>
                </div>

                <button 
                  className="explore-book-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent(event.id);
                  }}
                >
                  <span>Book Pass</span>
                  <AppIcon name="arrow-up-right" size={13} color="#080808" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Bottom Nav */}
      <div className="mobile-bottom-nav-wrapper">
        <FloatingBottomNav 
          activeTab="calendar" 
          onTabChange={onTabChange} 
        />
      </div>
    </motion.div>
  );
}
