import React from 'react';
import { MapPin, Phone, Instagram, MessageCircle, Clock, Heart, Sparkles, Flame, Shield } from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locationsData';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  return (
    <footer className="bg-[#05070a] border-t border-slate-900 text-slate-400 relative overflow-hidden pt-16 pb-12">
      
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-pink-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <span className="font-jp text-lg font-bold text-pink-400">海</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl text-white tracking-wider">
                  KAI<span className="text-pink-500">-</span>TO
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  BARRA FUSIÓN NIKKEI
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Fusión gastronómica peruano-japonesa con la mejor barra libre de makis, piezas flameadas al soplete y piqueos crujientes en un ambiente neón único en Lima.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/kaitosushipe/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-300 hover:text-pink-400 flex items-center justify-center transition-all shadow-sm"
                title="Instagram @kaitosushipe"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/51951770377"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-all shadow-sm"
                title="WhatsApp +51 951 770 377"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Locales (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Nuestras Sedes
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
                <strong className="text-white block font-display">📍 Sede Miraflores</strong>
                <p className="text-slate-400">Calle Bolognesi 143, Miraflores, Lima</p>
                <span className="text-[10px] text-pink-400 block mt-1">Lun - Dom: 12:30 PM a 11:00 PM</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
                <strong className="text-white block font-display">📍 Sede Surco</strong>
                <p className="text-slate-400">Av. Caminos del Inca 3252, Surco, Lima</p>
                <span className="text-[10px] text-cyan-400 block mt-1">Lun - Dom: 1:00 PM a 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Enlaces Rápidos
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <a href="#barra-libre" className="hover:text-pink-400 transition-colors flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-pink-500" />
                  <span>Barra Libre All You Can Eat</span>
                </a>
              </li>
              <li>
                <a href="#carta" className="hover:text-pink-400 transition-colors">
                  Carta Gastronómica & Makis
                </a>
              </li>
              <li>
                <a href="#promociones" className="hover:text-pink-400 transition-colors">
                  Promociones Salón & Delivery
                </a>
              </li>
              <li>
                <a href="#arma-tu-ronda" className="hover:text-pink-400 transition-colors">
                  Simulador de Ronda (36 Makis)
                </a>
              </li>
              <li>
                <a href="#neon-wall" className="hover:text-pink-400 transition-colors">
                  Pared Neón & Experiencias
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="text-pink-400 hover:text-pink-300 font-bold mt-2 inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reservar Mesa Online</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & payment methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} KAI-TO Barra Fusión. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Métodos de pago:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-bold">Yape</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-bold">Plin</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-bold">Visa / Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-bold">Efectivo</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
