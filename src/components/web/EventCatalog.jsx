import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './EventCatalog.css';

export default function EventCatalog({
  events = [],
  genres = [],
  selectedCity = 'Bengaluru, Koramangala',
  searchQuery = '',
  onSelectEvent = () => {},
  onBookNow = () => {},
  onToggleFavorite = () => {},
  favorites = []
}) {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  // Filter & sort logic
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        e.title.toLowerCase().includes(q) || 
        e.category.toLowerCase().includes(q) || 
        e.venue.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q);

      // Genre match
      const matchesGenre = selectedGenre === 'all' || e.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // default trending
    });
  }, [events, searchQuery, selectedGenre, sortBy]);

  return (
    <section className="web-catalog-section" id="events-catalog">
      <div className="catalog-container">
        
        {/* Section Header & Subtitle */}
        <div className="catalog-header-row">
          <div>
            <div className="section-eyebrow-pill">
              <AppIcon name="ticket" size={13} color="var(--color-brand-saffron)" />
              <span>Verified Live Access</span>
            </div>
            <h2 className="section-title">Explore Experiences</h2>
            <p className="section-subtitle">
              Instant digital screen passes with encrypted dynamic barcodes and zero gate wait times.
            </p>
          </div>

          {/* Quick Sort Dropdown */}
          <div className="catalog-sort-wrap">
            <span className="sort-label">Sort:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="catalog-sort-select"
            >
              <option value="trending">Trending First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Genre Category Pills (Zero Emojis) */}
        <div className="genre-filter-scroller">
          {genres.map(g => (
            <button
              key={g.id}
              className={`genre-pill-btn ${selectedGenre === g.id ? 'active' : ''}`}
              onClick={() => setSelectedGenre(g.id)}
            >
              <span className="genre-label">{g.label}</span>
            </button>
          ))}
        </div>

        {/* Results Counter Bar */}
        <div className="results-status-bar">
          <span className="results-count-text">
            Showing <strong className="count-number">{filteredEvents.length}</strong> events in <strong>{selectedCity}</strong>
          </span>
          {searchQuery && (
            <span className="search-filter-tag">
              Matching: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Event Cards Grid */}
        {filteredEvents.length > 0 ? (
          <div className="events-responsive-grid">
            {filteredEvents.map(event => {
              const isFav = favorites.includes(event.id);
              return (
                <motion.article 
                  key={event.id}
                  className="catalog-event-card"
                  onClick={() => onSelectEvent(event)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Card Media Header */}
                  <div className="card-media-wrap">
                    <img src={event.image} alt={event.title} className="card-media-img" />
                    <div className="card-media-dark-vignette"></div>

                    {/* Category Chip */}
                    <div className="card-top-category-pill">
                      <AppIcon name="music" size={11} color="var(--color-brand-saffron)" />
                      <span>{event.category}</span>
                    </div>

                    {/* Heart Button */}
                    <button 
                      className={`card-heart-btn ${isFav ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(event.id);
                      }}
                      title={isFav ? 'Remove from saved' : 'Save event'}
                      aria-label="Save event"
                    >
                      <AppIcon 
                        name="heart" 
                        size={16} 
                        color={isFav ? '#E05342' : '#FFFFFF'} 
                        fill={isFav ? '#E05342' : 'none'}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="card-body-content">
                    {/* Date & Venue Row */}
                    <div className="card-date-venue-row">
                      <span className="card-date-badge">
                        <AppIcon name="calendar" size={12} color="var(--color-muted-gray)" />
                        {event.date}
                      </span>
                      <span className="card-venue-text" title={event.venue}>
                        <AppIcon name="pin" size={12} color="var(--color-muted-gray)" />
                        <span>{event.venueShort || event.venue}</span>
                      </span>
                    </div>

                    {/* Event Title */}
                    <h3 className="card-event-title">{event.title}</h3>

                    {/* Short Description */}
                    <p className="card-brief-desc">{event.description}</p>

                    {/* Card Footer: Price & Book CTA */}
                    <div className="card-footer-row">
                      <div className="card-price-block">
                        <span className="price-prefix">From</span>
                        <span className="price-bold">${event.price.toFixed(2)}</span>
                      </div>

                      <div className="card-action-group">
                        <button 
                          className="card-book-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookNow(event);
                          }}
                        >
                          Book Now
                        </button>
                        <button 
                          className="card-lime-arrow-btn"
                          aria-label={`View details for ${event.title}`}
                        >
                          <AppIcon name="arrow-up-right" size={15} color="#FFFFFF" strokeWidth={2.2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <AppIcon name="search" size={28} color="var(--color-muted-gray)" />
            <h3 className="empty-title">No events found</h3>
            <p className="empty-desc">
              We couldn't find any events matching your search or filters in {selectedCity}.
            </p>
            <button 
              className="empty-reset-btn"
              onClick={() => {
                setSelectedGenre('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
