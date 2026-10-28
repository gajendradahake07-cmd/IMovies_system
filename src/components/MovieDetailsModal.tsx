import React, { useState, useEffect } from 'react';
import { X, Play, Clock, Star, MapPin, Ticket, ChevronRight, Film, CheckCircle } from 'lucide-react';
import { Movie, Showtime, Theatre } from '../types/cinema';
import { THEATRES } from '../services/mockData';
import { api } from '../services/api';

interface MovieDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
  onSelectShowtime: (showtime: Showtime, movie: Movie) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  onClose,
  onSelectShowtime
}) => {
  if (!movie) return null;

  const [isPlayingTrailer, setIsPlayingTrailer] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<{ date: string; label: string; weekday: string }[]>([]);
  const [selectedTheatreId, setSelectedTheatreId] = useState<string>(THEATRES[0].id);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loadingShowtimes, setLoadingShowtimes] = useState<boolean>(true);

  // Initialize next 5 calendar dates
  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const weekday = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push({ date: dateStr, label, weekday });
    }
    setAvailableDates(dates);
    setSelectedDate(dates[0].date);
  }, []);

  // Fetch showtimes for movie and selected date
  useEffect(() => {
    if (!selectedDate) return;
    setLoadingShowtimes(true);
    api.getShowtimes(movie.id, selectedDate).then((results) => {
      setShowtimes(results);
      setLoadingShowtimes(false);
    });
  }, [movie.id, selectedDate]);

  // Group showtimes by format for the active theatre
  const currentTheatre = THEATRES.find(t => t.id === selectedTheatreId) || THEATRES[0];
  const theatreShowtimes = showtimes.filter(s => s.theatreId === selectedTheatreId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-slate-400 hover:text-white bg-slate-950/70 hover:bg-slate-950 rounded-full border border-slate-700/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Top Zone: Trailer Player or Backdrop with Play Trigger */}
        <div className="relative w-full aspect-video sm:h-72 bg-slate-950 overflow-hidden shrink-0">
          {isPlayingTrailer ? (
            <div className="w-full h-full relative">
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailerVideoId}?autoplay=1&mute=0`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
              <button
                onClick={() => setIsPlayingTrailer(false)}
                className="absolute bottom-3 right-3 text-xs px-2.5 py-1 bg-slate-900/90 text-slate-300 hover:text-white rounded border border-slate-700"
              >
                Close Video Player
              </button>
            </div>
          ) : (
            <div className="w-full h-full relative group">
              <img
                src={movie.backdropUrl}
                alt={movie.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.45]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />
              
              {/* Center Play Button */}
              <button
                onClick={() => setIsPlayingTrailer(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center pl-1 shadow-xl shadow-amber-400/30 group-hover:scale-110 transition-all cursor-pointer"
                title="Play Trailer"
              >
                <Play className="w-7 h-7 fill-slate-950" />
              </button>
              <div className="absolute bottom-4 left-6 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-amber-300" />
                <span>Click to watch official 4K cinema trailer</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2">
              <span className="text-amber-400 font-semibold">{movie.genres.join(' · ')}</span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1 text-slate-300 tabular-nums">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{movie.durationMinutes} min</span>
              </div>
              <span aria-hidden="true">·</span>
              <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded font-semibold text-[11px] border border-slate-700">
                {movie.ageCertification}
              </span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1 text-amber-400 font-bold tabular-nums">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{movie.rating}</span>
                <span className="text-slate-500 font-normal text-[11px]">({(movie.reviewCount / 1000).toFixed(1)}k votes)</span>
              </div>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
              {movie.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {movie.synopsis}
            </p>
          </div>

          {/* Cast & Director */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Director</span>
              <span className="text-slate-200 font-semibold text-sm">{movie.director}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Starring Cast</span>
              <span className="text-slate-200 font-medium">{movie.cast.join(', ')}</span>
            </div>
          </div>

          {/* Showtimes & Booking Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-400" />
                <span>Select Date & Showtimes</span>
              </h3>
              <span className="text-xs text-slate-400">Step 1 of 3: Hall & Showtime</span>
            </div>

            {/* Date Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
              {availableDates.map((item) => (
                <button
                  key={item.date}
                  onClick={() => setSelectedDate(item.date)}
                  className={`px-4 py-2.5 rounded-xl border text-center transition-all min-w-[90px] shrink-0 ${
                    selectedDate === item.date
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-lg shadow-amber-400/10'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] uppercase tracking-wider">{item.weekday}</div>
                  <div className="text-sm font-semibold tabular-nums">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Theatre Venue Selector */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Cinema Location</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {THEATRES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTheatreId(t.id)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      selectedTheatreId === t.id
                        ? 'bg-slate-800/90 border-amber-400/80 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-200 truncate">{t.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{t.city}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Showtimes Grid by Hall */}
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center justify-between">
                <span>Available Screenings at {currentTheatre.name}</span>
                <span className="text-[11px] text-amber-400 font-normal">Real-time seat mapping</span>
              </div>

              {loadingShowtimes ? (
                <div className="p-8 text-center text-slate-500 text-xs">Loading showtimes...</div>
              ) : theatreShowtimes.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs border border-slate-800 rounded-xl bg-slate-950/50">
                  No showtimes scheduled for this date at this location. Please choose another date or theatre.
                </div>
              ) : (
                <div className="space-y-4">
                  {currentTheatre.screens.map((screen) => {
                    const screenSlots = theatreShowtimes.filter(s => s.screenFormat === screen.format);
                    if (screenSlots.length === 0) return null;

                    return (
                      <div
                        key={screen.id}
                        className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 text-xs font-bold bg-amber-400/20 text-amber-300 rounded border border-amber-400/30">
                              {screen.format}
                            </span>
                            <span className="text-xs font-semibold text-slate-200">{screen.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Atmos 7.1.4 spatial audio · Laser projection
                          </div>
                        </div>

                        {/* Slots */}
                        <div className="flex flex-wrap items-center gap-2">
                          {screenSlots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => onSelectShowtime(slot, movie)}
                              className="group px-3.5 py-2 bg-slate-900 hover:bg-amber-400 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-amber-400 rounded-lg text-center transition-all shadow-sm"
                            >
                              <div className="text-xs font-bold tabular-nums">{slot.time}</div>
                              <div className="text-[10px] text-slate-400 group-hover:text-slate-900 font-semibold tabular-nums">
                                ${slot.basePrice.toFixed(2)}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
