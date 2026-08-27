import React, { useState } from 'react';
import { Layers, Plus, Check, Trash2, MessageCircle, Sparkles, Utensils } from 'lucide-react';
import { DISHES_DATA } from '../data/menuData';
import { Dish } from '../types';

export const CustomRoundBuilder: React.FC = () => {
  const makisList = DISHES_DATA.filter(d => d.category === 'makis');
  const [selectedMakis, setSelectedMakis] = useState<Dish[]>([
    makisList[0],
    makisList[1],
    makisList[2],
  ]);
  const [tableCount, setTableCount] = useState<number>(30); // 30 or 50 pieces

  const handleToggleMaki = (maki: Dish) => {
    if (selectedMakis.some(m => m.id === maki.id)) {
      if (selectedMakis.length > 1) {
        setSelectedMakis(selectedMakis.filter(m => m.id !== maki.id));
      }
    } else {
      if (selectedMakis.length < 5) {
        setSelectedMakis([...selectedMakis, maki]);
      }
    }
  };

  const totalPrice = tableCount === 30 ? 79.90 : 129.90;

  const generateWhatsAppMessage = () => {
    const makisNames = selectedMakis.map(m => `• ${m.name}`).join('%0A');
    const msg = `Hola KAI-TO! Deseo pedir la *Tabla de ${tableCount} Cortes* (S/. ${totalPrice.toFixed(2)}) con los siguientes makis:%0A%0A${makisNames}%0A%0A¿Tienen cobertura delivery?`;
    return `https://wa.me/51987654321?text=${msg}`;
  };

  return (
    <section id="arma-tu-tabla" className="py-24 bg-[#0a0a10] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff0055]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff0055]/10 border border-[#ff0055]/30 text-[#ff0055] text-xs font-bold uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>PERSONALIZADOR EN VIVO</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            ARMA TU TABLA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#ffaa00] to-[#00ffff]">
              KAI-TO PERSONALIZADA
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Elige el tamaño de tu tabla y combina tus sabores favoritos de makis para pedir directo por WhatsApp a delivery o recoger en tienda.
          </p>
        </div>

        {/* 2-Column Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Makis Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Size Picker */}
            <div className="p-5 rounded-2xl bg-[#141422] border border-white/10 space-y-3">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                1. Elige el tamaño de tu tabla
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTableCount(30)}
                  className={`p-4 rounded-xl border font-display text-center transition-all ${
                    tableCount === 30
                      ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] border-[#ff0055] text-white shadow-lg shadow-[#ff0055]/30'
                      : 'bg-[#1a1a2e] border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg font-black block">Tabla 30 Cortes</span>
                  <span className="text-xs opacity-80">(Hasta 3 sabores) • S/. 79.90</span>
                </button>

                <button
                  onClick={() => setTableCount(50)}
                  className={`p-4 rounded-xl border font-display text-center transition-all ${
                    tableCount === 50
                      ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] border-[#ff0055] text-white shadow-lg shadow-[#ff0055]/30'
                      : 'bg-[#1a1a2e] border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-lg font-black block">Tabla 50 Cortes</span>
                  <span className="text-xs opacity-80">(Hasta 5 sabores) • S/. 129.90</span>
                </button>
              </div>
            </div>

            {/* Makis Picker */}
            <div className="p-5 rounded-2xl bg-[#141422] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  2. Selecciona tus Makis ({selectedMakis.length}/{tableCount === 30 ? 3 : 5} seleccionados)
                </label>
                <span className="text-xs text-[#00ffff] font-semibold">
                  Toca para añadir o quitar
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {makisList.map((maki) => {
                  const isSelected = selectedMakis.some(m => m.id === maki.id);
                  return (
                    <div
                      key={maki.id}
                      onClick={() => handleToggleMaki(maki)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#221c2e] border-[#ff0055] shadow-md shadow-[#ff0055]/20'
                          : 'bg-[#1a1a2e] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={maki.image}
                          alt={maki.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-white truncate">{maki.name}</h4>
                          <span className="text-[10px] text-gray-400 truncate block">
                            {maki.ingredients.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      </div>

                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#ff0055] text-white' : 'bg-white/10 text-gray-400'
                      }`}>
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & WhatsApp CTA (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#181828] to-[#10101c] border border-white/10 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#ff0055] font-bold block">
                    RESUMEN DE TU TABLA
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">
                    Tabla KAI-TO {tableCount} Cortes
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#00ffff]/20 text-[#00ffff] flex items-center justify-center font-black">
                  🍱
                </div>
              </div>

              {/* Selected List */}
              <div className="space-y-2">
                <span className="text-xs text-gray-400 font-semibold block">
                  Sabores incluidos ({selectedMakis.length} seleccionados):
                </span>
                {selectedMakis.map((maki, idx) => (
                  <div key={maki.id} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                    <span className="text-gray-200">
                      {idx + 1}. {maki.name} ({Math.round(tableCount / selectedMakis.length)} cortes)
                    </span>
                    <button
                      onClick={() => handleToggleMaki(maki)}
                      className="text-gray-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total and Order Button */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-gray-400">Total a Pagar</span>
                  <span className="font-display text-3xl font-black text-[#00ffff]">
                    S/. {totalPrice.toFixed(2)}
                  </span>
                </div>

                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar Pedido a WhatsApp</span>
                </a>

                <p className="text-[10px] text-center text-gray-500">
                  Incluye salsas acevichadas, tare dulce, palitos y servilletas.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
