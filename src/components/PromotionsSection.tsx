import React, { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, Heart, Users, MessageCircle, ArrowRight, Flame, Wine, Coffee } from 'lucide-react';
import { PROMOTIONS_DATA } from '../data/promosData';
import { Promotion } from '../types';

interface PromotionsSectionProps {
  onOpenReservation: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ onOpenReservation }) => {
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'gold':
        return 'bg-[#e5aa38]/20 text-[#f3be52] border-[#e5aa38]/40';
      case 'terracotta':
        return 'bg-[#c86a3e]/20 text-[#e27b49] border-[#c86a3e]/40';
      case 'emerald':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'berry':
        return 'bg-[#9e1c3b]/25 text-[#f4a261] border-[#9e1c3b]/50';
      default:
        return 'bg-[#e5aa38]/20 text-[#f3be52] border-[#e5aa38]/40';
    }
  };

  return (
    <section id="promociones" className="py-24 bg-[#120b08] relative overflow-hidden border-t border-b border-[#e5aa38]/15">
      
      {/* Dynamic Glows */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#c86a3e]/12 rounded-full blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-[#e5aa38]/10 rounded-full blur-[160px] pointer-events-none animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e5aa38]/10 border border-[#e5aa38]/30 text-[#f3be52] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-cinzel">EXPERIENCIAS HUANKA EN CHICLAYO</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            MOMENTOS <span className="font-serif-luxury italic font-normal text-[#f3be52]">Gourmet</span> &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e27b49] via-[#f3be52] to-[#e5aa38]">
              PROMOCIONES
            </span>
          </h2>

          <p className="text-[#dec3b3] text-sm sm:text-base leading-relaxed">
            Desde el primer café de la mañana hasta el brindis nocturno en Francisco Cabrera 436. Disfruta de nuestras tarifas especiales en salón y delivery.
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {PROMOTIONS_DATA.map((promo) => (
            <div
              key={promo.id}
              className="rounded-3xl bg-gradient-to-b from-[#1f130d] via-[#1a0f0a] to-[#120b08] border border-[#3d2015] hover:border-[#e5aa38]/50 p-6 sm:p-8 flex flex-col justify-between relative shadow-xl hover:shadow-[0_0_30px_rgba(229,170,56,0.15)] transition-all duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getBadgeColor(promo.highlightColor)}`}>
                    {promo.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-[#dec3b3] px-2.5 py-1 rounded-lg bg-[#2a170e] border border-[#3d2015]">
                    {promo.channel}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-[#f3be52] transition-colors">
                  {promo.title}
                </h3>
                <p className="text-xs text-[#f4a261] font-medium mb-3">
                  {promo.subtitle}
                </p>
                <p className="text-xs text-[#dec3b3] leading-relaxed mb-6">
                  {promo.description}
                </p>

                {/* Checklist */}
                <div className="space-y-2.5 mb-6">
                  {promo.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#ebd7c8]">
                      <CheckCircle2 className="w-4 h-4 text-[#e5aa38] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-5 border-t border-[#3d2015] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#dec3b3] block">Tarifa Especial</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-black text-[#f3be52]">
                      S/. {promo.price.toFixed(2)}
                    </span>
                    {promo.originalPrice && (
                      <span className="text-xs text-[#9c7865] line-through">
                        S/. {promo.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={onOpenReservation}
                  className="px-5 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c86a3e] to-[#e5aa38] hover:from-[#e27b49] hover:to-[#f3be52] shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>Reservar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
