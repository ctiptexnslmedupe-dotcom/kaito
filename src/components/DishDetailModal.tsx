import React from 'react';
import { X, Sparkles, Check, MessageCircle, Wine, Utensils, Coffee } from 'lucide-react';
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

  const whatsappOrderUrl = `https://wa.me/51953368821?text=Hola%20Huanka%20Chiclayo!%20Deseo%20pedir%20el%20plato:%20*${encodeURIComponent(dish.name)}*%20(S/.%20${dish.price.toFixed(2)})`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#23150e] via-[#1c110b] to-[#120b08] rounded-3xl border border-[#e5aa38]/40 shadow-[0_0_50px_rgba(200,106,62,0.3)] overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-[#dec3b3] hover:text-white border border-[#3d2015] flex items-center justify-center transition-all"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#23150e] via-transparent to-black/40" />

          {/* Floating Origin & Title */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              {dish.nativeOrigin && (
                <span className="text-xs font-bold text-[#e27b49] uppercase tracking-widest block mb-1">
                  {dish.nativeOrigin}
                </span>
              )}
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {dish.name}
              </h3>
            </div>

            <div className="text-right">
              <span className="font-display text-2xl sm:text-3xl font-black text-[#f3be52]">
                S/. {dish.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dec3b3] mb-2">
              Descripción & Preparación
            </h4>
            <p className="text-sm text-[#ebd7c8] leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Flavor notes */}
          {dish.flavorNotes && (
            <div className="p-4 rounded-2xl bg-[#180f0a] border border-[#3d2015] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#e5aa38] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-[#f3be52] uppercase tracking-wide">
                  Perfil de Sabor
                </h5>
                <p className="text-xs text-[#dec3b3] mt-0.5 leading-relaxed">
                  {dish.flavorNotes}
                </p>
              </div>
            </div>
          )}

          {/* Ingredients list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dec3b3] mb-3">
              Insumos & Guarniciones
            </h4>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#28160e] text-xs font-medium text-[#dec3b3] border border-[#3d2015]"
                >
                  {ing}
                </div>
              ))}
            </div>
          </div>

          {/* Pairing */}
          {dish.pairingRecommendation && (
            <div className="p-4 rounded-2xl bg-[#2c170e] border border-[#e5aa38]/30 flex items-start gap-3">
              <Wine className="w-5 h-5 text-[#e27b49] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-[#f3be52] uppercase tracking-wide">
                  Maridaje Sugerido
                </h5>
                <p className="text-xs text-[#dec3b3] mt-0.5 leading-relaxed">
                  {dish.pairingRecommendation}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-[#180f0a] border-t border-[#3d2015] flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <div className="text-xs text-[#dec3b3] text-center sm:text-left">
            <span className="font-semibold text-white">Disponible en salón & delivery</span>
            <span className="block text-[11px] text-[#8c6b5a]">Francisco Cabrera 436, Chiclayo</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c86a3e] to-[#e5aa38] hover:from-[#e27b49] hover:to-[#f3be52] shadow-lg transition-all flex items-center justify-center gap-2"
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
