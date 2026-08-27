import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation, CheckCircle2 } from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locationsData';

interface LocationsSectionProps {
  onOpenReservation: (locationId?: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="locales" className="py-24 bg-[#0a0a10] relative overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#00ffff]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/30 text-[#00ffff] text-xs font-bold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>NUESTROS SALONES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            SEDES EN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#ffaa00] to-[#00ffff]">
              MIRAFLORES & SURCO
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Visítanos en nuestras 2 sedes diseñadas con iluminación neón, barras abiertas de sushi y el mejor ambiente de Lima.
          </p>
        </div>

        {/* 2 Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LOCATIONS_DATA.map((loc) => (
            <div
              key={loc.id}
              className="rounded-3xl bg-[#141422] border border-white/10 overflow-hidden shadow-xl hover:border-[#00ffff]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Location Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141422] via-transparent to-black/30" />
                  
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#ff0055] text-white">
                    {loc.district}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {loc.name}
                    </h3>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  
                  {/* Address */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <MapPin className="w-5 h-5 text-[#00ffff] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">{loc.address}</p>
                      <p className="text-gray-500 text-xs">{loc.reference}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <Clock className="w-5 h-5 text-[#ffaa00] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p>{loc.hoursWeekday}</p>
                      <p className="text-[#00ffff] font-semibold">{loc.hoursWeekend}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                      Servicios de este local:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {loc.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffff] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenReservation(loc.id)}
                  className="w-full sm:flex-1 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff0055] to-[#ffaa00] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <span>Reservar en {loc.district}</span>
                </button>

                <a
                  href={loc.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-bold text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/30 hover:bg-[#00ffff]/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Ver Mapa</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
