import React, { useState, useEffect } from 'react';
import { Utensils, MapPin, Phone, Sparkles, Menu, X, Flame, MessageCircle, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: (locationId?: string) => void;
  onOpenMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation, onOpenMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Barra Libre', href: '#barra-libre', badge: 'All You Can Eat' },
    { label: 'La Carta', href: '#carta', badge: '+30 Variedades' },
    { label: 'Promociones', href: '#promociones', badge: 'Desde S/. 59' },
    { label: 'Arma tu Ronda', href: '#arma-tu-ronda', badge: 'Simulador' },
    { label: 'Pared Neón', href: '#neon-wall' },
    { label: 'Locales & Horarios', href: '#locales' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#090b10]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl shadow-black/50 py-3' 
          : 'bg-gradient-to-b from-[#090b10]/95 via-[#090b10]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500/20 via-slate-900 to-cyan-500/20 border border-pink-500/40 group-hover:border-pink-400 transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <span className="font-jp text-lg font-bold text-pink-400 group-hover:text-pink-300">海</span>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-cyan-400" />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold tracking-wider text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                KAI<span className="text-pink-500">-</span>TO
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
                Barra Fusión
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider font-medium">
              Miraflores • Surco | Lima
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors group flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-slate-800 text-cyan-400 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Actions CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/51951770377?text=Hola%20Kai-To,%20quisiera%20consultar%20sobre%20la%20carta%20y%20promociones!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 hover:border-emerald-400 transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <button
            id="nav-reservar-btn"
            onClick={() => onOpenReservation()}
            className="relative group overflow-hidden px-4 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-amber-200" />
            <span>Reservar Mesa</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 hover:text-white"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1118]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-4 pb-6 mt-3 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 to-amber-500 flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30"
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
