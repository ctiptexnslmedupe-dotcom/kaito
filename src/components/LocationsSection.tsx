import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Check, 
  Sparkles, 
  MessageCircle, 
  Calendar,
  ShieldCheck,
  Car
} from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locationsData';
import { LocationInfo } from '../types';

interface LocationsSectionProps {
  onOpenReservationWithLocation: (locationId: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onOpenReservationWithLocation }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('miraflores');

  return (
    <section id="locales" className="py-24 bg-[#090b10] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nuestras Sedes en Lima</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            VISÍTANOS EN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400">MIRAFLORES Y SURCO</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Dos puntos estratégicos en Lima para vivir la experiencia Kai-To. Espacios modernos con aire acondicionado, barra sushiman en vivo y nuestra icónica iluminación de neón.
          </p>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {LOCATIONS_DATA.map((loc) => {
            const isSelected = selectedLocationId === loc.id;
            const whatsappLocationUrl = `https://wa.me/${loc.whatsapp}?text=Hola%20Kai-To!%20Quisiera%20reservar%20una%20mesa%20en%20la%20sede%20*${encodeURIComponent(loc.name)}*`;

            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLocationId(loc.id)}
                className={`rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0c0f17] border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-pink-500 shadow-[0_0_35px_rgba(236,72,153,0.25)]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                
                {/* Image Banner */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={loc.photos[0]}
                    alt={loc.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f17] via-transparent to-black/40" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500 text-white shadow-md">
                      {loc.district}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      Abierto Hoy
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span>{loc.address}</span>
                    </p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-4">
                    {/* Reference */}
                    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300 flex items-start gap-2">
                      <Navigation className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Referencia:</strong> {loc.reference}</span>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2 font-bold text-white mb-1">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Horarios de Atención:</span>
                      </div>
                      <p className="text-slate-400 pl-6">{loc.hoursWeekday}</p>
                      <p className="text-slate-400 pl-6">{loc.hoursWeekend}</p>
                    </div>

                    {/* Features Tags */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Comodidades & Ambiente:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.features.map((feat, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-pink-400" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Ambiance Note */}
                    <p className="text-xs text-slate-400 italic">
                      "{loc.ambiance}"
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenReservationWithLocation(loc.id);
                      }}
                      className="w-full sm:flex-1 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 shadow-md shadow-pink-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Reservar en {loc.name.replace('Sede ', '')}</span>
                    </button>

                    <a
                      href={loc.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4 text-cyan-400" />
                      <span>Cómo Llegar</span>
                    </a>

                    <a
                      href={whatsappLocationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 transition-colors"
                      title="Escribir por WhatsApp a esta sede"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Delivery Service Banner */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Car className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white">
                ¿Prefieres disfrutar en casa?
              </h4>
              <p className="text-xs text-slate-400">
                Llegamos a todo Miraflores, Surco, San Isidro, Barranco, San Borja y distritos aledaños en empaques térmicos sellados.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/51951770377?text=Hola%20Kai-To!%20Quiero%20hacer%20un%20pedido%20Delivery%20a%20mi%20direcci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-900/30"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pedir Delivery Directo</span>
          </a>
        </div>

      </div>
    </section>
  );
};
