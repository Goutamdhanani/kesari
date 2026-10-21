import React from 'react';
import { motion } from 'motion/react';
import AppIcon from '../common/AppIcon';
import TicketCard from '../ticket/TicketCard';
import './TicketScreen.css';

export default function TicketScreen({
  onBack = () => {},
  onOpenQR = () => {}
}) {
  return (
    <motion.div 
      className="mobile-ticket-screen"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top Header */}
      <header className="ticket-screen-header">
        <motion.button 
          className="ticket-nav-btn" 
          onClick={onBack} 
          aria-label="Back"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AppIcon name="chevron-left" size={20} color="#080808" strokeWidth={2.5} />
        </motion.button>
        <h2 className="ticket-header-title">Screen Ticket</h2>
        <motion.button 
          className="ticket-nav-btn" 
          aria-label="Share"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AppIcon name="share" size={18} color="#080808" strokeWidth={2} />
        </motion.button>
      </header>

      {/* Main Ticket Card Presentation */}
      <div className="ticket-card-presentation">
        <TicketCard 
          title="Jazz & Blues Festival"
          date="Sep 5, 2024"
          time="15:00 PM"
          location="Riverfront Park"
          seat="No seat"
          hash="0x487Fh3kmjn3...35620"
          image="/assets/jazz_blues_pills.png"
          parentBg="pale"
        />
      </div>

      {/* Actions */}
      <div className="ticket-screen-actions">
        <motion.button 
          className="ticket-primary-qr-btn" 
          onClick={onOpenQR}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <AppIcon name="qr" size={20} color="#080808" strokeWidth={2.5} />
          <span>Show QR Pass at Gate</span>
        </motion.button>

        <motion.button 
          className="ticket-wallet-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span> Add to Apple Wallet</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
