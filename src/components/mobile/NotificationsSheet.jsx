import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './NotificationsSheet.css';

export default function NotificationsSheet({
  isOpen,
  onClose = () => {},
  notifications = [],
  onClearAll = () => {},
  onSelectNotification = () => {}
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="notif-sheet-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="notif-sheet-drawer"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 250, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        >
          <div className="sheet-handle" />

          <div className="notif-sheet-header">
            <div className="notif-header-left">
              <h3 className="notif-sheet-title">Notifications</h3>
              <span className="notif-count-pill">{notifications.length}</span>
            </div>
            <div className="notif-header-actions">
              {notifications.length > 0 && (
                <button className="notif-clear-btn" onClick={onClearAll}>
                  Clear all
                </button>
              )}
              <button className="notif-close-btn" onClick={onClose} aria-label="Close">
                <AppIcon name="x" size={16} color="#64748B" />
              </button>
            </div>
          </div>

          <div className="notif-items-list">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div 
                  key={item.id} 
                  className="notif-item-card"
                  onClick={() => {
                    onSelectNotification(item);
                    onClose();
                  }}
                >
                  <div className="notif-icon-circle">{item.icon}</div>
                  <div className="notif-item-body">
                    <div className="notif-item-title-row">
                      <h4 className="notif-item-title">{item.title}</h4>
                      <span className="notif-item-time">{item.time}</span>
                    </div>
                    <p className="notif-item-msg">{item.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="notif-empty-box">
                <span className="notif-empty-emoji">🔔</span>
                <h4 className="notif-empty-title">All caught up!</h4>
                <p className="notif-empty-desc">No new event updates or gate alerts at the moment.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
