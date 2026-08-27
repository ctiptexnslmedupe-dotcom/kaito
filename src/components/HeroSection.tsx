import React from 'react';
import { Flame, Sparkles, MapPin, Award, ArrowRight, Utensils, ChevronDown, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation, onExploreMenu }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#090b10] via-[#0c0f17] to-[#090b10]">
      
      {/* Dynamic Background Glows & Neon ambient spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Neon Doodle SVGs floating in background (matching KAI-TO's iconic neon photowall) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden">
        {/* Neon Fish */}
        <div className="absolute top-28 left-8 sm:left-24 text-cyan-400 rotate-12 animate-pulse">
          <svg className="w-16 h-16 drop-shadow-[0_0_8px_#22d3ee]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 12c4-6 13-6 18 0-5 6-14 6-18 0z" />
            <path d="M17 12c-2-2-2-4 0-6" />
            <circle cx="6" cy="12" r="1" fill="currentColor" />
          </svg>
        </div>

        {/* Neon Maki */}
        <div className="absolute top-36 right-8 sm:right-28 text-pink-400 -rotate-12 animate-bounce duration-1000">
          <svg className="w-16 h-16 drop-shadow-[0_0_8px_#f472b6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="4" strokeDasharray="2 2" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Japanese Kanji Background Stamp */}
        <div className="absolute right-6 bottom-20 font-jp text-[120px] font-black text-slate-800/20 leading-none">
          海人
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Top Pill - Neon Tag */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.25)] mb-6"
          >
            <Flame className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>BARRA LIBRE DE MAKIS & FUSIÓN NIKKEI</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
            <span className="hidden sm:inline text-cyan-300">Miraflores & Surco</span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
          >
            SABOR, CRUJIDO & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.4)]">
              FUSIÓN ILIMITADA
            </span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8"
          >
            Disfruta de nuestros afamados makis acevichados, piezas flameadas al soplete, alitas glaseadas y combos únicos en un ambiente urbano con luces neón y la mejor energía de Lima.
          </motion.p>

          {/* CTA Buttons Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto mb-12"
          >
            <button
              id="hero-reservar-btn"
              onClick={onOpenReservation}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <Flame className="w-5 h-5 text-amber-200" />
              <span>Reservar Barra Libre</span>
            </button>

            <a
              href="#carta"
              onClick={(e) => {
                e.preventDefault();
                onExploreMenu();
                const element = document.getElementById('carta');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-display text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/60 shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Utensils className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Explorar la Carta</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
            </a>

            <a
              href="#arma-tu-ronda"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-display text-sm font-semibold text-amber-300 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-500/40 hover:border-amber-400 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Arma tu Ronda (36 Makis)</span>
            </a>
          </motion.div>

          {/* Social Proof & Quick Highlights Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full pt-6 border-t border-slate-800/80"
          >
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center hover:border-pink-500/30 transition-colors">
              <span className="block font-display text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
                43.9k +
              </span>
              <span className="text-xs text-slate-400 font-medium">Comunidad en Instagram</span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center hover:border-cyan-500/30 transition-colors">
              <span className="block font-display text-xl sm:text-2xl font-bold text-cyan-400">
                2 Sedes
              </span>
              <span className="text-xs text-slate-400 font-medium">Miraflores & Surco</span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center hover:border-amber-500/30 transition-colors">
              <span className="block font-display text-xl sm:text-2xl font-bold text-amber-400">
                +30 Sabores
              </span>
              <span className="text-xs text-slate-400 font-medium">Makis, Alitas & Piqueos</span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center hover:border-emerald-500/30 transition-colors">
              <span className="block font-display text-xl sm:text-2xl font-bold text-emerald-400">
                S/. 59.90
              </span>
              <span className="text-xs text-slate-400 font-medium">Combos & Barra Libre</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce pointer-events-none">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};
