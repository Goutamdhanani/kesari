import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import { FloatingBottomNav } from '../common/ControlWidgets';
import SearchSkeletonScreen from './SearchSkeletonScreen';
import './SearchScreen.css';

const TRENDING_SEARCHES = [
  'Rock Legends',
  'Miles Quartet',
  'Riverfront Park',
  'Jazz & Blues',
  'Hip Hop Showcase',
  'San Francisco'
];

const SEARCH_GENRES = ['All', 'Rock', 'Jazz', 'Hip-Hop', 'Electronic', 'Festivals'];

export default function SearchScreen({
  events = [],
  onSelectEvent = () => {},
  onBack = () => {},
  onTabChange = () => {},
  initialQuery = ''
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const q = query.toLowerCase().trim();
      const matchesQuery = !q || 
        event.title?.toLowerCase().includes(q) ||
        event.category?.toLowerCase().includes(q) ||
        event.venue?.toLowerCase().includes(q) ||
        event.venueShort?.toLowerCase().includes(q) ||
        event.description?.toLowerCase().includes(q) ||
        event.lineup?.some(a => a.name?.toLowerCase().includes(q));

      const matchesGenre = selectedGenre === 'All' || 
        event.category?.toLowerCase().includes(selectedGenre.toLowerCase()) ||
        event.genre?.toLowerCase().includes(selectedGenre.toLowerCase());

      return matchesQuery && matchesGenre;
    });
  }, [events, query, selectedGenre]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <SearchSkeletonScreen key="search-skel" />
      ) : (
        <motion.div 
          key="search-content"
          className="mobile-search-screen"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
      {/* Search Header Bar */}
      <header className="search-screen-header">
        <div className="search-input-wrapper">
          <AppIcon name="search" size={17} color="#0042D9" strokeWidth={2.5} />
          <input 
            ref={inputRef}
            type="text"
            className="search-text-input"
            placeholder="Search concerts, artists, venues..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              className="search-clear-btn" 
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <AppIcon name="x" size={14} color="#6B7280" />
            </button>
          )}
        </div>
        <button className="search-cancel-btn" onClick={onBack}>
          Cancel
        </button>
      </header>

      {/* Genre Filter Pills */}
      <div className="search-genre-pills-row" role="tablist">
        {SEARCH_GENRES.map(g => (
          <button 
            key={g}
            className={`search-genre-pill ${selectedGenre === g ? 'active' : ''}`}
            onClick={() => setSelectedGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="search-screen-body">
        {/* Trending Searches (when query is empty) */}
        {!query && (
          <div className="trending-searches-box">
            <span className="trending-title">🔥 Trending in San Francisco</span>
            <div className="trending-chips-wrap">
              {TRENDING_SEARCHES.map(item => (
                <button 
                  key={item} 
                  className="trending-chip"
                  onClick={() => setQuery(item)}
                >
                  <AppIcon name="search" size={12} color="#0042D9" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="search-results-meta">
          <span className="results-count">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </span>
          {query && <span className="results-for-query">for "{query}"</span>}
        </div>

        {/* Results List */}
        <div className="search-results-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, idx) => (
              <motion.div 
                key={event.id}
                className="search-result-card"
                onClick={() => onSelectEvent(event.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: idx * 0.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="result-thumb"
                  onError={(e) => { e.target.style.background = '#EBF1FF'; }}
                />
                <div className="result-details">
                  <div className="result-category-badge">{event.category}</div>
                  <h4 className="result-title">{event.title}</h4>
                  <div className="result-meta-row">
                    <span>📅 {event.date}</span>
                    <span className="meta-sep">•</span>
                    <span>📍 {event.venueShort || 'San Francisco'}</span>
                  </div>
                </div>
                <div className="result-action-side">
                  <span className="result-price">${event.price?.toFixed(2)}</span>
                  <div className="result-arrow-circle">
                    <AppIcon name="arrow-up-right" size={14} color="#080808" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="search-empty-state">
              <span className="empty-emoji">🔍</span>
              <h4 className="empty-title">No concerts found</h4>
              <p className="empty-sub">Try searching for "Rock", "Jazz", or "Festival"</p>
              <button className="empty-reset-pill" onClick={() => { setQuery(''); setSelectedGenre('All'); }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <div className="mobile-bottom-nav-wrapper">
        <FloatingBottomNav 
          activeTab="search" 
          onTabChange={onTabChange} 
        />
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
