import React, { useState, useMemo } from 'react';
import { Search, Star, Clock, Ticket, Film, Sparkles } from 'lucide-react';
import { Movie, ScreenFormat } from '../types/cinema';

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onQuickBook: (movie: Movie) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  onSelectMovie,
  onQuickBook
}) => {
  const [activeTab, setActiveTab] = useState<'now' | 'coming'>('now');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const genres = ['All', 'Sci-Fi', 'Action', 'Animation', 'Drama', 'Adventure', 'Mystery'];
  const formats = ['All', 'IMAX 3D', 'Dolby Atmos', '4DX', 'Standard 2D'];

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Tab filter
      if (activeTab === 'now' && !movie.isNowShowing) return false;
      if (activeTab === 'coming' && movie.isNowShowing) return false;

      // Genre filter
      if (selectedGenre !== 'All' && !movie.genres.includes(selectedGenre)) return false;

      // Format filter
      if (selectedFormat !== 'All' && !movie.formats.includes(selectedFormat as ScreenFormat)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = movie.title.toLowerCase().includes(q);
        const matchesCast = movie.cast.some(c => c.toLowerCase().includes(q));
        const matchesDirector = movie.director.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCast && !matchesDirector) return false;
      }

      return true;
    });
  }, [movies, activeTab, selectedGenre, selectedFormat, searchQuery]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        {/* Segmented Switch: Now Showing vs Coming Soon */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start">
          <button
            onClick={() => setActiveTab('now')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeTab === 'now'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Now Showing ({movies.filter(m => m.isNowShowing).length})
          </button>
          <button
            onClick={() => setActiveTab('coming')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeTab === 'coming'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coming Soon ({movies.filter(m => !m.isNowShowing).length})
          </button>
        </div>

        {/* Search input with icon */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search movie, star, director..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 text-slate-200 text-xs rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-400/80 transition-colors placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Secondary Filter Tags: Genre & Format */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-8">
        {/* Genre Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-400 font-medium mr-1 shrink-0">Genre:</span>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1 text-xs rounded-md transition-all whitespace-nowrap ${
                selectedGenre === g
                  ? 'bg-slate-700 text-amber-300 font-medium border border-slate-600'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Screen Format Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium mr-1 shrink-0">Format:</span>
          {formats.map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap ${
                selectedFormat === fmt
                  ? 'bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Grid */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-16 px-4 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
          <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-200 mb-1">No movies match your filters</h3>
          <p className="text-sm text-slate-400 mb-4">Try clearing the search query or selecting a different genre.</p>
          <button
            onClick={() => {
              setSelectedGenre('All');
              setSelectedFormat('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-slate-900/80 rounded-xl border border-slate-800/80 hover:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
            >
              {/* Poster Image (3:4 ratio) with fallback */}
              <div 
                onClick={() => onSelectMovie(movie)}
                className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to backdrop or gradient card
                    (e.target as HTMLImageElement).src = movie.backdropUrl;
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                {/* Rating badge top-left */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-md text-xs font-bold text-amber-400 tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{movie.rating}</span>
                </div>

                {/* Age Certification top-right */}
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded text-[11px] font-bold text-slate-300">
                  {movie.ageCertification}
                </div>

                {/* Formats pill bar on bottom of image */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {movie.formats.map((fmt) => (
                    <span
                      key={fmt}
                      className="px-2 py-0.5 text-[10px] font-semibold bg-slate-900/90 text-slate-200 border border-slate-700/80 rounded backdrop-blur-sm"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 
                  onClick={() => onSelectMovie(movie)}
                  className="font-display font-bold text-lg text-white group-hover:text-amber-400 transition-colors cursor-pointer mb-1 line-clamp-1"
                >
                  {movie.title}
                </h3>

                {/* Clean Metadata (Anti-Slop: unboxed text with dots) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span>{movie.genres.slice(0, 2).join(' / ')}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <div className="flex items-center gap-1 tabular-nums">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{movie.durationMinutes} min</span>
                  </div>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Dir: {movie.director.split(' ').pop()}</span>
                </div>

                {/* Brief synopsis */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-5 flex-1">
                  {movie.synopsis}
                </p>

                {/* Card Actions */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-800/80 mt-auto">
                  {movie.isNowShowing ? (
                    <button
                      onClick={() => onQuickBook(movie)}
                      className="flex-1 py-2.5 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Ticket className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Book Seats</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectMovie(movie)}
                      className="flex-1 py-2.5 px-3 text-xs font-semibold text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Notify Me / Preview</span>
                    </button>
                  )}

                  <button
                    onClick={() => onSelectMovie(movie)}
                    className="py-2.5 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
