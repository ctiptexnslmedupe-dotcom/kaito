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
  Gift 
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

  const [selectedLocation, setSelectedLocation] = useState<string>(initialLocationId);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('19:30');
  const [experience, setExperience] = useState<'barra-libre' | 'carta' | 'cumpleanos'>('barra-libre');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const activeLocation = LOCATIONS_DATA.find(l => l.id === selectedLocation) || LOCATIONS_DATA[0];

  const timeOptions = [
    '12:30 PM', '01:30 PM', '02:30 PM', '03:30 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
  ];

  const handleWhatsAppBooking = () => {
    const expText = 
      experience === 'barra-libre' 
        ? '🔥 Barra Libre All You Can Eat (S/. 59.90)'
        : experience === 'cumpleanos'
        ? '🎉 Celebración de Cumpleaños (Cumpleañero Gratis)'
        : '🍣 Carta Libre & Makis';

    const message = 
      `🍣 *RESERVA DE MESA EN KAI-TO* 🍣\n\n` +
      `📍 *Sede:* ${activeLocation.name}\n` +
      `👤 *Nombre:* ${name.trim() || 'Cliente'}\n` +
      `📱 *Teléfono:* ${phone.trim() || 'No especificado'}\n` +
      `👥 *Comensales:* ${guests} personas\n` +
      `📅 *Fecha:* ${date}\n` +
      `⏰ *Hora:* ${timeSlot}\n` +
      `✨ *Experiencia:* ${expText}\n` +
      (notes.trim() ? `📝 *Detalles / Notas:* ${notes.trim()}\n` : '') +
      `\n_Por favor confirmar disponibilidad de mesa._`;

    const encoded = encodeURIComponent(message);
    const waNumber = activeLocation.whatsapp || '51987654321';
    const waUrl = `https://wa.me/${waNumber}?text=${encoded}`;

    setIsSuccess(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#141422] border border-[#ff0055]/30 shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              ¡Redirigiendo a WhatsApp de {activeLocation.district}!
            </h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto">
              Tu solicitud ha sido formateada con todos los detalles para atención inmediata de nuestros anfitriones.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-gray-200 hover:bg-white/20 transition-all"
            >
              Cerrar Ventana
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff0055]/15 border border-[#ff0055]/30 text-[#ff0055] text-[10px] font-bold uppercase tracking-widest mb-2">
                <Sparkles className="w-3 h-3" />
                <span>RESERVAS DIRECTAS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                RESERVA TU MESA KAI-TO
              </h2>
              <p className="text-xs text-gray-400">
                Asegura tu lugar en nuestras sedes de Miraflores o Surco sin costo de reserva.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              
              {/* Location Picker */}
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">
                  Sede
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {LOCATIONS_DATA.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                        selectedLocation === loc.id
                          ? 'bg-[#ff0055] border-[#ff0055] text-white shadow-md shadow-[#ff0055]/30'
                          : 'bg-[#1c1c2e] border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      <MapPin className="w-4 h-4 shrink-0" />
                      <div>
                        <span className="block">{loc.district}</span>
                        <span className="text-[10px] opacity-75 font-normal truncate block">{loc.address.split(',')[0]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Selector */}
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">
                  Tipo de Experiencia
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'barra-libre', label: 'Barra Libre', icon: '🔥' },
                    { id: 'carta', label: 'A la Carta', icon: '🍣' },
                    { id: 'cumpleanos', label: 'Cumpleaños', icon: '🎉' },
                  ].map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setExperience(exp.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                        experience === exp.id
                          ? 'bg-[#00ffff]/20 border border-[#00ffff] text-[#00ffff]'
                          : 'bg-[#1c1c2e] border border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>{exp.icon}</span>
                      <span>{exp.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Rodrigo Mendoza"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1c2e] border border-white/10 focus:border-[#00ffff] text-xs text-white placeholder-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 987 654 321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1c2e] border border-white/10 focus:border-[#00ffff] text-xs text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Guests, Date, Time */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Personas
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1c1c2e] border border-white/10 focus:border-[#00ffff] text-xs text-white outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                      <option key={n} value={n} className="bg-[#141422]">{n} {n === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1c1c2e] border border-white/10 focus:border-[#00ffff] text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Hora
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1c1c2e] border border-white/10 focus:border-[#00ffff] text-xs text-white outline-none"
                  >
                    {timeOptions.map(t => (
                      <option key={t} value={t} className="bg-[#141422]">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Notas Especiales (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Aniversario, mesa en terraza, cumpleaños..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1c1c2e] border border-white/10 focus:border-[#00ffff] text-xs text-white placeholder-gray-500 outline-none"
                />
              </div>

            </div>

            {/* Submit to WhatsApp */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full py-4 rounded-2xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirmar Reserva por WhatsApp</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
