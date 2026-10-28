import React, { useState, useEffect } from 'react';
import { ShieldCheck, BarChart3, Users, DollarSign, Film, Ticket, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Booking } from '../types/cinema';
import { api, THEATRES } from '../services/api';

interface AdminConsoleProps {
  onClose: () => void;
  onRefresh: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  onClose,
  onRefresh
}) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    const m = await api.getAdminMetrics();
    const b = await api.getAllBookings();
    setMetrics(m);
    setAllBookings(b);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Cinema Operator Operations Panel</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            IMovies Managerial Analytics & Hall Operations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time box office receipts, auditorium seat occupancy tracking, and transaction verification
          </p>
        </div>

        <button
          onClick={loadData}
          className="px-4 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 transition-colors flex items-center gap-2 self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Gross Box Office</span>
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tabular-nums">
            ${metrics?.grossRevenue ? metrics.grossRevenue.toFixed(2) : '0.00'}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <span>Live transactions updated</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Total Tickets Sold</span>
            <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tabular-nums">
            {metrics?.totalTicketsSold || 0}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Across {metrics?.activeMoviesCount || 4} now showing films
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Avg Hall Occupancy</span>
            <div className="p-2 rounded-lg bg-purple-400/10 text-purple-400">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tabular-nums">
            {metrics?.averageOccupancy || 38.5}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            Prime evening slots: ~74%
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">F&B Concession Orders</span>
            <div className="p-2 rounded-lg bg-pink-400/10 text-pink-400">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tabular-nums">
            {metrics?.totalConcessionsOrders || 0}
          </div>
          <div className="text-[11px] text-amber-400 mt-1">
            Popcorn & Drink combos
          </div>
        </div>
      </div>

      {/* Auditorium Capacity & Complex Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {THEATRES.map((theatre) => (
          <div key={theatre.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="font-display font-bold text-base text-white mb-1">
              {theatre.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">{theatre.city} · {theatre.screens.length} Screens</p>

            <div className="space-y-3">
              {theatre.screens.map((screen) => {
                // Mock occupancy representation
                const occ = screen.format === 'IMAX 3D' ? 76 : screen.format === 'Dolby Atmos' ? 62 : 44;

                return (
                  <div key={screen.id} className="text-xs">
                    <div className="flex justify-between text-slate-300 font-medium mb-1">
                      <span>{screen.name}</span>
                      <span className="font-bold tabular-nums text-amber-400">{occ}% full</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                        style={{ width: `${occ}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Box Office Transactions Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-white">
            Recent Admission Orders & Digital Vouchers ({allBookings.length})
          </h3>
          <span className="text-xs text-slate-400">Audited via HMAC JWT signature</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] font-bold uppercase text-slate-400 tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Booking Code</th>
                <th className="px-5 py-3.5">Patron</th>
                <th className="px-5 py-3.5">Movie & Auditorium</th>
                <th className="px-5 py-3.5">Seats</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {allBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-amber-400">
                    {b.bookingCode}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-white">{b.userName}</div>
                    <div className="text-[11px] text-slate-500">{b.userEmail}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-white truncate max-w-[180px]">{b.movieTitle}</div>
                    <div className="text-[11px] text-slate-400">{b.theatreName.split(' ')[1]} · {b.screenFormat}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {b.seats.map((s) => (
                        <span key={s} className="px-1.5 py-0.2 bg-slate-800 rounded font-bold text-[10px] text-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-white tabular-nums">
                    ${b.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.bookingStatus === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {b.bookingStatus.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
