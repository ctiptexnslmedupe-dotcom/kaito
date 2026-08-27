import React, { useState } from 'react';
import { Flame, Clock, CheckCircle2, AlertCircle, Sparkles, Trophy, Users, ArrowRight, TrendingDown, Utensils, HeartHandshake } from 'lucide-react';
import { BARRA_LIBRE_FEATURES } from '../data/promosData';

interface BarraLibreSectionProps {
  onOpenReservation: () => void;
}

export const BarraLibreSection: React.FC<BarraLibreSectionProps> = ({ onOpenReservation }) => {
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [activeTab, setActiveTab] = useState<'beneficios' | 'degustacion' | 'reglas' | 'preguntas'>('beneficios');

  const basePrice = BARRA_LIBRE_FEATURES.pricePerPerson;
  const estimatedTotal = (basePrice * peopleCount).toFixed(2);
  const estimatedMakisCount = peopleCount * 24; // 24 to 30 makis per person
  const estimatedAlaCarteValue = (peopleCount * 135).toFixed(2); // If bought per table/dish individually
  const estimatedSavings = (Number(estimatedAlaCarteValue) - Number(estimatedTotal)).toFixed(2);

  const tastingSteps = [
    {
      step: '01',
      title: 'Apertura Crocante',
      japanese: '前菜',
      items: 'Alitas Glaseadas Nikkei + Ebi Furai al Panko',
      tip: 'Despierta el paladar con texturas crujientes y notas de kion y tare.',
    },
    {
      step: '02',
      title: 'Frescura & Acidez Cítrica',
      japanese: '鮮魚',
      items: 'Acevichado Kai-To + Dragón Tartar de Salmón',
      tip: 'El corazón de la gastronomía Nikkei con ají amarillo peruano.',
    },
    {
      step: '03',
      title: 'Fuego Vivo & Flameados',
      japanese: '炙り',
      items: 'Volcano al Soplete + Salmón Trufado Nikkei',
      tip: 'Gratinado en mesa con soplete y toques ahumados mantecosos.',
    },
    {
      step: '04',
      title: 'Fusión Criolla & Crujiente',
      japanese: '創作',
      items: 'Lomo Saltado Roll + Furai Supremo Kai-To',
      tip: 'El gran cierre con notas de wok peruano y reducción teriyaki.',
    },
  ];

  return (
    <section id="barra-libre" className="py-24 bg-[#06080d] relative overflow-hidden border-t border-b border-amber-500/15">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none animate-float-reverse" />

      {/* Japanese Watermark */}
      <div className="absolute top-10 right-10 font-jp text-[140px] font-black text-amber-500/5 select-none pointer-events-none">
        無制限
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Luxury Serif & Display */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="font-cinzel">EXPERIENCIA ILIMITADA EN MESA</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            BARRA LIBRE <span className="font-serif-luxury italic font-normal text-amber-200">Nikkei</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400">
              ALL YOU CAN EAT
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Disfruta de más de 22 variedades de makis seleccionados, alitas glaseadas y piqueos calientes servidos en rondas continuas durante 90 minutos con sopleteado en vivo.
          </p>
        </div>

        {/* Main Grid: Price Card + Interactive Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Feature Card (Price & Luxury Guarantee) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#0e121d] via-[#0b0e17] to-[#07090f] border border-amber-500/30 p-8 sm:p-10 flex flex-col justify-between relative shadow-[0_0_35px_rgba(229,195,120,0.15)] group hover:border-amber-400/60 transition-all">
            
            <div className="absolute top-6 right-6">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 shadow-md">
                ★ TOP EXPERIENCIA
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-slate-400 block mb-2 font-cinzel">
                Tarifa All You Can Eat
              </span>
              
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-amber-300 text-2xl font-bold">S/.</span>
                <span className="font-display text-5xl sm:text-6xl font-black text-white tracking-tight">
                  59<span className="text-amber-300 text-4xl sm:text-5xl">.90</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">/ persona (Lun - Jue)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 mb-6 flex items-center justify-between">
                <span>Viernes a Domingo & Feriados:</span>
                <strong className="text-amber-300 font-bold">S/. 64.90</strong>
              </div>

              {/* What's included checklist */}
              <ul className="space-y-3.5 mb-8">
                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>+22 Variedades de Makis</strong> (Acevichado, Dragón Tartar, Furai Supremo, Lomo Saltado, Volcano, etc.)</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Alitas Glaseadas Nikkei</strong> y Acevichadas ilimitadas por rondas</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Gyozas crujientes & Ebi Furai</strong> al panko japonés</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>90 Minutos</strong> de rondas continuas y sopleteado en vivo en tu mesa</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenReservation}
              className="w-full py-4 rounded-2xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:to-amber-400 shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2 border border-pink-400/30 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Reservar Mesa Barra Libre</span>
            </button>
          </div>

          {/* Right: Interactive Table Simulator & Experience Selector */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Interactive Calculator for your group */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0e17]/90 border border-slate-800 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-400" />
                    Simula la Degustación de tu Mesa
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Calcula el rendimiento, makis y ahorro estimado para tu grupo</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
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
                          ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-[0_0_20px_rgba(229,195,120,0.35)]'
                          : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Stats with Savings Meter */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#06080d] border border-slate-800 text-center">
                <div className="p-2">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Makis estimados</span>
                  <strong className="text-base sm:text-lg font-bold text-amber-300">~{estimatedMakisCount} cortes</strong>
                </div>
                <div className="p-2 border-y sm:border-y-0 sm:border-x border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Total Mesa Lun-Jue</span>
                  <strong className="text-base sm:text-lg font-bold text-white">S/. {estimatedTotal}</strong>
                </div>
                <div className="p-2">
                  <span className="text-[11px] text-emerald-400 uppercase font-semibold flex items-center justify-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> Ahorras aprox.
                  </span>
                  <strong className="text-base sm:text-lg font-bold text-emerald-400">S/. {estimatedSavings}</strong>
                </div>
              </div>
            </div>

            {/* Tabbed Navigation: Degustación Omakase / Beneficios / Reglas */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0e17]/90 border border-slate-800 backdrop-blur-xl flex-1 flex flex-col justify-between shadow-xl">
              
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                <button
                  onClick={() => setActiveTab('beneficios')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'beneficios' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dinámica & Ritmo
                </button>
                <button
                  onClick={() => setActiveTab('degustacion')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'degustacion' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Ruta de 4 Pasos
                </button>
                <button
                  onClick={() => setActiveTab('reglas')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'reglas' 
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Reglas de Salón
                </button>
                <button
                  onClick={() => setActiveTab('preguntas')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'preguntas' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Preguntas
                </button>
              </div>

              {activeTab === 'beneficios' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="font-bold text-amber-300 block mb-1">Rondas de 3 Tablas</span>
                    <p className="text-slate-300">Pides de 3 en 3 variedades para garantizar que cada corte llegue fresco con temperatura y crocancia óptima.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="font-bold text-rose-300 block mb-1">Flameado en Mesa</span>
                    <p className="text-slate-300">Nuestros sushimen aplican el soplete directamente frente a ti en las piezas gratinadas.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="font-bold text-cyan-300 block mb-1">Alitas & Piqueos Ilimitados</span>
                    <p className="text-slate-300">Alterna tus rondas de makis con alitas nikkei crocantes, gyozas y ebi furai sin costo adicional.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="font-bold text-emerald-300 block mb-1">Servicio Fluido</span>
                    <p className="text-slate-300">Atención atenta para que mientras disfrutas tu ronda actual, la siguiente ya esté en marcha.</p>
                  </div>
                </div>
              )}

              {activeTab === 'degustacion' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {tastingSteps.map((step) => (
                    <div key={step.step} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 relative">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-cinzel text-[11px] font-bold text-amber-300">PASO {step.step} • {step.title}</span>
                        <span className="font-jp text-[10px] text-slate-500">{step.japanese}</span>
                      </div>
                      <strong className="text-slate-100 block text-[11px] mb-1">{step.items}</strong>
                      <p className="text-[11px] text-slate-400">{step.tip}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reglas' && (
                <div className="space-y-2 text-xs text-slate-300">
                  {BARRA_LIBRE_FEATURES.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <div>
                        <strong className="text-white block">{rule.title}</strong>
                        <p className="text-slate-400 text-[11px] mt-0.5">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'preguntas' && (
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <strong className="text-white block mb-0.5">¿Se puede reservar con anticipación?</strong>
                    <p className="text-slate-400 text-[11px]">Sí, recomendamos reservar para grupos grandes en nuestras sedes de Miraflores y Surco.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <strong className="text-white block mb-0.5">¿Las bebidas están incluidas?</strong>
                    <p className="text-slate-400 text-[11px]">Las bebidas y postres se piden a la carta (contamos con Chicha artesanal, Chilcanos y Mochis).</p>
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
