import React, { useState, useEffect } from 'react';
import { Utensils, MapPin, Sparkles, Menu, X, Flame, MessageCircle, Calendar, Volume2, VolumeX, Music, Coffee } from 'lucide-react';
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
    { label: 'Desayunos & Carta', href: '#carta', badge: 'Desde 8:00 AM' },
    { label: 'Happy Hour', href: '#promociones', badge: '2x S/. 30', isGold: true },
    { label: 'Arma tu Banquete', href: '#arma-tu-tabla', badge: 'Para Compartir' },
    { label: 'Cenas Románticas', href: '#promociones', badge: 'Experiencias' },
    { label: 'Sede Chiclayo', href: '#locales', badge: 'Francisco Cabrera 436' },
    { label: 'Huankilovers', href: '#huankilovers' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#140c08]/92 backdrop-blur-xl border-b border-[#e5aa38]/25 shadow-2xl shadow-black/80 py-2.5' 
          : 'bg-gradient-to-b from-[#120b08]/98 via-[#120b08]/75 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo - Huanka Terracotta & Gold Seal */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#c86a3e] via-[#3d1e13] to-[#e5aa38] p-[1.5px] shadow-[0_0_20px_rgba(200,106,62,0.35)] group-hover:shadow-[0_0_30px_rgba(229,170,56,0.6)] transition-all duration-300">
            <div className="w-full h-full rounded-[14px] bg-[#1a0f0a] flex items-center justify-center relative overflow-hidden">
              <span className="text-xl select-none group-hover:scale-110 transition-transform">🌽</span>
              <div className="absolute inset-0 bg-gradient-to-t from-[#c86a3e]/30 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#e5aa38] animate-ping opacity-75" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#e5aa38] border border-black" />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black tracking-wider text-xl sm:text-2xl text-white">
                HUAN<span className="text-[#e27b49]">KA</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#e5aa38]/15 text-[#f3be52] border border-[#e5aa38]/30">
                CHICLAYO
              </span>
            </div>
            <span className="text-[10px] text-[#dec3b3] tracking-widest font-serif-luxury italic">
              Restaurante Novoandino & Café
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-3 py-1.5 text-xs font-semibold text-[#ebd7c8] hover:text-white rounded-xl hover:bg-[#351e15]/50 transition-all duration-200 group flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border transition-all ${
                  link.isGold
                    ? 'bg-[#e5aa38]/20 text-[#f3be52] border-[#e5aa38]/40 group-hover:border-[#f3be52]'
                    : 'bg-[#1a0f0a] text-[#f4a261] border-[#c86a3e]/30 group-hover:border-[#c86a3e]/60'
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
            title={audioActive ? 'Pausar música ambiente andina' : 'Activar música ambiente andina'}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
              audioActive
                ? 'bg-[#e5aa38]/20 border-[#e5aa38] text-[#f3be52] shadow-[0_0_15px_rgba(229,170,56,0.4)] animate-pulse'
                : 'bg-[#23140d]/80 border-[#3d2015] text-[#b89582] hover:text-white hover:border-[#c86a3e]/50'
            }`}
          >
            {audioActive ? (
              <>
                <Volume2 className="w-4 h-4 text-[#f3be52]" />
                <span className="text-[11px] font-semibold tracking-wide pr-1">Andean Sound</span>
              </>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* WhatsApp Direct Order / Delivery */}
          <a
            href="https://wa.me/51953368821?text=Hola%20Huanka%20Chiclayo!%20Deseo%20hacer%20un%20pedido%20delivery%20o%20consultar%20la%20carta."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#f7efe6] bg-[#22120a] hover:bg-[#351c11] border border-[#e5aa38]/30 hover:border-[#e5aa38]/60 transition-all flex items-center gap-1.5 shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden xl:inline">Delivery WhatsApp</span>
          </a>

          {/* Reserve Table CTA */}
          <button
            id="nav-reservar-btn"
            onClick={() => onOpenReservation()}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c86a3e] via-[#e27b49] to-[#e5aa38] hover:from-[#e27b49] hover:to-[#f3be52] shadow-[0_0_20px_rgba(200,106,62,0.4)] transition-all duration-300 active:scale-95 flex items-center gap-2 border border-[#f3be52]/40"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>Reservar Mesa</span>
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 pointer-events-none" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#22120a] border border-[#c86a3e]/40 text-[#ebd7c8] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#140c08]/98 border-b border-[#e5aa38]/30 px-4 pt-4 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={handleToggleAudio}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold ${
                audioActive 
                  ? 'bg-[#e5aa38]/20 border-[#e5aa38] text-[#f3be52]' 
                  : 'bg-[#22120a] border-[#3d2015] text-[#b89582]'
              }`}
            >
              {audioActive ? <Volume2 className="w-4 h-4 text-[#f3be52]" /> : <VolumeX className="w-4 h-4" />}
              <span>{audioActive ? 'Música Activa' : 'Activar Música'}</span>
            </button>
            <a
              href="https://wa.me/51953368821"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#ebd7c8] hover:bg-[#351e15] transition-colors"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e5aa38]/15 text-[#f3be52] border border-[#e5aa38]/30">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReservation();
            }}
            className="w-full py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c86a3e] to-[#e5aa38] shadow-lg flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Reservar Mesa en Chiclayo</span>
          </button>
        </div>
      )}

    </header>
  );
};
