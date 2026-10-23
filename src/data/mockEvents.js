export const MOCK_EVENTS = [
  {
    id: 'rock',
    title: 'Kesari Live Studio Sessions',
    category: 'Live Studio Sessions',
    genre: 'rock',
    city: 'Bengaluru, Koramangala',
    date: 'October 20, 2026',
    time: '18:00 PM - 02:00 AM',
    venue: 'Kesari Sound Studio, Koramangala, Bengaluru',
    venueShort: 'Kesari Sound Studio',
    price: 18.89,
    priceLabel: 'From $18.89',
    image: '/assets/kesari_studio.jpg',
    badge: 'Intimate Studio Session • 24 Passes Left',
    featured: true,
    description: 'Immerse yourself in live analog tracking, acoustic showcases, and electrifying studio jam sessions surrounded by vintage amps, warm stage backlights, and world-class live musicians.',
    lineup: [
      { name: 'The Velvet Echoes', role: 'Headliner', time: '21:30 PM', img: '/assets/artist_1.png' },
      { name: 'Neon Distortion', role: 'Direct Support', time: '20:00 PM', img: '/assets/artist_2.png' },
      { name: 'Sonic Revival', role: 'Opening Act', time: '18:30 PM', img: '/assets/artist_3.png' }
    ],
    tiers: [
      { id: 'ga', name: 'General Admission', price: 18.89, perks: 'Standard access to standing area and main bars' },
      { id: 'vip', name: 'VIP Pit & Express Pass', price: 49.99, perks: 'Front stage barrier access, private bar, express gate entry' },
      { id: 'all', name: 'Backstage All-Access', price: 99.00, perks: 'Artist lounge access, soundcheck invite, complimentary drinks' }
    ]
  },
  {
    id: 'jazz',
    title: 'Jazz & Blues Festival',
    category: 'Jazz & Blues',
    genre: 'jazz',
    city: 'Bengaluru, Koramangala',
    date: 'September 5, 2026',
    time: '15:00 PM - 23:00 PM',
    venue: 'Kesari Courtyard, Koramangala, Bengaluru',
    venueShort: 'Kesari Courtyard',
    price: 22.50,
    priceLabel: 'From $22.50',
    image: '/assets/jazz_blues_pills.png',
    badge: 'Sunset Stage Special',
    featured: true,
    description: 'Immerse yourself in three stages of smooth saxophone melodies, soulful electric blues, and world-class live improvisation along the scenic bay.',
    lineup: [
      { name: 'Miles Quartet', role: 'Main Stage', time: '19:00 PM', img: '/assets/artist_1.png' },
      { name: 'Sarah Vaughan Trio', role: 'Acoustic Dome', time: '17:30 PM', img: '/assets/artist_2.png' },
      { name: 'Blue Note All-Stars', role: 'Sunset Stage', time: '16:00 PM', img: '/assets/artist_3.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Lawn General Admission', price: 22.50, perks: 'Open lawn seating, festival food village access' },
      { id: 'vip', name: 'Reserved Pavilion Seating', price: 55.00, perks: 'Covered canopy seat, fast-track drinks pass' },
      { id: 'all', name: 'Patron VIP Lounge', price: 110.00, perks: 'Wine tasting terrace, artist meet & greet pass' }
    ]
  },
  {
    id: 'hiphop',
    title: 'Hip Hop Showcase Live',
    category: 'Hip-Hop & Urban',
    genre: 'hiphop',
    city: 'Bengaluru, Koramangala',
    date: 'November 14, 2026',
    time: '20:00 PM - 03:00 AM',
    venue: 'Kesari Amphitheatre, Koramangala, Bengaluru',
    venueShort: 'Kesari Amphitheatre',
    price: 25.00,
    priceLabel: 'From $25.00',
    image: '/assets/concert_crowd.jpg',
    badge: 'Top Trending',
    featured: false,
    description: 'The heavyweight battle of freestyle cyphers, chart-topping lyricists, and high-energy 808 bass beats at the historic stage.',
    lineup: [
      { name: 'Apex Rhymes', role: 'Headliner', time: '22:30 PM', img: '/assets/artist_2.png' },
      { name: 'DJ Cipher & Metro', role: 'Live Set', time: '21:00 PM', img: '/assets/artist_3.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Balcony General', price: 25.00, perks: 'Tiered theater seating' },
      { id: 'vip', name: 'Floor Mosh & Pit', price: 50.00, perks: 'Floor access right in front of speakers' },
      { id: 'all', name: 'Opera Box VIP', price: 120.00, perks: 'Private opera box with dedicated server' }
    ]
  },
  {
    id: 'electronic',
    title: 'Neon Horizon Sessions',
    category: 'Electronic & Ambient',
    genre: 'electronic',
    city: 'Bengaluru, Koramangala',
    date: 'December 31, 2026',
    time: '21:00 PM - 06:00 AM',
    venue: 'Kesari Sound Lab, Koramangala, Bengaluru',
    venueShort: 'Kesari Sound Lab',
    price: 45.00,
    priceLabel: 'From $45.00',
    image: '/assets/fluid_art.jpg',
    badge: 'Year-End Showcase',
    featured: true,
    description: 'A 360-degree immersive audiovisual set with ambient arrays, modular analog synths, and international warehouse techno titans.',
    lineup: [
      { name: 'Klangwelt Collective', role: 'Berlin Techno', time: '01:00 AM', img: '/assets/artist_3.png' },
      { name: 'Aura Pulse', role: 'Live Modular', time: '23:30 PM', img: '/assets/artist_1.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Early Bird Pass', price: 45.00, perks: 'All-night hangar entry' },
      { id: 'vip', name: 'VIP Mezzanine View', price: 85.00, perks: 'Elevated viewing platform, dedicated lounge' },
      { id: 'all', name: 'All-Access Pass', price: 150.00, perks: '24-hour access including exclusive sunrise set' }
    ]
  },
  {
    id: 'soundwaves',
    title: 'Underground Sound Waves',
    category: 'Experimental Beats',
    genre: 'electronic',
    city: 'Bengaluru, Koramangala',
    date: 'October 28, 2026',
    time: '19:30 PM - 01:30 AM',
    venue: 'Kesari Joy Hall, Koramangala, Bengaluru',
    venueShort: 'Kesari Joy Hall',
    price: 30.00,
    priceLabel: 'From $30.00',
    image: '/assets/3d_capsule.jpg',
    badge: 'Curated Underground',
    featured: false,
    description: 'Aural soundscapes, tactile sub-bass frequencies, and ambient visual installations by cutting-edge sound designers.',
    lineup: [
      { name: 'Sub Frequency', role: 'Sonic Explorer', time: '21:00 PM', img: '/assets/artist_1.png' }
    ],
    tiers: [
      { id: 'ga', name: 'General Admission', price: 30.00, perks: 'Full gallery and stage entry' },
      { id: 'vip', name: 'Sensory Lounge Access', price: 60.00, perks: 'Spatial audio immersion headphones provided' }
    ]
  },
  {
    id: 'soul',
    title: 'Midnight Velvet Soul Night',
    category: 'Soul & R&B',
    genre: 'jazz',
    city: 'Bengaluru, Koramangala',
    date: 'November 20, 2026',
    time: '20:00 PM - 01:00 AM',
    venue: 'Kesari Lounge, Koramangala, Bengaluru',
    venueShort: 'Kesari Lounge',
    price: 35.00,
    priceLabel: 'From $35.00',
    image: '/assets/events/lounge.webp',
    badge: 'Intimate Acoustic',
    featured: false,
    description: 'Candlelit tables, vintage microphones, and velvet harmonies celebrating the timeless legacy of neo-soul and contemporary R&B.',
    lineup: [
      { name: 'Velvet Strings Trio', role: 'Live Quintet', time: '21:00 PM', img: '/assets/artist_2.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Bar Standing Pass', price: 35.00, perks: 'Access to bar area with cocktail service' },
      { id: 'vip', name: 'Front Table Seating', price: 75.00, perks: 'Stage-side seating and 2-course meal' }
    ]
  }
];

export const CITIES = [
  'Bengaluru, Koramangala'
];

export const GENRES = [
  { id: 'all', label: 'All Experiences' },
  { id: 'rock', label: 'Rock & Electric' },
  { id: 'jazz', label: 'Jazz & Blues' },
  { id: 'hiphop', label: 'Hip-Hop Live' },
  { id: 'electronic', label: 'Electronic & Ambient' }
];

export const INITIAL_TICKETS = [
  {
    id: 'tkt-001',
    eventId: 'jazz',
    eventTitle: 'Jazz & Blues Festival',
    date: 'Sep 5, 2026',
    time: '15:00 PM',
    location: 'Kesari Courtyard, Koramangala',
    seat: 'A-14 (General Lawn)',
    hash: '0x487Fh3kmjn3...35620',
    tier: 'General Admission',
    price: 22.50,
    image: '/assets/jazz_blues_pills.png',
    bookedAt: 'Today at 14:22'
  }
];
