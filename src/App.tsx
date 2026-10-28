import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MovieGrid } from './components/MovieGrid';
import { TheatresView } from './components/TheatresView';
import { BookingsManagement } from './components/BookingsManagement';
import { AdminConsole } from './components/AdminConsole';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { SeatReservationModal } from './components/SeatReservationModal';
import { ConcessionsDrawer } from './components/ConcessionsDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TicketPassModal } from './components/TicketPassModal';
import { SystemDocsModal } from './components/SystemDocsModal';
import { AuthModal } from './components/AuthModal';
import { DemoVideoModal } from './components/DemoVideoModal';

import { Movie, Showtime, Seat, ConcessionOrder, Booking, User } from './types/cinema';
import { api, THEATRES } from './services/api';
import { Film, BookOpen, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'movies' | 'theatres' | 'tickets' | 'admin' | 'docs'>('movies');

  // Booking Flow Modals
  const [selectedMovieForDetails, setSelectedMovieForDetails] = useState<Movie | null>(null);
  const [seatBookingState, setSeatBookingState] = useState<{ movie: Movie; showtime: Showtime } | null>(null);
  const [concessionsState, setConcessionsState] = useState<{ movie: Movie; showtime: Showtime; selectedSeats: Seat[] } | null>(null);
  const [checkoutState, setCheckoutState] = useState<{
    movie: Movie;
    showtime: Showtime;
    selectedSeats: Seat[];
    concessions: ConcessionOrder[];
  } | null>(null);
  const [activeTicketPass, setActiveTicketPass] = useState<Booking | null>(null);

  // Overlay Modals
  const [showDocsModal, setShowDocsModal] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showDemoVideoModal, setShowDemoVideoModal] = useState<boolean>(false);

  // Initial Data Fetch & URL Query Parameter Detection
  useEffect(() => {
    const user = api.getCurrentUser();
    setCurrentUser(user);

    api.getMovies().then(setMovies);
    api.getAllBookings().then(setBookings);

    // Auto-open demo video if URL contains view=demo-video or demo=video
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'demo-video' || params.get('demo') === 'video') {
        setShowDemoVideoModal(true);
      }
    }
  }, []);

  const refreshBookings = () => {
    api.getAllBookings().then(setBookings);
  };

  // Quick book triggered from Movie Card or Hero Banner
  const handleQuickBook = (movie: Movie) => {
    setSelectedMovieForDetails(movie);
  };

  const handleSelectShowtime = (showtime: Showtime, movie: Movie) => {
    setSelectedMovieForDetails(null);
    setSeatBookingState({ movie, showtime });
  };

  const handleProceedToConcessions = (selectedSeats: Seat[]) => {
    if (!seatBookingState) return;
    const { movie, showtime } = seatBookingState;
    setSeatBookingState(null);
    setConcessionsState({ movie, showtime, selectedSeats });
  };

  const handleProceedToCheckout = (concessions: ConcessionOrder[]) => {
    if (!concessionsState) return;
    const { movie, showtime, selectedSeats } = concessionsState;
    setConcessionsState(null);
    setCheckoutState({ movie, showtime, selectedSeats, concessions });
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setCheckoutState(null);
    refreshBookings();
    setActiveTicketPass(newBooking);
  };

  const featuredMovie = movies.find(m => m.featured) || movies[0];

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingCount={bookings.filter(b => b.bookingStatus === 'confirmed' && (currentUser ? b.userId === currentUser.id : true)).length}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenDocs={() => setShowDocsModal(true)}
        onOpenDemoVideo={() => setShowDemoVideoModal(true)}
        onLogout={() => {
          api.logout();
          setCurrentUser(null);
          if (activeTab === 'admin') setActiveTab('movies');
        }}
      />

      {/* 2. Main View Routing */}
      <main className="flex-1">
        {activeTab === 'movies' && (
          <>
            {/* Cinematic Hero Spotlight */}
            {featuredMovie && (
              <HeroBanner
                movie={featuredMovie}
                onBookTickets={handleQuickBook}
                onWatchTrailer={(movie) => setSelectedMovieForDetails(movie)}
                onOpenDemoVideo={() => setShowDemoVideoModal(true)}
              />
            )}

            {/* Catalog Grid with Filters & Search */}
            <MovieGrid
              movies={movies}
              onSelectMovie={(movie) => setSelectedMovieForDetails(movie)}
              onQuickBook={handleQuickBook}
            />
          </>
        )}

        {activeTab === 'theatres' && (
          <TheatresView
            movies={movies}
            onSelectTheatreForBooking={(theatreId) => {
              setActiveTab('movies');
            }}
          />
        )}

        {activeTab === 'tickets' && (
          <BookingsManagement
            bookings={bookings}
            currentUser={currentUser}
            onViewTicket={(b) => setActiveTicketPass(b)}
            onRefreshBookings={refreshBookings}
            onBrowseMovies={() => setActiveTab('movies')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminConsole
            onClose={() => setActiveTab('movies')}
            onRefresh={refreshBookings}
          />
        )}
      </main>

      {/* 3. Cinema Booking Modal Flow */}

      {/* Step 1: Movie Details & Showtimes Picker */}
      {selectedMovieForDetails && (
        <MovieDetailsModal
          movie={selectedMovieForDetails}
          onClose={() => setSelectedMovieForDetails(null)}
          onSelectShowtime={handleSelectShowtime}
        />
      )}

      {/* Step 2: Interactive Real-Time Seating Map */}
      {seatBookingState && (
        <SeatReservationModal
          movie={seatBookingState.movie}
          showtime={seatBookingState.showtime}
          onClose={() => setSeatBookingState(null)}
          onProceedToConcessions={handleProceedToConcessions}
        />
      )}

      {/* Step 3: Concessions & Snacks Add-on */}
      {concessionsState && (
        <ConcessionsDrawer
          movie={concessionsState.movie}
          showtime={concessionsState.showtime}
          selectedSeats={concessionsState.selectedSeats}
          onBackToSeats={() => {
            setSeatBookingState({
              movie: concessionsState.movie,
              showtime: concessionsState.showtime
            });
            setConcessionsState(null);
          }}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {/* Step 4: Checkout & Payment Confirmation */}
      {checkoutState && (
        <CheckoutModal
          movie={checkoutState.movie}
          showtime={checkoutState.showtime}
          selectedSeats={checkoutState.selectedSeats}
          concessions={checkoutState.concessions}
          currentUser={currentUser}
          onBackToConcessions={() => {
            setConcessionsState({
              movie: checkoutState.movie,
              showtime: checkoutState.showtime,
              selectedSeats: checkoutState.selectedSeats
            });
            setCheckoutState(null);
          }}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Step 5: Digital Boarding Pass with QR / Barcode */}
      {activeTicketPass && (
        <TicketPassModal
          booking={activeTicketPass}
          onClose={() => setActiveTicketPass(null)}
          onViewAllBookings={() => {
            setActiveTicketPass(null);
            setActiveTab('tickets');
          }}
        />
      )}

      {/* Overlay: System Architecture & Epics Documentation Portal */}
      {showDocsModal && (
        <SystemDocsModal onClose={() => setShowDocsModal(false)} />
      )}

      {/* Overlay: Interactive Demo Video Walkthrough */}
      {showDemoVideoModal && (
        <DemoVideoModal
          onClose={() => setShowDemoVideoModal(false)}
          onExploreLiveApp={() => setShowDemoVideoModal(false)}
        />
      )}

      {/* Overlay: User Authentication & Role Switching */}
      {showAuthModal && (
        <AuthModal
          currentUser={currentUser}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            refreshBookings();
          }}
          onLogout={() => {
            api.logout();
            setCurrentUser(null);
            if (activeTab === 'admin') setActiveTab('movies');
          }}
        />
      )}

      {/* 4. Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-10 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
              <Film className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-sm">
                IMOVIES ENTERTAINMENT
              </div>
              <div className="text-[11px] text-slate-500">
                Full-Stack Cinema Reservation Architecture · Express.js & MongoDB
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <button
              onClick={() => setShowDemoVideoModal(true)}
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-semibold"
            >
              <span>▶ Watch Demo Video</span>
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setShowDocsModal(true)}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Project Epics (6) & Tasks (19)</span>
            </button>
            <span className="text-slate-700">·</span>
            <span>React.js + Node.js Express</span>
            <span className="text-slate-700">·</span>
            <span>MongoDB Data Persistence</span>
            <span className="text-slate-700">·</span>
            <span>JWT Bearer Security</span>
          </div>

          <div className="text-slate-500 text-[11px] text-center md:text-right">
            © 2026 IMovies Cinema Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
