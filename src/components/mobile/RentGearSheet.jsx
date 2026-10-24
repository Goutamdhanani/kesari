import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import { RENTAL_EQUIPMENT, KESARI_CONTACT } from '../../data/kesariStudioData';
import './RentGearSheet.css';

export default function RentGearSheet({ isOpen, onClose = () => {} }) {
  const [selectedGear, setSelectedGear] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'speakers', label: 'Speakers & PA' },
    { id: 'mixers', label: 'Mixers' },
    { id: 'mics', label: 'Microphones' },
    { id: 'stands', label: 'Stands' },
    { id: 'cables', label: 'Cables & Audio' },
    { id: 'service', label: 'Sound Engineer' }
  ];

  const handleUpdateQty = (itemId, delta, maxAvailable = 99) => {
    setSelectedGear(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, Math.min(maxAvailable, current + delta));
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const totalItemCount = Object.values(selectedGear).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(selectedGear).reduce((sum, [id, qty]) => {
    const item = RENTAL_EQUIPMENT.find(g => g.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const filteredGear = activeCategory === 'all' 
    ? RENTAL_EQUIPMENT 
    : RENTAL_EQUIPMENT.filter(g => g.category === activeCategory);

  const handleBookOnWhatsApp = () => {
    if (totalItemCount === 0) {
      const msg = `Hi Kesari - The Memory Studio Koramangala! I want to inquire about renting sound equipment & audio gear.`;
      window.open(KESARI_CONTACT.whatsappUrl(msg), '_blank');
      return;
    }

    const itemsSummary = Object.entries(selectedGear)
      .map(([id, qty]) => {
        const item = RENTAL_EQUIPMENT.find(g => g.id === id);
        return `• ${item?.name} x ${qty} (₹${(item ? item.price * qty : 0).toLocaleString()})`;
      })
      .join('\n');

    const msg = `Hi Kesari - The Memory Studio Koramangala!\nI want to rent the following sound equipment:\n\n${itemsSummary}\n\n*Estimated Total: ₹${totalPrice.toLocaleString()}*\n\nPlease let me know the availability and pickup details for Koramangala!`;
    window.open(KESARI_CONTACT.whatsappUrl(msg), '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="gear-sheet-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="gear-sheet-drawer"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        >
          {/* Top Handle */}
          <div className="sheet-drag-handle" />

          {/* Header */}
          <div className="gear-sheet-header">
            <div>
              <div className="gear-brand-tag">KESARI • THE MEMORY STUDIO</div>
              <h3 className="gear-sheet-title">Event Sound System For Rent</h3>
              <p className="gear-sheet-subtitle">Pick up & drop at Kesari Koramangala • Call {KESARI_CONTACT.phone}</p>
            </div>
            <button className="gear-close-btn" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="gear-cat-pills-row">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`gear-cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gear Cards Grid */}
          <div className="gear-items-scroll-list">
            {filteredGear.map(item => {
              const qty = selectedGear[item.id] || 0;
              return (
                <div key={item.id} className={`gear-item-card ${qty > 0 ? 'selected' : ''}`}>
                  <div className="gear-info-side">
                    <div className="gear-badge-row">
                      <span className="gear-badge-pill">{item.badge}</span>
                      <span className="gear-price-rate">₹{item.price.toLocaleString()} <small>/ {item.priceUnit}</small></span>
                    </div>
                    <h4 className="gear-item-name">{item.name}</h4>
                    <p className="gear-item-desc">{item.desc}</p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="gear-stepper-wrap">
                    {qty === 0 ? (
                      <motion.button 
                        className="gear-add-btn"
                        onClick={() => handleUpdateQty(item.id, 1, item.available)}
                        whileTap={{ scale: 0.94 }}
                      >
                        + Rent
                      </motion.button>
                    ) : (
                      <div className="gear-active-stepper">
                        <button 
                          className="stepper-sub-btn" 
                          onClick={() => handleUpdateQty(item.id, -1, item.available)}
                        >
                          -
                        </button>
                        <span className="stepper-val-num">{qty}</span>
                        <button 
                          className="stepper-add-btn" 
                          onClick={() => handleUpdateQty(item.id, 1, item.available)}
                          disabled={qty >= item.available}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Bottom Booking Bar with direct WhatsApp */}
          <div className="gear-sticky-bottom-bar">
            <div className="gear-summary-col">
              <span className="gear-summary-count">
                {totalItemCount > 0 ? `${totalItemCount} gear items selected` : 'Select equipment to rent'}
              </span>
              <span className="gear-summary-total">
                ₹{totalPrice.toLocaleString()} <small>+ refundable security</small>
              </span>
            </div>

            <motion.button 
              className="gear-whatsapp-cta-btn"
              onClick={handleBookOnWhatsApp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="whatsapp-icon-dot">💬</span>
              <span>{totalItemCount > 0 ? `Book on WhatsApp (${totalItemCount})` : 'Inquire on WhatsApp'}</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
