import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import TicketCard from '../ticket/TicketCard';
import TicketSkeletonScreen from './TicketSkeletonScreen';
import './TicketScreen.css';

const DEFAULT_TICKET = {
  id: 'default-1',
  eventTitle: "Jazz & Blues Festival",
  date: "Sep 5, 2026",
  time: "15:00 PM",
  location: "Kesari Pavilion, Bangalore",
  seat: "No seat",
  hash: "0x487Fh3kmjn3...35620",
  image: "/assets/jazz_blues_pills.png",
  parentBg: "pale"
};

export default function TicketScreen({
  onBack = () => {},
  onOpenQR = () => {},
  tickets = [],
  onFindConcerts = () => {},
  onShowToast = () => {}
}) {
  const [isLoading, setIsLoading] = useState(true);
  const ticketList = tickets.length > 0 ? tickets : [DEFAULT_TICKET];
  const [ticketIndex, setTicketIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const currentTicket = ticketList[ticketIndex] || ticketList[0];

  const handleAppleWallet = () => {
    onShowToast?.(`Added "${currentTicket.eventTitle}" to Apple Wallet! 🍏`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Pass: ${currentTicket.eventTitle}`,
        text: `I'm going to ${currentTicket.eventTitle} on ${currentTicket.date}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast?.(`Ticket pass link copied! 🔗`);
    }
  };

  return (
    <div className="mobile-ticket-screen-root" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <TicketSkeletonScreen key="skeleton" />
        ) : (
          <motion.div 
            key="content"
            className="mobile-ticket-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Header */}
      <header className="ticket-screen-header">
        <motion.button 
          className="ticket-nav-btn" 
          onClick={onBack} 
          aria-label="Go back"
          whileTap={{ scale: 0.9 }}
        >
          <AppIcon name="chevron-left" size={19} color="#0C0D12" strokeWidth={2.5} />
        </motion.button>
        <h2 className="ticket-header-title">My Tickets</h2>
        <motion.button 
          className="ticket-nav-btn" 
          onClick={handleShare}
          aria-label="Share ticket"
          whileTap={{ scale: 0.9 }}
        >
          <AppIcon name="share" size={18} color="#0C0D12" strokeWidth={2} />
        </motion.button>
      </header>

      {/* Ticket Counter / Multiple Passes Switcher */}
      <div className="ticket-count-badge">
        <strong>{ticketIndex + 1}</strong> of <strong>{ticketList.length}</strong> active {ticketList.length === 1 ? 'pass' : 'passes'}
      </div>

      {ticketList.length > 1 && (
        <div className="ticket-switcher-pills">
          {ticketList.map((t, idx) => (
            <button
              key={t.id || idx}
              className={`ticket-dot-btn ${idx === ticketIndex ? 'active' : ''}`}
              onClick={() => setTicketIndex(idx)}
              aria-label={`Switch to ticket ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Ticket Card Presentation */}
      <div className="ticket-card-presentation">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTicket.id || ticketIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <TicketCard 
              title={currentTicket.eventTitle || currentTicket.title}
              date={currentTicket.date}
              time={currentTicket.time}
              location={currentTicket.location || currentTicket.venueShort}
              seat={currentTicket.seat || 'General Admission'}
              hash={currentTicket.hash || '0x487Fh3kmjn3...35620'}
              image={currentTicket.image || '/assets/jazz_blues_pills.png'}
              parentBg="pale"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="ticket-screen-actions">
        <motion.button 
          className="ticket-primary-qr-btn" 
          onClick={() => onOpenQR(currentTicket)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <AppIcon name="qr" size={20} color="#080808" strokeWidth={2.5} />
          <span>Show QR Pass at Gate</span>
        </motion.button>

        <motion.button 
          className="ticket-wallet-btn"
          onClick={handleAppleWallet}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>🍏</span>
          <span>Add to Apple Wallet</span>
        </motion.button>
      </div>

      <div className="ticket-screen-spacer" />
      <div style={{ height: 85, flexShrink: 0 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
