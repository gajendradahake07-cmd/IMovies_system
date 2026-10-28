import React, { useState } from 'react';
import { X, Plus, Minus, ArrowLeft, ArrowRight, Utensils, Sparkles, Check } from 'lucide-react';
import { ConcessionItem, ConcessionOrder, Seat, Movie, Showtime } from '../types/cinema';
import { CONCESSIONS } from '../services/mockData';

interface ConcessionsDrawerProps {
  movie: Movie;
  showtime: Showtime;
  selectedSeats: Seat[];
  onBackToSeats: () => void;
  onProceedToCheckout: (concessions: ConcessionOrder[]) => void;
}

export const ConcessionsDrawer: React.FC<ConcessionsDrawerProps> = ({
  movie,
  showtime,
  selectedSeats,
  onBackToSeats,
  onProceedToCheckout
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Combos', 'Popcorn', 'Bites', 'Beverages'];

  const handleIncrement = (itemId: string) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleDecrement = (itemId: string) => {
    setQuantities(prev => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const concessionOrders: ConcessionOrder[] = Object.entries(quantities).map(([itemId, qty]) => {
    const item = CONCESSIONS.find(c => c.id === itemId)!;
    return {
      itemId,
      name: item.name,
      price: item.price,
      quantity: qty
    };
  });

  const concessionsSubtotal = concessionOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const ticketsSubtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const filteredItems = activeCategory === 'All'
    ? CONCESSIONS
    : CONCESSIONS.filter(c => c.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSeats}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Enhance Your Cinema Experience</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                  Step 2 of 3
                </span>
              </h2>
              <div className="text-xs text-slate-400">
                Freshly prepared artisanal snacks & gourmet refreshments ready at auditorium entrance
              </div>
            </div>
          </div>

          <button
            onClick={onBackToSeats}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/40 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const count = quantities[item.id] || 0;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  count > 0
                    ? 'bg-slate-800/90 border-amber-400/60 shadow-md shadow-amber-400/5'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h4 className="font-semibold text-sm text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded">
                            {item.badge}
                          </span>
                        )}
                      </h4>
                      {item.size && (
                        <div className="text-[11px] text-slate-500 font-medium">{item.size}</div>
                      )}
                    </div>
                    <div className="text-sm font-bold text-amber-400 tabular-nums">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-xs text-slate-400 font-medium">Quantity</span>
                  <div className="flex items-center gap-2">
                    {count > 0 ? (
                      <>
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                          {count}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="w-7 h-7 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center font-bold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 border border-slate-700 hover:border-amber-400 rounded-lg transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Summary & Proceed */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            <div>
              <span className="font-semibold text-slate-200">{selectedSeats.length} Seats</span>: {selectedSeats.map(s => s.id).join(', ')} (${ticketsSubtotal.toFixed(2)})
            </div>
            {concessionsSubtotal > 0 && (
              <div className="text-amber-400">
                + Snacks Subtotal: ${concessionsSubtotal.toFixed(2)} ({concessionOrders.reduce((a, b) => a + b.quantity, 0)} items)
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onProceedToCheckout([])}
              className="px-4 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Skip Snacks
            </button>

            <button
              onClick={() => onProceedToCheckout(concessionOrders)}
              className="px-6 py-2.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20 transition-all flex items-center gap-2"
            >
              <span>Continue to Payment (${(ticketsSubtotal + concessionsSubtotal).toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
