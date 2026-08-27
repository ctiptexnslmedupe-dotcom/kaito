import React, { useState } from 'react';
import { Flame, Clock, CheckCircle2, AlertCircle, Sparkles, Trophy, Users, ArrowRight } from 'lucide-react';
import { BARRA_LIBRE_FEATURES } from '../data/promosData';

interface BarraLibreSectionProps {
  onOpenReservation: () => void;
}

export const BarraLibreSection: React.FC<BarraLibreSectionProps> = ({ onOpenReservation }) => {
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [activeTab, setActiveTab] = useState<'reglas' | 'beneficios' | 'preguntas'>('beneficios');

  const basePrice = BARRA_LIBRE_FEATURES.pricePerPerson;
  const estimatedTotal = (basePrice * peopleCount).toFixed(2);
  const estimatedMakisCount = peopleCount * 24; // 24 to 30 makis per person

  return (
    <section id="barra-libre" className="py-20 bg-[#07090e] relative overflow-hidden border-t border-b border-slate-800/80">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4" />
            <span>Experiencia Sin Límites</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            BARRA LIBRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400">ALL YOU CAN EAT</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Come todos los makis, alitas y piqueos que quieras en rondas continuas. Frescura al momento preparada directamente en nuestra barra por nuestros sushimen.
          </p>
        </div>

        {/* Main Grid: Price Card + Interactive Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Feature Card (Price & Highlights) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#0c0f17] border border-pink-500/30 p-8 sm:p-10 flex flex-col justify-between relative shadow-[0_0_30px_rgba(236,72,153,0.15)] group hover:border-pink-500/50 transition-all">
            
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500 text-white shadow-md shadow-pink-500/40">
                PROMO TOP
              </span>
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block mb-2">
                Tarifa Por Persona
              </span>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-slate-400 text-2xl font-bold">S/.</span>
                <span className="font-display text-5xl sm:text-6xl font-black text-white tracking-tight">
                  59<span className="text-pink-400 text-4xl sm:text-5xl">.90</span>
                </span>
                <span className="text-xs text-slate-400">/ pers. (Lun-Jue)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 mb-6 flex items-center justify-between">
                <span>Viernes, Sábados, Domingos & Feriados:</span>
                <strong className="text-amber-400 font-bold">S/. 64.90</strong>
              </div>

              {/* What's included checklist */}
              <ul className="space-y-3.5 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>+22 Variedades de Makis</strong> (Acevichado, Dragón Tartar, Furai, Lomo Saltado, etc.)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Alitas Glaseadas Nikkei</strong> ilimitadas por rondas</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Gyozas fritas & Ebi Furai</strong> seleccionados</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>90 Minutos</strong> de experiencia continua servida al momento</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenReservation}
              className="w-full py-4 rounded-2xl font-display text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reservar Mi Turno de Barra Libre</span>
            </button>
          </div>

          {/* Right: Interactive Table Simulator & Tabbed Rules */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Interactive Calculator for your group */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    Calcula tu Mesa de Amigos
                  </h3>
                  <p className="text-xs text-slate-400">Simula la cantidad de makis y costo para tu grupo</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
                  {peopleCount} {peopleCount === 1 ? 'Persona' : 'Personas'}
                </div>
              </div>

              {/* Slider / Buttons */}
              <div className="mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  {[2, 3, 4, 6, 8, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => setPeopleCount(num)}
                      className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        peopleCount === num
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#090c13] border border-slate-800 text-center">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Makis estimados</span>
                  <strong className="text-base sm:text-xl font-bold text-cyan-400">~{estimatedMakisCount} cortes</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Alitas ilimitadas</span>
                  <strong className="text-base sm:text-xl font-bold text-amber-400">¡Sin límite!</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Total mesa aprox.</span>
                  <strong className="text-base sm:text-xl font-bold text-emerald-400">S/. {estimatedTotal}</strong>
                </div>
              </div>
            </div>

            {/* Tabbed Rules & FAQ */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex-1 flex flex-col justify-between">
              
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                <button
                  onClick={() => setActiveTab('beneficios')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'beneficios' 
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dinámica de Servicio
                </button>
                <button
                  onClick={() => setActiveTab('reglas')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'reglas' 
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Reglas de la Barra
                </button>
                <button
                  onClick={() => setActiveTab('preguntas')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'preguntas' 
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Preguntas Frecuentes
                </button>
              </div>

              {activeTab === 'beneficios' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <span className="font-bold text-white block mb-1">Rondas de 3 Tablas</span>
                    <p className="text-slate-400">Pides de 3 en 3 variedades para que los makis lleguen frescos y con la temperatura perfecta.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <span className="font-bold text-white block mb-1">Flameado en Mesa</span>
                    <p className="text-slate-400">Pide piezas especiales y observa el show de soplete directo en tu plato.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <span className="font-bold text-white block mb-1">Alitas Nikkei Calientes</span>
                    <p className="text-slate-400">Combina tus tablas con porciones de alitas glaseadas dulces y picantitas.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <span className="font-bold text-white block mb-1">Atención Continua</span>
                    <p className="text-slate-400">Nuestros meseros y sushimen garantizan que nunca te falte una ronda en mesa.</p>
                  </div>
                </div>
              )}

              {activeTab === 'reglas' && (
                <div className="space-y-2 text-xs text-slate-300">
                  {BARRA_LIBRE_FEATURES.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-800/30">
                      <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <div>
                        <strong className="text-white block">{rule.title}</strong>
                        <p className="text-slate-400 text-[11px]">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'preguntas' && (
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-800/30">
                    <strong className="text-white block mb-0.5">¿Aceptan reservaciones para Barra Libre?</strong>
                    <p className="text-slate-400 text-[11px]">¡Sí! Puedes reservar por WhatsApp o venir por orden de llegada tanto en Miraflores como en Surco.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-800/30">
                    <strong className="text-white block mb-0.5">¿Las bebidas están incluidas en los S/. 59.90?</strong>
                    <p className="text-slate-400 text-[11px]">Las bebidas se piden por separado (contamos con gaseosas, chicha morada artesanal y cocteles Nikkei).</p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
