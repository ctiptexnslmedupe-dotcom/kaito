import React, { useState, useEffect } from 'react';
import { Utensils, MapPin, Sparkles, Menu, X, Flame, MessageCircle, Calendar, Volume2, VolumeX, Music } from 'lucide-react';
import { toggleLoungeAudio, isLoungePlaying, playInteractiveSizzle } from '../utils/audioLounge';

interface NavbarProps {
  onOpenReservation: (locationId?: string) => void;
  onOpenMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation, onOpenMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const active = toggleLoungeAudio();
    setAudioActive(active);
    if (active) {
      playInteractiveSizzle();
    }
  };

  const navLinks = [
    { label: 'Barra Libre', href: '#barra-libre', badge: 'All You Can Eat', isGold: true },
    { label: 'La Carta', href: '#carta', badge: '32 Variedades' },
    { label: 'Promociones', href: '#promociones', badge: 'Salón & Delivery' },
    { label: 'Arma tu Ronda', href: '#arma-tu-ronda', badge: 'Platería 36 Makis' },
    { label: 'Pared Neón', href: '#neon-wall' },
    { label: 'Sedes & Horarios', href: '#locales' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#06080d]/90 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl shadow-black/80 py-2.5' 
          : 'bg-gradient-to-b from-[#06080d]/98 via-[#06080d]/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo - Luxury Nikkei Seal */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-950 to-pink-500/20 border border-amber-500/40 group-hover:border-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(229,195,120,0.2)]">
            <span className="font-jp text-lg font-black text-amber-300 group-hover:text-amber-200">海</span>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-rose-500 animate-ping opacity-75" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-rose-500 border border-black" />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black tracking-widest text-xl sm:text-2xl text-white">
                KAI<span className="text-pink-500">-</span>TO
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                BARRA FUSIÓN
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-widest font-serif-luxury italic">
              Tokyo Craft • Lima Soul
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/40 transition-all duration-200 group flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border transition-all ${
                  link.isGold
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 group-hover:border-amber-400'
                    : 'bg-slate-900 text-cyan-400 border-cyan-500/20 group-hover:border-cyan-400/50'
                }`}>
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Actions CTA */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Lounge Ambient Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-300 border ${
              audioActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(229,195,120,0.3)] animate-pulse'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
            title="Activar / Pausar Música Lounge Tokyo-Lima"
          >
            {audioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Lounge ON</span>
                <span className="flex gap-0.5 h-2.5 items-end">
                  <span className="w-0.5 bg-amber-400 h-2 animate-pulse" />
                  <span className="w-0.5 bg-amber-300 h-3 animate-ping" />
                  <span className="w-0.5 bg-amber-400 h-1.5 animate-pulse" />
                </span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5" />
                <span>Lounge Audio</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/51951770377?text=Hola%20Kai-To,%20quisiera%20consultar%20sobre%20la%20carta%20y%20promociones!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 hover:border-emerald-400 transition-all shadow-[0_0_12px_rgba(16,185,129,0.15)]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* VIP Reservation Button */}
          <button
            id="nav-reservar-btn"
            onClick={() => onOpenReservation()}
            className="relative group overflow-hidden px-4 py-2 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 shadow-[0_0_20px_rgba(236,72,153,0.35)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300 active:scale-95 flex items-center gap-2 border border-pink-400/30"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-200" />
            <span>Reservar Mesa</span>
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 pointer-events-none" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d14]/98 backdrop-blur-2xl border-b border-amber-500/20 px-4 pt-4 pb-6 mt-2 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-800/60 text-xs font-semibold"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={handleToggleAudio}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-amber-500/30 text-amber-300 flex items-center justify-center gap-2"
              >
                <Music className="w-4 h-4" />
                <span>{audioActive ? 'Pausar Lounge Audio' : 'Activar Lounge Audio Tokyo-Lima'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 to-amber-500 flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar Mesa en Salón</span>
              </button>

              <a
                href="https://wa.me/51951770377?text=Hola%20Kai-To,%20quisiera%20hacer%20un%20pedido%20o%20reserva!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Atención directa por WhatsApp (+51 951 770 377)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

