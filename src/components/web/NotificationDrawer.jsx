import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import './NotificationDrawer.css';

export default function NotificationDrawer({
  isOpen = false,
  onClose = () => {},
  notifications = [],
  onClearAll = () => {}
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="notifications-backdrop" onClick={onClose}>
        <motion.aside 
          className="notifications-panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="notifications-header">
            <div className="notif-title-row">
              <span className="notif-icon-bubble">
                <AppIcon name="bell" size={15} color="var(--color-brand-saffron)" />
              </span>
              <h3 className="notif-heading">Activity & Alerts</h3>
            </div>
            <div className="notif-header-actions">
              <button className="notif-clear-btn" onClick={onClearAll}>Clear</button>
              <button className="notif-close-btn" onClick={onClose} aria-label="Close notifications">✕</button>
            </div>
          </div>

          {/* List */}
          <div className="notifications-scroll-list">
            {notifications.length > 0 ? (
              notifications.map(n => (
                <div key={n.id} className="notification-item-card">
                  <span className="notif-item-icon">
                    <AppIcon name="sparkles" size={15} color="var(--color-brand-saffron)" />
                  </span>
                  <div className="notif-item-body">
                    <h5 className="notif-item-title">{n.title}</h5>
                    <p className="notif-item-message">{n.message}</p>
                    <span className="notif-item-time">{n.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="notifications-empty">
                <AppIcon name="bell" size={32} color="var(--color-muted-gray)" />
                <p>No new notifications right now</p>
              </div>
            )}
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
