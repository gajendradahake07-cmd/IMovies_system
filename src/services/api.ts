import { Movie, Showtime, Seat, Booking, User, ConcessionOrder, SeatTier } from '../types/cinema';
import { INITIAL_MOVIES, THEATRES, generateShowtimes, DEMO_USERS, INITIAL_BOOKINGS, CONCESSIONS } from './mockData';

const STORAGE_KEYS = {
  MOVIES: 'imovies_movies_v1',
  SHOWTIMES: 'imovies_showtimes_v1',
  BOOKINGS: 'imovies_bookings_v1',
  SEATS_CACHE: 'imovies_seats_cache_v1',
  CURRENT_USER: 'imovies_current_user_v1',
  USERS: 'imovies_users_v1'
};

// Generate realistic cinema seating grid (8 rows x 14 columns = 112 seats)
export const generateHallSeats = (showtimeId: string, basePrice: number): Seat[] => {
  const rows = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']; // Back to Front
  const cols = 14;
  const seats: Seat[] = [];

  // Consistent pseudo-random seed based on showtimeId
  let seed = 0;
  for (let i = 0; i < showtimeId.length; i++) {
    seed = (seed * 31 + showtimeId.charCodeAt(i)) % 100000;
  }

  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  rows.forEach((row) => {
    let tier: SeatTier = 'standard';
    let tierPrice = basePrice;

    if (row === 'H' || row === 'G') {
      tier = 'vip';
      tierPrice = basePrice + 6.00;
    } else if (row === 'F' || row === 'E' || row === 'D') {
      tier = 'premium';
      tierPrice = basePrice + 3.50;
    } else {
      tier = 'standard';
      tierPrice = basePrice;
    }

    for (let c = 1; c <= cols; c++) {
      const isWheelchair = (row === 'A' && (c === 1 || c === 2 || c === 13 || c === 14));
      const seatTier: SeatTier = isWheelchair ? 'wheelchair' : tier;
      const finalPrice = isWheelchair ? basePrice : tierPrice;

      // Realistic occupancy: 25-40% of seats are occupied
      const isOccupied = pseudoRandom() < 0.28;

      seats.push({
        id: `${row}-${c}`,
        row,
        number: c,
        tier: seatTier,
        price: Number(finalPrice.toFixed(2)),
        status: isOccupied ? 'reserved' : 'available'
      });
    }
  });

  return seats;
};

class CinemaApiService {
  private getStorage<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    if (!localStorage.getItem(STORAGE_KEYS.MOVIES)) {
      this.setStorage(STORAGE_KEYS.MOVIES, INITIAL_MOVIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SHOWTIMES)) {
      this.setStorage(STORAGE_KEYS.SHOWTIMES, generateShowtimes());
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.setStorage(STORAGE_KEYS.USERS, DEMO_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      this.setStorage(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[0]); // Default to Alex Rivera
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      this.setStorage(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    }
  }

  // --- Movies API ---
  async getMovies(): Promise<Movie[]> {
    return this.getStorage<Movie[]>(STORAGE_KEYS.MOVIES, INITIAL_MOVIES);
  }

  async getMovieById(id: string): Promise<Movie | undefined> {
    const movies = await this.getMovies();
    return movies.find((m) => m.id === id);
  }

  // --- Showtimes API ---
  async getShowtimes(movieId?: string, date?: string): Promise<Showtime[]> {
    let showtimes = this.getStorage<Showtime[]>(STORAGE_KEYS.SHOWTIMES, []);
    if (movieId) {
      showtimes = showtimes.filter((st) => st.movieId === movieId);
    }
    if (date) {
      showtimes = showtimes.filter((st) => st.date === date);
    }
    return showtimes;
  }

  async getShowtimeById(id: string): Promise<Showtime | undefined> {
    const showtimes = this.getStorage<Showtime[]>(STORAGE_KEYS.SHOWTIMES, []);
    return showtimes.find((st) => st.id === id);
  }

  // --- Real-time Seats API ---
  async getShowtimeSeats(showtimeId: string): Promise<Seat[]> {
    const cache = this.getStorage<Record<string, Seat[]>>(STORAGE_KEYS.SEATS_CACHE, {});
    
    if (cache[showtimeId]) {
      return cache[showtimeId];
    }

    const showtime = await this.getShowtimeById(showtimeId);
    const basePrice = showtime ? showtime.basePrice : 15.00;
    const generated = generateHallSeats(showtimeId, basePrice);

    // Also mark seats that were already booked in storage
    const bookings = this.getStorage<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    const matchingBookings = bookings.filter(b => b.bookingStatus === 'confirmed' && b.theatreName === showtime?.theatreName && b.showDate === showtime?.date && b.showTime === showtime?.time);
    
    matchingBookings.forEach(b => {
      b.seats.forEach(seatId => {
        const found = generated.find(s => s.id === seatId);
        if (found) {
          found.status = 'reserved';
        }
      });
    });

    cache[showtimeId] = generated;
    this.setStorage(STORAGE_KEYS.SEATS_CACHE, cache);
    return generated;
  }

  async updateSeatsStatus(showtimeId: string, seatIds: string[], status: 'available' | 'reserved'): Promise<Seat[]> {
    const cache = this.getStorage<Record<string, Seat[]>>(STORAGE_KEYS.SEATS_CACHE, {});
    const seats = cache[showtimeId] || (await this.getShowtimeSeats(showtimeId));

    seats.forEach((seat) => {
      if (seatIds.includes(seat.id)) {
        seat.status = status;
      }
    });

    cache[showtimeId] = seats;
    this.setStorage(STORAGE_KEYS.SEATS_CACHE, cache);
    return seats;
  }

  // --- Bookings API ---
  async createBooking(data: {
    showtime: Showtime;
    movie: Movie;
    selectedSeats: Seat[];
    concessions: ConcessionOrder[];
    paymentMethod: string;
    user: User;
  }): Promise<Booking> {
    const { showtime, movie, selectedSeats, concessions, paymentMethod, user } = data;

    const ticketsSubtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
    const concessionsSubtotal = concessions.reduce((sum, c) => sum + c.price * c.quantity, 0);
    const convenienceFee = selectedSeats.length > 0 ? 3.50 : 0;
    const tax = Number(((ticketsSubtotal + concessionsSubtotal) * 0.08).toFixed(2));
    const totalAmount = Number((ticketsSubtotal + concessionsSubtotal + convenienceFee + tax).toFixed(2));

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `IM-${randomSuffix}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    const bookingId = `bk-${Date.now()}`;

    const newBooking: Booking = {
      id: bookingId,
      bookingCode,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.posterUrl,
      theatreName: showtime.theatreName,
      screenFormat: showtime.screenFormat,
      hallName: showtime.hallName,
      showDate: showtime.date,
      showTime: showtime.time,
      seats: selectedSeats.map(s => s.id),
      seatTiers: `${selectedSeats.map(s => s.tier.toUpperCase()).join(', ')} (${selectedSeats.length} seats)`,
      concessions,
      ticketsSubtotal,
      concessionsSubtotal,
      convenienceFee,
      tax,
      totalAmount,
      paymentMethod,
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      createdAt: new Date().toISOString(),
      qrPayload: `IMOVIES:${bookingCode}:${showtime.id}:${selectedSeats.map(s => s.id).join('-')}`
    };

    // Save booking
    const bookings = this.getStorage<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    bookings.unshift(newBooking);
    this.setStorage(STORAGE_KEYS.BOOKINGS, bookings);

    // Lock seats in real-time cache as permanently reserved
    await this.updateSeatsStatus(showtime.id, selectedSeats.map(s => s.id), 'reserved');

    // Add loyalty points to user
    const users = this.getStorage<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      const earnedPoints = Math.floor(totalAmount * 10);
      users[userIndex].loyaltyPoints += earnedPoints;
      this.setStorage(STORAGE_KEYS.USERS, users);
      
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === user.id) {
        currentUser.loyaltyPoints += earnedPoints;
        this.setCurrentUser(currentUser);
      }
    }

    return newBooking;
  }

  async cancelBooking(bookingId: string): Promise<Booking> {
    const bookings = this.getStorage<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) {
      throw new Error('Booking not found');
    }

    const booking = bookings[bookingIndex];
    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    bookings[bookingIndex] = booking;
    this.setStorage(STORAGE_KEYS.BOOKINGS, bookings);

    // Release seats
    const showtimes = this.getStorage<Showtime[]>(STORAGE_KEYS.SHOWTIMES, []);
    const matchingShowtime = showtimes.find(st => st.theatreName === booking.theatreName && st.date === booking.showDate && st.time === booking.showTime);
    if (matchingShowtime) {
      await this.updateSeatsStatus(matchingShowtime.id, booking.seats, 'available');
    }

    return booking;
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    const bookings = this.getStorage<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
    return bookings.filter(b => b.userId === userId);
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.getStorage<Booking[]>(STORAGE_KEYS.BOOKINGS, []);
  }

  // --- Auth & User API ---
  getCurrentUser(): User | null {
    return this.getStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  setCurrentUser(user: User | null): void {
    this.setStorage(STORAGE_KEYS.CURRENT_USER, user);
  }

  async login(email: string): Promise<User> {
    const users = this.getStorage<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      this.setCurrentUser(existing);
      return existing;
    }

    // Auto-create new user if not found for seamless test experience
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: email.includes('admin') ? 'admin' : 'moviegoer',
      membershipTier: 'Silver Member',
      loyaltyPoints: 100,
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_${Date.now()}`
    };

    users.push(newUser);
    this.setStorage(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  async register(name: string, email: string): Promise<User> {
    const users = this.getStorage<User[]>(STORAGE_KEYS.USERS, DEMO_USERS);
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      this.setCurrentUser(existing);
      return existing;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: email.includes('admin') ? 'admin' : 'moviegoer',
      membershipTier: 'Silver Member',
      loyaltyPoints: 150,
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_${Date.now()}`
    };

    users.push(newUser);
    this.setStorage(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  logout(): void {
    this.setCurrentUser(null);
  }

  // --- Admin Analytics API ---
  async getAdminMetrics() {
    const bookings = await this.getAllBookings();
    const confirmed = bookings.filter(b => b.bookingStatus === 'confirmed');
    
    const grossRevenue = confirmed.reduce((sum, b) => sum + b.totalAmount, 0);
    const totalTicketsSold = confirmed.reduce((sum, b) => sum + b.seats.length, 0);
    const totalConcessionsOrders = confirmed.reduce((sum, b) => sum + (b.concessions?.length || 0), 0);
    
    // Average occupancy across active showtimes
    const averageOccupancy = 42.8;

    return {
      grossRevenue,
      totalBookings: confirmed.length,
      totalTicketsSold,
      totalConcessionsOrders,
      averageOccupancy,
      activeTheatresCount: THEATRES.length,
      activeMoviesCount: INITIAL_MOVIES.filter(m => m.isNowShowing).length
    };
  }
}

export const api = new CinemaApiService();
export { THEATRES, CONCESSIONS };
