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
  Check,
  Mic,
  MapPinned,
  Star,
  X,
  Plus,
  Minus,
  Settings,
  CreditCard,
  Clock,
  Send,
  Bot,
  Wand2,
  Volume2,
  RefreshCw
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
    case 'mic':
      return <Mic {...iconProps} />;
    case 'map-pin':
      return <MapPinned {...iconProps} />;
    case 'star':
      return <Star {...iconProps} />;
    case 'x':
    case 'close':
      return <X {...iconProps} />;
    case 'plus':
      return <Plus {...iconProps} />;
    case 'minus':
      return <Minus {...iconProps} />;
    case 'settings':
      return <Settings {...iconProps} />;
    case 'credit-card':
      return <CreditCard {...iconProps} />;
    case 'clock':
      return <Clock {...iconProps} />;
    case 'send':
      return <Send {...iconProps} />;
    case 'bot':
      return <Bot {...iconProps} />;
    case 'wand':
      return <Wand2 {...iconProps} />;
    case 'volume':
      return <Volume2 {...iconProps} />;
    case 'refresh':
      return <RefreshCw {...iconProps} />;
    default:
      return <Home {...iconProps} />;
  }
}
