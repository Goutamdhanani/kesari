import React from 'react';
import { 
  Home, 
  Search, 
  Calendar, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  MapPin, 
  Heart, 
  Ticket, 
  Tag, 
  Bell, 
  Power, 
  QrCode, 
  Activity, 
  Music, 
  Sparkles,
  User,
  SlidersHorizontal,
  Compass,
  ArrowRight,
  Check
} from 'lucide-react';

export default function AppIcon({ name, size = 20, color = 'currentColor', fill = 'none', strokeWidth = 2, className = '' }) {
  const iconProps = { size, color, fill, strokeWidth, className };

  switch (name) {
    case 'home':
      return <Home {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'calendar':
      return <Calendar {...iconProps} />;
    case 'arrow-up-right':
      return <ArrowUpRight {...iconProps} />;
    case 'chevron-left':
      return <ChevronLeft {...iconProps} />;
    case 'chevron-right':
      return <ChevronRight {...iconProps} />;
    case 'share':
      return <Share2 {...iconProps} />;
    case 'location':
    case 'pin':
      return <MapPin {...iconProps} />;
    case 'heart':
      return <Heart {...iconProps} />;
    case 'ticket':
      return <Ticket {...iconProps} />;
    case 'coupon':
    case 'tag':
      return <Tag {...iconProps} />;
    case 'bell':
      return <Bell {...iconProps} />;
    case 'power':
      return <Power {...iconProps} />;
    case 'qr':
    case 'qrcode':
      return <QrCode {...iconProps} />;
    case 'waveform':
    case 'sound':
      return <Activity {...iconProps} />;
    case 'music':
      return <Music {...iconProps} />;
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'user':
      return <User {...iconProps} />;
    case 'filter':
      return <SlidersHorizontal {...iconProps} />;
    case 'compass':
      return <Compass {...iconProps} />;
    case 'arrow-right':
      return <ArrowRight {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    default:
      return <Home {...iconProps} />;
  }
}
