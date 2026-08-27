import React from 'react';
import { MapPin, Phone, Instagram, MessageCircle, Clock, Heart, Flame, Shield } from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locationsData';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  return (
    <footer className="bg-[#07070c] border-t border-white/10 text-gray-400 relative overflow-hidden pt-16 pb-12">
      
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-[#ff0055]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0055] to-[#00ffff] p-[2px]">
                <div className="w-full h-full bg-[#0d0d14] rounded-xl flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#ff0055]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl text-white tracking-wider">
                  KAI<span className="text-[#ff0055]">-</span>TO
                </span>
                <span className="text-[10px] text-[#00ffff] tracking-widest font-bold uppercase">
                  BARRA FUSIÓN NIKKEI
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              La experiencia definitiva de cocina nikkei en Lima. Makis de autor, nigiris flameados al fuego vivo, coctelería y nuestra legendaria barra libre en Miraflores y Surco.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#141422] border border-white/10 hover:border-[#ff0055] text-gray-300 hover:text-[#ff0055] flex items-center justify-center transition-all shadow-sm"
                title="Instagram @kaitoperu"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/51987654321"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#141422] border border-white/10 hover:border-emerald-500 text-gray-300 hover:text-emerald-400 flex items-center justify-center transition-all shadow-sm"
                title="WhatsApp Delivery"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display">
              Carta & Experiencias
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#barra-libre" className="hover:text-[#ff0055] transition-colors">
                  Barra Libre All You Can Eat (S/. 59.90)
                </a>
              </li>
              <li>
                <a href="#carta" className="hover:text-[#00ffff] transition-colors">
                  Makis Acevichados & Flameados
                </a>
              </li>
              <li>
                <a href="#promos" className="hover:text-[#ffaa00] transition-colors">
                  Happy Hour 2x S/. 35 Cócteles
                </a>
              </li>
              <li>
                <a href="#arma-tu-tabla" className="hover:text-[#ff0055] transition-colors">
                  Arma tu Tabla (30 y 50 cortes)
                </a>
              </li>
              <li>
                <a href="#promos" className="hover:text-[#00ffff] transition-colors">
                  Cumpleañero Come Gratis (4+)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sedes (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display">
              Nuestras Sedes en Lima
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-white block text-[13px]">Miraflores (Principal)</span>
                <p className="text-gray-400">Av. Mariscal La Mar 1228 • Delivery: +51 987 654 321</p>
                <p className="text-[11px] text-[#00ffff]">Lun a Dom: 12:30 PM a 11:00 PM</p>
              </div>

              <div>
                <span className="font-bold text-white block text-[13px]">Santiago de Surco (Chacarilla)</span>
                <p className="text-gray-400">Av. Primavera 643 • Delivery: +51 987 654 322</p>
                <p className="text-[11px] text-[#00ffff]">Lun a Dom: 1:00 PM a 11:30 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} KAI-TO Barra Fusión • Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Diseñado con pasión nikkei para</span>
            <span className="text-[#ff0055] font-semibold">Lima, Perú 🇵🇪</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
