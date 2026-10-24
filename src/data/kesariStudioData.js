// Kesari - The Memory Studio, Koramangala Data
// Official Equipment Rental Catalog, Space Rentals, Monthly Passes, and Contact Details

export const KESARI_CONTACT = {
  name: 'Kesari - The Memory Studio',
  tagline: 'MUSIC | EVENTS | MEETUPS | MEMORIES',
  location: 'Koramangala, Bangalore',
  fullAddress: 'Kesari - The Memory Studio, Koramangala, Bangalore',
  phone: '7760539955',
  whatsappNumber: '917760539955',
  whatsappUrl: (msg) => `https://wa.me/917760539955?text=${encodeURIComponent(msg)}`
};

// 1. Official Sound System & Audio Equipment Available for Rent (From Kesari Poster)
export const RENTAL_EQUIPMENT = [
  {
    id: 'yamaha-dbr',
    name: 'Yamaha DBR Speaker',
    category: 'speakers',
    price: 2500,
    priceUnit: 'each',
    available: 2,
    badge: '2 available',
    desc: 'High output powered active PA loudspeaker with crystal clear live acoustic projection',
    icon: 'speaker'
  },
  {
    id: 'press-on-tower',
    name: 'Press On Tower Speaker',
    category: 'speakers',
    price: 3000,
    priceUnit: 'with 2 mics',
    available: 1,
    badge: 'Includes 2 mics',
    desc: 'High-power portable vertical tower sound column with 2 wireless mics included',
    icon: 'speaker'
  },
  {
    id: 'mixer-6ch',
    name: 'Mixer 6 Channel',
    category: 'mixers',
    price: 1000,
    priceUnit: 'per day',
    available: 1,
    badge: 'Compact 6CH',
    desc: 'Professional 6-channel analog mixing console with EQ & phantom power for acoustic sets',
    icon: 'sliders'
  },
  {
    id: 'mixer-12ch',
    name: 'Mixer 12 Channel',
    category: 'mixers',
    price: 2000,
    priceUnit: 'per day',
    available: 1,
    badge: 'Pro 12CH',
    desc: 'Full-featured 12-channel live mixer with on-board SPX digital effects and multiple aux sends',
    icon: 'sliders'
  },
  {
    id: 'cordless-mic-set',
    name: 'Cordless Mic Set of 2',
    category: 'mics',
    price: 750,
    priceUnit: '1 set',
    available: 1,
    badge: '1 set available',
    desc: 'Dual handheld wireless microphone system with digital receiver and anti-drop frequency',
    icon: 'mic'
  },
  {
    id: 'shure-wire-mic',
    name: 'Shure Wire Mic',
    category: 'mics',
    price: 400,
    priceUnit: 'each',
    available: 2,
    badge: '2 available',
    desc: 'Industry standard dynamic wired microphone for vocals, instruments, and speech',
    icon: 'mic'
  },
  {
    id: 'mic-sm-58',
    name: 'Mic SM 58',
    category: 'mics',
    price: 500,
    priceUnit: 'each',
    available: 4,
    badge: '4 available',
    desc: 'Legendary Shure SM58 vocal dynamic cardioid microphone for live performances',
    icon: 'mic'
  },
  {
    id: 'mic-stand',
    name: 'Mic Stand',
    category: 'stands',
    price: 300,
    priceUnit: 'each',
    available: 3,
    badge: '3 available',
    desc: 'Heavy-duty adjustable boom microphone floor stand with stable tripod base',
    icon: 'disc'
  },
  {
    id: 'small-mic-stand',
    name: 'Small Mic Stand',
    category: 'stands',
    price: 200,
    priceUnit: 'each',
    available: 1,
    badge: '1 available',
    desc: 'Desktop / amplifier compact low-profile microphone stand',
    icon: 'disc'
  },
  {
    id: 'guitar-stand',
    name: 'Guitar Stand',
    category: 'stands',
    price: 150,
    priceUnit: 'each',
    available: 2,
    badge: 'Universal A-frame',
    desc: 'Cushioned universal folding A-frame stand for acoustic, electric, and bass guitars',
    icon: 'music'
  },
  {
    id: 'xlr-cable',
    name: 'XLR Cable',
    category: 'cables',
    price: 300,
    priceUnit: 'each',
    available: 6,
    badge: 'Pro balanced',
    desc: 'Balanced oxygen-free copper XLR male to female audio patch cable',
    icon: 'zap'
  },
  {
    id: 'jack-to-jack',
    name: 'Jack to Jack Cable',
    category: 'cables',
    price: 250,
    priceUnit: 'each',
    available: 6,
    badge: '1/4" Instrument',
    desc: 'Low-noise shielded 1/4" mono instrument cable for guitars and keyboards',
    icon: 'zap'
  },
  {
    id: 'sound-engineer',
    name: 'Sound Engineer',
    category: 'service',
    price: 1500,
    priceUnit: 'event session',
    available: 1,
    badge: 'Live Pro Mixing',
    desc: 'Experienced live audio sound engineer to set up, calibrate acoustics, and mix your live gig',
    icon: 'user'
  }
];

// 2. 3 Types of Kesari Monthly Passes
export const MONTHLY_PASSES = [
  {
    id: 'pass-starter',
    name: 'Creator & Jam Pass',
    tierTag: 'ESSENTIAL',
    price: 1999,
    billing: '₹1,999 / month',
    highlight: 'Ideal for independent musicians, acoustic soloists & podcasters',
    popular: false,
    perks: [
      '6 Hours Studio Jam & Rehearsal Room Access',
      'Free Access to Acoustic Lounge & High-speed WiFi',
      '10% Discount on All Sound Equipment Rentals',
      'Priority Booking for Open Mic Slots'
    ]
  },
  {
    id: 'pass-performer',
    name: 'Performer VIP Pass',
    tierTag: 'MOST POPULAR',
    price: 3999,
    billing: '₹3,999 / month',
    highlight: 'For gigging artists, bands & regular meetup hosts in Koramangala',
    popular: true,
    perks: [
      'Unlimited Free Entry to All Weekly Live Gigs & Open Mics',
      '14 Hours Studio Rehearsal & Recording Space',
      '1 Free Sound Engineer Live Mixing Session',
      '15% Off All Sound System Gear Rentals',
      '1 Complimentary Guest Pass Every Month'
    ]
  },
  {
    id: 'pass-residency',
    name: 'Studio All-Access Residency',
    tierTag: 'ULTIMATE',
    price: 6999,
    billing: '₹6,999 / month',
    highlight: 'Full creative residency with maximum studio hours and gear access',
    popular: false,
    perks: [
      'Unlimited Access to All Kesari Shows & Community Gatherings',
      '30 Hours Studio Space Access with Weekend Priority',
      'Free Basic Audio Gear Rental Included with Sessions',
      'Dedicated Sound Engineer Support for 2 Major Sessions',
      '2 Guest Passes per event + Free Coffee & Green Room Access'
    ]
  }
];

// 3. Space Rental Options at Kesari The Memory Studio, Koramangala
export const SPACE_RENTALS = [
  {
    id: 'main-studio-hall',
    title: 'Main Studio Hall',
    capacity: '40 - 60 Guests',
    hourlyRate: '₹1,500 / hr',
    idealFor: 'Live Gigs, Workshops, Standup Comedy, Poetry, Acoustic Concerts',
    amenities: 'Stage lighting, acoustic wall panels, Yamaha PA system, seating rows',
    image: '/assets/events/hall.webp'
  },
  {
    id: 'acoustic-jam-lounge',
    title: 'Acoustic Jam Room & Lounge',
    capacity: '8 - 15 Guests',
    hourlyRate: '₹800 / hr',
    idealFor: 'Band Jamming, Podcasts, Vocal Tracking, Intimate Jam Circles',
    amenities: 'Guitar amps, vocal mics, drum rug, mood lighting, plush couches',
    image: '/assets/events/lounge.webp'
  },
  {
    id: 'full-studio-buyout',
    title: 'Full Studio Private Buyout',
    capacity: 'Up to 75 Guests',
    hourlyRate: 'Half Day: ₹8,000 • Full Day: ₹14,000',
    idealFor: 'Private Parties, Corporate Offsites, Music Video Shoots, Popups',
    amenities: 'Exclusive access to entire studio, sound technician, lounge & green room',
    image: '/assets/events/hero.webp'
  }
];

// 4. Organise Event Categories
export const EVENT_ORGANISER_CATEGORIES = [
  { id: 'music', label: 'Music Event / Gig', icon: '🎸' },
  { id: 'workshop', label: 'Workshop & Meetup', icon: '🎨' },
  { id: 'standup', label: 'Standup & Open Mic', icon: '🎤' },
  { id: 'private', label: 'Private Gathering / Party', icon: '🎉' },
  { id: 'jam', label: 'Jam Session / Rehearsal', icon: '🥁' }
];
