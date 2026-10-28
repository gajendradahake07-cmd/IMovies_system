import React from 'react';
import { X, CheckCircle, Printer, Download, QrCode, Calendar, Clock, MapPin, Film, Sparkles } from 'lucide-react';
import { Booking } from '../types/cinema';

interface TicketPassModalProps {
  booking: Booking | null;
  onClose: () => void;
  onViewAllBookings: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  booking,
  onClose,
  onViewAllBookings
}) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Celebration Bar */}
        <div className="bg-gradient-to-r from-emerald-500/20 via-emerald-400/10 to-transparent border-b border-emerald-500/20 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-400">Reservation Confirmed!</h3>
              <p className="text-[11px] text-slate-400">Boarding pass generated & dispatched to {booking.userEmail}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Boarding Pass Ticket Body */}
        <div className="p-6 overflow-y-auto print:p-0">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative">
            {/* Upper Stub: Movie & Theatre */}
            <div className="p-5 border-b border-dashed border-slate-800 relative">
              {/* Semi-circular notch cutouts */}
              <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-slate-900 rounded-full border-r border-slate-800" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-slate-900 rounded-full border-l border-slate-800" />

              <div className="flex gap-4">
                <img
                  src={booking.moviePoster}
                  alt={booking.movieTitle}
                  referrerPolicy="no-referrer"
                  className="w-16 h-24 rounded-lg object-cover border border-slate-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded">
                      {booking.screenFormat}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      REF: {booking.bookingCode}
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-lg text-white leading-tight truncate">
                    {booking.movieTitle}
                  </h2>

                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{booking.theatreName}</span>
                  </div>

                  <div className="text-xs text-slate-300 font-semibold mt-0.5">
                    {booking.hallName}
                  </div>
                </div>
              </div>

              {/* Time & Date Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-900 text-center">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-850">
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Show Date</span>
                  <span className="text-xs font-bold text-white tabular-nums">{booking.showDate}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-850">
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Showtime</span>
                  <span className="text-xs font-bold text-amber-400 tabular-nums">{booking.showTime}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-850">
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">Gate Opens</span>
                  <span className="text-xs font-bold text-emerald-400 tabular-nums">20m Prior</span>
                </div>
              </div>
            </div>

            {/* Lower Stub: Seats & Digital QR Verification */}
            <div className="p-5 bg-gradient-to-b from-slate-950 to-slate-900/90 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Assigned Seats</span>
                  <div className="text-lg font-display font-extrabold text-white flex items-center gap-2">
                    {booking.seats.map((seatId) => (
                      <span
                        key={seatId}
                        className="px-2.5 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 text-sm font-bold"
                      >
                        {seatId}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {booking.seats.length} Admission Ticket{booking.seats.length > 1 ? 's' : ''}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Total Paid</span>
                  <div className="text-lg font-bold text-white tabular-nums">
                    ${booking.totalAmount.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">Verified Payment</div>
                </div>
              </div>

              {/* Concessions voucher banner if any */}
              {booking.concessions && booking.concessions.length > 0 && (
                <div className="w-full p-2.5 mb-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Concession Voucher Included</span>
                  </div>
                  <div className="text-slate-400 text-[11px] space-y-0.5">
                    {booking.concessions.map((c) => (
                      <div key={c.itemId} className="flex justify-between">
                        <span>{c.quantity}x {c.name}</span>
                        <span>Pick up at Express Counter</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Barcode / QR Code Visual */}
              <div className="p-3 bg-white rounded-xl shadow-inner flex flex-col items-center">
                {/* Simulated SVG Barcode pattern */}
                <div className="w-48 h-12 flex items-center justify-between overflow-hidden gap-[2px]">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 3, 4, 1, 2].map((w, idx) => (
                    <div
                      key={idx}
                      style={{ width: `${w * 2}px` }}
                      className="h-full bg-slate-950"
                    />
                  ))}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-slate-900 mt-1 font-bold">
                  {booking.bookingCode}
                </div>
              </div>

              <div className="text-[10px] text-slate-500 mt-3 text-center">
                Present this barcode or Apple/Google Wallet pass at the cinema turnstile for admission.
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={onViewAllBookings}
            className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all cursor-pointer"
          >
            View in My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};
