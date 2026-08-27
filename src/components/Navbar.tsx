import React, { useState } from 'react';
import { Sparkles, Utensils, MapPin, Calendar, MessageCircle, Menu, X, Flame } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: (locationId?: string) => void;
  onOpenMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation, onOpenMenu }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#ff0055]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo KAI-TO */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff0055] via-[#ff5500] to-[#00ffff] p-[2px] shadow-[0_0_20px_rgba(255,0,85,0.5)] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0d0d14] rounded-2xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#ff0055] animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-wider text-white group-hover:text-[#00ffff] transition-colors">
                KAI<span className="text-[#ff0055]">-</span>TO
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#00ffff] font-bold uppercase -mt-1">
                BARRA FUSIÓN NIKKEI
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            <a href="#barra-libre" className="text-gray-300 hover:text-[#ff0055] transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#ff0055]" />
              <span>Barra Libre</span>
            </a>
            <a href="#carta" onClick={onOpenMenu} className="text-gray-300 hover:text-[#00ffff] transition-colors flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-[#00ffff]" />
              <span>Carta & Makis</span>
            </a>
            <a href="#promos" className="text-gray-300 hover:text-[#ffaa00] transition-colors">
              Promociones
            </a>
            <a href="#arma-tu-tabla" className="text-gray-300 hover:text-[#ff0055] transition-colors">
              Arma tu Ronda
            </a>
            <a href="#locales" className="text-gray-300 hover:text-[#00ffff] transition-colors flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Locales (Miraflores / Surco)</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/51987654321?text=Hola%20KAI-TO!%20Deseo%20hacer%20un%20pedido%20Delivery%20de%20makis."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/30 hover:bg-[#00ffff]/20 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Delivery WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenReservation()}
              className="px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff0055] via-[#ff2a00] to-[#ffaa00] hover:from-[#ff2a00] hover:to-[#ff0055] shadow-[0_0_25px_rgba(255,0,85,0.4)] transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Mesa</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenReservation()}
              className="px-3 py-2 rounded-lg text-xs font-bold bg-[#ff0055] text-white shadow-md"
            >
              Reservar
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[#1a1a24] text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-[#0d0d14] border-b border-[#ff0055]/30 space-y-3">
          <a
            href="#barra-libre"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#ff0055]"
          >
            🔥 Barra Libre All You Can Eat
          </a>
          <a
            href="#carta"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenMenu();
            }}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#00ffff]"
          >
            🍣 Carta de Makis & Platos
          </a>
          <a
            href="#promos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#ffaa00]"
          >
            ⚡ Promociones & Happy Hour
          </a>
          <a
            href="#arma-tu-tabla"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#ff0055]"
          >
            🍱 Simulador Arma tu Ronda
          </a>
          <a
            href="#locales"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-gray-200 hover:text-[#00ffff]"
          >
            📍 Locales Miraflores & Surco
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://wa.me/51987654321?text=Hola%20KAI-TO!%20Deseo%20pedir%20makis%20por%20delivery."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl text-center text-xs font-bold text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/30"
            >
              Pedir por Delivery WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
