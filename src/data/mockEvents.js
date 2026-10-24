export const MOCK_EVENTS = [
  {
    id: 'rock',
    title: 'Rock Legends Reunion',
    category: 'Rock & Electric',
    genre: 'rock',
    city: 'Bangalore',
    date: 'October 20, 2026',
    time: '18:00 PM - 02:00 AM',
    venue: 'Kesari Arena, Indiranagar, Bangalore',
    venueShort: 'Kesari Arena',
    price: 1499,
    priceLabel: '₹1,499',
    image: '/assets/events/ev_rock.jpg',
    badge: '⚡ Selling Fast • 92% Booked',
    featured: true,
    description: 'An electrifying night celebrating iconic guitar riffs, thunderous drum solos, and legendary rock anthems performed live at Kesari Arena, Bangalore.',
    lineup: [
      { name: 'The Velvet Echoes', role: 'Headliner', time: '21:30 PM', img: '/assets/artist_1.png' },
      { name: 'Neon Distortion', role: 'Direct Support', time: '20:00 PM', img: '/assets/artist_2.png' },
      { name: 'Sonic Revival', role: 'Opening Act', time: '18:30 PM', img: '/assets/artist_3.png' }
    ],
    tiers: [
      { id: 'ga', name: 'General Admission', price: 1499, perks: 'Standard access to standing area and main bars' },
      { id: 'vip', name: 'VIP Pit & Express Pass', price: 2999, perks: 'Front stage barrier access, private bar, express gate entry' },
      { id: 'all', name: 'Backstage All-Access', price: 5499, perks: 'Artist lounge access, soundcheck invite, complimentary drinks' }
    ]
  },
  {
    id: 'jazz',
    title: 'Jazz & Blues Festival',
    category: 'Jazz & Blues',
    genre: 'jazz',
    city: 'Bangalore',
    date: 'September 5, 2026',
    time: '15:00 PM - 23:00 PM',
    venue: 'Kesari Pavilion, Koramangala, Bangalore',
    venueShort: 'Kesari Pavilion',
    price: 1250,
    priceLabel: '₹1,250',
    image: '/assets/events/ev_jazz.jpg',
    badge: '🎷 Sunset Stage Special',
    featured: true,
    description: 'Immerse yourself in smooth saxophone melodies, soulful electric blues, and world-class live improvisation at Kesari Pavilion, Bangalore.',
    lineup: [
      { name: 'Miles Quartet', role: 'Main Stage', time: '19:00 PM', img: '/assets/artist_1.png' },
      { name: 'Sarah Vaughan Trio', role: 'Acoustic Dome', time: '17:30 PM', img: '/assets/artist_2.png' },
      { name: 'Blue Note All-Stars', role: 'Sunset Stage', time: '16:00 PM', img: '/assets/artist_3.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Lawn General Admission', price: 1250, perks: 'Open lawn seating, festival food village access' },
      { id: 'vip', name: 'Reserved Pavilion Seating', price: 2450, perks: 'Covered canopy seat, fast-track drinks pass' },
      { id: 'all', name: 'Patron VIP Lounge', price: 4250, perks: 'Wine tasting terrace, artist meet & greet pass' }
    ]
  },
  {
    id: 'hiphop',
    title: 'Hip Hop Showcase Live',
    category: 'Hip-Hop & Urban',
    genre: 'hiphop',
    city: 'Bangalore',
    date: 'November 14, 2026',
    time: '20:00 PM - 03:00 AM',
    venue: 'Kesari Deck, MG Road, Bangalore',
    venueShort: 'Kesari Deck',
    price: 1350,
    priceLabel: '₹1,350',
    image: '/assets/concert_crowd.jpg',
    badge: '🔥 Top Trending',
    featured: false,
    description: 'Freestyle cyphers, chart-topping lyricists, and high-energy 808 bass beats live on stage at Kesari Deck, Bangalore.',
    lineup: [
      { name: 'Apex Rhymes', role: 'Headliner', time: '22:30 PM', img: '/assets/artist_2.png' },
      { name: 'DJ Cipher & Metro', role: 'Live Set', time: '21:00 PM', img: '/assets/artist_3.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Balcony General', price: 1350, perks: 'Tiered theater seating' },
      { id: 'vip', name: 'Floor Mosh & Pit', price: 2750, perks: 'Floor access right in front of speakers' },
      { id: 'all', name: 'Opera Box VIP', price: 4800, perks: 'Private opera box with dedicated server' }
    ]
  },
  {
    id: 'electronic',
    title: 'Neon Horizon Rave 2026',
    category: 'Electronic & Rave',
    genre: 'electronic',
    city: 'Bangalore',
    date: 'December 31, 2026',
    time: '21:00 PM - 06:00 AM',
    venue: 'Kesari Warehouse 7, Whitefield, Bangalore',
    venueShort: 'Kesari Warehouse',
    price: 1850,
    priceLabel: '₹1,850',
    image: '/assets/fluid_art.jpg',
    badge: '🎆 NYE Special Event',
    featured: true,
    description: 'A 360-degree immersive audiovisual rave with 40-foot laser arrays and international warehouse techno titans at Kesari Warehouse Bangalore.',
    lineup: [
      { name: 'Klangwelt Collective', role: 'Berlin Techno', time: '01:00 AM', img: '/assets/artist_3.png' },
      { name: 'Aura Pulse', role: 'Live Modular', time: '23:30 PM', img: '/assets/artist_1.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Early Bird Warehouse Pass', price: 1850, perks: 'All-night hangar entry' },
      { id: 'vip', name: 'VIP Mezzanine Laser View', price: 3600, perks: 'Elevated viewing platform, dedicated bathrooms' },
      { id: 'all', name: 'Sunrise Pass + Afterparty', price: 6200, perks: '24-hour access including exclusive sunrise warehouse set' }
    ]
  },
  {
    id: 'soundwaves',
    title: 'Sunset Acoustic Sessions',
    category: 'Acoustic & Lounge',
    genre: 'acoustic',
    city: 'Bangalore',
    date: 'October 28, 2026',
    time: '17:00 PM - 22:30 AM',
    venue: 'Kesari Garden Terrace, Bangalore',
    venueShort: 'Kesari Garden',
    price: 950,
    priceLabel: '₹950',
    image: '/assets/events/ev_openmic.jpg',
    badge: '🌿 Garden Stage Unplugged',
    featured: false,
    description: 'Intimate acoustic guitar, candlelit wooden deck, and craft cocktails under Bangalore starlight at Kesari Garden Terrace.',
    lineup: [
      { name: 'Sarah Vaughan Trio', role: 'Acoustic Set', time: '18:00 PM', img: '/assets/artist_1.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Lawn Pass', price: 950, perks: 'Lawn seating & welcome drink' },
      { id: 'vip', name: 'Table Terrace Seating', price: 1950, perks: 'Reserved table with tapas service' }
    ]
  }
];

export const CITIES = [
  'Bangalore',
  'Indiranagar, Bangalore',
  'Koramangala, Bangalore',
  'Whitefield, Bangalore',
  'MG Road, Bangalore'
];

export const GENRES = [
  { id: 'all', label: 'All Experiences', icon: '✨' },
  { id: 'rock', label: 'Rock & Electric', icon: '🎸' },
  { id: 'jazz', label: 'Jazz & Blues', icon: '🎷' },
  { id: 'hiphop', label: 'Hip-Hop Live', icon: '🎤' },
  { id: 'electronic', label: 'Electronic & Rave', icon: '⚡' }
];

export const INITIAL_TICKETS = [
  {
    id: 'tkt-001',
    eventId: 'rock',
    eventTitle: 'Rock Legends Reunion',
    date: 'Oct 20, 2026',
    time: '18:00 PM',
    location: 'Kesari Arena, Bangalore',
    seat: 'VIP Pit (Front Stage)',
    hash: '0x487Fh3kmjn3...35620',
    tier: 'VIP Pit & Express Pass',
    price: 2999,
    image: '/assets/events/ev_rock.jpg',
    bookedAt: 'Today at 14:22'
  }
];
