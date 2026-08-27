import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  Flame, 
  PartyPopper 
} from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locationsData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocationId?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialLocationId = 'miraflores'
}) => {
  if (!isOpen) return null;

  const [locationId, setLocationId] = useState<string>(initialLocationId);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('20:00');
  const [experience, setExperience] = useState<'barra-libre' | 'carta' | 'cumpleanos'>('barra-libre');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const selectedLoc = LOCATIONS_DATA.find((l) => l.id === locationId) || LOCATIONS_DATA[0];

  const timeOptions = [
    '12:30 PM', '01:30 PM', '02:30 PM', '03:30 PM',
    '07:00 PM', '07:45 PM', '08:30 PM', '09:15 PM', '10:00 PM'
  ];

  const handleWhatsAppBooking = () => {
    const expText = 
      experience === 'barra-libre' ? '🔥 BARRA LIBRE ALL YOU CAN EAT' :
      experience === 'cumpleanos' ? '🎂 CELEBRACIÓN DE CUMPLEAÑOS' : '🍱 CARTA ABIERTA & COMBOS';

    const message = 
      `🏮 *SOLICITUD DE RESERVA EN KAI-TO* 🏮\n\n` +
      `📍 *Sede:* ${selectedLoc.name} (${selectedLoc.address})\n` +
      `👤 *Nombre:* ${name.trim() || 'Cliente'}\n` +
      `📱 *Teléfono:* ${phone.trim() || 'No especificado'}\n` +
      `👥 *Comensales:* ${guests} personas\n` +
      `📅 *Fecha:* ${date}\n` +
      `⏰ *Hora:* ${timeSlot}\n` +
      `✨ *Experiencia:* ${expText}\n` +
      (notes.trim() ? `📝 *Notas / Cumpleañero:* ${notes}\n\n` : '\n') +
      `¿Podrían confirmarme la reserva por favor? ¡Muchas gracias!`;

    const url = `https://wa.me/51951770377?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#111522] via-[#0d101a] to-[#090b10] rounded-3xl border border-pink-500/40 shadow-[0_0_50px_rgba(236,72,153,0.3)] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-jp text-pink-400 font-bold">海人</span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
              Reserva Oficial
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Reserva tu Mesa en <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300">Kai-To</span>
          </h3>
          <p className="text-xs text-slate-400">
            Asegura tu lugar para Barra Libre, cumpleaños o una cena única en Miraflores o Surco.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-white">¡Solicitud enviada a WhatsApp!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Tu mensaje con todos los datos fue preparado y enviado. Nuestro anfitrión te confirmará la mesa en breves minutos.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700"
              >
                Cerrar Ventana
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Location Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  1. Selecciona la Sede:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {LOCATIONS_DATA.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setLocationId(loc.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        locationId === loc.id
                          ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <strong className="block text-xs sm:text-sm font-bold text-white mb-0.5">{loc.name}</strong>
                      <span className="text-[10px] text-slate-400 block truncate">{loc.address}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Experience Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  2. Tipo de Experiencia:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setExperience('barra-libre')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      experience === 'barra-libre'
                        ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                        : 'bg-slate-800/40 text-slate-400 border-slate-700'
                    }`}
                  >
                    Barra Libre (S/. 59.90)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExperience('carta')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      experience === 'carta'
                        ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                        : 'bg-slate-800/40 text-slate-400 border-slate-700'
                    }`}
                  >
                    Carta & Combos
                  </button>
                  <button
                    type="button"
                    onClick={() => setExperience('cumpleanos')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      experience === 'cumpleanos'
                        ? 'bg-pink-500 text-white border-pink-400 shadow-md'
                        : 'bg-slate-800/40 text-slate-400 border-slate-700'
                    }`}
                  >
                    Cumpleaños 🎉
                  </button>
                </div>
              </div>

              {/* Step 3: Date, Time, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Guests */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Comensales</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-pink-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                      <option key={n} value={n} className="bg-slate-900">
                        {n} {n === 1 ? 'Persona' : 'Personas'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Fecha</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Horario</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-pink-500"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t} className="bg-slate-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 4: Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    placeholder="Ej. Carlos Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="Ej. 951 770 377"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Peticiones Especiales / Cumpleañero (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. 'Mesa cerca a la pared de neón', 'Es mi cumpleaños', etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>
            </>
          )}

        </div>

        {/* Modal Footer CTA */}
        {!isSuccess && (
          <div className="p-6 bg-[#0c0f17] border-t border-slate-800 flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-400">
              Confirmación inmediata vía <strong className="text-emerald-400">WhatsApp</strong>
            </div>

            <button
              onClick={handleWhatsAppBooking}
              className="px-6 py-3.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirmar Reserva por WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
