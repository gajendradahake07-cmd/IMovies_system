import React, { useState } from 'react';
import { X, ArrowLeft, CreditCard, ShieldCheck, CheckCircle, Sparkles, Smartphone, Wallet, Lock } from 'lucide-react';
import { Movie, Showtime, Seat, ConcessionOrder, User, Booking } from '../types/cinema';
import { api } from '../services/api';

interface CheckoutModalProps {
  movie: Movie;
  showtime: Showtime;
  selectedSeats: Seat[];
  concessions: ConcessionOrder[];
  currentUser: User | null;
  onBackToConcessions: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  movie,
  showtime,
  selectedSeats,
  concessions,
  currentUser,
  onBackToConcessions,
  onBookingSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('apple_pay');
  const [userName, setUserName] = useState<string>(currentUser?.name || 'Alex Rivera');
  const [userEmail, setUserEmail] = useState<string>(currentUser?.email || 'alex.rivera@example.com');
  const [cardNumber, setCardNumber] = useState<string>('4242 •••• •••• 8920');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('910');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Financial computations
  const ticketsSubtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const concessionsSubtotal = concessions.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const convenienceFee = selectedSeats.length > 0 ? 3.50 : 0;
  const tax = Number(((ticketsSubtotal + concessionsSubtotal) * 0.08).toFixed(2));
  const totalAmount = Number((ticketsSubtotal + concessionsSubtotal + convenienceFee + tax).toFixed(2));

  const handlePayAndConfirm = async () => {
    if (!userName.trim() || !userEmail.trim()) {
      setError('Please provide a valid name and email address for ticket dispatch.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate realistic payment gateway transaction latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      const activeUser: User = currentUser || {
        id: `usr-guest-${Date.now()}`,
        name: userName,
        email: userEmail,
        role: 'moviegoer',
        membershipTier: 'Silver Member',
        loyaltyPoints: 0
      };

      const booking = await api.createBooking({
        showtime,
        movie,
        selectedSeats,
        concessions,
        paymentMethod: paymentMethod === 'apple_pay' ? 'Apple Pay (Instant)' : paymentMethod === 'card' ? 'Visa (Ending 8920)' : 'Box Office Will-Call',
        user: activeUser
      });

      setIsProcessing(false);
      onBookingSuccess(booking);
    } catch (err: any) {
      setIsProcessing(false);
      setError(err?.message || 'Payment authorization failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToConcessions}
              disabled={isProcessing}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Confirm Reservation & Payment</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                  Step 3 of 3
                </span>
              </h2>
              <div className="text-xs text-slate-400">
                256-bit encrypted checkout · Instant digital boarding pass delivery
              </div>
            </div>
          </div>

          <button
            onClick={onBackToConcessions}
            disabled={isProcessing}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Movie & Showtime Recap Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-4">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              referrerPolicy="no-referrer"
              className="w-14 h-20 rounded-lg object-cover shrink-0 border border-slate-800"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-base text-white truncate">
                {movie.title}
              </h3>
              <div className="text-xs text-slate-400 mt-0.5 truncate">
                {showtime.theatreName} · {showtime.hallName}
              </div>
              <div className="text-xs text-amber-400 font-semibold mt-1">
                {showtime.date} at {showtime.time} ({showtime.screenFormat})
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">
                Seats: <span className="text-white font-bold">{selectedSeats.map(s => s.id).join(', ')}</span> ({selectedSeats.length} tickets)
              </div>
            </div>
          </div>

          {/* Guest or Customer Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Ticket Delivery Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Alex Rivera"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Email (Digital e-Ticket)</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  placeholder="e.g. alex@example.com"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Select Payment Method
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-amber-400/10 border-amber-400 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Smartphone className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <div className="text-xs">Apple / Google Pay</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-amber-400/10 border-amber-400 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <div className="text-xs">Credit / Debit Card</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'bg-amber-400/10 border-amber-400 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Wallet className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <div className="text-xs">Box Office Kiosk</div>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">CVC Code</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Itemized Financial Breakdown */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Admission Tickets ({selectedSeats.length})</span>
              <span className="text-slate-200 tabular-nums">${ticketsSubtotal.toFixed(2)}</span>
            </div>

            {concessions.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-slate-800/60">
                <div className="flex justify-between text-slate-400">
                  <span>Concessions & Snacks</span>
                  <span className="text-slate-200 tabular-nums">${concessionsSubtotal.toFixed(2)}</span>
                </div>
                {concessions.map((c) => (
                  <div key={c.itemId} className="flex justify-between text-[11px] text-slate-500 pl-2">
                    <span>{c.quantity}x {c.name}</span>
                    <span>${(c.price * c.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800/60">
              <span>Convenience & Booking Fee</span>
              <span className="text-slate-200 tabular-nums">${convenienceFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-400">
              <span>State & Cinema Entertainment Tax (8%)</span>
              <span className="text-slate-200 tabular-nums">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
              <span>Total Payable</span>
              <span className="text-amber-400 font-display text-base tabular-nums">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Confirm Action */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Guaranteed seat lock & instant receipt</span>
          </div>

          <button
            onClick={handlePayAndConfirm}
            disabled={isProcessing}
            className="px-6 py-3 rounded-lg font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Authorizing Reservation...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Pay ${totalAmount.toFixed(2)} & Issue Tickets</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
