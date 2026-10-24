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

// 2. KESARI MEMBERSHIPS — Come for a coffee. Find your place.
// Space rate: ₹250/hr • Tea/Coffee: ₹120 each • Mon-Thu: 10am-6pm (8h), Fri: 10am-3pm (5h) = 37 hrs/week
export const KESARI_MEMBERSHIP_META = {
  headline: 'Come for a coffee. Find your place.',
  intro: "Some days you need somewhere to focus. Some days you need good food, meaningful conversations, or just a change of scene. At Kesari, you don't have to choose.",
  motto: 'Work here. Eat here. Meet here. Belong here.',
  hoursNote: 'Coworking Hours: Mon–Thu 10:00 AM – 6:00 PM · Fri 10:00 AM – 3:00 PM (37h/week)',
  spaceRatePerHour: 250,
  teaRateEach: 120,
  footerNote: 'Three ways to belong. One place to call yours.',
  terms: 'Monthly memberships. Personal beverage redemptions only. Regular Kesari-hosted community events included subject to RSVP and availability. Terms apply.'
};

export const MONTHLY_PASSES = [
  {
    id: 'pass-everyday',
    name: 'THE EVERYDAY',
    headline: 'A little more Kesari in your everyday life.',
    price: 3000,
    billing: '₹3,000 / month',
    tierTag: 'ESSENTIAL',
    popular: false,
    theme: 'everyday',
    workdays: '10 Workdays / month',
    workHoursTotal: '75+ Space Hours',
    spaceValue: 18750, // 75 hrs * ₹250
    teaCount: '15 Complimentary Teas / Coffees',
    teaValue: 1800, // 15 * ₹120
    diningCredit: '—',
    diningValue: 0,
    communityValue: 1500,
    totalValue: 22050,
    savingsText: 'Save ₹19,050 · 86% OFF',
    highlight: '10 workdays · 15 artisan teas/coffees · community events',
    perks: [
      '10 Workdays Access (Mon–Thu 10am–6pm, Fri 10am–3pm)',
      '15 Complimentary Artisan Teas or Coffees (₹120 value each)',
      'Acoustic Studio Desks & High-Speed Fiber WiFi',
      'Access to Regular Community Jam & Acoustic Evenings'
    ],
    valueBreakdown: [
      { label: 'Coworking Space (75 hrs @ ₹250/hr)', value: '₹18,750' },
      { label: '15 Teas / Specialty Coffees (@ ₹120 each)', value: '₹1,800' },
      { label: 'Community Events & Experiences', value: '₹1,500' }
    ]
  },
  {
    id: 'pass-ritual',
    name: 'THE RITUAL',
    headline: 'Make Kesari part of your routine.',
    price: 5000,
    billing: '₹5,000 / month',
    tierTag: 'MOST POPULAR',
    popular: true,
    theme: 'ritual',
    workdays: '20 Workdays / month (Full Month)',
    workHoursTotal: '150+ Space Hours',
    spaceValue: 37500, // 150 hrs * ₹250
    teaCount: '30 Complimentary Teas / Coffees (Daily)',
    teaValue: 3600, // 30 * ₹120
    diningCredit: '₹700 Café Dining Credit',
    diningValue: 700,
    communityValue: 2500,
    totalValue: 44300,
    savingsText: 'Save ₹39,300 · 89% OFF',
    highlight: '20 workdays · 30 teas/coffees · ₹700 dining credit · member privileges',
    perks: [
      '20 Full Workdays Access (Mon–Fri Coworking Schedule)',
      '30 Complimentary Teas or Coffees (1 Daily Craft Brew)',
      '₹700 Café Dining Credit for Artisanal Food & Bites',
      'Special Member Privileges & Priority Community Event RSVP',
      '10% Discount on Sound Equipment & Space Rental'
    ],
    valueBreakdown: [
      { label: 'Coworking Space (150 hrs @ ₹250/hr)', value: '₹37,500' },
      { label: '30 Teas / Specialty Coffees (@ ₹120 each)', value: '₹3,600' },
      { label: 'Café Food & Dining Credit', value: '₹700' },
      { label: 'Member Privileges & Community Access', value: '₹2,500' }
    ]
  },
  {
    id: 'pass-circle',
    name: 'THE CIRCLE',
    headline: 'For those who want Kesari to feel like their second home.',
    price: 7000,
    billing: '₹7,000 / month',
    tierTag: 'ULTIMATE VIP',
    popular: false,
    theme: 'circle',
    workdays: 'Unlimited Workdays (All Month)',
    workHoursTotal: '160+ Space Hours',
    spaceValue: 40000, // 160 hrs * ₹250
    teaCount: '60 Complimentary Teas / Coffees (2 Daily!)',
    teaValue: 7200, // 60 * ₹120 — tea alone exceeds ₹7,000!
    diningCredit: '₹2,000 Café Dining Credit',
    diningValue: 2000,
    communityValue: 4500,
    totalValue: 53700,
    savingsText: 'Save ₹46,700 · 87% OFF',
    highlight: 'Unlimited workdays · 60 teas/coffees · ₹2,000 dining credit · VIP guest access',
    perks: [
      'Unlimited Workdays during Café Coworking Hours',
      '60 Complimentary Teas or Coffees (₹7,200 value alone!)',
      '₹2,000 Café Dining Credit for Meals & Beverages',
      'Priority Event Reservations & VIP Seating',
      'Guest Privileges (Bring collaborators & friends to cowork)',
      'Free 2 Hours Studio Jam / Recording Room Access'
    ],
    valueBreakdown: [
      { label: 'Unlimited Coworking Space (160+ hrs @ ₹250/hr)', value: '₹40,000' },
      { label: '60 Teas / Specialty Coffees (@ ₹120 each)', value: '₹7,200' },
      { label: 'Café Food & Dining Credit', value: '₹2,000' },
      { label: 'Guest Privileges & VIP Studio Access', value: '₹4,500' }
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
    image: '/assets/events/kesari_stage_inside.jpg'
  },
  {
    id: 'acoustic-jam-lounge',
    title: 'Acoustic Jam Room & Lounge',
    capacity: '8 - 15 Guests',
    hourlyRate: '₹800 / hr',
    idealFor: 'Band Jamming, Podcasts, Vocal Tracking, Intimate Jam Circles',
    amenities: 'Guitar amps, vocal mics, drum rug, mood lighting, plush couches',
    image: '/assets/events/kesari_lounge_inside.jpg'
  },
  {
    id: 'full-studio-buyout',
    title: 'Full Studio Private Buyout',
    capacity: 'Up to 75 Guests',
    hourlyRate: 'Half Day: ₹8,000 • Full Day: ₹14,000',
    idealFor: 'Private Parties, Corporate Offsites, Music Video Shoots, Popups',
    amenities: 'Exclusive access to entire studio, sound technician, lounge & green room',
    image: '/assets/events/kesari_stage_inside.jpg'
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
