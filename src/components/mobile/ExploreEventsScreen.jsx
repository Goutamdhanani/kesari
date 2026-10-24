import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import { KESARI_CONTACT } from '../../data/kesariStudioData';
import './ExploreEventsScreen.css';

// Bespoke SVG micro-icons for vibes
const VIBE_ICONS = {
  all: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" fillOpacity="0.18" />
    </svg>
  ),
  rock: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" fillOpacity="0.22" />
    </svg>
  ),
  jazz: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v10a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V7" />
      <circle cx="18" cy="5" r="2.5" fill="currentColor" fillOpacity="0.22" />
      <circle cx="8" cy="18" r="2.5" fill="currentColor" fillOpacity="0.22" />
      <path d="M10 10h4" />
      <path d="M10 7h4" />
    </svg>
  ),
  hiphop: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  electronic: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" fillOpacity="0.15" />
      <circle cx="8.5" cy="8.5" r="2.5" />
      <circle cx="15.5" cy="15.5" r="2.5" />
      <path d="M8.5 15.5h.01M15.5 8.5h.01" strokeWidth="3" />
    </svg>
  ),
  acoustic: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22c1.25-6.5 6-12 13-14 3.5 4 4.5 9 1 14-4 2-9 1-14 0Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M9 15c2.5-3 5-4.5 8-5.5" />
    </svg>
  )
};

const TIMELINES = [
  { id: 'all', label: 'All Shows', badge: '5' },
  { id: 'tonight', label: 'Tonight', sub: 'Oct 24', isLive: true },
  { id: 'weekend', label: 'This Weekend', sub: 'Oct 25-26' },
  { id: 'nextweek', label: 'Next Week', sub: 'Oct 30' },
  { id: 'nov', label: 'Nov 2026', sub: 'Cyphers' },
  { id: 'dec', label: 'NYE 2026', sub: 'Modular' }
];

const VIBES = [
  { id: 'all', label: 'All Vibes', icon: 'all' },
  { id: 'rock', label: 'Rock & Electric', icon: 'rock' },
  { id: 'acoustic', label: 'Acoustic Jam', icon: 'acoustic' },
  { id: 'jazz', label: 'Jazz & Blues', icon: 'jazz' },
  { id: 'hiphop', label: 'Hip-Hop & Cypher', icon: 'hiphop' },
  { id: 'electronic', label: 'Modular Synth', icon: 'electronic' }
];

const ROOM_FILTERS = [
  { id: 'all', label: 'All Spaces' },
  { id: 'main-stage', label: 'Main Stage (40-60 Pax)' },
  { id: 'lounge', label: 'Acoustic Lounge (8-15 Pax)' }
];

export default function ExploreEventsScreen({
  events = [],
  selectedCity = 'Bangalore',
  onSelectEvent = () => {},
  onBack = () => {},
  onOpenCitySelector = () => {}
}) {
  const [selectedTimeline, setSelectedTimeline] = useState('all');
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('tickets'); // 'tickets' | 'timeline'
  const [toastMessage, setToastMessage] = useState(null);

  // Filter events based on active filters
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      // Timeline filter
      if (selectedTimeline !== 'all') {
        if (e.dateFilter !== selectedTimeline) return false;
      }

      // Vibe filter
      if (selectedVibe !== 'all') {
        const matchesGenre = e.genre?.toLowerCase() === selectedVibe.toLowerCase();
        const matchesCategory = e.category?.toLowerCase().includes(selectedVibe.toLowerCase());
        if (!matchesGenre && !matchesCategory) return false;
      }

      // Room filter
      if (selectedRoom !== 'all') {
        if (e.roomType !== selectedRoom) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = e.title?.toLowerCase().includes(query);
        const matchGenre = e.genre?.toLowerCase().includes(query);
        const matchCategory = e.category?.toLowerCase().includes(query);
        const matchLineup = e.lineup?.some(artist => artist.name.toLowerCase().includes(query));
        if (!matchTitle && !matchGenre && !matchCategory && !matchLineup) return false;
      }

      return true;
    });
  }, [events, selectedTimeline, selectedVibe, selectedRoom, searchQuery]);

  // Featured headliner show for cinema card
  const headlinerEvent = useMemo(() => {
    if (selectedTimeline === 'all' && selectedVibe === 'all' && !searchQuery.trim()) {
      return events.find(e => e.featured) || events[0];
    }
    return null;
  }, [events, selectedTimeline, selectedVibe, searchQuery]);

  const handleShare = (event, e) => {
    e.stopPropagation();
    const shareText = `Check out "${event.title}" live at Kesari - The Memory Studio Bangalore! ${event.date} at ${event.time}.`;
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareText);
      showToast('Event link copied to clipboard!');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="mobile-explore-screen">
      {/* Toast alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            className="explore-toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AppIcon name="check" size={14} color="#DAFB71" strokeWidth={2.5} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Liquid Obsidian Header */}
      <header className="explore-header">
        <div className="explore-header-left">
          <button 
            className="explore-back-btn" 
            onClick={onBack} 
            aria-label="Back to home"
          >
            <AppIcon name="chevron-left" size={18} color="#FFFFFF" strokeWidth={2.5} />
          </button>
          
          <div className="explore-header-titles">
            <div className="explore-live-beacon">
              <span className="beacon-dot" />
              <span className="beacon-text">LIVE GIG RADAR • BANGALORE</span>
            </div>
            <h1 className="explore-title">
              Explore Gigs
              <span className="explore-count-tag">{filteredEvents.length}</span>
            </h1>
          </div>
        </div>

        <button 
          className="explore-city-chip" 
          onClick={onOpenCitySelector}
          title="Select Studio Location"
        >
          <AppIcon name="pin" size={12} color="#E25B16" strokeWidth={2.5} />
          <span className="city-chip-text">Kesari Studio</span>
          <AppIcon name="chevron-right" size={11} color="#94A3B8" />
        </button>
      </header>

      {/* Search Input Bar */}
      <div className="explore-search-container">
        <div className="explore-search-bar">
          <AppIcon name="search" size={15} color="#94A3B8" strokeWidth={2.2} />
          <input 
            type="text"
            className="explore-search-input"
            placeholder="Search artists, gigs, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="explore-search-clear" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <AppIcon name="close" size={12} color="#94A3B8" strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* View Mode Switcher */}
        <div className="explore-view-toggle">
          <button 
            className={`view-toggle-btn ${viewMode === 'tickets' ? 'active' : ''}`}
            onClick={() => setViewMode('tickets')}
            title="Ticket Stubs View"
            aria-label="Pass Stubs View"
          >
            <AppIcon name="ticket" size={14} color={viewMode === 'tickets' ? '#08090E' : '#94A3B8'} strokeWidth={2.2} />
          </button>
          <button 
            className={`view-toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
            onClick={() => setViewMode('timeline')}
            title="Schedule View"
            aria-label="Timeline View"
          >
            <AppIcon name="calendar" size={14} color={viewMode === 'timeline' ? '#08090E' : '#94A3B8'} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Date Rail (Interactive Calendar Timeline Strip) */}
      <div className="explore-date-rail" role="tablist" aria-label="Event Dates">
        {TIMELINES.map(tab => {
          const isActive = selectedTimeline === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className={`date-rail-item ${isActive ? 'active' : ''} ${tab.isLive ? 'has-live' : ''}`}
              onClick={() => setSelectedTimeline(tab.id)}
            >
              <div className="rail-item-top">
                {tab.isLive && <span className="live-pill-dot" />}
                <span className="rail-label">{tab.label}</span>
                {tab.badge && <span className="rail-badge">{tab.badge}</span>}
              </div>
              {tab.sub && <span className="rail-sub">{tab.sub}</span>}
              {isActive && (
                <motion.div 
                  layoutId="activeDateRailGlaze"
                  className="date-rail-glaze"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Vibe Category Pills */}
      <div className="explore-vibes-row">
        {VIBES.map(vibe => {
          const isActive = selectedVibe === vibe.id;
          return (
            <button
              key={vibe.id}
              className={`vibe-chip ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedVibe(vibe.id)}
            >
              <span className="vibe-icon-wrap">{VIBE_ICONS[vibe.icon]}</span>
              <span className="vibe-chip-label">{vibe.label}</span>
            </button>
          );
        })}
      </div>

      {/* Studio Room Switcher */}
      <div className="explore-room-filter-row">
        {ROOM_FILTERS.map(room => {
          const isActive = selectedRoom === room.id;
          return (
            <button
              key={room.id}
              className={`room-chip ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedRoom(room.id)}
            >
              {room.label}
            </button>
          );
        })}
      </div>

      {/* Stream Area */}
      <div className="explore-content-stream">
        {/* Cinema Headliner Spotlight (Rendered if headliner active) */}
        {headlinerEvent && (
          <motion.div 
            className="explore-cinema-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelectEvent(headlinerEvent.id)}
          >
            <div className="cinema-media-wrap">
              <img 
                src={headlinerEvent.image} 
                alt={headlinerEvent.title} 
                className="cinema-bg-img" 
              />
              <div className="cinema-overlay-gradient" />
              
              <div className="cinema-top-row">
                <div className="cinema-headliner-badge">
                  <span className="beacon-dot red" />
                  <span>HEADLINER SPOTLIGHT</span>
                </div>
                <div className="cinema-eq-badge">
                  <div className="eq-waveform">
                    <span className="eq-bar bar-1" />
                    <span className="eq-bar bar-2" />
                    <span className="eq-bar bar-3" />
                    <span className="eq-bar bar-4" />
                  </div>
                  <span className="eq-label">{headlinerEvent.decibels || '98 dB Peak'}</span>
                </div>
              </div>

              <div className="cinema-content-bottom">
                <div className="cinema-meta-tag">{headlinerEvent.date} • {headlinerEvent.room}</div>
                <h2 className="cinema-title">{headlinerEvent.title}</h2>
                <p className="cinema-desc">{headlinerEvent.description}</p>
                
                <div className="cinema-actions-row">
                  <div className="cinema-price-block">
                    <span className="price-sub">From</span>
                    <span className="price-num">{headlinerEvent.priceLabel}</span>
                  </div>

                  <div className="cinema-btn-group">
                    <a
                      href={KESARI_CONTACT.whatsappUrl(`Hi Kesari Studio, inquiring about VIP tables for ${headlinerEvent.title} (${headlinerEvent.date})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cinema-wa-btn"
                      onClick={(e) => e.stopPropagation()}
                      title="WhatsApp Studio Host"
                    >
                      <span>Inquire</span>
                    </a>
                    <button 
                      className="cinema-book-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(headlinerEvent.id);
                      }}
                    >
                      <span>Book Pass</span>
                      <AppIcon name="arrow-up-right" size={13} color="#080808" strokeWidth={2.6} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section Heading */}
        <div className="explore-section-header">
          <div className="section-title-wrap">
            <span className="section-tag-dot" />
            <span className="section-title-text">
              {selectedTimeline === 'all' ? 'All Live Shows' : `${TIMELINES.find(t => t.id === selectedTimeline)?.label} Lineup`}
            </span>
          </div>
          <span className="section-count-hint">{filteredEvents.length} shows scheduled</span>
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="explore-empty-state">
            <div className="empty-icon-capsule">
              <AppIcon name="music" size={28} color="#DAFB71" strokeWidth={1.8} />
            </div>
            <h3 className="empty-title">No gigs matching your filter</h3>
            <p className="empty-desc">
              We update the Kesari Studio acoustic calendar every Monday. Try viewing all dates or resetting your vibes.
            </p>
            <button 
              className="empty-reset-btn"
              onClick={() => {
                setSelectedTimeline('all');
                setSelectedVibe('all');
                setSelectedRoom('all');
                setSearchQuery('');
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* VIEW MODE 1: Architectural Perforated Ticket Cards */}
        {viewMode === 'tickets' && (
          <div className="explore-tickets-list">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                className="perforated-ticket-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: idx * 0.04 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => onSelectEvent(event.id)}
              >
                {/* Visual Perforation Notches */}
                <div className="ticket-notch notch-left" />
                <div className="ticket-notch notch-right" />
                <div className="ticket-perforation-dash" />

                {/* Card Header Strip */}
                <div className="ticket-header-strip">
                  <div className="ticket-date-pill">
                    <AppIcon name="clock" size={11} color="#E25B16" strokeWidth={2.4} />
                    <span>{event.date}</span>
                  </div>

                  <div className="ticket-genre-badge">
                    <span>{event.category}</span>
                  </div>
                </div>

                {/* Visual Media Poster */}
                <div className="ticket-media-box">
                  <img src={event.image} alt={event.title} className="ticket-poster-img" />
                  <div className="ticket-media-gradient" />
                  
                  <div className="ticket-sound-tag">
                    <span className="sound-pulse" />
                    <span>{event.decibels || 'Live Acoustics'}</span>
                  </div>

                  <button 
                    className="ticket-share-btn"
                    onClick={(e) => handleShare(event, e)}
                    title="Share Event Pass"
                    aria-label="Share Event"
                  >
                    <AppIcon name="share" size={13} color="#FFFFFF" strokeWidth={2.2} />
                  </button>

                  <div className="ticket-floating-price">
                    <span className="tf-label">PASS</span>
                    <span className="tf-amt">{event.priceLabel}</span>
                  </div>
                </div>

                {/* Ticket Details Body */}
                <div className="ticket-body">
                  <div className="ticket-room-row">
                    <span className="ticket-room-label">
                      <AppIcon name="location" size={11} color="#94A3B8" strokeWidth={2} />
                      {event.room || 'Kesari Studio Main Stage'}
                    </span>
                    <span className="ticket-code-tag">{event.ticketCode || 'KSR-LIVE'}</span>
                  </div>

                  <h3 className="ticket-event-title">{event.title}</h3>
                  <p className="ticket-event-time">🕒 {event.time}</p>
                  <p className="ticket-event-snippet">{event.description}</p>

                  {/* Lineup Stack */}
                  {event.lineup && event.lineup.length > 0 && (
                    <div className="ticket-lineup-row">
                      <div className="lineup-avatar-stack">
                        {event.lineup.slice(0, 3).map((artist, aIdx) => (
                          <img 
                            key={aIdx} 
                            src={artist.img} 
                            alt={artist.name} 
                            className="lineup-circle-avatar"
                            style={{ zIndex: 3 - aIdx, marginLeft: aIdx > 0 ? -9 : 0 }}
                          />
                        ))}
                      </div>
                      <span className="lineup-artist-summary">
                        <strong>{event.lineup[0].name}</strong>
                        {event.lineup.length > 1 && ` + ${event.lineup.length - 1} more`}
                      </span>
                    </div>
                  )}

                  {/* Live Capacity Meter */}
                  {event.capacity && (
                    <div className="ticket-capacity-box">
                      <div className="capacity-text-row">
                        <span className="cap-booked-info">🔥 {event.capacity.percentage}% Passes Reserved</span>
                        <span className="cap-remaining-tag">{event.capacity.remaining} passes left</span>
                      </div>
                      <div className="capacity-bar-track">
                        <div 
                          className="capacity-bar-fill" 
                          style={{ width: `${event.capacity.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Ticket Card Footer Actions */}
                  <div className="ticket-footer-actions">
                    <a
                      href={KESARI_CONTACT.whatsappUrl(`Hi Kesari Studio, I want to inquire about passes for ${event.title} (${event.date}). Are passes available?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ticket-wa-action"
                      onClick={(e) => e.stopPropagation()}
                      title="WhatsApp Inquiry"
                    >
                      <AppIcon name="send" size={12} color="#DAFB71" strokeWidth={2.4} />
                      <span>WhatsApp</span>
                    </a>

                    <button 
                      className="ticket-primary-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(event.id);
                      }}
                    >
                      <span>Claim Pass</span>
                      <AppIcon name="arrow-up-right" size={13} color="#08090E" strokeWidth={2.6} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* VIEW MODE 2: Editorial Timeline Schedule */}
        {viewMode === 'timeline' && (
          <div className="explore-editorial-timeline">
            {filteredEvents.map((event, idx) => (
              <motion.div 
                key={event.id}
                className="timeline-item-row"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                onClick={() => onSelectEvent(event.id)}
              >
                <div className="timeline-spine">
                  <div className="spine-dot" />
                  <div className="spine-line" />
                </div>

                <div className="timeline-schedule-card">
                  <div className="tsc-header">
                    <span className="tsc-time">{event.date.split('•')[0] || event.date}</span>
                    <span className="tsc-badge">{event.category}</span>
                  </div>
                  
                  <h4 className="tsc-title">{event.title}</h4>
                  <div className="tsc-meta">
                    <span>🕒 {event.time}</span>
                    <span>📍 {event.room || 'Kesari Studio'}</span>
                  </div>

                  <div className="tsc-footer">
                    <span className="tsc-price">{event.priceLabel}</span>
                    <button 
                      className="tsc-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(event.id);
                      }}
                    >
                      Passes →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Studio Concierge / Host Your Own Gig Card */}
        <div className="explore-concierge-card">
          <div className="concierge-content">
            <div className="concierge-badge">
              <AppIcon name="mic" size={12} color="#DAFB71" strokeWidth={2.4} />
              <span>STUDIO BOOKING & SHOWCASES</span>
            </div>
            <h3 className="concierge-heading">Want to Host Your Own Gig or Private Album Launch?</h3>
            <p className="concierge-desc">
              Book Kesari Studio's soundproof live room with 40-60 audience capacity, sound engineer, Yamaha PA, and multi-cam recording.
            </p>

            <div className="concierge-actions">
              <a 
                href={KESARI_CONTACT.whatsappUrl("Hi Kesari Studio, I want to organize a live gig/showcase at the studio. Could you share venue availability and package details?")}
                target="_blank" 
                rel="noopener noreferrer"
                className="concierge-wa-link"
              >
                <AppIcon name="send" size={13} color="#08090E" strokeWidth={2.5} />
                <span>Chat with Studio Host on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Safety Spacer for Floating Bottom Nav */}
        <div className="explore-bottom-spacer" />
      </div>
    </div>
  );
}
