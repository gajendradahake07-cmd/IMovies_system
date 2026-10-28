export type ScreenFormat = 'IMAX 3D' | 'Dolby Atmos' | '4DX' | 'Standard 2D';

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  releaseYear: number;
  durationMinutes: number;
  rating: number; // e.g. 8.9 / 10
  reviewCount: number;
  ageCertification: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  genres: string[];
  director: string;
  cast: string[];
  formats: ScreenFormat[];
  posterUrl: string;
  backdropUrl: string;
  trailerVideoId?: string; // YouTube ID or sample stream
  isNowShowing: boolean;
  featured?: boolean;
}

export interface TheatreScreen {
  id: string;
  name: string;
  format: ScreenFormat;
  totalSeats: number;
}

export interface Theatre {
  id: string;
  name: string;
  city: string;
  address: string;
  screens: TheatreScreen[];
}

export interface Showtime {
  id: string;
  movieId: string;
  theatreId: string;
  theatreName: string;
  screenFormat: ScreenFormat;
  hallName: string;
  date: string; // YYYY-MM-DD
  time: string; // 14:30
  basePrice: number;
  language: string;
}

export type SeatTier = 'vip' | 'premium' | 'standard' | 'wheelchair';
export type SeatStatus = 'available' | 'reserved' | 'selected' | 'held';

export interface Seat {
  id: string; // e.g. "F-8"
  row: string;
  number: number;
  tier: SeatTier;
  price: number;
  status: SeatStatus;
}

export interface ConcessionItem {
  id: string;
  name: string;
  category: 'Combos' | 'Popcorn' | 'Beverages' | 'Bites';
  price: number;
  size?: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface ConcessionOrder {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Booking {
  id: string;
  bookingCode: string; // e.g. IM-9241-K
  userId: string;
  userName: string;
  userEmail: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  theatreName: string;
  screenFormat: ScreenFormat;
  hallName: string;
  showDate: string;
  showTime: string;
  seats: string[]; // ["E-7", "E-8"]
  seatTiers: string;
  concessions: ConcessionOrder[];
  ticketsSubtotal: number;
  concessionsSubtotal: number;
  convenienceFee: number;
  tax: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'refunded';
  bookingStatus: 'confirmed' | 'cancelled';
  createdAt: string;
  qrPayload: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'moviegoer' | 'admin';
  membershipTier: 'Silver Member' | 'Gold Cinephile' | 'VIP Premiere';
  loyaltyPoints: number;
  token?: string;
}

export interface ProjectEpic {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  tasks: {
    id: string;
    title: string;
    description: string;
    skills: string[];
    completed: boolean;
  }[];
}
