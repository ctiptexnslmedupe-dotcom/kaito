import React, { useState, useEffect } from 'react';
import { Clock, Flame, Sparkles, MapPin, Wine } from 'lucide-react';

export const LiveStatusTicker: React.FC = () => {
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  const isHappyHourActive = currentHour >= 16 && currentHour < 20;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#ff0055] via-[#7928ca] to-[#00ffff] p-[1px] shadow-lg">
      <div className="bg-[#0e0e18] px-4 py-2.5 flex items-center justify-between text-xs overflow-x-auto whitespace-nowrap scrollbar-none gap-6">
        
        {/* Status indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-white uppercase tracking-wider">
            ATENDIENDO EN VIVO EN MIRAFLORES & SURCO
          </span>
        </div>

        {/* Happy hour highlight */}
        <div className="flex items-center gap-2 shrink-0 text-[#ffaa00]">
          <Wine className="w-3.5 h-3.5" />
          <span className="font-semibold">
            {isHappyHourActive
              ? '🔥 ¡HAPPY HOUR ACTIVO! 2x S/. 35 en Cócteles hasta las 8:00 PM'
              : '🍹 Happy Hour Nikkei hoy de 4:00 PM a 8:00 PM (2x S/. 35)'}
          </span>
        </div>

        {/* Promo ticker */}
        <div className="flex items-center gap-2 shrink-0 text-[#00ffff]">
          <Flame className="w-3.5 h-3.5" />
          <span className="font-semibold">
            Barra Libre All You Can Eat S/. 59.90 (Incluye Refill de Bebida)
          </span>
        </div>

      </div>
    </div>
  );
};
