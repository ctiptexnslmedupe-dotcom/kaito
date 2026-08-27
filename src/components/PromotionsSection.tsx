import React from 'react';
import { Sparkles, Gift, Clock, Flame, ArrowRight, MessageCircle } from 'lucide-react';
import { PROMOTIONS_DATA } from '../data/promosData';

interface PromotionsSectionProps {
  onOpenReservation: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="promos" className="py-24 bg-[#0d0d16] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#ffaa00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffaa00]/10 border border-[#ffaa00]/30 text-[#ffaa00] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BENEFICIOS EXCLUSIVOS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            PROMOCIONES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#ffaa00] to-[#00ffff]">
              DE LA SEMANA
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Aprovecha nuestros descuentos en barra libre para grupos, Happy Hour en coctelería y beneficios para cumpleañeros.
          </p>
        </div>

        {/* Promos Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROMOTIONS_DATA.map((promo) => (
            <div
              key={promo.id}
              className="rounded-3xl bg-[#141422] border border-white/10 hover:border-[#ffaa00]/50 overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(255,170,0,0.2)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141422] via-transparent to-black/30" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#ffaa00] text-black">
                    {promo.tag}
                  </span>

                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                    <span className="font-display font-black text-lg text-[#00ffff]">
                      {promo.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold text-[#ff0055] uppercase tracking-wider">
                    {promo.badge}
                  </span>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[#ffaa00] transition-colors">
                    {promo.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {promo.description}
                  </p>
                </div>
              </div>

              {/* Bottom terms & CTA */}
              <div className="p-6 pt-0 space-y-4">
                <p className="text-[10px] text-gray-500 italic">
                  * {promo.terms}
                </p>

                <button
                  onClick={onOpenReservation}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#ff0055] to-[#ffaa00] hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Aprovechar Promo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
