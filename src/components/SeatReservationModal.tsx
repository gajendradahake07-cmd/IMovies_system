import React, { useState, useEffect } from 'react';
import { X, Clock, AlertCircle, Check, Info, Shield, Sparkles, ChevronRight } from 'lucide-react';
import { Movie, Showtime, Seat, SeatTier } from '../types/cinema';
import { api } from '../services/api';

interface SeatReservationModalProps {
  movie: Movie;
  showtime: Showtime;
  onClose: () => void;
  onProceedToConcessions: (selectedSeats: Seat[]) => void;
}

export const SeatReservationModal: React.FC<SeatReservationModalProps> = ({
  movie,
  showtime,
  onClose,
  onProceedToConcessions
}) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [notification, setNotification] = useState<string | null>(null);

  // Load seats
  useEffect(() => {
    setLoading(true);
    api.getShowtimeSeats(showtime.id).then((fetchedSeats) => {
      setSeats(fetchedSeats);
      setLoading(false);
    });
  }, [showtime.id]);

  // 5-minute countdown timer for seat hold
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setNotification('Your seat hold reservation has expired. Please reselect your seats.');
          setSelectedSeatIds([]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'reserved') return;

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= 8) {
        setNotification('Maximum 8 tickets allowed per reservation order.');
        setTimeout(() => setNotification(null), 3000);
        return;
      }
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  const selectedSeats = seats.filter((s) => selectedSeatIds.includes(s.id));
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  // Group seats by rows
  const rows = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[96vh] overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
              {showtime.screenFormat.split(' ')[0]}
            </div>
            <div className="truncate">
              <h2 className="text-base sm:text-lg font-bold text-white truncate flex items-center gap-2">
                <span>{movie.title}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-normal border border-slate-700">
                  {showtime.screenFormat}
                </span>
              </h2>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>{showtime.theatreName}</span>
                <span aria-hidden="true">·</span>
                <span>{showtime.hallName}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-semibold">{showtime.date} at {showtime.time}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Hold Timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold tabular-nums ${
              timeLeft < 60
                ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse'
                : 'bg-slate-800/80 border-slate-700 text-slate-200'
            }`}>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Lock: {formatTimer(timeLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification banner if any */}
        {notification && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white text-xs">
              Dismiss
            </button>
          </div>
        )}

        {/* Seating Canvas Viewport */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center">
          {/* Cinema Screen Curve Visualizer */}
          <div className="w-full max-w-2xl mb-10 pt-2 flex flex-col items-center">
            <div className="w-full h-3 rounded-t-full bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20 shadow-lg shadow-cyan-400/40 cinema-screen-curve" />
            <div className="text-[11px] font-bold text-cyan-400/70 tracking-widest mt-2 uppercase">
              Screen (Dolby Vision Laser 4K)
            </div>
            <div className="w-3/4 h-8 bg-gradient-to-b from-cyan-400/10 to-transparent blur-md pointer-events-none" />
          </div>

          {/* Seat Grid */}
          {loading ? (
            <div className="py-20 text-center text-slate-500 text-sm">
              Rendering hall topology & real-time seat locks...
            </div>
          ) : (
            <div className="w-full max-w-3xl overflow-x-auto pb-4 scrollbar-none flex flex-col items-center">
              <div className="space-y-2.5 min-w-[560px]">
                {rows.map((rowName) => {
                  const rowSeats = seats.filter((s) => s.row === rowName);
                  const isVip = rowName === 'H' || rowName === 'G';
                  const isPremium = rowName === 'F' || rowName === 'E' || rowName === 'D';

                  return (
                    <div key={rowName} className="flex items-center justify-center gap-2">
                      {/* Left Row Label */}
                      <span className="w-5 text-center text-xs font-bold text-slate-400">
                        {rowName}
                      </span>

                      {/* Row Seats with Central & Side Aisles */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {rowSeats.map((seat) => {
                          const isSelected = selectedSeatIds.includes(seat.id);
                          const isReserved = seat.status === 'reserved';
                          const isWheelchair = seat.tier === 'wheelchair';

                          // Aisle breaks between seat 4 and 5, and 10 and 11
                          const isAisleRight = seat.number === 4 || seat.number === 10;

                          // Color logic
                          let seatColor = 'bg-slate-700/80 text-slate-300 hover:bg-slate-600 border border-slate-600/80';
                          if (isReserved) {
                            seatColor = 'bg-slate-900 text-slate-700 border border-slate-800/80 cursor-not-allowed opacity-45';
                          } else if (isSelected) {
                            seatColor = 'bg-amber-400 text-slate-950 font-bold border border-amber-300 shadow-md shadow-amber-400/30 scale-110';
                          } else if (isWheelchair) {
                            seatColor = 'bg-blue-950/70 text-blue-300 border border-blue-500/60 hover:bg-blue-900';
                          } else if (isVip) {
                            seatColor = 'bg-purple-950/60 text-purple-200 border border-purple-500/40 hover:bg-purple-900/60';
                          } else if (isPremium) {
                            seatColor = 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700';
                          }

                          return (
                            <React.Fragment key={seat.id}>
                              <button
                                onClick={() => handleSeatClick(seat)}
                                disabled={isReserved}
                                title={`Seat ${seat.id} (${seat.tier.toUpperCase()}) - $${seat.price.toFixed(2)}`}
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-t-lg rounded-b-sm flex items-center justify-center text-[10px] transition-all relative group cursor-pointer ${seatColor}`}
                              >
                                {isReserved ? (
                                  <span className="text-[9px] text-slate-600">✕</span>
                                ) : isSelected ? (
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                ) : (
                                  <span>{seat.number}</span>
                                )}
                              </button>

                              {/* Aisle Spacer */}
                              {isAisleRight && <div className="w-4 sm:w-6" />}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Right Row Label */}
                      <span className="w-5 text-center text-xs font-bold text-slate-400">
                        {rowName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Seat Status & Tier Legend */}
          <div className="mt-8 pt-4 border-t border-slate-800 w-full max-w-2xl flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-t bg-slate-700 border border-slate-600" />
              <span>Standard (${(showtime.basePrice).toFixed(2)})</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-t bg-slate-800 border border-slate-700" />
              <span>Premium (${(showtime.basePrice + 3.50).toFixed(2)})</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-t bg-purple-950/80 border border-purple-500/60" />
              <span>VIP Recliner (${(showtime.basePrice + 6.00).toFixed(2)})</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-t bg-amber-400 border border-amber-300" />
              <span className="text-white font-semibold">Selected</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-t bg-slate-900 border border-slate-800 opacity-50 flex items-center justify-center text-[9px] text-slate-600">
                ✕
              </div>
              <span>Reserved</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-t bg-blue-950/70 border border-blue-500/60" />
              <span>Accessible</span>
            </div>
          </div>
        </div>

        {/* Bottom Booking Summary Strip */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">
              Selected Seats ({selectedSeats.length}):
            </div>
            {selectedSeats.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedSeats.map((s) => (
                  <span
                    key={s.id}
                    className="px-2 py-0.5 text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded"
                  >
                    {s.id} (${s.price.toFixed(2)})
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic">
                Please click on the seating map above to select your preferred seats
              </div>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6">
            <div className="text-right">
              <div className="text-[11px] text-slate-400">Tickets Subtotal</div>
              <div className="font-display font-extrabold text-xl text-white tabular-nums">
                ${subtotal.toFixed(2)}
              </div>
            </div>

            <button
              onClick={() => onProceedToConcessions(selectedSeats)}
              disabled={selectedSeats.length === 0}
              className={`px-6 py-3 rounded-lg font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                selectedSeats.length > 0
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              }`}
            >
              <span>Add Snacks & Proceed</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
