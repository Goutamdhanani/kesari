import React from 'react';
import { motion } from 'motion/react';
import { IconGridMatrix, UserProfileBar, CarouselAndQRControls, FloatingBottomNav } from '../common/ControlWidgets';
import TicketCard from '../ticket/TicketCard';
import { UpcomingEventCard, CompactEventCard, FeaturedHeroCard } from '../cards/EventCards';
import './SlideUIKit.css';

export default function SlideUIKit({ onSelectEvent = () => {}, onOpenQR = () => {} }) {
  return (
    <motion.section 
      className="behance-slide-uikit"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Slide Top Bar / Header */}
      <div className="uikit-header">
        <h1 className="uikit-title">UI Kit</h1>
        <p className="uikit-desc">
          A UI Kit is a comprehensive set of resource files that contains every visual component of a user interface.
        </p>
      </div>

      {/* Grid of Components in Dashed Outlined Boxes */}
      <div className="uikit-grid-layout">
        
        {/* Column 1: Left */}
        <div className="uikit-col uikit-col-left">
          {/* Dashed Box 1: 4x4 Icon Matrix */}
          <div className="uikit-dashed-box box-icons">
            <IconGridMatrix />
          </div>

          {/* Dashed Box 2: Mini Upcoming Event Cards */}
          <div className="uikit-dashed-box box-upcoming-cards">
            <UpcomingEventCard 
              tag="Your upcoming event : Sep 5"
              title="Jazz & Blues Festival"
              image="/assets/upcoming_pill_thumb.png"
              onClick={() => onSelectEvent('jazz')}
            />
            <CompactEventCard 
              title="Rock Legends Reunion"
              date="October 20"
              price="From $18.89"
              onClick={() => onSelectEvent('rock')}
            />
          </div>
        </div>

        {/* Column 2: Center */}
        <div className="uikit-col uikit-col-center">
          {/* Dashed Box 3: Main Punched Ticket */}
          <div className="uikit-dashed-box box-ticket">
            <TicketCard 
              title="Jazz & Blues Festival"
              date="Sep 5, 2024"
              time="15:00 PM"
              location="Riverfront Park"
              seat="No seat"
              hash="0x487Fh3kmjn3...35620"
              image="/assets/jazz_blues_pills.png"
              parentBg="blue"
              onClick={() => onSelectEvent('jazz')}
            />
          </div>

          {/* Dashed Box 4: User Profile Bar */}
          <div className="uikit-dashed-box box-profile-pill">
            <UserProfileBar 
              location="San Francisco" 
              theme="blue" 
              avatar="/assets/gregory_face.png"
              onNotificationClick={() => alert('Gregory has 1 new event ticket update')}
            />
          </div>
        </div>

        {/* Column 3: Right */}
        <div className="uikit-col uikit-col-right">
          {/* Dashed Box 5: Music Event Hero Card */}
          <div className="uikit-dashed-box box-hero-card">
            <FeaturedHeroCard 
              category="Music"
              title="Rock Legends Reunion"
              date="October 20"
              price="From $18.89"
              image="/assets/rock_concert_bg.png"
              onSelect={() => onSelectEvent('rock')}
            />
          </div>

          {/* Dashed Box 6: Carousel, QR Button & Floating Nav */}
          <div className="uikit-dashed-box box-controls-nav">
            <CarouselAndQRControls onShowQR={onOpenQR} />
            <div className="nav-container-center">
              <FloatingBottomNav activeTab="home" onTabChange={(tab) => console.log('Tab:', tab)} />
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
