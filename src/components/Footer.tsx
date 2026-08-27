import React from 'react';
import { MapPin, Phone, Instagram, MessageCircle, Clock, Heart, Sparkles, Coffee, Shield } from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locationsData';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  return (
    <footer className="bg-[#0e0705] border-t border-[#3d2015] text-[#dec3b3] relative overflow-hidden pt-16 pb-12">
      
      {/* Warm Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-[#c86a3e]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2e1910]">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#24140d] border border-[#e5aa38]/40 shadow-[0_0_15px_rgba(229,170,56,0.25)]">
                <span className="text-xl">🌽</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl text-white tracking-wider">
                  HUAN<span className="text-[#e27b49]">KA</span>
                </span>
                <span className="text-[10px] text-[#dec3b3] uppercase tracking-widest font-semibold">
                  RESTAURANTE CAFÉ • CHICLAYO
                </span>
              </div>
            </div>

            <p className="text-xs text-[#dec3b3] max-w-sm leading-relaxed">
              Restaurante Novoandino en Chiclayo. Desayunos de chicharrón, café de altura, almuerzos gourmet, cócteles de autor y experiencias inolvidables en Francisco Cabrera 436.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/huanka.restaurante/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1c110b] border border-[#3d2015] hover:border-[#e5aa38] text-[#dec3b3] hover:text-[#f3be52] flex items-center justify-center transition-all shadow-sm"
                title="Instagram @huanka.restaurante"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/51953368821"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1c110b] border border-[#3d2015] hover:border-emerald-500 text-[#dec3b3] hover:text-emerald-400 flex items-center justify-center transition-all shadow-sm"
                title="WhatsApp +51 953 368 821"
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
                <a href="#carta" className="hover:text-[#f3be52] transition-colors">
                  Desayunos Huanka (8am - 12pm)
                </a>
              </li>
              <li>
                <a href="#promociones" className="hover:text-[#f3be52] transition-colors">
                  Happy Hour 2x S/. 30 (4pm - 10pm)
                </a>
              </li>
              <li>
                <a href="#carta" className="hover:text-[#f3be52] transition-colors">
                  Almuerzos & Risottos Novoandinos
                </a>
              </li>
              <li>
                <a href="#arma-tu-tabla" className="hover:text-[#f3be52] transition-colors">
                  Arma tu Banquete para Grupos
                </a>
              </li>
              <li>
                <a href="#promociones" className="hover:text-[#f3be52] transition-colors">
                  Cenas Románticas & Aniversarios
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Chiclayo Location & Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display">
              Sede Francisco Cabrera
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e5aa38] shrink-0 mt-0.5" />
                <span>Calle Francisco Cabrera 436, Chiclayo (Lambayeque)</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#e27b49] shrink-0 mt-0.5" />
                <span>Lun a Sáb: 8:00 AM – 10:30 PM | Dom: 8:00 AM – 4:30 PM</span>
              </p>
              <p className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Delivery & Reservas: +51 953 368 821</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c6b5a]">
          <p>© {new Date().getFullYear()} Huanka Restaurante Café • Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Diseñado con pasión novoandina para</span>
            <span className="text-[#f3be52] font-semibold">Chiclayo, Perú 🇵🇪</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
