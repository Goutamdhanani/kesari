import React from 'react';
import { motion } from 'motion/react';
import './ProfileSkeletonScreen.css';

export default function ProfileSkeletonScreen() {
  return (
    <motion.div 
      className="profile-skeleton-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      {/* Top Bar Skeleton */}
      <div className="skel-profile-top-bar">
        <div className="skel-circle skel-prof-nav-btn" />
        <div className="skel-bar skel-prof-title" />
        <div className="skel-circle skel-prof-nav-btn" />
      </div>

      {/* User Hero Identity Card Skeleton */}
      <div className="skel-profile-identity-card">
        <div className="skel-circle skel-avatar-ring-box" />
        <div className="skel-bar skel-user-name" />
        <div className="skel-bar skel-user-handle" />
        <div className="skel-pill skel-user-badge" />

        {/* 3-Column Stats Row */}
        <div className="skel-stats-row">
          <div className="skel-stat-box">
            <div className="skel-bar skel-stat-num" />
            <div className="skel-bar skel-stat-lbl" />
          </div>
          <div className="skel-stat-box">
            <div className="skel-bar skel-stat-num" />
            <div className="skel-bar skel-stat-lbl" />
          </div>
          <div className="skel-stat-box">
            <div className="skel-bar skel-stat-num" />
            <div className="skel-bar skel-stat-lbl" />
          </div>
        </div>
      </div>

      {/* Tabs Selector Skeleton */}
      <div className="skel-profile-tabs-row">
        <div className="skel-pill skel-tab-active" />
        <div className="skel-pill skel-tab-item" />
        <div className="skel-pill skel-tab-item" />
      </div>

      {/* Passes List Skeleton */}
      <div className="skel-profile-list">
        <div className="skel-profile-pass-card">
          <div className="skel-pass-thumb" />
          <div className="skel-pass-info">
            <div className="skel-bar skel-pass-name" />
            <div className="skel-bar skel-pass-date" />
          </div>
          <div className="skel-circle skel-pass-qr-btn" />
        </div>
      </div>
    </motion.div>
  );
}
