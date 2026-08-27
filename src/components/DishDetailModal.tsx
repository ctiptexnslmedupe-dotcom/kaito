import React from 'react';
import { X, Sparkles, Check, MessageCircle, Flame, Wine } from 'lucide-react';
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

  const whatsappOrderUrl = `https://wa.me/51987654321?text=Hola%20KAI-TO!%20Deseo%20pedir%20el%20plato:%20*${encodeURIComponent(dish.name)}*%20(S/.%20${dish.price.toFixed(2)})`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#1c1c2e] to-[#10101a] rounded-3xl border border-[#ff0055]/30 shadow-[0_0_50px_rgba(255,0,85,0.3)] overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-gray-300 hover:text-white border border-white/10 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c2e] via-transparent to-black/40" />

          {/* Floating Price and Pieces */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              {dish.piecesCount && (
                <span className="text-xs font-bold text-[#00ffff] uppercase tracking-widest block mb-1">
                  Porción: {dish.piecesCount} Cortes
                </span>
              )}
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {dish.name}
              </h3>
            </div>

            <div className="text-right">
              <span className="font-display text-2xl sm:text-3xl font-black text-[#00ffff]">
                S/. {dish.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Descripción & Elaboración
            </h4>
            <p className="text-sm text-gray-200 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Flavor notes */}
          {dish.flavorNotes && (
            <div className="p-4 rounded-2xl bg-[#12121e] border border-white/5 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#ffaa00] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-[#ffaa00] uppercase tracking-wide">
                  Notas de Cata & Textura
                </h5>
                <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                  {dish.flavorNotes}
                </p>
              </div>
            </div>
          )}

          {/* Ingredients list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Ingredientes Principales
            </h4>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#252538] text-xs font-medium text-gray-200 border border-white/5"
                >
                  {ing}
                </div>
              ))}
            </div>
          </div>

          {/* Pairing */}
          {dish.pairingRecommendation && (
            <div className="p-4 rounded-2xl bg-[#2a1a2e] border border-[#ff0055]/20 flex items-start gap-3">
              <Wine className="w-5 h-5 text-[#ff0055] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-[#ff0055] uppercase tracking-wide">
                  Maridaje Recomendado
                </h5>
                <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                  {dish.pairingRecommendation}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-[#12121e] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <div className="text-xs text-gray-400 text-center sm:text-left">
            <span className="font-semibold text-white">Disponible en salón & delivery</span>
            <span className="block text-[11px] text-gray-500">Sedes Miraflores y Surco</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir por Delivery</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
