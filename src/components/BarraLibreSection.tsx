import React from 'react';
import { Sparkles, Check, Clock, Flame, Utensils, Award, ArrowRight } from 'lucide-react';
import { BARRA_LIBRE_FEATURES } from '../data/promosData';

interface BarraLibreSectionProps {
  onOpenReservation: () => void;
}

export const BarraLibreSection: React.FC<BarraLibreSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="barra-libre" className="py-24 bg-[#0d0d16] relative overflow-hidden">
      
      {/* Background Lighting FX */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#ff0055]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00ffff]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff0055]/15 border border-[#ff0055]/40 text-[#ff0055] text-xs font-black uppercase tracking-widest mb-4">
            <Flame className="w-4 h-4" />
            <span>LA EXPERIENCIA DEFINITIVA</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            BARRA LIBRE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#ff5500] to-[#00ffff]">
              ALL YOU CAN EAT
            </span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Come todos los makis, nigiris y platos calientes que puedas durante 2 horas. Elaborados al momento por nuestros itamaes.
          </p>
        </div>

        {/* Feature Grid & Pricing Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Showcase (6 cols) */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-[#ff0055]/30 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80"
              alt="Barra Libre KAI-TO"
              className="w-full h-96 sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/30" />
            
            {/* Overlay Tag */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#141420]/90 backdrop-blur-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#00ffff] font-bold text-xs">
                <Clock className="w-4 h-4" />
                <span>2 HORAS DE RECORRIDO ILIMITADO</span>
              </div>
              <p className="text-xs text-gray-300">
                Pide tandas de tus makis favoritos (5 o 10 cortes por sabor) y acompaña con entradas calientes continuas.
              </p>
            </div>
          </div>

          {/* Pricing & Feature List (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Price Box */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1c1c2e] to-[#12121e] border-2 border-[#ff0055]/40 shadow-[0_0_40px_rgba(255,0,85,0.2)] relative overflow-hidden">
              
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black uppercase bg-[#ff0055] text-white">
                PRECIO POR PERSONA
              </div>

              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">
                TARIFA REGULAR
              </span>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display font-black text-4xl sm:text-5xl text-white">
                  S/. 59
                </span>
                <span className="font-display font-bold text-2xl text-[#00ffff]">
                  .90
                </span>
                <span className="text-xs text-gray-400 font-semibold ml-2">
                  (Incluye Refill de Bebida)
                </span>
              </div>

              {/* Checklist */}
              <div className="space-y-3 pt-4 border-t border-white/10 mb-6">
                {BARRA_LIBRE_FEATURES.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-gray-200 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#00ffff]/20 border border-[#00ffff]/40 text-[#00ffff] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={onOpenReservation}
                className="w-full py-4 rounded-2xl font-display text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff0055] via-[#ff2a00] to-[#ffaa00] hover:from-[#ff2a00] hover:to-[#ff0055] shadow-[0_0_30px_rgba(255,0,85,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <span>Reservar Barra Libre Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
