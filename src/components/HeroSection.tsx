import React, { useState } from 'react';
import { Flame, Sparkles, MapPin, Award, ArrowRight, Utensils, ChevronDown, Heart, Zap, Check, Star, Coffee, Wine } from 'lucide-react';
import { playInteractiveSizzle } from '../utils/audioLounge';

interface HeroSectionProps {
  onOpenReservation: (locationId?: string) => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation, onExploreMenu }) => {
  const [isWokSizzling, setIsWokSizzling] = useState(false);
  const [activeHeroDish, setActiveHeroDish] = useState<'chicharron' | 'lomo' | 'coctel'>('chicharron');

  const heroDishes = {
    chicharron: {
      name: 'Desayuno de Chicharrón Huanka',
      subname: 'Panceta Crocante, Camote & Café Pasado',
      desc: 'Nuestra panceta crocante dorada a fuego lento, camotitos dulces fritos, salsa criolla al limón con hierbabuena y pan caliente con café de altura.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85',
      badge: '☀️ Desayuno Estrella (8am - 12pm)',
      tagColor: 'border-[#e5aa38]/50 text-[#f3be52] bg-[#2d1a10]/80',
      price: 'S/. 24.90 (Con Café o Jugo)',
      actionText: 'Probar Fritura Crocante 🔥',
    },
    lomo: {
      name: 'Lomo Fino en Risotto al Ají Amarillo',
      subname: 'Fusión Novoandina • Chiclayo',
      desc: 'Meloso risotto de arroz y toques de quinua en salsa huancaína con queso paria, coronado con jugoso lomo fino flameado al pisco en wok al fuego vivo.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85',
      badge: '★ Best Seller Novoandino',
      tagColor: 'border-[#c86a3e]/50 text-[#e27b49] bg-[#3a1d12]/80',
      price: 'S/. 42.00 (Plato de Fondo)',
      actionText: 'Flambear al Wok 🔥',
    },
    coctel: {
      name: 'Huanka Sour de Maíz Morado',
      subname: 'Pisco Quebranta & Frutos Rojos',
      desc: 'El cóctel insignia de la casa: pisco acholado, reducción de maíz morado con frutos andinos, jugo de limón sutil y espuma de terciopelo.',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85',
      badge: '🍹 Happy Hour (2x S/. 30)',
      tagColor: 'border-[#9e1c3b]/50 text-[#f4a261] bg-[#301018]/80',
      price: 'S/. 22.00 (2x S/.30 de 4pm a 10pm)',
      actionText: 'Agitar Coctelera 🍸',
    },
  };

  const currentDish = heroDishes[activeHeroDish];

  const handleTriggerSizzle = () => {
    setIsWokSizzling(true);
    playInteractiveSizzle();
    setTimeout(() => {
      setIsWokSizzling(false);
    }, 2400);
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-gradient-to-b from-[#140c08] via-[#1c110b] to-[#120b08]">
      
      {/* Dynamic Background Glows & Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#c86a3e]/15 rounded-full blur-[150px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#e5aa38]/12 rounded-full blur-[160px] pointer-events-none animate-float-reverse" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-[#9e1c3b]/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Andean Geometric Watermarks & Sacred Corn Motifs */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <div className="absolute top-20 right-12 font-cinzel text-[150px] font-black text-[#e5aa38]/10 leading-none">
          HUANKA
        </div>
        <div className="absolute bottom-12 left-10 font-serif-luxury text-[180px] font-black text-[#c86a3e]/10 leading-none">
          CHICLAYO
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial & Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Luxury Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24140d]/90 border border-[#e5aa38]/35 text-[#f3be52] text-xs font-semibold tracking-wider shadow-[0_0_20px_rgba(229,170,56,0.18)] transition-all duration-300 hover:border-[#e5aa38]">
              <span className="w-2 h-2 rounded-full bg-[#e5aa38] animate-pulse" />
              <span className="font-cinzel tracking-widest text-[11px]">SABOR NOVOANDINO EN CHICLAYO</span>
              <span className="text-[#e5aa38]/50">|</span>
              <span className="text-[#dec3b3] text-[11px]">FRANCISCO CABRERA 436</span>
            </div>

            {/* Headline with Warm Terracotta & Maize Gold Gradient */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              DESAYUNOS, <br />
              <span className="font-serif-luxury italic font-normal text-[#f3be52]">Almuerzos</span> &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e27b49] via-[#f3be52] to-[#e5aa38] drop-shadow-[0_0_35px_rgba(200,106,62,0.45)]">
                COCTELERÍA
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-[#ebd7c8] text-sm sm:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Despierta con nuestro legendario desayuno de chicharrón crocante y café pasado, disfruta de almuerzos novoandinos inolvidables y brinda en el mejor Happy Hour de Chiclayo.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-reservar-btn"
                onClick={() => onOpenReservation()}
                className="relative group overflow-hidden px-8 py-4 rounded-2xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c86a3e] via-[#e27b49] to-[#e5aa38] hover:from-[#e27b49] hover:to-[#f3be52] shadow-[0_0_25px_rgba(200,106,62,0.45)] hover:shadow-[0_0_40px_rgba(229,170,56,0.65)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 border border-[#f3be52]/40"
              >
                <Sparkles className="w-5 h-5 text-[#fff2cc]" />
                <span>Reservar Mesa en Chiclayo</span>
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
                className="px-7 py-4 rounded-2xl font-display text-xs sm:text-sm font-semibold text-[#ebd7c8] bg-[#23140d]/80 hover:bg-[#351e15] border border-[#e5aa38]/30 hover:border-[#e5aa38]/70 shadow-lg hover:shadow-[0_0_20px_rgba(229,170,56,0.2)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Utensils className="w-4 h-4 text-[#f3be52] group-hover:scale-110 transition-transform" />
                <span>Explorar Carta & Precios</span>
                <ArrowRight className="w-4 h-4 text-[#dec3b3] group-hover:text-[#f3be52] group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* Micro Highlights Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#dec3b3]">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Desayunos desde 8:00 AM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#f3be52]" />
                <span>Happy Hour 4:00 PM a 10:00 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#e27b49]" />
                <span>Delivery a todo Chiclayo</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Showcase & Sizzle Simulator (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#e5aa38]/35 via-[#351e15]/60 to-[#c86a3e]/35 shadow-2xl">
              
              {/* Inner Card Container */}
              <div className="rounded-[22px] bg-[#1a0f0a]/95 border border-[#3d2015] p-5 sm:p-6 relative overflow-hidden backdrop-blur-xl">
                
                {/* Dish Tab Switcher */}
                <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-[#2a170e]/90 border border-[#48281b] mb-4">
                  <button
                    onClick={() => setActiveHeroDish('chicharron')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                      activeHeroDish === 'chicharron'
                        ? 'bg-gradient-to-r from-[#c86a3e] to-[#e5aa38] text-white shadow-md'
                        : 'text-[#dec3b3] hover:text-white'
                    }`}
                  >
                    Chicharrón 🥓
                  </button>
                  <button
                    onClick={() => setActiveHeroDish('lomo')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                      activeHeroDish === 'lomo'
                        ? 'bg-gradient-to-r from-[#e27b49] to-[#c86a3e] text-white shadow-md'
                        : 'text-[#dec3b3] hover:text-white'
                    }`}
                  >
                    Risotto Lomo 🥩
                  </button>
                  <button
                    onClick={() => setActiveHeroDish('coctel')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                      activeHeroDish === 'coctel'
                        ? 'bg-gradient-to-r from-[#9e1c3b] to-[#e27b49] text-white shadow-md'
                        : 'text-[#dec3b3] hover:text-white'
                    }`}
                  >
                    Huanka Sour 🍸
                  </button>
                </div>

                {/* Dish Visual Preview with Interactive Sizzle Effect */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-4 border border-[#3d2015] group select-none">
                  <img
                    src={currentDish.image}
                    alt={currentDish.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isWokSizzling ? 'scale-105 filter brightness-110 contrast-125' : 'group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-black/35" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${currentDish.tagColor}`}>
                      {currentDish.badge}
                    </span>
                  </div>

                  {/* Peruvian Emblem Seal */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-[#e5aa38]/40 text-[#f3be52] font-cinzel text-[10px] font-bold">
                    HUANKA
                  </div>

                  {/* Sizzle Animation Overlay when Triggered */}
                  {isWokSizzling && (
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/35 via-[#c86a3e]/30 to-[#e5aa38]/25 pointer-events-none flex flex-col items-center justify-center animate-heat-wave">
                      <div className="text-center p-4 rounded-2xl bg-black/80 border border-[#e5aa38] backdrop-blur-md animate-torch-flicker">
                        <Flame className="w-10 h-10 text-[#f3be52] mx-auto animate-bounce" />
                        <span className="font-display font-black text-xs uppercase tracking-widest text-[#f3be52] block mt-1">
                          ¡SAZÓN AL WOK & FOGÓN VIVO!
                        </span>
                        <span className="text-[10px] text-[#ebd7c8]">Caramelizando jugos criollos al calor de Chiclayo...</span>
                      </div>
                    </div>
                  )}

                  {/* Action Trigger Overlay */}
                  <button
                    onClick={handleTriggerSizzle}
                    className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-[#c86a3e] border border-[#e5aa38]/60 text-[#f3be52] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg backdrop-blur-md active:scale-95"
                  >
                    <Flame className={`w-4 h-4 text-[#f3be52] ${isWokSizzling ? 'animate-spin' : ''}`} />
                    <span>{isWokSizzling ? 'Preparando...' : currentDish.actionText}</span>
                  </button>
                </div>

                {/* Dish Meta Info */}
                <div className="space-y-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white leading-tight">
                      {currentDish.name}
                    </h3>
                    <p className="text-xs text-[#dec3b3] mt-1 leading-relaxed">
                      {currentDish.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#3d2015] flex items-center justify-between text-xs">
                    <span className="text-[#f3be52] font-bold">
                      {currentDish.price}
                    </span>

                    <button
                      onClick={() => onOpenReservation()}
                      className="text-xs font-bold text-[#e27b49] hover:text-[#f3be52] flex items-center gap-1 group"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mt-16 pt-8 border-t border-[#351e15]">
          <div className="p-4 rounded-2xl bg-[#1f130d]/60 border border-[#3d2015] hover:border-[#e5aa38]/40 transition-all text-center group">
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#f3be52] group-hover:scale-105 transition-transform">
              4.9 ★
            </span>
            <span className="text-xs text-[#dec3b3] font-medium mt-0.5 block">Top Novoandino Chiclayo</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#1f130d]/60 border border-[#3d2015] hover:border-[#c86a3e]/40 transition-all text-center group">
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#e27b49] group-hover:scale-105 transition-transform">
              8:00 AM
            </span>
            <span className="text-xs text-[#dec3b3] font-medium mt-0.5 block">Desayunos Criollos</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#1f130d]/60 border border-[#3d2015] hover:border-[#f3be52]/40 transition-all text-center group">
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#f3be52] group-hover:scale-105 transition-transform">
              2x S/. 30
            </span>
            <span className="text-xs text-[#dec3b3] font-medium mt-0.5 block">Happy Hour 4pm - 10pm</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#1f130d]/60 border border-[#3d2015] hover:border-emerald-500/40 transition-all text-center group">
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 group-hover:scale-105 transition-transform">
              Delivery
            </span>
            <span className="text-xs text-[#dec3b3] font-medium mt-0.5 block">WhatsApp 953 368 821</span>
          </div>
        </div>

      </div>

      {/* Down indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#dec3b3]/50 animate-bounce pointer-events-none">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};
