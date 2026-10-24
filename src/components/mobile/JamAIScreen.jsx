import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AppIcon from '../common/AppIcon';
import { FloatingBottomNav } from '../common/ControlWidgets';
import './JamAIScreen.css';

const VIBE_STARTERS = [
  { label: '⚡ High-energy underground rave', query: 'Find me high-energy underground electronic and rave sets' },
  { label: '🎷 Soulful sunset jazz & blues', query: 'I want a soulful chill jazz festival with sunset bay views' },
  { label: '🎸 Legendary guitar riffs & rock', query: 'What are the most electrifying rock concerts happening soon?' },
  { label: '🎟️ Secret show under $25 tonight', query: 'Show me verified live music passes under $25' }
];

const AI_DATABASE = {
  rock: {
    title: 'Rock Legends Reunion',
    category: 'Rock & Electric',
    date: 'October 20, 2026',
    price: '$18.89',
    image: '/assets/rock_concert_bg.png',
    venue: 'The Great Northern, SF',
    summary: 'Match Score: 98% • Thunderous drum solos & dual Gibson Les Paul leads.',
    reason: 'Matches your craving for authentic rock anthems. The Velvet Echoes headliner set is verified sold at 92% capacity.'
  },
  jazz: {
    title: 'Jazz & Blues Festival',
    category: 'Jazz & Blues',
    date: 'September 5, 2026',
    price: '$22.50',
    image: '/assets/jazz_blues_pills.png',
    venue: 'Riverfront Park, SF',
    summary: 'Match Score: 96% • Three stages of warm brass & acoustic bay breezes.',
    reason: 'Perfect for golden hour listening. Miles Quartet just confirmed an exclusive sunset stage showcase.'
  },
  hiphop: {
    title: 'Hip Hop Showcase Live',
    category: 'Hip-Hop & Urban',
    date: 'November 14, 2026',
    price: '$25.00',
    image: '/assets/concert_crowd.jpg',
    venue: 'Midway Pavilion, SF',
    summary: 'Match Score: 94% • Heavy 808 basslines & underground cyphers.',
    reason: 'Curated lineup of raw lyricists and West Coast producers with interactive sound booth experiences.'
  }
};

export default function JamAIScreen({
  onSelectEvent = () => {},
  onTabChange = () => {},
  onBack = () => {}
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hey Gregory! I'm JamAI, your acoustic vibe concierge. Tell me your mood, favorite instrument, or late-night vibe, and I'll find your perfect live stage.",
      eventSuggestion: null,
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = (userQuery) => {
    const query = (userQuery || inputValue).trim();
    if (!query) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userQuery) setInputValue('');
    setIsThinking(true);

    // Simulate AI synthesis & neural match
    setTimeout(() => {
      let matchedKey = 'rock';
      const qLower = query.toLowerCase();
      if (qLower.includes('jazz') || qLower.includes('chill') || qLower.includes('sunset') || qLower.includes('soul')) {
        matchedKey = 'jazz';
      } else if (qLower.includes('hip') || qLower.includes('rave') || qLower.includes('underground') || qLower.includes('urban') || qLower.includes('electronic')) {
        matchedKey = 'hiphop';
      } else if (qLower.includes('25') || qLower.includes('budget') || qLower.includes('cheap')) {
        matchedKey = 'rock';
      }

      const matchedEvent = AI_DATABASE[matchedKey];

      const aiResponse = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Here is the ideal match I discovered for you: **${matchedEvent.title}**. ${matchedEvent.reason}`,
        eventSuggestion: {
          id: matchedKey,
          ...matchedEvent
        },
        time: 'Just now'
      };

      setIsThinking(false);
      setMessages(prev => [...prev, aiResponse]);
    }, 900);
  };

  return (
    <motion.div 
      className="mobile-jam-ai-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      {/* Header */}
      <header className="jam-ai-header">
        <div className="jam-ai-brand">
          <div className="ai-orb-ring">
            <div className="ai-orb-glow" />
            <AppIcon name="sparkles" size={16} color="#080808" strokeWidth={2.5} />
          </div>
          <div>
            <div className="ai-title-row">
              <h2 className="ai-title">JamAI</h2>
              <span className="ai-status-badge">Neural Vibe v2.6</span>
            </div>
            <p className="ai-subtitle">Curated live acoustic matching</p>
          </div>
        </div>

        <button className="ai-close-btn" onClick={onBack} aria-label="Close AI Concierge">
          <AppIcon name="x" size={17} color="#64748B" />
        </button>
      </header>

      {/* Acoustic Visualizer Banner */}
      <div className="ai-acoustic-visualizer">
        <div className="wave-bar bar-1" />
        <div className="wave-bar bar-2" />
        <div className="wave-bar bar-3" />
        <div className="wave-bar bar-4" />
        <div className="wave-bar bar-5" />
        <div className="wave-bar bar-6" />
        <div className="wave-bar bar-7" />
        <span className="visualizer-hint">Listening to live SF stage vibes...</span>
      </div>

      {/* Chat Messages Stream */}
      <div className="jam-ai-chat-stream">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            className={`chat-message-row ${msg.sender === 'user' ? 'sender-user' : 'sender-ai'}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {msg.sender === 'ai' && (
              <div className="ai-chat-avatar">
                <AppIcon name="sparkles" size={14} color="#DAFB71" />
              </div>
            )}

            <div className="chat-bubble-container">
              <div className="chat-bubble">
                <p className="chat-text">{msg.text}</p>
                <span className="chat-time">{msg.time}</span>
              </div>

              {/* Rich Event Recommendation Card */}
              {msg.eventSuggestion && (
                <motion.div 
                  className="ai-recommended-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  onClick={() => onSelectEvent(msg.eventSuggestion.id)}
                >
                  <img 
                    src={msg.eventSuggestion.image} 
                    alt={msg.eventSuggestion.title} 
                    className="ai-card-art" 
                  />
                  <div className="ai-card-overlay">
                    <span className="ai-match-tag">⚡ 98% Vibe Match</span>
                    <h4 className="ai-card-title">{msg.eventSuggestion.title}</h4>
                    <div className="ai-card-meta">
                      <span>📅 {msg.eventSuggestion.date}</span>
                      <span>📍 {msg.eventSuggestion.venue}</span>
                    </div>
                    <div className="ai-card-bottom-row">
                      <span className="ai-card-price">{msg.eventSuggestion.price}</span>
                      <button 
                        className="ai-book-pass-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(msg.eventSuggestion.id);
                        }}
                      >
                        <span>View Pass</span>
                        <AppIcon name="arrow-up-right" size={13} color="#080808" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Shimmer Thinking Indicator */}
        {isThinking && (
          <motion.div 
            className="chat-message-row sender-ai"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="ai-chat-avatar">
              <AppIcon name="sparkles" size={14} color="#DAFB71" />
            </div>
            <div className="ai-thinking-pill">
              <div className="thinking-dot dot-1" />
              <div className="thinking-dot dot-2" />
              <div className="thinking-dot dot-3" />
              <span className="thinking-label">JamAI is tuning stage acoustics...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Vibe Starter Prompt Chips */}
      <div className="vibe-starters-scroll">
        {VIBE_STARTERS.map((s, idx) => (
          <button 
            key={idx}
            className="vibe-starter-pill"
            onClick={() => handleSendMessage(s.query)}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="jam-ai-input-wrap">
        <div className="ai-input-capsule">
          <input 
            type="text"
            className="ai-text-field"
            placeholder="Ask JamAI (e.g. secret bass rave, saxophone sunset...)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button 
            className="ai-send-btn"
            onClick={() => handleSendMessage()}
            aria-label="Send query"
          >
            <AppIcon name="send" size={15} color="#080808" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="mobile-bottom-nav-wrapper">
        <FloatingBottomNav 
          activeTab="ai" 
          onTabChange={onTabChange} 
        />
      </div>
    </motion.div>
  );
}
