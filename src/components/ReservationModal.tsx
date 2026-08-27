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
  Heart,
  Coffee,
  Wine
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
  initialLocationId = 'huanka-chiclayo-principal'
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('13:30');
  const [experience, setExperience] = useState<'desayuno' | 'almuerzo' | 'happy-hour' | 'cena-romantica' | 'cumpleanos'>('almuerzo');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const selectedLoc = LOCATIONS_DATA[0];

  const timeOptions = [
    '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM',
    '01:00 PM', '02:00 PM', '03:00 PM',
    '05:00 PM', '06:30 PM', '08:00 PM', '09:00 PM'
  ];

  const handleWhatsAppBooking = () => {
    const expMap = {
      'desayuno': '☀️ Desayuno de Chicharrón & Café Pasado (8am - 12pm)',
      'almuerzo': '🍽️ Almuerzo Novoandino a la Carta / Menú Ejecutivo',
      'happy-hour': '🍹 Happy Hour 2x30 en Cócteles & Piqueos (4pm - 10pm)',
      'cena-romantica': '✨ Experiencia Cena Romántica con Velas & Flores',
      'cumpleanos': '🎂 Celebración de Cumpleaños / Grupo de Amigos',
    };

    const expText = expMap[experience];

    const message = 
      `🌽 *RESERVA DE MESA EN HUANKA CHICLAYO* 🌽\n\n` +
      `📍 *Sede:* Calle Francisco Cabrera 436, Chiclayo\n` +
      `👤 *Nombre:* ${name.trim() || 'Cliente'}\n` +
      `📱 *Teléfono:* ${phone.trim() || 'No especificado'}\n` +
      `👥 *Comensales:* ${guests} personas\n` +
      `📅 *Fecha:* ${date}\n` +
      `⏰ *Hora:* ${timeSlot}\n` +
      `✨ *Experiencia:* ${expText}\n` +
      (notes.trim() ? `📝 *Detalles / Notas:* ${notes.trim()}\n` : '') +
      `\n_Por favor confirmar disponibilidad de mesa._`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/51953368821?text=${encoded}`;

    setIsSuccess(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#1c110b] border border-[#e5aa38]/40 shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#28160e] text-[#dec3b3] hover:text-white hover:bg-[#3d2015] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              ¡Redirigiendo a WhatsApp de Huanka!
            </h3>
            <p className="text-xs text-[#dec3b3] max-w-md mx-auto">
              Tu solicitud ha sido formateada con todos los detalles para nuestro equipo en Francisco Cabrera 436, Chiclayo.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#28160e] text-xs font-bold text-[#f7efe6] hover:bg-[#3d2015] transition-all"
            >
              Cerrar Ventana
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5aa38]/15 border border-[#e5aa38]/30 text-[#f3be52] text-[10px] font-bold uppercase tracking-widest mb-2">
                <Sparkles className="w-3 h-3" />
                <span>FRANCISCO CABRERA 436 • CHICLAYO</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                RESERVA TU MESA EN HUANKA
              </h2>
              <p className="text-xs text-[#dec3b3]">
                Atención personalizada sin costo de reserva previa.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              
              {/* Experience Selector */}
              <div>
                <label className="text-xs font-bold text-[#dec3b3] uppercase tracking-wider block mb-2">
                  Tipo de Experiencia
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'desayuno', label: 'Desayuno (8am-12pm)', icon: '☀️' },
                    { id: 'almuerzo', label: 'Almuerzo Novoandino', icon: '🍽️' },
                    { id: 'happy-hour', label: 'Happy Hour (2x30)', icon: '🍹' },
                    { id: 'cena-romantica', label: 'Cena Romántica', icon: '✨' },
                    { id: 'cumpleanos', label: 'Cumpleaños', icon: '🎂' },
                  ].map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setExperience(exp.id as any)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-1.5 ${
                        experience === exp.id
                          ? 'bg-gradient-to-r from-[#c86a3e] to-[#e5aa38] text-white shadow-md'
                          : 'bg-[#28160e] text-[#dec3b3] hover:text-white border border-[#3d2015]'
                      }`}
                    >
                      <span>{exp.icon}</span>
                      <span className="truncate">{exp.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#dec3b3] block mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Carmen Flores"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#28160e] border border-[#3d2015] focus:border-[#e5aa38] text-xs text-white placeholder-[#8c6b5a] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec3b3] block mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 953 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#28160e] border border-[#3d2015] focus:border-[#e5aa38] text-xs text-white placeholder-[#8c6b5a] outline-none"
                  />
                </div>
              </div>

              {/* Guests, Date, Time */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#dec3b3] block mb-1">
                    Personas
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#28160e] border border-[#3d2015] focus:border-[#e5aa38] text-xs text-white outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map(n => (
                      <option key={n} value={n} className="bg-[#1c110b]">{n} {n === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec3b3] block mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#28160e] border border-[#3d2015] focus:border-[#e5aa38] text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#dec3b3] block mb-1">
                    Hora
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#28160e] border border-[#3d2015] focus:border-[#e5aa38] text-xs text-white outline-none"
                  >
                    {timeOptions.map(t => (
                      <option key={t} value={t} className="bg-[#1c110b]">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-[#dec3b3] block mb-1">
                  Notas Especiales (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Mesa cerca a la ventana, aniversario, decoración..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#28160e] border border-[#3d2015] focus:border-[#e5aa38] text-xs text-white placeholder-[#8c6b5a] outline-none"
                />
              </div>

            </div>

            {/* Submit to WhatsApp */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full py-4 rounded-2xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Confirmar Reserva a WhatsApp (+51 953 368 821)</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
