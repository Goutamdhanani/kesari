import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './CitySelectorSheet.css';

const AVAILABLE_CITIES = [
  { name: 'San Francisco', state: 'California, US', icon: '🌉', activeShows: 14 },
  { name: 'New York', state: 'New York, US', icon: '🗽', activeShows: 28 },
  { name: 'Los Angeles', state: 'California, US', icon: '🌴', activeShows: 19 },
  { name: 'London', state: 'England, UK', icon: '🇬🇧', activeShows: 22 },
  { name: 'Berlin', state: 'Germany, EU', icon: '🎧', activeShows: 16 },
  { name: 'Austin', state: 'Texas, US', icon: '🎸', activeShows: 11 },
  { name: 'Tokyo', state: 'Japan, Asia', icon: '🗼', activeShows: 15 }
];

export default function CitySelectorSheet({
  isOpen,
  onClose = () => {},
  selectedCity = 'San Francisco',
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
              <h3 className="city-sheet-title">Select Location</h3>
              <p className="city-sheet-subtitle">Find concerts and festivals near you</p>
            </div>
            <button className="city-close-btn" onClick={onClose} aria-label="Close">
              <AppIcon name="x" size={16} color="#64748B" />
            </button>
          </div>

          <div className="city-items-list">
            {AVAILABLE_CITIES.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
              return (
                <div 
                  key={city.name}
                  className={`city-item-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onSelectCity(city.name);
                    onClose();
                  }}
                >
                  <span className="city-icon">{city.icon}</span>
                  <div className="city-name-wrap">
                    <h4 className="city-title">{city.name}</h4>
                    <span className="city-state">{city.state}</span>
                  </div>
                  <div className="city-meta-right">
                    <span className="city-shows-badge">{city.activeShows} shows</span>
                    {isSelected && (
                      <div className="city-check-dot">
                        <AppIcon name="check" size={12} color="#080808" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
