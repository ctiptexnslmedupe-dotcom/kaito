import React, { useState } from 'react';
import { Instagram, Sparkles, Heart, Star, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';

export const NeonWallExperience: React.FC = () => {
  const [activeStoryFilter, setActiveStoryFilter] = useState<'todos' | 'desayunos' | 'cocteles' | 'cenas'>('todos');

  const galleryMoments = [
    {
      id: 1,
      title: 'Mañanitas Huanka',
      category: 'desayunos',
      tag: '☀️ 8:00 AM',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      caption: 'El café pasado y el chicharrón crocante que despiertan a Chiclayo.',
    },
    {
      id: 2,
      title: 'Huankita & Amigos',
      category: 'todos',
      tag: '🌽 Mascota Oficial',
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80',
      caption: 'Nuestra icónica mazorca andina tejida llenando de sonrisas a los Huankilovers.',
    },
    {
      id: 3,
      title: 'Happy Hour 2x30',
      category: 'cocteles',
      tag: '🍹 4pm a 10pm',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
      caption: 'Brindando con Huanka Sour de Maíz Morado y Macerados de Autor.',
    },
    {
      id: 4,
      title: 'Cenas Románticas',
      category: 'cenas',
      tag: '✨ Noches Únicas',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      caption: 'Momentos inolvidables con flores andinas, velitas y cocina novoandina.',
    },
  ];

  const filteredMoments = activeStoryFilter === 'todos' 
    ? galleryMoments 
    : galleryMoments.filter(m => m.category === activeStoryFilter);

  return (
    <section id="huankilovers" className="py-24 bg-[#140c08] relative overflow-hidden border-t border-[#e5aa38]/15">
      
      {/* Background Orbs */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#c86a3e]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-[#e5aa38]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e5aa38]/10 border border-[#e5aa38]/30 text-[#f3be52] text-xs font-bold uppercase tracking-widest mb-4">
            <Instagram className="w-3.5 h-3.5" />
            <span className="font-cinzel">COMUNIDAD @HUANKA.RESTAURANTE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            EXPERIENCIAS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e27b49] via-[#f3be52] to-[#e5aa38]">
              HUANKILOVERS CHICLAYO
            </span>
          </h2>

          <p className="text-[#dec3b3] text-sm sm:text-base leading-relaxed">
            Comparte tus mejores momentos en Francisco Cabrera 436 etiquetándonos en Instagram para aparecer en nuestro muro.
          </p>

          {/* Social Follow Pill */}
          <a
            href="https://www.instagram.com/huanka.restaurante/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c86a3e] via-[#e27b49] to-[#e5aa38] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_25px_rgba(229,170,56,0.4)] transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Seguir @huanka.restaurante</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredMoments.map((moment) => (
            <div
              key={moment.id}
              className="rounded-3xl bg-[#1c110b] border border-[#3d2015] hover:border-[#e5aa38]/50 overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(229,170,56,0.2)] transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c110b] via-transparent to-black/30" />
                
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-black/70 text-[#f3be52] border border-[#e5aa38]/40 backdrop-blur-md">
                  {moment.tag}
                </span>

                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-display text-lg font-bold text-white mb-1">
                    {moment.title}
                  </h4>
                  <p className="text-xs text-[#dec3b3] line-clamp-2">
                    {moment.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Testimonials Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-[#1f130d] border border-[#3d2015] flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#f3be52]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-[#ebd7c8] leading-relaxed italic">
                  "{t.comment}"
                </p>

                <div className="text-[11px] font-semibold text-[#f4a261]">
                  Plato favorito: {t.favoriteDish}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#351e15] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <span className="text-[10px] text-[#8c6b5a]">{t.instagram}</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  Verificado
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
