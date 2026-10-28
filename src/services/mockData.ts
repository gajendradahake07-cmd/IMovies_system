import { Movie, Theatre, Showtime, ConcessionItem, Booking, User, ProjectEpic } from '../types/cinema';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 'mov-1',
    title: 'Horizon: Beyond The Ring',
    tagline: 'The final frontier is not a place, it is a choice.',
    synopsis: 'When a mysterious gravity wave disrupts the rings of Saturn, veteran pilot Sarah Vance leads humanity\'s first interstellar vessel into the unknown cosmic vortex to save Earth from planetary collapse.',
    releaseYear: 2026,
    durationMinutes: 168,
    rating: 9.3,
    reviewCount: 38400,
    ageCertification: 'PG-13',
    genres: ['Sci-Fi', 'Adventure', 'Mystery'],
    director: 'Christopher Nolan',
    cast: ['Sarah Vance', 'David Chen', 'Elena Rostova', 'Marcus Thorne'],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX', 'Standard 2D'],
    posterUrl: '/src/assets/images/hero_cinematic_scifi_1793178316895.jpg',
    backdropUrl: '/src/assets/images/hero_cinematic_scifi_1793178316895.jpg',
    trailerVideoId: 'dQw4w9WgXcQ', // Safe preview placeholder ID
    isNowShowing: true,
    featured: true,
  },
  {
    id: 'mov-2',
    title: 'The Luminous Grove',
    tagline: 'A journey into light and wonder.',
    synopsis: 'A courageous young explorer named Lyra and her bioluminescent companion embark on an enchanting quest through an ancient sacred forest to restore the whispering heartwood before eternal shadow falls.',
    releaseYear: 2026,
    durationMinutes: 104,
    rating: 8.8,
    reviewCount: 22150,
    ageCertification: 'PG',
    genres: ['Animation', 'Family', 'Fantasy'],
    director: 'Kelsey Mann',
    cast: ['Eliza Johnson', 'Liam O\'Neil', 'Maya Lin', 'Brendan Fraser'],
    formats: ['Dolby Atmos', 'Standard 2D'],
    posterUrl: '/src/assets/images/movie_poster_animated_adventure_1793178318924.jpg',
    backdropUrl: '/src/assets/images/movie_poster_animated_adventure_1793178318924.jpg',
    trailerVideoId: 'EngW7tLk6R8',
    isNowShowing: true,
    featured: false,
  },
  {
    id: 'mov-3',
    title: 'The Maestro of Shadows',
    tagline: 'Uncompromising. Passionate. Obsessed.',
    synopsis: 'Set during the dramatic golden age of European opera, an enigmatic orchestral maestro fights madness, fierce conservatory rivalry, and royal intrigue to compose a symphony that will echo through centuries.',
    releaseYear: 2026,
    durationMinutes: 142,
    rating: 9.1,
    reviewCount: 17800,
    ageCertification: 'R',
    genres: ['Drama', 'Biopic', 'Music'],
    director: 'Todd Field',
    cast: ['Alexander Rhodes', 'Clara Vance', 'Jean-Luc Moreau', 'Helena Brandt'],
    formats: ['Dolby Atmos', 'Standard 2D'],
    posterUrl: '/src/assets/images/movie_poster_drama_biopic_1793178320232.jpg',
    backdropUrl: '/src/assets/images/movie_poster_drama_biopic_1793178320232.jpg',
    trailerVideoId: 'M7lc1UVf-VE',
    isNowShowing: true,
    featured: false,
  },
  {
    id: 'mov-4',
    title: 'Apex Protocol: Tokyo Zero',
    tagline: 'When the city sleeps, the syndicate falls.',
    synopsis: 'A disgraced covert extraction specialist is reactivated for a 72-hour pursuit across the rain-slick neon alleyways and bullet trains of Tokyo to intercept a stolen neural weapon before black market auction.',
    releaseYear: 2026,
    durationMinutes: 135,
    rating: 8.7,
    reviewCount: 31200,
    ageCertification: 'R',
    genres: ['Action', 'Thriller', 'Crime'],
    director: 'Chad Stahelski',
    cast: ['Kenji Sato', 'Rachel Sterling', 'Hiroyuki Sanada', 'Ana de Armas'],
    formats: ['IMAX 3D', '4DX', 'Dolby Atmos'],
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    trailerVideoId: 'kJQP7kiw5Fk',
    isNowShowing: true,
    featured: false,
  },
  {
    id: 'mov-5',
    title: 'Quantum Paradox',
    tagline: 'Every timeline has a cost.',
    synopsis: 'Physicists at a sub-zero CERN facility accidentally open a pocket universe where past versions of themselves begin arriving with conflicting memories of Earth\'s final days.',
    releaseYear: 2026,
    durationMinutes: 152,
    rating: 8.9,
    reviewCount: 19400,
    ageCertification: 'PG-13',
    genres: ['Sci-Fi', 'Thriller'],
    director: 'Denis Villeneuve',
    cast: ['Gillian Jacobs', 'Christian Bale', 'Tessa Thompson', 'Paul Dano'],
    formats: ['IMAX 3D', 'Dolby Atmos'],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    trailerVideoId: 'zSWdZVtXT7E',
    isNowShowing: false,
    featured: false,
  },
  {
    id: 'mov-6',
    title: 'The Silent Depths',
    tagline: 'In the abyss, silence is the only witness.',
    synopsis: 'A deep-sea archaeological team trapped in the Mariana Trench discovers an intact subterranean temple older than human history, awakening an ancient subterranean geothermal resonance.',
    releaseYear: 2026,
    durationMinutes: 128,
    rating: 8.5,
    reviewCount: 14300,
    ageCertification: 'PG-13',
    genres: ['Mystery', 'Adventure', 'Thriller'],
    director: 'James Cameron',
    cast: ['Michael Shannon', 'Lupita Nyong\'o', 'Sam Worthington', 'Zoe Saldana'],
    formats: ['IMAX 3D', '4DX', 'Standard 2D'],
    posterUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&auto=format&fit=crop&q=80',
    trailerVideoId: 'yPYZpwSpKmA',
    isNowShowing: false,
    featured: false,
  }
];

export const THEATRES: Theatre[] = [
  {
    id: 'th-1',
    name: 'IMovies Grand Horizon Cinema',
    city: 'Downtown Metro',
    address: '450 Boulevard of the Stars, Suite 100',
    screens: [
      { id: 'scr-1', name: 'Auditorium 1 (IMAX Laser)', format: 'IMAX 3D', totalSeats: 120 },
      { id: 'scr-2', name: 'Auditorium 2 (Dolby Cinema)', format: 'Dolby Atmos', totalSeats: 96 },
      { id: 'scr-3', name: 'Auditorium 3 (4DX Motion)', format: '4DX', totalSeats: 72 },
    ]
  },
  {
    id: 'th-2',
    name: 'IMovies CineDome Premiere',
    city: 'Westside Center',
    address: '1280 Sunset Galleria Blvd',
    screens: [
      { id: 'scr-4', name: 'Hall Alpha (Dolby Atmos)', format: 'Dolby Atmos', totalSeats: 110 },
      { id: 'scr-5', name: 'Hall Beta (Standard Screen)', format: 'Standard 2D', totalSeats: 88 },
    ]
  },
  {
    id: 'th-3',
    name: 'IMovies Starlight Multiplex',
    city: 'North Hills',
    address: '890 Riverside Promenade',
    screens: [
      { id: 'scr-6', name: 'IMAX Experience 1', format: 'IMAX 3D', totalSeats: 140 },
      { id: 'scr-7', name: 'Screen 2 (Deluxe)', format: 'Standard 2D', totalSeats: 80 },
    ]
  }
];

// Generate showtimes for today, tomorrow, and day after tomorrow
export const generateShowtimes = (): Showtime[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  const times = ['10:30', '13:45', '16:30', '19:15', '22:00'];
  const showtimes: Showtime[] = [];

  INITIAL_MOVIES.forEach((movie) => {
    if (!movie.isNowShowing) return;

    THEATRES.forEach((theatre) => {
      theatre.screens.forEach((screen) => {
        if (!movie.formats.includes(screen.format)) return;

        dates.forEach((date, dateIdx) => {
          // Select 2-3 showtimes per screen per day
          const screenTimes = dateIdx % 2 === 0 ? [times[1], times[3]] : [times[0], times[2], times[4]];
          
          screenTimes.forEach((time, tIdx) => {
            const basePrice = screen.format === 'IMAX 3D' ? 21.00 :
                             screen.format === 'Dolby Atmos' ? 18.50 :
                             screen.format === '4DX' ? 23.00 : 14.50;

            showtimes.push({
              id: `st-${movie.id}-${theatre.id}-${screen.id}-${date}-${time.replace(':', '')}`,
              movieId: movie.id,
              theatreId: theatre.id,
              theatreName: theatre.name,
              screenFormat: screen.format,
              hallName: screen.name,
              date,
              time,
              basePrice,
              language: 'English (Atmos 7.1.4)'
            });
          });
        });
      });
    });
  });

  return showtimes;
};

export const CONCESSIONS: ConcessionItem[] = [
  {
    id: 'cnc-1',
    name: 'Truffle Butter Cinema Popcorn',
    category: 'Popcorn',
    price: 9.50,
    size: 'Large Bucket (150oz)',
    description: 'Freshly air-popped artisan corn infused with black truffle butter and sea salt.',
    iconName: 'Popcorn',
    badge: 'Audience Favorite'
  },
  {
    id: 'cnc-2',
    name: 'Caramel & Cheddar Duo Popcorn',
    category: 'Popcorn',
    price: 8.75,
    size: 'Regular (85oz)',
    description: 'Chicago-style sweet brown sugar caramel mixed with sharp aged Wisconsin cheddar.',
    iconName: 'Popcorn'
  },
  {
    id: 'cnc-3',
    name: 'IMAX Mega Combo',
    category: 'Combos',
    price: 18.50,
    description: '1 Large Popcorn + 2 Large Fountain Drinks + 1 Choice of Gourmet Candy.',
    iconName: 'Utensils',
    badge: 'Save 22%'
  },
  {
    id: 'cnc-4',
    name: 'Artisan Loaded Nachos',
    category: 'Bites',
    price: 10.50,
    description: 'Crispy stone-ground blue & yellow corn tortilla chips, warm queso blanco, jalapenos, and pico de gallo.',
    iconName: 'Cookie'
  },
  {
    id: 'cnc-5',
    name: 'Chilled Craft Soda / Slush',
    category: 'Beverages',
    price: 6.25,
    size: 'Large (32oz)',
    description: 'Self-serve premium craft soda fountains or frozen cherry cola glacier ice.',
    iconName: 'CupSoda'
  },
  {
    id: 'cnc-6',
    name: 'Churros with Belgian Chocolate',
    category: 'Bites',
    price: 8.00,
    description: 'Four cinnamon-dusted warm Spanish churros served with rich dark chocolate dipping ganache.',
    iconName: 'Sparkles'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    role: 'moviegoer',
    membershipTier: 'Gold Cinephile',
    loyaltyPoints: 1450,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3ItMSIsInJvbGUiOiJtb3ZpZWdvZXIifQ.mock_signature_key_2026'
  },
  {
    id: 'usr-admin',
    name: 'Elena Rostova (Theatre Admin)',
    email: 'admin@imovies-cinema.com',
    role: 'admin',
    membershipTier: 'VIP Premiere',
    loyaltyPoints: 9800,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3ItYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ.mock_signature_admin_key'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    bookingCode: 'IM-8492-X',
    userId: 'usr-1',
    userName: 'Alex Rivera',
    userEmail: 'alex.rivera@example.com',
    movieId: 'mov-1',
    movieTitle: 'Horizon: Beyond The Ring',
    moviePoster: '/src/assets/images/hero_cinematic_scifi_1793178316895.jpg',
    theatreName: 'IMovies Grand Horizon Cinema',
    screenFormat: 'IMAX 3D',
    hallName: 'Auditorium 1 (IMAX Laser)',
    showDate: new Date().toISOString().split('T')[0],
    showTime: '19:15',
    seats: ['F-7', 'F-8'],
    seatTiers: 'VIP Recliner (2 seats)',
    concessions: [
      { itemId: 'cnc-1', name: 'Truffle Butter Cinema Popcorn', price: 9.50, quantity: 1 },
      { itemId: 'cnc-5', name: 'Chilled Craft Soda / Slush', price: 6.25, quantity: 2 }
    ],
    ticketsSubtotal: 48.00,
    concessionsSubtotal: 22.00,
    convenienceFee: 3.50,
    tax: 5.60,
    totalAmount: 79.10,
    paymentMethod: 'Apple Pay (**** 4092)',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    qrPayload: 'IMOVIES-TICKET-IM-8492-X-HORIZON-SEATS-F7-F8'
  }
];

// Project Documentation Epics (6 Epics, 19 Tasks total)
export const PROJECT_EPICS: ProjectEpic[] = [
  {
    id: 'EPIC-1',
    title: 'Epic 1: User Authentication & Profile Security',
    description: 'Implements secure JWT user onboarding, role-based access control (Moviegoers vs Cinema Admins), password hashing, and persistent session management.',
    status: 'Completed',
    tasks: [
      {
        id: 'TASK-1',
        title: 'User Registration & Validation API',
        description: 'Implement Express REST route `/api/auth/register` with schema validation for email format, password complexity, and duplicate check.',
        skills: ['Node.js', 'Express.js', 'MongoDB', 'Async JS'],
        completed: true
      },
      {
        id: 'TASK-2',
        title: 'JWT Token Generation & Verification Middleware',
        description: 'Implement HMAC-SHA256 token issuance on login with expiry, Bearer token extraction in authorization headers, and verification middleware.',
        skills: ['JSON Web Token (JWT)', 'Node.js', 'Express.js'],
        completed: true
      },
      {
        id: 'TASK-3',
        title: 'User Profile & Loyalty Rewards Store',
        description: 'Provide endpoints to fetch user profile, loyalty points, past reservations, and tier status (Silver, Gold Cinephile, VIP Premiere).',
        skills: ['React.js', 'MongoDB', 'JavaScript'],
        completed: true
      }
    ]
  },
  {
    id: 'EPIC-2',
    title: 'Epic 2: Movie Catalog & Exploration Engine',
    description: 'Interactive movie discovery featuring Now Showing, Coming Soon, multi-genre filtering, high-resolution media previews, and certification guides.',
    status: 'Completed',
    tasks: [
      {
        id: 'TASK-4',
        title: 'Movie Schema & MongoDB Aggregation API',
        description: 'Model movie documents with title, genres, duration, director, cast, age rating, media assets, and format support.',
        skills: ['MongoDB', 'Express.js', 'JavaScript'],
        completed: true
      },
      {
        id: 'TASK-5',
        title: 'Dynamic Filter & Search Controller',
        description: 'Enable client-side and server-side filtering by genre, release state, format (IMAX, Dolby, 4DX), and title search keyword.',
        skills: ['React.js', 'Async JS', 'CSS'],
        completed: true
      },
      {
        id: 'TASK-6',
        title: 'Movie Detail Modal & Video Trailer Player',
        description: 'Interactive modal with trailer player embed, synopsis, reviews counter, and direct transition to showtimes selection.',
        skills: ['HTML', 'CSS', 'React.js'],
        completed: true
      }
    ]
  },
  {
    id: 'EPIC-3',
    title: 'Epic 3: Showtime & Hall Scheduling',
    description: 'Coordinates multi-theatre auditoriums, screen format assignments (IMAX 3D, Dolby Atmos, 4DX), and multi-day schedule mapping.',
    status: 'Completed',
    tasks: [
      {
        id: 'TASK-7',
        title: 'Multi-Theatre & Screen Hierarchy Schema',
        description: 'Define relational entities for Theatre Complexes, Screening Halls, audio formats, and seat capacities.',
        skills: ['MongoDB', 'Express.js'],
        completed: true
      },
      {
        id: 'TASK-8',
        title: 'Interactive Date & Slot Matrix Selector',
        description: 'Frontend component for 5-day horizon selection, theatre venue picker, and morning/matinee/evening/night time slot filters.',
        skills: ['React.js', 'JavaScript', 'CSS'],
        completed: true
      },
      {
        id: 'TASK-9',
        title: 'Dynamic Pricing by Screen Format & Tier',
        description: 'Calculate real-time base ticket rates based on hall technology (IMAX Laser vs Dolby Cinema vs 4DX Motion).',
        skills: ['JavaScript', 'Async JS'],
        completed: true
      }
    ]
  },
  {
    id: 'EPIC-4',
    title: 'Epic 4: Real-Time Interactive Seat Reservation',
    description: 'Cinematic auditorium seating map with curved screen glow, tier color codes (VIP, Premium, Standard, Accessible), and temporary hold timers.',
    status: 'Completed',
    tasks: [
      {
        id: 'TASK-10',
        title: 'Curved Auditorium Seating Map Component',
        description: 'Render responsive 8-row x 14-column cinema seating grid with row letters, aisles, wheelchair spaces, and stage perspective.',
        skills: ['HTML', 'CSS', 'React.js', 'Bootstrap/Tailwind'],
        completed: true
      },
      {
        id: 'TASK-11',
        title: 'Real-Time Availability & Race Condition Lock',
        description: 'Track seat state transitions (available, held, reserved, selected) with a 5-minute checkout countdown timer preventing duplicate locks.',
        skills: ['JavaScript', 'Async JS', 'Express.js'],
        completed: true
      },
      {
        id: 'TASK-12',
        title: 'Multi-Seat Selection & Live Price Summary',
        description: 'Support multi-seat selection, maximum seat limits (max 8 seats per booking), and live price calculations.',
        skills: ['React.js', 'JavaScript'],
        completed: true
      }
    ]
  },
  {
    id: 'EPIC-5',
    title: 'Epic 5: Concessions, Checkout & Digital Ticketing',
    description: 'Food & beverage upsell drawer, item quantity steppers, taxes & convenience fees computation, and instant boarding pass generation.',
    status: 'Completed',
    tasks: [
      {
        id: 'TASK-13',
        title: 'Concession Catalog & Order Aggregator',
        description: 'Curated cinema concessions (Artisan popcorn, craft sodas, nachos, combo deals) with live quantity steppers.',
        skills: ['React.js', 'JavaScript', 'CSS'],
        completed: true
      },
      {
        id: 'TASK-14',
        title: 'Multi-Method Checkout & Payment Processor',
        description: 'Payment gateway simulation supporting Card, Apple Pay / Google Pay, and Cash Box Office confirmation.',
        skills: ['React.js', 'Async JS', 'Node.js'],
        completed: true
      },
      {
        id: 'TASK-15',
        title: 'Digital Boarding Pass & QR Code Generator',
        description: 'Generate high-fidelity cinema e-tickets with barcode/QR verification token, hall number, and print/download action.',
        skills: ['HTML', 'CSS', 'JavaScript'],
        completed: true
      },
      {
        id: 'TASK-16',
        title: 'Order Confirmation Email & Receipt Dispatch',
        description: 'Dispatch transaction confirmation payload with unique booking reference code (e.g., IM-9421-X).',
        skills: ['Node.js', 'Express.js'],
        completed: true
      }
    ]
  },
  {
    id: 'EPIC-6',
    title: 'Epic 6: Booking Management, Refunds & Admin Analytics',
    description: 'Self-service cancellation with refund tiers, ticket history wallet, and cinema administrator dashboard for occupancy analytics.',
    status: 'Completed',
    tasks: [
      {
        id: 'TASK-17',
        title: 'User Ticket Wallet & Booking History',
        description: 'Dashboard displaying user\'s upcoming and past cinema tickets, show countdowns, and quick access to digital passes.',
        skills: ['React.js', 'CSS', 'MongoDB'],
        completed: true
      },
      {
        id: 'TASK-18',
        title: 'Ticket Cancellation & Refund Calculation Engine',
        description: 'Allow users to cancel reservations prior to showtime with automated refund computation and seat release.',
        skills: ['Express.js', 'Node.js', 'Async JS'],
        completed: true
      },
      {
        id: 'TASK-19',
        title: 'Admin Cinema Dashboard & Occupancy Metrics',
        description: 'Managerial console showing live hall occupancy %, total gross ticket revenues, active screenings, and seat overrides.',
        skills: ['React.js', 'Express.js', 'Bootstrap/Tailwind'],
        completed: true
      }
    ]
  }
];
