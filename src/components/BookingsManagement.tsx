import React, { useState } from 'react';
import { Ticket, Calendar, Clock, MapPin, AlertTriangle, CheckCircle, XCircle, Eye, ArrowRight, ShieldAlert } from 'lucide-react';
import { Booking, User } from '../types/cinema';
import { api } from '../services/api';

interface BookingsManagementProps {
  bookings: Booking[];
  currentUser: User | null;
  onViewTicket: (booking: Booking) => void;
  onRefreshBookings: () => void;
  onBrowseMovies: () => void;
}

export const BookingsManagement: React.FC<BookingsManagementProps> = ({
  bookings,
  currentUser,
  onViewTicket,
  onRefreshBookings,
  onBrowseMovies
}) => {
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');

  const userBookings = currentUser
    ? bookings.filter(b => b.userId === currentUser.id || b.userEmail === currentUser.email)
    : bookings;

  const filteredBookings = userBookings.filter(b => {
    if (filter === 'confirmed') return b.bookingStatus === 'confirmed';
    if (filter === 'cancelled') return b.bookingStatus === 'cancelled';
    return true;
  });

  const handleCancelBooking = async (booking: Booking) => {
    if (!window.confirm(`Are you sure you want to cancel reservation ${booking.bookingCode}? Seats ${booking.seats.join(', ')} will be immediately released, and $${booking.totalAmount.toFixed(2)} will be refunded to your original payment method.`)) {
      return;
    }

    setIsProcessing(true);
    try {
      await api.cancelBooking(booking.id);
      setIsProcessing(false);
      onRefreshBookings();
    } catch (err) {
      setIsProcessing(false);
      alert('Failed to cancel reservation. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header and User Loyalty Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">
            <Ticket className="w-4 h-4" />
            <span>Digital Ticket Wallet</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            My Reservations & Passes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Access your admission barcodes, seat details, and manage cancellations
          </p>
        </div>

        {currentUser && (
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-4 self-start md:self-auto">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-white">{currentUser.name}</div>
              <div className="text-[11px] text-amber-400 font-medium">{currentUser.membershipTier}</div>
              <div className="text-[10px] text-slate-400 tabular-nums">{currentUser.loyaltyPoints} CinePoints Available</div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 py-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            filter === 'all'
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          All Passes ({userBookings.length})
        </button>
        <button
          onClick={() => setFilter('confirmed')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            filter === 'confirmed'
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Confirmed ({userBookings.filter(b => b.bookingStatus === 'confirmed').length})
        </button>
        <button
          onClick={() => setFilter('cancelled')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            filter === 'cancelled'
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Refunded / Cancelled ({userBookings.filter(b => b.bookingStatus === 'cancelled').length})
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-20 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">No cinema reservations found</h3>
          <p className="text-xs text-slate-400 mb-6">Explore the latest blockbuster releases and reserve your preferred seats.</p>
          <button
            onClick={onBrowseMovies}
            className="px-5 py-2.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Browse Now Showing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const isConfirmed = b.bookingStatus === 'confirmed';

            return (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                  isConfirmed
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-lg shadow-black/30'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                {/* Left: Movie poster & basic info */}
                <div className="flex gap-4 items-start sm:items-center">
                  <img
                    src={b.moviePoster}
                    alt={b.movieTitle}
                    referrerPolicy="no-referrer"
                    className="w-16 h-24 rounded-xl object-cover border border-slate-800 shrink-0"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {b.bookingCode}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="px-2 py-0.2 text-[10px] font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {b.screenFormat}
                      </span>
                      <span className={`px-2 py-0.2 text-[10px] font-bold rounded ${
                        isConfirmed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {isConfirmed ? 'Confirmed' : 'Cancelled & Refunded'}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white truncate">
                      {b.movieTitle}
                    </h3>

                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {b.theatreName}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span>{b.hallName}</span>
                    </div>

                    <div className="text-xs text-slate-300 font-medium flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        {b.showDate} at {b.showTime}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span>
                        Seats: <strong className="text-white">{b.seats.join(', ')}</strong> ({b.seats.length} tickets)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Pricing & Actions */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 gap-3 shrink-0">
                  <div className="text-left md:text-right">
                    <div className="text-[11px] text-slate-400">Total Charged</div>
                    <div className="text-lg font-bold text-white tabular-nums">
                      ${b.totalAmount.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Paid via {b.paymentMethod}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isConfirmed && (
                      <button
                        onClick={() => handleCancelBooking(b)}
                        disabled={isProcessing}
                        className="px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition-colors cursor-pointer"
                      >
                        Cancel & Refund
                      </button>
                    )}

                    <button
                      onClick={() => onViewTicket(b)}
                      className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
