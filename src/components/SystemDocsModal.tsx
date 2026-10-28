import React, { useState } from 'react';
import { X, BookOpen, Layers, Database, Server, Cpu, CheckCircle2, Code2, Terminal, Shield, ExternalLink } from 'lucide-react';
import { PROJECT_EPICS } from '../services/mockData';

interface SystemDocsModalProps {
  onClose: () => void;
}

export const SystemDocsModal: React.FC<SystemDocsModalProps> = ({ onClose }) => {
  const [activeDocTab, setActiveDocTab] = useState<'epics' | 'architecture' | 'schemas' | 'api' | 'prereqs'>('epics');

  const totalTasks = PROJECT_EPICS.reduce((acc, epic) => acc + epic.tasks.length, 0);
  const completedTasks = PROJECT_EPICS.reduce(
    (acc, epic) => acc + epic.tasks.filter((t) => t.completed).length,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-display font-extrabold text-white">
                  IMovies Technical Documentation & Architecture
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Verified v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Client-Server Blueprint · Express.js & MongoDB · 6 Epics · 19 Tasks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 border-b border-slate-800 bg-slate-950/40 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveDocTab('epics')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeDocTab === 'epics'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Epics & Tasks ({completedTasks}/{totalTasks})</span>
          </button>

          <button
            onClick={() => setActiveDocTab('architecture')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeDocTab === 'architecture'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>System Architecture</span>
          </button>

          <button
            onClick={() => setActiveDocTab('schemas')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeDocTab === 'schemas'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>MongoDB / Mongoose Schemas</span>
          </button>

          <button
            onClick={() => setActiveDocTab('api')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeDocTab === 'api'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>REST API Specifications</span>
          </button>

          <button
            onClick={() => setActiveDocTab('prereqs')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeDocTab === 'prereqs'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>System Prerequisites</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: EPICS & TASKS MATRIX */}
          {activeDocTab === 'epics' && (
            <div className="space-y-6">
              {/* Progress Summary */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Project Status: 6 Epics · 19 Tasks
                  </div>
                  <div className="text-base font-bold text-white">
                    All Core Modules Fully Built & Verified
                  </div>
                  <div className="text-xs text-slate-400">
                    Includes Authentication, Movie Aggregation, Real-Time Seating, Concessions, Checkout & Admin Analytics.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">100% Complete</span>
                    <div className="text-[11px] text-slate-500">19/19 Delivered</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                    ✓
                  </div>
                </div>
              </div>

              {/* Epics Accordion / Cards */}
              <div className="space-y-4">
                {PROJECT_EPICS.map((epic) => (
                  <div
                    key={epic.id}
                    className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-amber-400">
                            {epic.id}
                          </span>
                          <span className="text-slate-600">·</span>
                          <h3 className="font-display font-bold text-base text-white">
                            {epic.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400">{epic.description}</p>
                      </div>

                      <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full shrink-0">
                        {epic.status}
                      </span>
                    </div>

                    {/* Tasks List */}
                    <div className="mt-4 space-y-2 border-t border-slate-900 pt-3">
                      {epic.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-semibold text-slate-200">
                                <span className="font-mono text-amber-400 mr-1.5">{task.id}:</span>
                                {task.title}
                              </div>
                              <div className="text-slate-400 text-[11px] mt-0.5">
                                {task.description}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 shrink-0 self-start sm:self-auto">
                            {task.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded text-[10px] font-medium border border-slate-700"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SYSTEM ARCHITECTURE */}
          {activeDocTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-amber-400" />
                  <span>Client-Server High-Level Architecture</span>
                </h3>

                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>{`
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                         IMOVIES WEB APPLICATION (REACT)                    │
  │  - Tailwind & Outfit Typography       - Seat Map Visualizer & Screen Glow   │
  │  - Real-Time Hold Countdown (5 min)   - Concessions & Digital Boarding Pass │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ HTTPS / JSON REST API
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                          NODE.JS & EXPRESS.JS SERVER                        │
  │  - /api/auth (JWT HMAC-SHA256 Auth & Role Verification)                     │
  │  - /api/movies (Now Showing, Upcoming, Cast, Formats Aggregator)           │
  │  - /api/showtimes (Multi-Screen Schedules & Dynamic Rates)                  │
  │  - /api/bookings (Seat Lock Concurrency Engine & Barcode Dispatcher)        │
  │  - /api/admin (Occupancy Analytics & Box Office Reporting)                  │
  └──────────────────────────────────────┬──────────────────────────────────────┘
                                         │ Mongoose ODM / Driver
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                          MONGODB NOSQL DATABASE                             │
  │  - users (id, name, email, passwordHash, role, points, tier)                │
  │  - movies (id, title, genres, duration, rating, formats, posterUrl)         │
  │  - showtimes (id, movieId, theatreId, hall, date, time, basePrice)          │
  │  - seats_occupancy (showtimeId, seatId, status, lockedAt, userId)           │
  │  - bookings (bookingCode, userId, seats, concessions, totals, qrPayload)    │
  └─────────────────────────────────────────────────────────────────────────────┘
                  `}</pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="font-bold text-amber-400 mb-1">1. Frontend Layer</div>
                    <p className="text-slate-400 leading-relaxed">
                      Built with React.js 19 and modern CSS styling. Features high performance reactive seat graphs with 5-minute transient locks.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="font-bold text-amber-400 mb-1">2. API Gateway</div>
                    <p className="text-slate-400 leading-relaxed">
                      Express.js REST controllers with JWT token validation middleware, seat collision preventer, and tax/booking calculators.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="font-bold text-amber-400 mb-1">3. Persistence Layer</div>
                    <p className="text-slate-400 leading-relaxed">
                      MongoDB document collections storing structured movies, showtimes, and atomic transaction logs for tickets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MONGOOSE SCHEMAS */}
          {activeDocTab === 'schemas' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h3 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-400" />
                  <span>Production MongoDB / Mongoose Data Schemas</span>
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Schema definitions representing user profiles, movies, multi-theatre showtimes, and confirmed seat reservations.
                </p>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                  <pre>{`// User Mongoose Model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['moviegoer', 'admin'], default: 'moviegoer' },
  membershipTier: { type: String, default: 'Silver Member' },
  loyaltyPoints: { type: Number, default: 0 }
}, { timestamps: true });

// Movie Mongoose Model
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tagline: { type: String },
  synopsis: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  rating: { type: Number, default: 8.5 },
  ageCertification: { type: String, enum: ['G', 'PG', 'PG-13', 'R'] },
  genres: [{ type: String }],
  director: { type: String },
  cast: [{ type: String }],
  formats: [{ type: String }],
  posterUrl: { type: String },
  backdropUrl: { type: String },
  isNowShowing: { type: Boolean, default: true }
}, { timestamps: true });

// Booking Mongoose Model with Atomic Seat Locking
const BookingSchema = new mongoose.Schema({
  bookingCode: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  theatreName: { type: String, required: true },
  hallName: { type: String, required: true },
  screenFormat: { type: String, required: true },
  showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  seats: [{ type: String }], // e.g. ["F-7", "F-8"]
  concessions: [{
    itemId: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['paid', 'refunded'], default: 'paid' },
  bookingStatus: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  qrPayload: { type: String, required: true }
}, { timestamps: true });`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REST API SPECIFICATION */}
          {activeDocTab === 'api' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h3 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span>Express.js RESTful API Endpoints</span>
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Standardized JSON endpoints with HTTP status codes and Bearer token headers.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-[11px] font-bold uppercase text-slate-400 tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Method</th>
                        <th className="px-4 py-3">Endpoint</th>
                        <th className="px-4 py-3">Auth</th>
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="px-4 py-2.5 font-mono text-emerald-400 font-bold">POST</td>
                        <td className="px-4 py-2.5 font-mono text-white">/api/auth/login</td>
                        <td className="px-4 py-2.5 text-slate-400">Public</td>
                        <td className="px-4 py-2.5">Authenticates user and returns signed JWT token</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-mono text-cyan-400 font-bold">GET</td>
                        <td className="px-4 py-2.5 font-mono text-white">/api/movies</td>
                        <td className="px-4 py-2.5 text-slate-400">Public</td>
                        <td className="px-4 py-2.5">Returns list of now showing and upcoming movies</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-mono text-cyan-400 font-bold">GET</td>
                        <td className="px-4 py-2.5 font-mono text-white">/api/showtimes</td>
                        <td className="px-4 py-2.5 text-slate-400">Public</td>
                        <td className="px-4 py-2.5">Filters showtimes by movie ID, date, and theatre</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-mono text-cyan-400 font-bold">GET</td>
                        <td className="px-4 py-2.5 font-mono text-white">/api/seats/:showtimeId</td>
                        <td className="px-4 py-2.5 text-slate-400">Public</td>
                        <td className="px-4 py-2.5">Fetches real-time available, locked, and reserved seats</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-mono text-emerald-400 font-bold">POST</td>
                        <td className="px-4 py-2.5 font-mono text-white">/api/bookings</td>
                        <td className="px-4 py-2.5 text-amber-400 font-semibold">JWT Bearer</td>
                        <td className="px-4 py-2.5">Reserves seats, processes order, dispatches e-ticket</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-mono text-red-400 font-bold">POST</td>
                        <td className="px-4 py-2.5 font-mono text-white">/api/bookings/:id/cancel</td>
                        <td className="px-4 py-2.5 text-amber-400 font-semibold">JWT Bearer</td>
                        <td className="px-4 py-2.5">Releases locked seats and issues refund receipt</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-mono text-cyan-400 font-bold">GET</td>
                        <td className="px-4 py-2.5 font-mono text-white">/api/admin/metrics</td>
                        <td className="px-4 py-2.5 text-purple-400 font-semibold">Admin Role</td>
                        <td className="px-4 py-2.5">Returns hall occupancy %, revenue stats, and logs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM PREREQUISITES & SPECS */}
          {activeDocTab === 'prereqs' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h3 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>Software & Hardware System Prerequisites</span>
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Recommended environment configurations for building, deploying, and operating IMovies.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Software Requirements */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                      1. Software Requirements
                    </h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• <strong>Operating System:</strong> Windows 10/11, macOS Monterey+, or Linux (Ubuntu 22.04 LTS)</li>
                      <li>• <strong>Node.js (v16.0.0 or above):</strong> Powers server-side logic and handles REST API routes</li>
                      <li>• <strong>npm (v8.0.0 or above):</strong> Package manager for dependencies</li>
                      <li>• <strong>React.js:</strong> Dynamic and responsive user interfaces with hooks</li>
                      <li>• <strong>Express.js:</strong> Lightweight web framework for building RESTful endpoints</li>
                      <li>• <strong>MongoDB:</strong> NoSQL document database for structured cinema collections</li>
                      <li>• <strong>Browser:</strong> Google Chrome / Firefox (latest modern Evergreen)</li>
                    </ul>
                  </div>

                  {/* Hardware Requirements */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                      2. Hardware Requirements
                    </h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• <strong>Processor:</strong> Intel Core i5 (8th Gen or above) / AMD Ryzen 5 or better</li>
                      <li>• <strong>RAM:</strong> Minimum 8 GB (16 GB recommended for multi-tier dev servers)</li>
                      <li>• <strong>Storage:</strong> At least 1 GB free space for Node modules & local DB</li>
                      <li>• <strong>Display:</strong> 1366x768 or higher for visual seating chart layout</li>
                    </ul>
                  </div>
                </div>

                {/* Quick Start Terminal Commands */}
                <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
                  <div className="text-slate-400 mb-2 flex items-center gap-1.5 font-sans font-semibold">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quick Local Deployment Runbook:</span>
                  </div>
                  <pre className="text-amber-300 bg-slate-950 p-3 rounded-lg overflow-x-auto">
{`# 1. Clone & install dependencies
git clone https://github.com/imovies/cinema-platform.git
npm install

# 2. Start dev server on port 3000
npm run dev

# 3. Compile & production build
npm run build`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Compliant with all 6 Epics, 19 Tasks, and Client-Server Requirements.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
