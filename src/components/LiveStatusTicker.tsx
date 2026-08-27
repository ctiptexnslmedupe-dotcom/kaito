import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Sparkles, Flame, CheckCircle, MessageCircle, AlertCircle, Coffee, Wine } from 'lucide-react';

export const LiveStatusTicker: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  // Huanka Hours Logic:
  // Breakfast: 8:00 to 12:00
  // Lunch: 12:30 to 16:00
  // Happy Hour: 16:00 to 22:00
  // Open: 8:00 to 22:30
  const isBreakfastTime = hours >= 8 && hours < 12;
  const isHappyHour = hours >= 16 && hours <= 22;
  const isOpen = hours >= 8 && (hours < 22 || (hours === 22 && minutes <= 30));

  return (
    <div className="bg-[#180f0a] border-b border-[#e5aa38]/20 py-2 relative z-30 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 text-xs">
        
        {/* Left Status Pulse */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2a170e] border border-[#e5aa38]/30">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
            <span className="font-bold text-[#f7efe6] text-[11px]">
              {isOpen ? 'SALÓN ABIERTO HOY' : 'ABRIMOS A LAS 8:00 AM'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[#dec3b3] text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-[#e5aa38]" />
            <span>Francisco Cabrera 436, Chiclayo</span>
          </div>
        </div>

        {/* Center Dynamic Moment Banner */}
        <div className="hidden md:flex items-center gap-4 text-[11px] text-[#dec3b3]">
          {isBreakfastTime && (
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e5aa38]/15 border border-[#e5aa38]/40 text-[#f3be52] font-semibold animate-pulse">
              <Coffee className="w-3.5 h-3.5" />
              <span>¡Momento Desayunos Huanka! Chicharrón & Café Caliente</span>
            </div>
          )}

          {isHappyHour && (
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c86a3e]/20 border border-[#c86a3e]/40 text-[#f4a261] font-semibold animate-pulse">
              <Wine className="w-3.5 h-3.5" />
              <span>¡Happy Hour Activo! 2 Cócteles de Autor x S/. 30 (4pm a 10pm)</span>
            </div>
          )}

          {!isBreakfastTime && !isHappyHour && (
            <div className="flex items-center gap-2">
              <span className="text-[#e5aa38] font-bold">⭐ Carta Novoandina:</span>
              <span>Risottos de Lomo, Arroz con Pato, Piqueos & Cócteles</span>
            </div>
          )}
        </div>

        {/* Right WhatsApp Quick Action */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://wa.me/51953368821"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp Pedidos:</span>
            <span className="underline font-bold">+51 953 368 821</span>
          </a>
        </div>

      </div>
    </div>
  );
};
