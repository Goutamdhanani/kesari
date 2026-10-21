import React from 'react';
import { motion } from 'motion/react';
import './TicketCard.css';

export default function TicketCard({
  title = "Jazz & Blues Festival",
  date = "Sep 5, 2024",
  time = "15:00 PM",
  location = "Riverfront Park",
  seat = "No seat",
  hash = "0x487Fh3kmjn3...35620",
  image = "/assets/jazz_blues_pills.png",
  parentBg = "blue", // "blue" | "pale" | "dark"
  className = "",
  onClick = () => {}
}) {
  return (
    <motion.div 
      className={`hyper-ticket-container ${className} bg-${parentBg}`}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      onClick={onClick}
    >
      <div className="hyper-ticket-card">
        {/* Top Header Artwork with 3D Glossy Aesthetic */}
        <div className="ticket-header-art">
          <img src={image} alt={title} className="ticket-art-img" />
        </div>

        {/* Event Title */}
        <h3 className="ticket-event-title">{title}</h3>

        {/* Notch 1 Divider (Top) */}
        <div className="ticket-perforation-divider notch-divider-1">
          <div className="ticket-notch notch-left"></div>
          <div className="ticket-dashed-line"></div>
          <div className="ticket-notch notch-right"></div>
        </div>

        {/* Metadata Grid 2x2 */}
        <div className="ticket-meta-grid">
          <div className="ticket-meta-item">
            <span className="ticket-meta-label">Date</span>
            <span className="ticket-meta-value">{date}</span>
          </div>
          <div className="ticket-meta-item text-right">
            <span className="ticket-meta-label">Time</span>
            <span className="ticket-meta-value">{time}</span>
          </div>
          <div className="ticket-meta-item">
            <span className="ticket-meta-label">Location</span>
            <span className="ticket-meta-value">{location}</span>
          </div>
          <div className="ticket-meta-item text-right">
            <span className="ticket-meta-label">Seat</span>
            <span className="ticket-meta-value">{seat}</span>
          </div>
        </div>

        {/* Notch 2 Divider (Bottom) */}
        <div className="ticket-perforation-divider notch-divider-2">
          <div className="ticket-notch notch-left"></div>
          <div className="ticket-dashed-line"></div>
          <div className="ticket-notch notch-right"></div>
        </div>

        {/* Hash Code & Vector Barcode */}
        <div className="ticket-footer">
          <div className="ticket-hash">{hash}</div>
          <div className="ticket-barcode-wrap" title="Scan at Gate">
            <svg className="ticket-barcode-svg" viewBox="0 0 280 50" preserveAspectRatio="none">
              <rect x="0" y="0" width="3.5" height="50" fill="#080808" />
              <rect x="6" y="0" width="1.5" height="50" fill="#080808" />
              <rect x="10" y="0" width="4.5" height="50" fill="#080808" />
              <rect x="17" y="0" width="2" height="50" fill="#080808" />
              <rect x="22" y="0" width="1.5" height="50" fill="#080808" />
              <rect x="26" y="0" width="5.5" height="50" fill="#080808" />
              <rect x="35" y="0" width="2" height="50" fill="#080808" />
              <rect x="39" y="0" width="3.5" height="50" fill="#080808" />
              <rect x="45" y="0" width="1" height="50" fill="#080808" />
              <rect x="48" y="0" width="4" height="50" fill="#080808" />
              <rect x="55" y="0" width="2" height="50" fill="#080808" />
              <rect x="59" y="0" width="1" height="50" fill="#080808" />
              <rect x="63" y="0" width="4.5" height="50" fill="#080808" />
              <rect x="71" y="0" width="2.5" height="50" fill="#080808" />
              <rect x="76" y="0" width="1.5" height="50" fill="#080808" />
              <rect x="80" y="0" width="5" height="50" fill="#080808" />
              <rect x="88" y="0" width="3" height="50" fill="#080808" />
              <rect x="93" y="0" width="1.5" height="50" fill="#080808" />
              <rect x="97" y="0" width="4" height="50" fill="#080808" />
              <rect x="103" y="0" width="2" height="50" fill="#080808" />
              <rect x="107" y="0" width="1" height="50" fill="#080808" />
              <rect x="111" y="0" width="5" height="50" fill="#080808" />
              <rect x="118" y="0" width="2" height="50" fill="#080808" />
              <rect x="122" y="0" width="3.5" height="50" fill="#080808" />
              <rect x="128" y="0" width="1.5" height="50" fill="#080808" />
              <rect x="132" y="0" width="4" height="50" fill="#080808" />
              <rect x="138" y="0" width="2" height="50" fill="#080808" />
              <rect x="143" y="0" width="4" height="50" fill="#080808" />
              <rect x="149" y="0" width="1" height="50" fill="#080808" />
              <rect x="153" y="0" width="3" height="50" fill="#080808" />
              <rect x="158" y="0" width="5" height="50" fill="#080808" />
              <rect x="166" y="0" width="2" height="50" fill="#080808" />
              <rect x="171" y="0" width="3.5" height="50" fill="#080808" />
              <rect x="177" y="0" width="1.5" height="50" fill="#080808" />
              <rect x="181" y="0" width="4" height="50" fill="#080808" />
              <rect x="187" y="0" width="2" height="50" fill="#080808" />
              <rect x="191" y="0" width="1" height="50" fill="#080808" />
              <rect x="195" y="0" width="4" height="50" fill="#080808" />
              <rect x="201" y="0" width="2.5" height="50" fill="#080808" />
              <rect x="206" y="0" width="1.5" height="50" fill="#080808" />
              <rect x="210" y="0" width="5" height="50" fill="#080808" />
              <rect x="218" y="0" width="2" height="50" fill="#080808" />
              <rect x="222" y="0" width="3.5" height="50" fill="#080808" />
              <rect x="228" y="0" width="1" height="50" fill="#080808" />
              <rect x="231" y="0" width="4" height="50" fill="#080808" />
              <rect x="237" y="0" width="2" height="50" fill="#080808" />
              <rect x="241" y="0" width="5" height="50" fill="#080808" />
              <rect x="249" y="0" width="2" height="50" fill="#080808" />
              <rect x="253" y="0" width="3.5" height="50" fill="#080808" />
              <rect x="259" y="0" width="1.5" height="50" fill="#080808" />
              <rect x="263" y="0" width="4" height="50" fill="#080808" />
              <rect x="269" y="0" width="2" height="50" fill="#080808" />
              <rect x="273" y="0" width="4" height="50" fill="#080808" />
              <rect x="280" y="0" width="3" height="50" fill="#080808" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
