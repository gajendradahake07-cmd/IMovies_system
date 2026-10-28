import React from 'react';
import { Film, Ticket, User as UserIcon, BookOpen, ShieldCheck, LogOut } from 'lucide-react';
import { User } from '../types/cinema';

interface NavbarProps {
  currentUser: User | null;
  activeTab: 'movies' | 'theatres' | 'tickets' | 'admin' | 'docs';
  setActiveTab: (tab: 'movies' | 'theatres' | 'tickets' | 'admin' | 'docs') => void;
  bookingCount: number;
  onOpenAuth: () => void;
  onOpenDocs: () => void;
  onOpenDemoVideo: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  bookingCount,
  onOpenAuth,
  onOpenDocs,
  onOpenDemoVideo,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090b10]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => setActiveTab('movies')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex items-baseline">
            <span className="font-display font-black text-2xl tracking-wider text-white">
              I<span className="text-amber-400">MOVIES</span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean typography) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('movies')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'movies' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Movies & Showtimes
            {activeTab === 'movies' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('theatres')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'theatres' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Theatres & Halls
            {activeTab === 'theatres' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'tickets' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>My Bookings</span>
            {bookingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full tabular-nums">
                {bookingCount}
              </span>
            )}
            {activeTab === 'tickets' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={onOpenDemoVideo}
            className="whitespace-nowrap text-amber-300 hover:text-amber-200 transition-colors py-1 flex items-center gap-1.5 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Demo Video</span>
          </button>

          <button
            onClick={onOpenDocs}
            className="whitespace-nowrap text-slate-300 hover:text-amber-300 transition-colors py-1 flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Architecture & Specs</span>
          </button>

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1.5 ${
                activeTab === 'admin' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Console</span>
              {activeTab === 'admin' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action / User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2.5">
              <div 
                onClick={onOpenAuth}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
                title="Manage Account"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-slate-200 truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-amber-400/90 font-medium">
                    {currentUser.membershipTier}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm shadow-amber-400/10 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In / Demo</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
