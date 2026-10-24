import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './CitySelectorSheet.css';

const AVAILABLE_STUDIO_ZONES = [
  { name: 'Kesari - The Memory Studio', state: 'Bangalore', icon: '📍', activeShows: 'Studio HQ' },
  { name: 'Main Studio Hall', state: 'Capacity 40-60 • Stage & PA', icon: '🎸', activeShows: 'Live Gigs' },
  { name: 'Acoustic Jam Lounge', state: 'Capacity 8-15 • Soundproof', icon: '🎷', activeShows: 'Jams & Pods' },
  { name: 'Audio Gear Rental Hub', state: 'Pick up & Drop at Studio', icon: '🔊', activeShows: '13 Items' }
];

export default function CitySelectorSheet({
  isOpen,
  onClose = () => {},
  selectedCity = 'Bangalore',
  onSelectCity = () => {}
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="city-sheet-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="city-sheet-drawer"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 250, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        >
          <div className="sheet-handle" />

          <div className="city-sheet-header">
            <div>
              <h3 className="city-sheet-title">Kesari - The Memory Studio</h3>
              <p className="city-sheet-subtitle">Single Studio Location • Bangalore</p>
            </div>
            <button className="city-close-btn" onClick={onClose} aria-label="Close">
              <AppIcon name="x" size={16} color="#64748B" />
            </button>
          </div>

          <div className="city-items-list">
            {AVAILABLE_STUDIO_ZONES.map((zone) => {
              const isSelected = selectedCity.toLowerCase().includes(zone.name.toLowerCase().split(' ')[0]);
              return (
                <div 
                  key={zone.name}
                  className={`city-item-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onSelectCity(zone.name);
                    onClose();
                  }}
                >
                  <div className="city-icon-box">{zone.icon}</div>
                  <div className="city-text-col">
                    <h4 className="city-name-label">{zone.name}</h4>
                    <span className="city-state-label">{zone.state}</span>
                  </div>
                  <span className="city-shows-chip">{zone.activeShows}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
