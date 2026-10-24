import React from 'react';
import MobileFrame from './components/mobile/MobileFrame';
import './App.css';

export default function App() {
  return (
    <div className="eventjam-root-app">
      <MobileFrame initialScreen="home" initialEventId="rock" />
    </div>
  );
}
