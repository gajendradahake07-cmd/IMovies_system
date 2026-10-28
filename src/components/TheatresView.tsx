import React from 'react';
import { MapPin, Film, Volume2, Sparkles, Navigation, CheckCircle, Ticket } from 'lucide-react';
import { THEATRES } from '../services/mockData';
import { Movie } from '../types/cinema';

interface TheatresViewProps {
  onSelectTheatreForBooking: (theatreId: string) => void;
  movies: Movie[];
}

export const TheatresView: React.FC<TheatresViewProps> = ({
  onSelectTheatreForBooking,
  movies
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          <span>Cinematic Auditoriums & Locations</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
          Our Cinema Complexes
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Engineered for acoustic purity and visual grandeur with IMAX dual 4K laser projection, 64-channel Dolby Atmos spatial sound, and motorized heated recliners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {THEATRES.map((theatre, idx) => (
          <div
            key={theatre.id}
            className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col shadow-xl transition-all hover:-translate-y-1"
          >
            {/* Theatre Card Header */}
            <div className="p-6 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                  Multiplex 0{idx + 1}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-300 rounded border border-slate-700">
                  {theatre.screens.length} Auditoriums
                </span>
              </div>

              <h2 className="font-display font-bold text-xl text-white mb-1">
                {theatre.name}
              </h2>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{theatre.address}, {theatre.city}</span>
              </div>
            </div>

            {/* Screens & Formats Breakdown */}
            <div className="p-6 flex-1 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Auditorium Technologies
              </h3>

              <div className="space-y-2.5">
                {theatre.screens.map((screen) => (
                  <div
                    key={screen.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{screen.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {screen.totalSeats} Luxury Recliner Seats
                      </div>
                    </div>
                    <span className="px-2 py-1 text-[10px] font-bold rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {screen.format}
                    </span>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div className="pt-2">
                <div className="text-[11px] text-slate-400 mb-2 font-medium">Included Amenities:</div>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Artisan Concessions</span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Dolby Atmos</span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Laser IMAX</span>
                  <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700">Wheelchair Accessible</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-5 border-t border-slate-800 bg-slate-950/60 mt-auto">
              <button
                onClick={() => onSelectTheatreForBooking(theatre.id)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center justify-center gap-2"
              >
                <Ticket className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>View Today's Screenings</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
