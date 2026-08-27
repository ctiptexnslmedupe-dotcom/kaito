import React from 'react';
import { Tag, Sparkles, Check, ArrowRight, MessageCircle, Flame } from 'lucide-react';
import { PROMOTIONS_DATA } from '../data/promosData';

interface PromotionsSectionProps {
  onSelectPromoForBuilder?: (promoId: string) => void;
  onOpenReservation: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ 
  onSelectPromoForBuilder,
  onOpenReservation 
}) => {
  return (
    <section id="promociones" className="py-24 bg-[#07090e] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background glow ambient */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Tag className="w-3.5 h-3.5" />
            <span>Promociones del Mes</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            COMBOS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500">EXPERIENCIAS PARA COMPARTIR</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Las promociones más pedidas de nuestros locales y delivery. Ideales para armar la mesa perfecta entre amigos, parejas o celebraciones.
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {PROMOTIONS_DATA.map((promo) => {
            const whatsappPromoUrl = `https://wa.me/51951770377?text=Hola%20Kai-To!%20Quiero%20pedir%20la%20*${encodeURIComponent(promo.title)}*%20por%20S/.%20${promo.price.toFixed(2)}`;

            return (
              <div
                key={promo.id}
                className="group rounded-3xl bg-gradient-to-b from-[#10141f] to-[#0a0c13] border border-slate-800 hover:border-pink-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(236,72,153,0.18)] flex flex-col justify-between overflow-hidden relative"
              >
                
                {/* Channel & Badge */}
                <div className="p-6 sm:p-8 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {promo.badge}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {promo.channel}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-pink-300 transition-colors">
                        {promo.title}
                      </h3>
                      <p className="text-xs text-amber-400 font-semibold mt-1">
                        {promo.subtitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      {promo.originalPrice && (
                        <span className="text-xs text-slate-500 line-through block">
                          S/. {promo.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-slate-400">S/.</span>
                        <span className="font-display text-3xl sm:text-4xl font-black text-emerald-400">
                          {promo.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    {promo.description}
                  </p>

                  {/* Included list */}
                  <div className="space-y-2.5 mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      ¿Qué incluye este combo?
                    </span>
                    {promo.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 sm:p-8 pt-0 flex items-center gap-3">
                  <a
                    href={whatsappPromoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 rounded-2xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pedir Promo WhatsApp</span>
                  </a>

                  <button
                    onClick={onOpenReservation}
                    className="px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
                  >
                    Reservar Salón
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Banner CTA for Custom Builder */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-cyan-950/40 border border-pink-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-pink-400">
              ¿Prefieres personalizar tus 3 tablas?
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
              Arma tu propia ronda de 36 makis con tus sabores favoritos
            </h3>
            <p className="text-xs text-slate-300">
              Elige 3 tablas de autor, tu complemento preferido (Alitas o Gyozas) y bebidas para generar tu pedido en 1 clic.
            </p>
          </div>

          <a
            href="#arma-tu-ronda"
            className="px-6 py-3.5 rounded-2xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 shadow-[0_0_20px_rgba(236,72,153,0.4)] whitespace-nowrap flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ir al Simulador de Ronda</span>
          </a>
        </div>

      </div>
    </section>
  );
};
