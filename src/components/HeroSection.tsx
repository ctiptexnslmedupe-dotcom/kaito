import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, Utensils, Award, ArrowRight, Volume2, VolumeX, ShieldCheck, Zap } from 'lucide-react';
import { DISHES_DATA } from '../data/menuData';
import { Dish } from '../types';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation, onExploreMenu }) => {
  const featuredDishes: Dish[] = [
    DISHES_DATA.find(d => d.id === 'maki-acevichado-kaito') || DISHES_DATA[1],
    DISHES_DATA.find(d => d.id === 'maki-parrillero-wagyu') || DISHES_DATA[2],
    DISHES_DATA.find(d => d.id === 'ceviche-kaito-nikkei') || DISHES_DATA[7],
    DISHES_DATA.find(d => d.id === 'coctel-kaito-sour-maracuya') || DISHES_DATA[10],
  ];

  const [activeDishIndex, setActiveDishIndex] = useState(0);
  const [isSizzling, setIsSizzling] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Auto rotate dishes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDishIndex((prev) => (prev + 1) % featuredDishes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [featuredDishes.length]);

  const activeDish = featuredDishes[activeDishIndex];

  const triggerSizzleEffect = () => {
    setIsSizzling(true);
    setTimeout(() => setIsSizzling(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff0055]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ffff]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Hero Content (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff0055]/20 to-[#00ffff]/20 border border-[#ff0055]/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,0,85,0.2)]">
            <Flame className="w-4 h-4 text-[#ff0055] animate-bounce" />
            <span className="text-xs font-black uppercase tracking-widest text-[#00ffff]">
              LA MEJOR BARRA LIBRE NIKKEI DE LIMA
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
            EXPERIENCIA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#ff5500] to-[#00ffff] drop-shadow-[0_0_35px_rgba(255,0,85,0.4)]">
              FUSIÓN AL FUEGO
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Makis artesanales de autor, nigiris flameados en mesa, ceviches al yuzu y coctelería premium. Disfruta nuestra legendaria <strong className="text-[#00ffff]">Barra Libre All You Can Eat</strong> en Miraflores y Surco.
          </p>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
            <div className="p-3 rounded-2xl bg-[#12121c]/80 border border-[#ff0055]/30 backdrop-blur-md text-center">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#ff0055] block">25+</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Variedades</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#12121c]/80 border border-[#00ffff]/30 backdrop-blur-md text-center">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#00ffff] block">S/. 59.90</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Barra Libre</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#12121c]/80 border border-[#ffaa00]/30 backdrop-blur-md text-center">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#ffaa00] block">2</span>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Locales Top</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={onOpenReservation}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff0055] via-[#ff2a00] to-[#ffaa00] hover:from-[#ff2a00] hover:to-[#ff0055] shadow-[0_0_35px_rgba(255,0,85,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Reservar Mi Mesa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreMenu}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display text-sm font-bold uppercase tracking-wider text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/40 hover:bg-[#00ffff]/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Utensils className="w-4 h-4" />
              <span>Ver Carta & Makis</span>
            </button>
          </div>

        </div>

        {/* Right Column: Interactive Featured Dish Showcase (5 cols) */}
        <div className="lg:col-span-5 relative">
          
          {/* Main Card */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#1c1c2b] to-[#101018] border border-[#ff0055]/40 shadow-[0_0_60px_rgba(255,0,85,0.25)] p-5 overflow-hidden group">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#ff0055] text-white shadow-[0_0_15px_rgba(255,0,85,0.5)]">
                ⭐ Plato de la Casa
              </span>
              <button
                onClick={triggerSizzleEffect}
                className="px-3 py-1 rounded-full text-xs font-bold bg-[#ffaa00]/20 text-[#ffaa00] border border-[#ffaa00]/40 flex items-center gap-1 hover:bg-[#ffaa00]/30 transition-all cursor-pointer"
                title="Siente el calor del soplete en vivo"
              >
                <Flame className={`w-3.5 h-3.5 ${isSizzling ? 'animate-bounce text-[#ff0055]' : ''}`} />
                <span>{isSizzling ? '¡Flameando!' : 'Flambear'}</span>
              </button>
            </div>

            {/* Dish Image */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-4 border border-white/10">
              <img
                src={activeDish.image}
                alt={activeDish.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${isSizzling ? 'scale-110 brightness-110 contrast-125' : 'group-hover:scale-105'}`}
              />
              
              {/* Flame overlay animation on sizzle */}
              {isSizzling && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#ff0055]/50 via-[#ff5500]/30 to-transparent flex items-center justify-center animate-pulse">
                  <span className="font-display font-black text-2xl text-white drop-shadow-[0_0_20px_#ff0055]">
                    🔥 TOQUE FLAMEADO KAI-TO 🔥
                  </span>
                </div>
              )}

              {/* Price Tag */}
              <div className="absolute bottom-3 right-3 px-4 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-[#00ffff]/40">
                <span className="font-display font-black text-xl text-[#00ffff]">
                  S/. {activeDish.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Dish Info */}
            <div className="space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#00ffff] transition-colors">
                {activeDish.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                {activeDish.description}
              </p>
            </div>

            {/* Mini Selector Dots */}
            <div className="flex items-center justify-center gap-2 pt-4 mt-2 border-t border-white/10">
              {featuredDishes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDishIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeDishIndex === idx ? 'w-8 bg-gradient-to-r from-[#ff0055] to-[#00ffff]' : 'w-2 bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Ver plato ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
