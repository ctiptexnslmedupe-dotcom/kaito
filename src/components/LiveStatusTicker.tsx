import React from 'react';
import { Flame, Sparkles, Star, Clock, MapPin, Wine, Utensils, ShieldCheck } from 'lucide-react';

export const LiveStatusTicker: React.FC = () => {
  const tickerItems = [
    { icon: <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />, text: 'Barra Libre All You Can Eat: S/. 59.90' },
    { icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />, text: 'Flameado al Soplete en Mesa en Vivo' },
    { icon: <MapPin className="w-3.5 h-3.5 text-cyan-400" />, text: 'Miraflores (Bolognesi 143) & Surco (Caminos del Inca 3252)' },
    { icon: <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />, text: '4.9 ★ Top Rated Barra Nikkei en Lima' },
    { icon: <Clock className="w-3.5 h-3.5 text-pink-400" />, text: 'Atención Hoy de 12:30 PM a 11:00 PM' },
    { icon: <Wine className="w-3.5 h-3.5 text-purple-400" />, text: 'Coctelería de Autor, Chilcanos & Sake Premium' },
    { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, text: '100% Pesca Fresca Seleccionada & Salmón Noruego' },
  ];

  return (
    <div className="w-full bg-[#05070a] border-y border-amber-500/20 py-2.5 overflow-hidden relative z-20 select-none">
      
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#05070a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#05070a] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* First Loop */}
        {tickerItems.map((item, idx) => (
          <div key={`t1-${idx}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
            {item.icon}
            <span className="tracking-wide text-slate-200">{item.text}</span>
            <span className="text-amber-500/40 text-xs mx-2">✦</span>
          </div>
        ))}

        {/* Second Loop for infinite marquee */}
        {tickerItems.map((item, idx) => (
          <div key={`t2-${idx}`} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
            {item.icon}
            <span className="tracking-wide text-slate-200">{item.text}</span>
            <span className="text-amber-500/40 text-xs mx-2">✦</span>
          </div>
        ))}
      </div>

    </div>
  );
};
