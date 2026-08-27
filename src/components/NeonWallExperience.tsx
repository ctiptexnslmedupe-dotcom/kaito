import React, { useState } from 'react';
import { Camera, Heart, Instagram, Sparkles, Star, MessageSquare, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/locationsData';

export const NeonWallExperience: React.FC = () => {
  const [neonColor, setNeonColor] = useState<'pink' | 'cyan' | 'yellow' | 'lime'>('pink');
  const [likes, setLikes] = useState<Record<string, number>>({
    p1: 142,
    p2: 238,
    p3: 189,
    p4: 310,
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    if (hasLiked[id]) {
      setLikes({ ...likes, [id]: likes[id] - 1 });
      setHasLiked({ ...hasLiked, [id]: false });
    } else {
      setLikes({ ...likes, [id]: likes[id] + 1 });
      setHasLiked({ ...hasLiked, [id]: true });
    }
  };

  const neonThemes = [
    { id: 'pink', label: 'Neon Pink', border: 'border-pink-500', glow: 'shadow-[0_0_25px_rgba(236,72,153,0.5)]', text: 'text-pink-400' },
    { id: 'cyan', label: 'Cyber Cyan', border: 'border-cyan-500', glow: 'shadow-[0_0_25px_rgba(6,182,212,0.5)]', text: 'text-cyan-400' },
    { id: 'yellow', label: 'Solar Gold', border: 'border-yellow-400', glow: 'shadow-[0_0_25px_rgba(250,204,21,0.5)]', text: 'text-yellow-400' },
    { id: 'lime', label: 'Electric Lime', border: 'border-emerald-400', glow: 'shadow-[0_0_25px_rgba(52,211,153,0.5)]', text: 'text-emerald-400' },
  ];

  const currentTheme = neonThemes.find((t) => t.id === neonColor)!;

  const communityPosts = [
    {
      id: 'p1',
      author: 'kaitosushipe',
      caption: '"Bajar de peso está en tus manos... Mis manos: Makis y más makis" 🍣✨ #KaitoExperience #BarraLibre',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
      badge: 'Pared Neón Miraflores',
    },
    {
      id: 'p2',
      author: 'foodies.lima',
      caption: 'Flameado en mesa del Maki Volcano 🔥 ¡El show y el sabor son 10/10! En Calle Bolognesi 143.',
      image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
      badge: 'Flameado al Soplete',
    },
    {
      id: 'p3',
      author: 'valenikkei.pe',
      caption: 'Cumpleaños en Sede Surco con la promo de 36 makis + alitas. ¡La mejor vibra y fotos increíbles!',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      badge: 'Celebraciones Surco',
    },
    {
      id: 'p4',
      author: 'makislovers',
      caption: 'Alitas glaseadas y Maki Dragón Tartar. El match perfecto en la barra libre.',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
      badge: 'Top Favorito',
    },
  ];

  return (
    <section id="neon-wall" className="py-24 bg-[#07090e] relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background Neon ambient spots */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>El Rincón Neón de Kai-To</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            LA EXPERIENCIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400">URBANA & NEÓN</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Nuestros locales cuentan con la famosa pared de neón temática con doodles de sushi, frases icónicas y la mejor iluminación para tus fotos e historias.
          </p>
        </div>

        {/* Interactive Virtual Neon Doodle Wall Banner */}
        <div className="mb-16 rounded-3xl bg-black border border-slate-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          {/* Controls Bar: Switch Glow color */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-20 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-bold text-slate-300">Cambia la iluminación del Neón Wall:</span>
            </div>

            <div className="flex items-center gap-2">
              {neonThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setNeonColor(t.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    neonColor === t.id
                      ? `${t.border} ${t.text} ${t.glow} bg-slate-900 border`
                      : 'text-slate-500 hover:text-slate-300 bg-slate-900/50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Virtual Wall Canvas with Glowing Doodles */}
          <div className="relative py-12 flex flex-col items-center justify-center text-center select-none">
            
            {/* Background Doodles */}
            <div className="absolute inset-0 flex items-center justify-between opacity-30 pointer-events-none px-4">
              <span className={`font-jp text-6xl font-black ${currentTheme.text} animate-pulse`}>海人</span>
              <span className={`text-4xl font-extrabold ${currentTheme.text} tracking-widest`}>ALL YOU CAN EAT</span>
              <span className={`font-jp text-6xl font-black ${currentTheme.text} animate-pulse`}>寿司</span>
            </div>

            {/* Center Neon Logo & Bio Quote */}
            <div className={`p-8 sm:p-10 rounded-3xl border-2 ${currentTheme.border} ${currentTheme.glow} bg-slate-950/80 backdrop-blur-xl relative z-10 max-w-2xl`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`font-display text-4xl sm:text-5xl font-black tracking-widest text-white`}>
                  KAI<span className={currentTheme.text}>-</span>TO
                </span>
              </div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-4">
                BARRA FUSIÓN JAPO PERUANA
              </span>
              
              <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-slate-200 text-sm sm:text-base italic font-medium mb-4">
                “Bajar de peso está en tus manos... Mis manos: Makis, alitas y barra libre en Kai-To” 🥢✨
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
                <span className={`px-3 py-1 rounded-full bg-slate-900 border ${currentTheme.border} ${currentTheme.text} font-bold`}>
                  📍 Calle Bolognesi 143, Miraflores
                </span>
                <span className={`px-3 py-1 rounded-full bg-slate-900 border ${currentTheme.border} ${currentTheme.text} font-bold`}>
                  📍 Caminos del Inca 3252, Surco
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Community & Instagram Cards */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-400" />
                Momentos en @kaitosushipe
              </h3>
              <p className="text-xs text-slate-400">Etiquétanos en tus historias para aparecer en nuestro muro</p>
            </div>

            <a
              href="https://www.instagram.com/kaitosushipe/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40 hover:bg-pink-500 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>Ver Instagram</span>
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityPosts.map((post) => (
              <div
                key={post.id}
                className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/70 text-pink-300 backdrop-blur-md border border-slate-700">
                    {post.badge}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                    <span className="font-semibold text-slate-400 flex items-center gap-1">
                      <span className="text-pink-400">@</span>{post.author}
                    </span>

                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                        hasLiked[post.id]
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasLiked[post.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="font-bold">{likes[post.id]}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews & Google/IG Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{t.dateText}</span>
                </div>

                <Quote className="w-6 h-6 text-pink-500/40 mb-2" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-pink-500/40"
                />
                <div>
                  <h4 className="font-display text-xs font-bold text-white">{t.name}</h4>
                  <span className="text-[11px] text-pink-400">{t.instagram}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
