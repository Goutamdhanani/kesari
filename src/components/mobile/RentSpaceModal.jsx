import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SPACE_RENTALS, KESARI_CONTACT } from '../../data/kesariStudioData';
import './RentSpaceModal.css';

export default function RentSpaceModal({ isOpen, onClose = () => {} }) {
  const [selectedSpaceId, setSelectedSpaceId] = useState('main-studio-hall');

  if (!isOpen) return null;

  const handleInquireOnWhatsApp = (space) => {
    const msg = 
      `Hi Kesari - The Memory Studio!\n` +
      `I want to rent out the *${space.title}* (${space.hourlyRate}).\n` +
      `Please let me know available slots and booking terms!`;
    window.open(KESARI_CONTACT.whatsappUrl(msg), '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="space-modal-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="space-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        >
          <div className="sheet-drag-handle" />

          {/* Header */}
          <div className="space-modal-header">
            <div>
              <span className="space-eyebrow">STUDIO SPACES • KESARI</span>
              <h3 className="space-title">Rent Out Space</h3>
              <p className="space-sub">Acoustically treated jam rooms & performance halls</p>
            </div>
            <button className="space-close-btn" onClick={onClose}>✕</button>
          </div>

          <div className="space-cards-scroll">
            {SPACE_RENTALS.map(space => {
              const isSelected = selectedSpaceId === space.id;
              return (
                <div 
                  key={space.id} 
                  className={`space-item-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedSpaceId(space.id)}
                >
                  <div 
                    className="space-card-img"
                    style={{ backgroundImage: `url(${space.image})` }}
                  >
                    <span className="space-rate-pill">{space.hourlyRate}</span>
                    <span className="space-cap-pill">{space.capacity}</span>
                  </div>

                  <div className="space-card-body">
                    <h4 className="space-name">{space.title}</h4>
                    <p className="space-ideal-for"><strong>Best for:</strong> {space.idealFor}</p>
                    <p className="space-amenities"><strong>Amenities:</strong> {space.amenities}</p>

                    <button 
                      className="space-book-wa-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInquireOnWhatsApp(space);
                      }}
                    >
                      <span>💬 Inquire on WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-modal-footer">
            <span className="space-footer-note">
              📍 Site visits & bookings at Kesari - The Memory Studio • Call {KESARI_CONTACT.phone}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
