import React from 'react';
import { motion } from 'motion/react';
import './SearchSkeletonScreen.css';

export default function SearchSkeletonScreen() {
  return (
    <motion.div 
      className="search-skeleton-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      {/* Search Header Bar Skeleton */}
      <div className="skel-search-header">
        <div className="skel-search-input-box">
          <div className="skel-circle skel-search-icon" />
          <div className="skel-bar skel-search-placeholder" />
        </div>
        <div className="skel-circle skel-cancel-circle" />
      </div>

      {/* Genres Filter Pills Skeleton */}
      <div className="skel-search-pills-row">
        <div className="skel-pill skel-genre-pill-active" />
        <div className="skel-pill skel-genre-pill" />
        <div className="skel-pill skel-genre-pill" />
        <div className="skel-pill skel-genre-pill" />
        <div className="skel-pill skel-genre-pill" />
      </div>

      {/* Trending Topics Skeleton */}
      <div className="skel-trending-section">
        <div className="skel-bar skel-section-label" />
        <div className="skel-trending-tags">
          <div className="skel-pill skel-trend-tag" />
          <div className="skel-pill skel-trend-tag" />
          <div className="skel-pill skel-trend-tag" />
          <div className="skel-pill skel-trend-tag" />
        </div>
      </div>

      {/* Search Results List Skeleton */}
      <div className="skel-results-list">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skel-result-card">
            <div className="skel-thumb-box" />
            <div className="skel-result-info">
              <div className="skel-bar skel-res-title" />
              <div className="skel-bar skel-res-sub" />
              <div className="skel-bar skel-res-venue" />
            </div>
            <div className="skel-pill skel-res-price" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
