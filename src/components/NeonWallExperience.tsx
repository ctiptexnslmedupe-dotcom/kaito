import React from 'react';
import { Instagram, Sparkles, Heart, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';

export const NeonWallExperience: React.FC = () => {
  const photoSpots = [
    {
      id: 1,
      title: 'Muro Neón #KaitoExperience',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      tag: 'Miraflores',
    },
    {
      id: 2,
      title: 'Barra Nikkei en Vivo',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      tag: 'Surco',
    },
    {
      id: 3,
      title: 'Flambeado de Nigiris',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
      tag: 'Live Cooking',
    },
    {
      id: 4,
      title: 'Cócteles de Autor',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
      tag: 'Happy Hour',
    },
  ];

  return (
    <section id="experiencia" className="py-24 bg-[#0d0d16] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#ff0055]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff0055]/10 border border-[#ff0055]/30 text-[#ff0055] text-xs font-bold uppercase tracking-widest mb-4">
            <Instagram className="w-3.5 h-3.5" />
            <span>COMUNIDAD @KAITOPERU</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            EXPERIENCIAS & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#ffaa00] to-[#00ffff]">
              MURO NEÓN #KAITO
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Captura tus mejores momentos en nuestros salones y etiquétanos en Instagram para ser parte de la galería oficial.
          </p>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {photoSpots.map((spot) => (
            <div
              key={spot.id}
              className="rounded-3xl bg-[#141422] border border-white/10 overflow-hidden shadow-xl group hover:border-[#ff0055]/50 transition-all duration-300 relative h-72"
            >
              <img
                src={spot.image}
                alt={spot.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/70 text-[#00ffff] border border-[#00ffff]/30 backdrop-blur-md">
                {spot.tag}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-display text-base font-bold text-white mb-1">
                  {spot.title}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-[#ff0055] font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Amado por comensales</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-[#141422] border border-white/10 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-3">
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#ffaa00]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{t.comment}"
                </p>

                <div className="text-[11px] font-semibold text-[#00ffff]">
                  Plato favorito: {t.favoriteDish}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <span className="text-[10px] text-gray-500">{t.role}</span>
                </div>
                <span className="text-[10px] text-[#ff0055] font-bold">
                  {t.instagram}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
