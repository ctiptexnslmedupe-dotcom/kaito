import React from 'react';
import { X, Flame, Sparkles, Check, Heart, MessageCircle, AlertTriangle, Wine, Utensils } from 'lucide-react';
import { Dish } from '../types';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToRound?: (dish: Dish) => void;
  isInRound?: boolean;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToRound,
  isInRound = false,
}) => {
  if (!dish) return null;

  const whatsappOrderUrl = `https://wa.me/51951770377?text=Hola%20Kai-To!%20Quisiera%20pedir%20el%20plato:%20*${encodeURIComponent(dish.name)}*%20(S/.%20${dish.price.toFixed(2)})`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#121622] to-[#0a0d14] rounded-3xl border border-pink-500/40 shadow-[0_0_50px_rgba(236,72,153,0.3)] overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Banner with Neon Glow overlay */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-black/40" />

          {/* Floating Japanese name & Category */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              {dish.japaneseName && (
                <span className="font-jp text-sm font-bold text-pink-400 block tracking-widest mb-1 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                  {dish.japaneseName}
                </span>
              )}
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {dish.name}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs uppercase font-bold text-slate-400 block">Precio individual</span>
              <span className="font-display text-2xl font-black text-amber-400">
                S/. {dish.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Tags & Badges */}
          <div className="flex flex-wrap gap-2">
            {dish.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-pink-400" />
                {tag}
              </span>
            ))}

            {dish.isIncludedInBarraLibre && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                Incluido en Barra Libre
              </span>
            )}

            {dish.piecesText && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {dish.piecesText}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
              Perfil Gastronómico
            </h4>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Tasting Notes */}
          {dish.flavorNotes && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block">Notas de Cata</span>
                <p className="text-xs text-slate-300">{dish.flavorNotes}</p>
              </div>
            </div>
          )}

          {/* Ingredients List */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-pink-400" />
              Ingredientes & Composición
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dish.ingredients.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pairing Recommendation */}
          {dish.pairingRecommendation && (
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-3">
              <Wine className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide block">Maridaje Sugerido</span>
                <p className="text-xs text-slate-300">{dish.pairingRecommendation}</p>
              </div>
            </div>
          )}

        </div>

        {/* Action Bottom Bar */}
        <div className="p-4 sm:p-6 bg-[#0c0f17] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Disponible en sedes <strong className="text-white">Miraflores & Surco</strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onAddToRound && (
              <button
                onClick={() => {
                  onAddToRound(dish);
                  onClose();
                }}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isInRound
                    ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{isInRound ? 'En tu ronda' : 'Añadir a mi ronda'}</span>
              </button>
            )}

            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
