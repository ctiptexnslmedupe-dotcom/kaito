import React, { useState } from 'react';
import { Flame, Sparkles, MapPin, Award, ArrowRight, Utensils, ChevronDown, Heart, Zap, Check, Star, ShieldCheck } from 'lucide-react';
import { playInteractiveSizzle } from '../utils/audioLounge';

interface HeroSectionProps {
  onOpenReservation: (locationId?: string) => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation, onExploreMenu }) => {
  const [isFlaming, setIsFlaming] = useState(false);
  const [activeHeroDish, setActiveHeroDish] = useState<'volcano' | 'dragon' | 'acevichado'>('volcano');

  const heroDishes = {
    volcano: {
      name: 'Maki Volcano al Soplete',
      japanese: '炙りボルケーノ',
      desc: 'Salmón noruego y conchas de abanico gratinadas al fuego vivo con salsa spicy especial y tare.',
      image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1000&q=85',
      badge: '🔥 Flameado al Soplete en Mesa',
      tagColor: 'border-rose-500/50 text-rose-300 bg-rose-950/40',
      price: 'S/. 36.00 (Incluido en Barra Libre)',
    },
    dragon: {
      name: 'Maki Dragón Tartar',
      japanese: 'ドラゴンタルタル',
      desc: 'Langostino al panko, palta hass y generoso tartar de salmón fresco con hilos crocantes.',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=85',
      badge: '★ Best Seller de Autor',
      tagColor: 'border-amber-500/50 text-amber-300 bg-amber-950/40',
      price: 'S/. 34.00 (Incluido en Barra Libre)',
    },
    acevichado: {
      name: 'Acevichado Kai-To',
      japanese: 'アセビチャード',
      desc: 'El balance perfecto de ají amarillo peruano, atún fresco y shichimi togarashi.',
      image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=1000&q=85',
      badge: '✦ Icono Fusión Nikkei',
      tagColor: 'border-cyan-500/50 text-cyan-300 bg-cyan-950/40',
      price: 'S/. 32.00 (Incluido en Barra Libre)',
    },
  };

  const currentDish = heroDishes[activeHeroDish];

  const handleTriggerFlame = () => {
    setIsFlaming(true);
    playInteractiveSizzle();
    setTimeout(() => {
      setIsFlaming(false);
    }, 2400);
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-gradient-to-b from-[#06080d] via-[#0b0e17] to-[#06080d]">
      
      {/* Dynamic Background Glows & Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none animate-float-reverse" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Japanese Watermark Seals & Background Craft Marks */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-15">
        <div className="absolute top-20 right-12 font-jp text-[160px] font-black text-amber-300/10 leading-none">
          職人
        </div>
        <div className="absolute bottom-12 left-10 font-jp text-[180px] font-black text-pink-500/10 leading-none">
          海人
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial & Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Luxury Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider shadow-[0_0_20px_rgba(229,195,120,0.15)] transition-all duration-300 hover:border-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-cinzel tracking-widest text-[11px]">EXPERIENCIA NIKKEI SUPREMA</span>
              <span className="text-amber-500/50">|</span>
              <span className="text-slate-300 text-[11px]">MIRAFLORES & SURCO</span>
            </div>

            {/* Headline with Luxury & Neon Gradient */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              ALTA COCINA <br />
              <span className="font-serif-luxury italic font-normal text-amber-200">Fusión</span> &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.35)]">
                BARRA LIBRE
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-sm sm:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              La maestría del sushi japonés unida al fuego, la sazón y el sopleteado peruano. Makis de autor, piezas flameadas al momento y piqueos crujientes en una atmósfera neón elegante.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-reservar-btn"
                onClick={() => onOpenReservation()}
                className="relative group overflow-hidden px-8 py-4 rounded-2xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 border border-pink-400/40"
              >
                <Flame className="w-5 h-5 text-amber-200" />
                <span>Reservar Barra Libre (S/. 59.90)</span>
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 pointer-events-none" />
              </button>

              <a
                href="#carta"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreMenu();
                  const element = document.getElementById('carta');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-4 rounded-2xl font-display text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/60 shadow-lg hover:shadow-[0_0_20px_rgba(229,195,120,0.2)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Utensils className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Ver Carta & Makis</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* Micro Highlights Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Rondas ilimitadas sin apuro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Sopleteado en mesa en vivo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-pink-400" />
                <span>Miraflores & Surco</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Showcase & Soplete Simulator (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-amber-500/30 via-slate-800/40 to-pink-500/30 shadow-2xl">
              
              {/* Inner Card Container */}
              <div className="rounded-[22px] bg-[#0d101a]/95 border border-slate-800 p-5 sm:p-6 relative overflow-hidden backdrop-blur-xl">
                
                {/* Dish Tab Switcher */}
                <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 mb-4">
                  <button
                    onClick={() => setActiveHeroDish('volcano')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                      activeHeroDish === 'volcano'
                        ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Volcano 🔥
                  </button>
                  <button
                    onClick={() => setActiveHeroDish('dragon')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                      activeHeroDish === 'dragon'
                        ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Dragón 🐉
                  </button>
                  <button
                    onClick={() => setActiveHeroDish('acevichado')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                      activeHeroDish === 'acevichado'
                        ? 'bg-gradient-to-r from-cyan-600 to-teal-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Acevichado 🍋
                  </button>
                </div>

                {/* Dish Visual Preview with Interactive Flame Effect */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-4 border border-slate-800 group select-none">
                  <img
                    src={currentDish.image}
                    alt={currentDish.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isFlaming ? 'scale-105 filter brightness-110 contrast-125' : 'group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d101a] via-transparent to-black/30" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${currentDish.tagColor}`}>
                      {currentDish.badge}
                    </span>
                  </div>

                  {/* Japanese Kanji Seal in image */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-300 font-jp text-[11px] font-bold">
                    {currentDish.japanese}
                  </div>

                  {/* Flame Animation Overlay when Triggered */}
                  {isFlaming && (
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 via-rose-600/20 to-amber-500/20 pointer-events-none flex flex-col items-center justify-center animate-heat-wave">
                      <div className="text-center p-4 rounded-2xl bg-black/70 border border-orange-500 backdrop-blur-md animate-torch-flicker">
                        <Flame className="w-10 h-10 text-orange-400 mx-auto animate-bounce" />
                        <span className="font-display font-black text-xs uppercase tracking-widest text-amber-300 block mt-1">
                          ¡FLAMEADO AL SOPLETE EN VIVO!
                        </span>
                        <span className="text-[10px] text-slate-300">Caramelizando salsa tare y notas ahumadas...</span>
                      </div>
                    </div>
                  )}

                  {/* Flame Trigger Action Overlay */}
                  <button
                    onClick={handleTriggerFlame}
                    className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-orange-600 border border-orange-500/60 text-amber-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg backdrop-blur-md active:scale-95"
                  >
                    <Flame className={`w-4 h-4 text-orange-400 ${isFlaming ? 'animate-spin' : ''}`} />
                    <span>{isFlaming ? 'Flameando...' : 'Probar Soplete 🔥'}</span>
                  </button>
                </div>

                {/* Dish Meta Info */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white leading-tight">
                        {currentDish.name}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {currentDish.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-amber-300 font-bold">
                      {currentDish.price}
                    </span>

                    <button
                      onClick={() => onOpenReservation()}
                      className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 group"
                    >
                      <span>Pedir en Mesa</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom Highlights Strip (4 metric blocks) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mt-16 pt-8 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/40 transition-all text-center group">
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-amber-300 group-hover:scale-105 transition-transform">
              4.9 ★
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Top Barra Fusión en Lima</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all text-center group">
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-cyan-400 group-hover:scale-105 transition-transform">
              2 Sedes
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Miraflores & Surco</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-pink-500/40 transition-all text-center group">
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-pink-400 group-hover:scale-105 transition-transform">
              +32 Tipos
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Makis, Alitas & Piqueos</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/40 transition-all text-center group">
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 group-hover:scale-105 transition-transform">
              S/. 59.90
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Barra Libre Ilimitada</span>
          </div>
        </div>

      </div>

      {/* Down indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce pointer-events-none">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};
