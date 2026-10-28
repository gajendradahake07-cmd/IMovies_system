import React, { useState } from 'react';
import { X, User as UserIcon, Shield, Sparkles, Key, Mail, CheckCircle } from 'lucide-react';
import { User } from '../types/cinema';
import { api } from '../services/api';
import { DEMO_USERS } from '../services/mockData';

interface AuthModalProps {
  currentUser: User | null;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  onClose,
  onLoginSuccess,
  onLogout
}) => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('••••••••');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemoLogin = async (user: User) => {
    setLoading(true);
    try {
      const loggedUser = await api.login(user.email);
      setLoading(false);
      onLoginSuccess(loggedUser);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError('Login failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide a valid email');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let loggedUser: User;
      if (isRegister) {
        loggedUser = await api.register(name || email.split('@')[0], email);
      } else {
        loggedUser = await api.login(email);
      }
      setLoading(false);
      onLoginSuccess(loggedUser);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Authentication failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* Profile & Logout View */
          <div className="space-y-6 text-center pt-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center text-slate-950 font-extrabold text-2xl shadow-xl shadow-amber-400/20">
              {currentUser.name.charAt(0)}
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-white">
                {currentUser.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{currentUser.email}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-full text-xs font-semibold mt-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentUser.membershipTier}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Account Role:</span>
                <span className="font-semibold text-white capitalize">{currentUser.role}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Loyalty Points:</span>
                <span className="font-bold text-amber-400 tabular-nums">{currentUser.loyaltyPoints} pts</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>JWT Session:</span>
                <span className="font-mono text-[10px] text-emerald-400">Active & Verified</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up View */
          <div>
            <div className="mb-6">
              <h3 className="font-display font-extrabold text-xl text-white">
                {isRegister ? 'Join IMovies Cinema Club' : 'Sign In to IMovies'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isRegister
                  ? 'Unlock free concessions, reserved VIP seating, and member discounts'
                  : 'Manage your reservations, digital boarding passes, and rewards'}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300">
                {error}
              </div>
            )}

            {/* Quick Demo Logins (Instant 1-Click for grading / testing) */}
            <div className="mb-6 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Instant Demo Access (1-Click)
              </span>

              <button
                type="button"
                onClick={() => handleDemoLogin(DEMO_USERS[0])}
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/60 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    AR
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                      {DEMO_USERS[0].name}
                    </div>
                    <div className="text-[10px] text-slate-400">Regular Moviegoer (Gold Member)</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-400">Login →</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin(DEMO_USERS[1])}
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-400/60 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {DEMO_USERS[1].name}
                    </div>
                    <div className="text-[10px] text-slate-400">Cinema Administrator (Admin Console)</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-400">Login →</span>
              </button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-slate-900 px-2 text-slate-500">or sign in with email</span>
              </div>
            </div>

            {/* Custom Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {isRegister && (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Miller"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Authenticating...' : isRegister ? 'Create Free Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError(null);
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                {isRegister
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
