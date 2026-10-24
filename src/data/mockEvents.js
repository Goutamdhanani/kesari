export const MOCK_EVENTS = [
  {
    id: 'amour',
    title: 'AMOUR – A Yash Raj Films Instrumental Tribute',
    category: 'Instrumental Tribute',
    genre: 'acoustic',
    city: 'Bangalore',
    date: 'Sunday • Nov 1, 2026',
    dateFilter: 'nov',
    time: '12:30 PM - 15:00 PM',
    venue: 'Kesari - The Memory Studio, Koramangala, Bangalore',
    venueShort: 'Kesari Studio, Koramangala',
    room: 'Acoustic Chamber (40 Pax)',
    roomType: 'main-stage',
    decibels: '74 dB Symphony • Candlelight',
    ticketCode: 'KSR-YRF-1101',
    capacity: { total: 40, booked: 28, remaining: 12, percentage: 70 },
    price: 1800,
    priceLabel: '₹1,800',
    image: 'https://dpak4w7tblqv8.cloudfront.net/EVENTS/dcbc1dbf-772d-4abb-9027-6f512bd5ba34.jpeg',
    badge: '🎻 Yash Raj Films Live Tribute',
    featured: true,
    isPublic: true,
    sourceUrl: 'https://greet.fydo.in/amour-a-yash-raj-films-instrumental-tribute',
    description: "Some melodies never grow old. They stay with us through love stories, unforgettable moments and memories return to, time and again. Amour brings the magic of Yash Raj Films' iconic musical universe to life through a live instrumental tribute at Kesari - The Memory Studio, Bengaluru. Experience timeless compositions reimagined with acoustic strings, piano, and cinematic elegance.",
    lineup: [
      { name: 'Amour String Ensemble', role: 'Acoustic Quartet', time: '12:30 PM', img: '/assets/artist_1.png' },
      { name: 'Kesari Chamber Soloists', role: 'Piano & Cello', time: '13:45 PM', img: '/assets/artist_2.png' }
    ],
    tiers: [
      { id: 'couple', name: 'Couple Entry Pass', price: 1800, perks: 'Entry for 2 guests to the live instrumental tribute session' },
      { id: 'vip-couple', name: 'VIP Front Row Couple Pass', price: 2500, perks: 'Stage-front seating for 2 + 2 artisanal coffees & commemorative score' }
    ]
  },
  {
    id: 'laadla',
    title: 'Maa Da Laadla by Parminder',
    category: 'Live Music Gig',
    genre: 'acoustic',
    city: 'Bangalore',
    date: 'Sun, 1 Nov 2026',
    dateFilter: 'nov',
    time: '18:00 PM - 21:00 PM',
    venue: 'Kesari - The Memory Studio, Bangalore',
    venueShort: 'Kesari Studio',
    room: 'Acoustic Hall (40 Pax)',
    roomType: 'main-stage',
    decibels: '82 dB Live Energy',
    ticketCode: 'KSR-MDL-1101',
    capacity: { total: 40, booked: 22, remaining: 18, percentage: 55 },
    price: 349,
    priceLabel: '₹349',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80',
    badge: 'Yash Raj Films Live Tribute',
    featured: false,
    isPublic: true,
    description: 'A soulful and vibrant live rendition of classic and contemporary melodies featuring Amour String Quartet Live at Kesari - The Memory Studio.',
    lineup: [
      { name: 'Amour String Quartet Live', role: 'Live Strings', time: '18:00 PM', img: '/assets/artist_1.png' }
    ],
    tiers: [
      { id: 'standard', name: 'Acoustic Hall Pass', price: 349, perks: 'Entry to live acoustic hall session' }
    ]
  },
  {
    id: 'soundwaves',
    title: 'Sunset Acoustic & Open Mic',
    category: 'Open Mic & Jam',
    genre: 'acoustic',
    city: 'Bangalore',
    date: 'This Weekend • Oct 25, 2026',
    dateFilter: 'weekend',
    time: '17:00 PM - 21:30 PM',
    venue: 'Kesari - The Memory Studio, Bangalore',
    venueShort: 'Kesari Studio',
    room: 'Acoustic Lounge (8-15 Pax)',
    roomType: 'lounge',
    decibels: '72 dB Acoustic • Warm',
    ticketCode: 'KSR-ACO-1025',
    capacity: { total: 25, booked: 18, remaining: 7, percentage: 72 },
    price: 950,
    priceLabel: '₹950',
    image: '/assets/events/ev_openmic.jpg',
    badge: '🌿 Studio Unplugged',
    featured: false,
    description: 'Intimate acoustic guitar, candlelit wooden stage, and craft beverages under warm studio lights at Kesari - The Memory Studio.',
    lineup: [
      { name: 'Sarah Vaughan Trio', role: 'Acoustic Set', time: '18:00 PM', img: '/assets/artist_1.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Open Mic Audience Pass', price: 950, perks: 'Studio lounge seating & welcome drink' },
      { id: 'vip', name: 'Performer + Table Pass', price: 1950, perks: 'Guaranteed 10-min mic performance slot + audio recording of set' }
    ]
  },
  {
    id: 'rock',
    title: 'Rock Legends Reunion',
    category: 'Live Music Gig',
    genre: 'rock',
    city: 'Bangalore',
    date: 'Oct 24, 2026 • Studio Hall',
    dateFilter: 'tonight',
    time: '19:00 PM - 23:30 PM',
    venue: 'Kesari - The Memory Studio, Bangalore',
    venueShort: 'Kesari Studio',
    room: 'Main Stage (40-60 Pax)',
    roomType: 'main-stage',
    decibels: '98 dB Peak • High Energy',
    ticketCode: 'KSR-RCK-1024',
    capacity: { total: 60, booked: 52, remaining: 8, percentage: 87 },
    price: 1499,
    priceLabel: '₹1,499',
    image: '/assets/events/ev_rock.jpg',
    badge: '⚡ Past Legend Set',
    featured: false,
    description: 'An electrifying night celebrating iconic guitar riffs, drum jams, and legendary rock anthems performed live at Kesari - The Memory Studio.',
    lineup: [
      { name: 'The Velvet Echoes', role: 'Headliner', time: '21:00 PM', img: '/assets/artist_1.png' },
      { name: 'Neon Distortion', role: 'Direct Support', time: '19:45 PM', img: '/assets/artist_2.png' },
      { name: 'Sonic Revival', role: 'Opening Act', time: '18:30 PM', img: '/assets/artist_3.png' }
    ],
    tiers: [
      { id: 'ga', name: 'General Studio Pass', price: 1499, perks: 'Entry to live studio hall & acoustic lounge' },
      { id: 'vip', name: 'VIP Front Row Pass', price: 2999, perks: 'Front row seating, meet the band & welcome beverage' },
      { id: 'all', name: 'All-Access Backstage Pass', price: 5499, perks: 'Artist green room access, soundcheck invite, free studio jam hour' }
    ]
  },
  {
    id: 'jazz',
    title: 'Jazz & Blues Evening',
    category: 'Acoustic & Blues',
    genre: 'jazz',
    city: 'Bangalore',
    date: 'Next Week • Oct 30, 2026',
    dateFilter: 'nextweek',
    time: '18:30 PM - 22:30 PM',
    venue: 'Kesari - The Memory Studio, Bangalore',
    venueShort: 'Kesari Studio',
    room: 'Acoustic Lounge (8-15 Pax)',
    roomType: 'lounge',
    decibels: '78 dB Mellow • Vinyl Tone',
    ticketCode: 'KSR-JZZ-1030',
    capacity: { total: 20, booked: 16, remaining: 4, percentage: 80 },
    price: 1250,
    priceLabel: '₹1,250',
    image: '/assets/events/ev_jazz.jpg',
    badge: '🎷 Intimate Studio Session',
    featured: true,
    description: 'Immerse yourself in smooth saxophone melodies, soulful electric blues, and world-class live improvisation at Kesari - The Memory Studio.',
    lineup: [
      { name: 'Miles Quartet', role: 'Main Feature', time: '20:00 PM', img: '/assets/artist_1.png' },
      { name: 'Sarah Vaughan Trio', role: 'Acoustic Set', time: '19:00 PM', img: '/assets/artist_2.png' },
      { name: 'Blue Note All-Stars', role: 'Opening Jam', time: '18:30 PM', img: '/assets/artist_3.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Studio Entry Pass', price: 1250, perks: 'Open seating in acoustic lounge' },
      { id: 'vip', name: 'Reserved Table Seating', price: 2450, perks: 'Reserved cafe table, complimentary artisanal coffee' },
      { id: 'all', name: 'VIP Studio Patron', price: 4250, perks: 'Front table, artist meet & greet, exclusive live vinyl recording' }
    ]
  },
  {
    id: 'hiphop',
    title: 'Hip Hop & Cypher Showcase',
    category: 'Urban Live',
    genre: 'hiphop',
    city: 'Bangalore',
    date: 'Nov 14, 2026',
    dateFilter: 'nov',
    time: '20:00 PM - 23:45 PM',
    venue: 'Kesari - The Memory Studio, Bangalore',
    venueShort: 'Kesari Studio',
    room: 'Main Stage (40-60 Pax)',
    roomType: 'main-stage',
    decibels: '94 dB 808s • Sub Bass',
    ticketCode: 'KSR-CYP-1114',
    capacity: { total: 60, booked: 41, remaining: 19, percentage: 68 },
    price: 1350,
    priceLabel: '₹1,350',
    image: '/assets/concert_crowd.jpg',
    badge: '🎤 Live Cypher Session',
    featured: false,
    description: 'Freestyle cyphers, chart-topping lyricists, and high-energy 808 beats live on mic at Kesari - The Memory Studio.',
    lineup: [
      { name: 'Apex Rhymes', role: 'Headline Emcee', time: '22:00 PM', img: '/assets/artist_2.png' },
      { name: 'DJ Cipher & Metro', role: 'Beatmaker Live Set', time: '20:30 PM', img: '/assets/artist_3.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Cypher Entry', price: 1350, perks: 'Standing room & cypher floor' },
      { id: 'vip', name: 'VIP Mosh & Front Row', price: 2750, perks: 'Floor access right next to speakers & wireless mic cypher slot' },
      { id: 'all', name: 'Artist Backstage Circle', price: 4800, perks: 'Green room pass, open mic battle priority' }
    ]
  },
  {
    id: 'electronic',
    title: 'Modular Synth & Ambient Night',
    category: 'Live Electronic',
    genre: 'electronic',
    city: 'Bangalore',
    date: 'Dec 31, 2026 • NYE',
    dateFilter: 'dec',
    time: '21:00 PM - 02:00 AM',
    venue: 'Kesari - The Memory Studio, Bangalore',
    venueShort: 'Kesari Studio',
    room: '360° Studio Hall (50 Pax)',
    roomType: 'main-stage',
    decibels: '96 dB Analog • Sub Bass',
    ticketCode: 'KSR-NYE-1231',
    capacity: { total: 50, booked: 44, remaining: 6, percentage: 88 },
    price: 1850,
    priceLabel: '₹1,850',
    image: '/assets/fluid_art.jpg',
    badge: '🎆 Studio NYE Special',
    featured: true,
    description: 'An intimate 360-degree audio immersion with live analog modular synths, ambient light projections, and deep bass at Kesari Studio, Bangalore.',
    lineup: [
      { name: 'Klangwelt Collective', role: 'Live Modular Set', time: '23:30 PM', img: '/assets/artist_3.png' },
      { name: 'Aura Pulse', role: 'Ambient Soundscape', time: '21:30 PM', img: '/assets/artist_1.png' }
    ],
    tiers: [
      { id: 'ga', name: 'Studio Entry Pass', price: 1850, perks: 'Full audio visual access' },
      { id: 'vip', name: 'VIP Acoustic Lounge Seat', price: 3600, perks: 'Front row studio seating, priority beverage service' },
      { id: 'all', name: 'All-Night Studio VIP', price: 6200, perks: 'All-night access, sound engineer session invite' }
    ]
  }
];

export const CITIES = [
  'Kesari Studio, Bangalore'
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
