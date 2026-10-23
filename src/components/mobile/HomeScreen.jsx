import React, { useState } from 'react';
import { motion } from 'motion/react';
import AppIcon from '../common/AppIcon';
import { UpcomingEventCard, FeaturedHeroCard } from '../cards/EventCards';
import { FloatingBottomNav } from '../common/ControlWidgets';
import './HomeScreen.css';

export default function HomeScreen({ 
  onSelectEvent = () => {}, 
  onOpenTicket = () => {},
  onNavigate = () => {},
  onOpenNotifications = () => {} 
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCity, setSelectedCity] = useState('Bengaluru, Koramangala');

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
      transition={{ duration: 0.2 }}
    >
      <div className="mobile-home-scroll-container">
        {/* Top Header / Profile Bar */}
      <header className="mobile-home-header">
        <div className="header-user-badge">
          <button className="user-avatar-circle" title="My profile" aria-label="My profile" onClick={() => onNavigate('profile')}>
            <img 
              src="/assets/gregory_face.png" 
              alt="Profile" 
            />
          </button>
          <div className="header-location-pill">
            <AppIcon name="pin" size={13} color="#080808" strokeWidth={2.5} />
            <span className="location-name">{selectedCity}</span>
          </div>
        </div>

        <motion.button 
          className="header-bell-button" 
          onClick={onOpenNotifications}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Notifications"
        >
          <AppIcon name="bell" size={18} color="#080808" strokeWidth={2} />
          <span className="bell-badge-dot"></span>
        </motion.button>
      </header>

      {/* Greeting Section */}
      <section className="mobile-greeting-section">
        <h1 className="greeting-headline">Welcome to KESARI</h1>
        <p className="greeting-subtext">Live Sessions in Koramangala</p>
      </section>

      {/* Featured Upcoming Event Card */}
      <section className="mobile-upcoming-section">
        <UpcomingEventCard 
          tag="Your upcoming event : Sep 5"
          title="Jazz & Blues Festival"
          image="/assets/upcoming_pill_thumb.png"
          onClick={() => onSelectEvent('jazz')}
        />
      </section>

      {/* "Popular Now" Carousel Section */}
      <section className="mobile-popular-section">
        <div className="popular-section-header">
          <h2 className="popular-title">Popular Now</h2>
          <button className="popular-see-all-btn" onClick={() => onSelectEvent('rock')}>
            See all
          </button>
        </div>

        {/* Horizontal Carousel with Smooth Scroll & Snapping */}
        <div className="popular-cards-scroll">
          {popularEvents.map((event) => (
            <div key={event.id} className="popular-card-item">
              <FeaturedHeroCard 
                category={event.category}
                title={event.title}
                date={event.date}
                price={event.price}
                image={event.image}
                onSelect={() => onSelectEvent(event.id)}
              />
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="mobile-bottom-nav-wrapper">
        <FloatingBottomNav 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'ticket') {
              onOpenTicket();
            }
          }} 
        />
      </div>
    </motion.div>
  );
}

