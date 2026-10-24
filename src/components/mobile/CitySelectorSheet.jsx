import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './CitySelectorSheet.css';

const AVAILABLE_CITIES = [
  { name: 'Bangalore (Kesari Arena)', state: 'Karnataka, India', icon: '📍', activeShows: 18 },
  { name: 'Indiranagar, Bangalore', state: 'East Zone', icon: '⚡', activeShows: 6 },
  { name: 'Koramangala, Bangalore', state: 'South Zone', icon: '🎷', activeShows: 5 },
  { name: 'Whitefield, Bangalore', state: 'Tech Corridor', icon: '🎛️', activeShows: 4 },
  { name: 'MG Road, Bangalore', state: 'Central District', icon: '🌿', activeShows: 3 }
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
              <h3 className="city-sheet-title">Kesari Venue • Bangalore</h3>
              <p className="city-sheet-subtitle">Select Kesari stages & zones in Bangalore</p>
            </div>
            <button className="city-close-btn" onClick={onClose} aria-label="Close">
              <AppIcon name="x" size={16} color="#64748B" />
            </button>
          </div>

          <div className="city-items-list">
            {AVAILABLE_CITIES.map((city) => {
              const isSelected = selectedCity.toLowerCase().includes(city.name.toLowerCase().split(' ')[0]);
              return (
                <div 
                  key={city.name}
                  className={`city-item-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onSelectCity(city.name);
                    onClose();
                  }}
                >
                  <div className="city-icon-box">{city.icon}</div>
                  <div className="city-text-col">
                    <h4 className="city-name-label">{city.name}</h4>
                    <span className="city-state-label">{city.state}</span>
                  </div>
                  <span className="city-shows-chip">{city.activeShows} Live Sets</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
