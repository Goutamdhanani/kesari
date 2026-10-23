import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './ToastSystem.css';

export default function ToastSystem({ toasts = [], onDismiss = () => {} }) {
  return (
    <div className="toast-portal-container">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            className={`toast-pill-item ${toast.type || 'info'}`}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
            onClick={() => onDismiss(toast.id)}
          >
            <span className="toast-icon">{toast.icon || '⚡'}</span>
            <span className="toast-message">{toast.message}</span>
            <button className="toast-dismiss-btn" aria-label="Dismiss toast">✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
