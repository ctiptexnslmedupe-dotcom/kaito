import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation, CheckCircle2, Sparkles, ExternalLink, Coffee } from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locationsData';

interface LocationsSectionProps {
  onOpenReservation: (locationId?: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onOpenReservation }) => {
  const location = LOCATIONS_DATA[0];

  return (
    <section id="locales" className="py-24 bg-[#120b08] relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#c86a3e]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#e5aa38]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e5aa38]/10 border border-[#e5aa38]/30 text-[#f3be52] text-xs font-bold uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-cinzel">SEDE CHICLAYO & CONTACTO</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            VISÍTANOS EN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e27b49] via-[#f3be52] to-[#e5aa38]">
              FRANCISCO CABRERA 436
            </span>
          </h2>

          <p className="text-[#dec3b3] text-sm sm:text-base leading-relaxed">
            Estamos ubicados en el corazón de Chiclayo, con un salón acogedor inspirado en la calidez andina y el mejor café de especialidad.
          </p>
        </div>

        {/* Location Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#1c110b] border border-[#3d2015] p-6 sm:p-10 shadow-2xl">
          
          {/* Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#e27b49] block mb-1">
                SEDE NOVOANDINA
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                Huanka Restaurante Café
              </h3>
              <p className="text-xs text-[#dec3b3] mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#e5aa38]" />
                <span>Calle Francisco Cabrera 436, Chiclayo (Lambayeque, Perú)</span>
              </p>
            </div>

            {/* Hours Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#24140d] border border-[#3d2015]">
                <div className="flex items-center gap-2 text-[#f3be52] font-bold text-xs mb-1">
                  <Coffee className="w-4 h-4" />
                  <span>Desayunos Huanka</span>
                </div>
                <p className="text-xs text-[#ebd7c8]">
                  {location.hoursBreakfast}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#24140d] border border-[#3d2015]">
                <div className="flex items-center gap-2 text-[#e27b49] font-bold text-xs mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Almuerzos & Noches</span>
                </div>
                <p className="text-xs text-[#ebd7c8]">
                  {location.hoursLunchDinner}
                </p>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Comodidades del local:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {location.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#dec3b3]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e5aa38] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#351e15]">
              <button
                onClick={() => onOpenReservation(location.id)}
                className="px-6 py-3.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c86a3e] to-[#e5aa38] hover:from-[#e27b49] hover:to-[#f3be52] shadow-lg transition-all"
              >
                Reservar en Chiclayo
              </button>

              <a
                href={`https://wa.me/${location.whatsapp}?text=Hola%20Huanka%20Chiclayo!%20Deseo%20hacer%20un%20pedido%20delivery%20o%20consultar%20disponibilidad%20de%20mesa.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Directo (+51 953 368 821)</span>
              </a>
            </div>

          </div>

          {/* Map Preview & Visual (5 cols) */}
          <div className="lg:col-span-5 h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#3d2015] relative shadow-inner">
            <iframe
              title="Google Map Huanka Chiclayo"
              src={location.googleMapsEmbedUrl}
              className="w-full h-full border-0 filter invert-[0.88] hue-rotate-[170deg] contrast-[1.2]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Quick map link overlay */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#140c08]/90 border border-[#e5aa38]/40 backdrop-blur-md flex items-center justify-between">
              <span className="text-[11px] font-bold text-white">Francisco Cabrera 436</span>
              <a
                href={location.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#f3be52] hover:underline flex items-center gap-1"
              >
                <span>Abrir GPS</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
