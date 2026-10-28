import React from 'react';
import { Play, Ticket, Sparkles, Clock, Star, Shield, Film, Volume2 } from 'lucide-react';
import { Movie } from '../types/cinema';

interface HeroBannerProps {
  movie: Movie;
  onBookTickets: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  onOpenDemoVideo?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movie,
  onBookTickets,
  onWatchTrailer,
  onOpenDemoVideo
}) => {
  return (
    <div className="relative w-full bg-[#090b10] border-b border-slate-800/80 overflow-hidden">
      {/* Background Image with Atmospheric Cinema Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.45] saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090b10] via-[#090b10]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-2xl">
          {/* Subtle Lead-in Metadata (Anti-Slop: clean unboxed text) */}
          <div className="flex items-center gap-2.5 text-xs font-medium text-amber-400 mb-3 tracking-wide uppercase">
            <span className="flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Spotlight Premiere
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Now In Theatres</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">IMAX 70mm Laser</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-4 text-balance">
            {movie.title}
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-amber-200/90 font-medium italic mb-4">
            "{movie.tagline}"
          </p>

          {/* Metadata Row: Rating, Duration, Certification, Genres */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 mb-6">
            <div className="flex items-center gap-1 text-amber-400 font-bold tabular-nums">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{movie.rating}</span>
              <span className="text-xs text-slate-400 font-normal">/10</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <div className="flex items-center gap-1 text-slate-300 tabular-nums">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{Math.floor(movie.durationMinutes / 60)}h {movie.durationMinutes % 60}m</span>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="px-1.5 py-0.5 text-xs font-semibold bg-slate-800 text-slate-200 rounded border border-slate-700">
              {movie.ageCertification}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">{movie.genres.join(', ')}</span>
          </div>

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed mb-8 max-w-xl">
            {movie.synopsis}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onBookTickets(movie)}
              className="px-6 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 transition-all flex items-center gap-2"
            >
              <Ticket className="w-4 h-4 stroke-[2.5]" />
              <span>Reserve Seats & Showtimes</span>
            </button>

            <button
              onClick={() => onWatchTrailer(movie)}
              className="px-5 py-3 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Watch Trailer</span>
            </button>

            {onOpenDemoVideo && (
              <button
                onClick={onOpenDemoVideo}
                className="px-4 py-3 text-sm font-semibold text-amber-300 hover:text-white bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-lg transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Platform Demo Video</span>
              </button>
            )}
          </div>
        </div>

        {/* 4-Item Technology Strip Below Hero */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">4K Dual Laser</div>
              <div className="text-[11px] text-slate-400">IMAX 1.43:1 & Dolby Vision</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Dolby Atmos 3D</div>
              <div className="text-[11px] text-slate-400">64-Channel spatial acoustics</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Real-Time Seats</div>
              <div className="text-[11px] text-slate-400">Live 5-min collision locking</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Instant e-Tickets</div>
              <div className="text-[11px] text-slate-400">QR code entry & refunds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
