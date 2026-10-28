import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Share2,
  Copy,
  Check,
  Film,
  Ticket,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface DemoVideoModalProps {
  onClose: () => void;
  onExploreLiveApp: () => void;
}

interface VideoChapter {
  id: number;
  title: string;
  timestamp: number; // in seconds
  duration: number;
  subtitle: string;
  narration: string;
  badge: string;
}

const CHAPTERS: VideoChapter[] = [
  {
    id: 1,
    title: '1. Architecture & Tech Stack',
    timestamp: 0,
    duration: 35,
    subtitle: 'Express.js RESTful API, MongoDB Schemas, React 19 Client & JWT Bearer Security',
    narration: 'Welcome to IMovies. This cinema platform is powered by a robust Node.js and Express backend, MongoDB NoSQL persistence with Mongoose, and a high-performance React 19 frontend.',
    badge: 'Architecture'
  },
  {
    id: 2,
    title: '2. Movie Catalog & 4K Trailers',
    timestamp: 35,
    duration: 35,
    subtitle: 'Now Showing, Coming Soon, Multi-Genre Filters & Embedded 4K Cinema Trailers',
    narration: 'Moviegoers can browse trending releases, inspect age certifications, view real-time ratings, and play high-definition trailers directly with one click.',
    badge: 'Discovery'
  },
  {
    id: 3,
    title: '3. Multi-Complex Showtimes',
    timestamp: 70,
    duration: 35,
    subtitle: '5-Day Horizon Scheduling across IMAX 3D, Dolby Atmos & 4DX Screen Formats',
    narration: 'Select any screening date across multiple auditoriums. Dynamic base rates calculate instantly based on cutting-edge auditorium technology.',
    badge: 'Showtimes'
  },
  {
    id: 4,
    title: '4. Curved Screen Seating & 5-Min Lock',
    timestamp: 105,
    duration: 45,
    subtitle: 'Interactive Hall Map with VIP Recliners, Wheelchair Access & Real-Time Race Condition Lock',
    narration: 'All eyes on the screen! Patrons click to reserve VIP recliners or standard seats. A 5-minute countdown locks the selected seats in memory, preventing concurrent double-bookings.',
    badge: 'Real-Time Seats'
  },
  {
    id: 5,
    title: '5. Artisanal Concessions & Checkout',
    timestamp: 150,
    duration: 35,
    subtitle: 'Popcorn Combos, Nachos, Slushes & 256-Bit Encrypted Payment Authorization',
    narration: 'Add gourmet truffle butter popcorn or combo deals to the booking basket, with automated entertainment tax calculations and instant Apple Pay simulation.',
    badge: 'Checkout'
  },
  {
    id: 6,
    title: '6. Boarding Passes & Admin Analytics',
    timestamp: 185,
    duration: 35,
    subtitle: 'Perforated e-Ticket QR Barcodes, Self-Service Refunds & Box Office Occupancy Dashboard',
    narration: 'Instant cinema boarding passes are generated with verifiable barcodes and print export. Operators can switch to the Admin Console to monitor live occupancy and revenues.',
    badge: 'E-Ticket & Admin'
  }
];

const TOTAL_DURATION = 220; // 3 minutes 40 seconds

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({
  onClose,
  onExploreLiveApp
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const demoUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?view=demo-video`
    : 'https://ais-pre-nse7eimpny4wzzhhvrfnli-987841231933.asia-east1.run.app/?view=demo-video';

  // Playback timer loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          return Math.min(TOTAL_DURATION, prev + 0.5 * playbackSpeed);
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const currentChapter = CHAPTERS.slice().reverse().find(ch => currentTime >= ch.timestamp) || CHAPTERS[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setCurrentTime(Math.floor(pos * TOTAL_DURATION));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(demoUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[96vh] overflow-hidden">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-display font-extrabold text-white">
                  IMovies Platform Video Walkthrough & Interactive Demo
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                  HD 1080p Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Guided visual presentation of all 6 Epics, 19 Tasks, and Client-Server Workflows
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              title="Copy shareable demo video link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Share Video Link</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Container (16:9 Screen) */}
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex flex-col justify-between group">
          {/* Simulated Cinematic Screen Graphics based on active chapter */}
          <div className="absolute inset-0 z-0">
            {currentChapter.id === 1 && (
              <div className="w-full h-full p-6 sm:p-12 flex flex-col justify-center items-center text-center bg-gradient-to-b from-slate-950 via-slate-900 to-[#090b10]">
                <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-4 animate-bounce">
                  <Film className="w-8 h-8 stroke-[2.5]" />
                </div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                  System Architecture Walkthrough
                </div>
                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-3">
                  IMovies Full-Stack Cinema Platform
                </h3>
                <p className="text-sm text-slate-300 max-w-xl mb-6">
                  React 19 Frontend · Node.js & Express REST API · MongoDB Collections · Real-time Concurrency Locks
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700">6 Epics Verified</span>
                  <span className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700">19 Tasks Completed</span>
                  <span className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700">JWT Token Security</span>
                </div>
              </div>
            )}

            {currentChapter.id === 2 && (
              <div className="w-full h-full relative">
                <img
                  src="/src/assets/images/hero_cinematic_scifi_1793178316895.jpg"
                  alt="Movie Catalog Scene"
                  className="w-full h-full object-cover filter brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-8 flex flex-col justify-end">
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-400 text-slate-950 rounded-full w-max mb-2">
                    Epic 2: Movie Exploration Engine
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                    Horizon: Beyond The Ring (IMAX 3D Laser)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-3">
                    Rating: 9.3/10 · 168 min · PG-13 · 4K Dual Laser Projection & Atmos 7.1.4
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Playing 4K Cinema Trailer</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentChapter.id === 3 && (
              <div className="w-full h-full p-8 flex flex-col justify-center items-center bg-slate-950 text-center">
                <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-left">
                  <div className="text-xs text-amber-400 font-bold uppercase mb-2">
                    Epic 3: Multi-Complex & Screen Scheduling
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Grand Horizon Cinema — Auditorium 1 (IMAX 3D)
                  </h4>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {['10:30 AM', '1:45 PM', '4:30 PM', '7:15 PM'].map((t, idx) => (
                      <div
                        key={t}
                        className={`p-2.5 rounded-lg text-center border text-xs font-bold ${
                          idx === 2 ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                        }`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400">
                    Active selection: Today at 4:30 PM ($21.00 base rate)
                  </div>
                </div>
              </div>
            )}

            {currentChapter.id === 4 && (
              <div className="w-full h-full p-6 flex flex-col justify-center items-center bg-slate-950">
                {/* Curved Screen glow */}
                <div className="w-3/4 h-2 rounded-t-full bg-cyan-400 shadow-lg shadow-cyan-400/50 mb-2 cinema-screen-curve" />
                <div className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase mb-4">
                  Curved Laser Screen (Dolby Vision)
                </div>

                {/* Simulated Seats */}
                <div className="space-y-1.5 max-w-md">
                  {[1, 2, 3, 4].map((rowIdx) => (
                    <div key={rowIdx} className="flex gap-1.5 justify-center">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seatIdx) => {
                        const isChosen = (rowIdx === 2 && (seatIdx === 5 || seatIdx === 6));
                        const isTaken = (rowIdx === 3 && (seatIdx === 2 || seatIdx === 3));

                        return (
                          <div
                            key={seatIdx}
                            className={`w-5 h-5 rounded-t text-[8px] flex items-center justify-center font-bold ${
                              isChosen
                                ? 'bg-amber-400 text-slate-950 scale-110 shadow-lg shadow-amber-400/50'
                                : isTaken
                                ? 'bg-slate-800 text-slate-600'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {isChosen ? '✓' : seatIdx}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-4 px-4 py-2 rounded-xl bg-slate-900 border border-amber-400/30 text-xs text-amber-300 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>5-Minute Seat Hold Active: Row F, Seats 5 & 6 Locked</span>
                </div>
              </div>
            )}

            {currentChapter.id === 5 && (
              <div className="w-full h-full p-8 flex flex-col justify-center items-center bg-slate-950">
                <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                  <div className="text-xs text-amber-400 font-bold uppercase mb-2">
                    Epic 5: Artisanal Concessions & 256-Bit Checkout
                  </div>
                  <div className="space-y-2 text-xs text-slate-300 mb-4">
                    <div className="flex justify-between pb-1 border-b border-slate-800">
                      <span>2x VIP Admission Tickets</span>
                      <span className="text-white font-bold">$42.00</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-800">
                      <span>1x Truffle Butter Large Popcorn</span>
                      <span className="text-white font-bold">$9.50</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-800">
                      <span>2x Chilled Craft Soda</span>
                      <span className="text-white font-bold">$12.50</span>
                    </div>
                    <div className="flex justify-between text-amber-400 font-bold text-sm pt-1">
                      <span>Total Authorized (with Tax)</span>
                      <span>$68.96</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold text-center">
                    ✓ Apple Pay Biometric Authorized
                  </div>
                </div>
              </div>
            )}

            {currentChapter.id === 6 && (
              <div className="w-full h-full p-6 flex flex-col justify-center items-center bg-slate-950">
                <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl text-center">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-slate-950 rounded-full mb-2 inline-block">
                    Verified Digital Boarding Pass
                  </span>
                  <h4 className="text-base font-bold text-white">Horizon: Beyond The Ring</h4>
                  <div className="text-xs text-slate-400 mb-3">Auditorium 1 · Seats F-5, F-6</div>

                  {/* Simulated barcode */}
                  <div className="bg-white p-3 rounded-lg mx-auto w-48 mb-2 flex items-center justify-between gap-[2px]">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 2, 3].map((w, idx) => (
                      <div key={idx} style={{ width: `${w * 2}px` }} className="h-8 bg-slate-950" />
                    ))}
                  </div>
                  <div className="text-[10px] font-mono font-bold text-amber-400">
                    IM-8492-X · Admission Validated
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Top Overlay Badge */}
          <div className="relative z-10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-xs font-bold text-white border border-slate-700">
                {currentChapter.badge}
              </span>
              <span className="text-xs text-amber-400 font-semibold bg-black/60 px-2 py-0.5 rounded">
                Chapter {currentChapter.id} of {CHAPTERS.length}
              </span>
            </div>
            <div className="text-xs text-slate-300 font-mono bg-black/70 px-2 py-1 rounded tabular-nums">
              {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
            </div>
          </div>

          {/* Subtitles Overlay if enabled */}
          {showSubtitles && (
            <div className="relative z-10 px-6 pb-2 text-center pointer-events-none">
              <div className="inline-block px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-slate-800 text-xs sm:text-sm text-slate-100 font-medium max-w-2xl leading-relaxed shadow-xl">
                <span className="text-amber-400 font-bold mr-1.5">[Narration]:</span>
                {currentChapter.narration}
              </div>
            </div>
          )}

          {/* Video Control Bar */}
          <div className="relative z-10 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
            {/* Scrubber Progress Bar */}
            <div
              onClick={handleSeek}
              className="w-full h-2 bg-slate-800 hover:h-3 rounded-full cursor-pointer relative overflow-hidden transition-all"
            >
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all"
                style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
              />
            </div>

            {/* Playback Buttons */}
            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 pl-0.5" />}
                </button>

                <button
                  onClick={() => setCurrentTime(0)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`px-2 py-1 text-[11px] font-bold rounded border transition-colors ${
                    showSubtitles ? 'bg-amber-400 text-slate-950 border-amber-400' : 'text-slate-400 border-slate-700'
                  }`}
                >
                  CC
                </button>
              </div>

              {/* Chapter title in center */}
              <div className="hidden sm:block text-xs font-semibold text-slate-200 truncate max-w-xs">
                {currentChapter.title}
              </div>

              {/* Speed & Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const speeds = [1, 1.25, 1.5, 2];
                    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                    setPlaybackSpeed(next);
                  }}
                  className="px-2 py-1 text-[11px] font-mono text-slate-300 bg-slate-800 rounded border border-slate-700"
                >
                  {playbackSpeed}x
                </button>

                <button
                  onClick={onExploreLiveApp}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Try Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Picker Row */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Video Chapters & Feature Breakdown
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setCurrentTime(ch.timestamp);
                  setIsPlaying(true);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  currentChapter.id === ch.id
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] text-amber-400 font-bold uppercase">{ch.badge}</div>
                <div className="text-xs font-semibold truncate mt-0.5">{ch.title}</div>
                <div className="text-[10px] text-slate-500 tabular-nums">{formatTime(ch.timestamp)}</div>
              </button>
            ))}
          </div>

          {/* Shareable Link Box */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <Share2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Shareable Video Walkthrough Link:</span>
              <code className="text-amber-300 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 truncate max-w-sm sm:max-w-md">
                {demoUrl}
              </code>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
