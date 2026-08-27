import React, { useState } from 'react';
import { Layers, Plus, Check, Trash2, MessageCircle, Sparkles, Utensils, Wine, Coffee, Users, ArrowRight } from 'lucide-react';
import { DISHES_DATA } from '../data/menuData';
import { Dish } from '../types';

export const CustomRoundBuilder: React.FC = () => {
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([
    DISHES_DATA.find(d => d.id === 'desayuno-chicharron-huanka') || DISHES_DATA[0],
    DISHES_DATA.find(d => d.id === 'lomo-risotto-huancaina') || DISHES_DATA[1],
    DISHES_DATA.find(d => d.id === 'fuente-anticuchos-chicharron') || DISHES_DATA[2],
  ]);
  const [selectedDrink, setSelectedDrink] = useState<string>('Huanka Sour de Maíz (x2)');

  const handleToggleDish = (dish: Dish) => {
    if (selectedDishes.some(d => d.id === dish.id)) {
      setSelectedDishes(selectedDishes.filter(d => d.id !== dish.id));
    } else {
      if (selectedDishes.length < 6) {
        setSelectedDishes([...selectedDishes, dish]);
      }
    }
  };

  const totalPrice = selectedDishes.reduce((acc, d) => acc + d.price, 0) + (selectedDrink.includes('x2') ? 30 : 20);

  const generateWhatsAppMessage = () => {
    const dishList = selectedDishes.map(d => `• ${d.name} (S/. ${d.price.toFixed(2)})`).join('%0A');
    const msg = `Hola Huanka Chiclayo! 🌽 Deseo coordinar una mesa/pedido para ${peopleCount} personas:%0A%0A*Banquete Seleccionado:*%0A${dishList}%0A• Bebida: ${selectedDrink}%0A%0A*Total Estimado:* S/. ${totalPrice.toFixed(2)}%0A¿Tienen disponibilidad en salón o delivery?`;
    return `https://wa.me/51953368821?text=${msg}`;
  };

  return (
    <section id="arma-tu-tabla" className="py-24 bg-[#180f0a] relative overflow-hidden border-t border-[#e5aa38]/15">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c86a3e]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e5aa38]/10 border border-[#e5aa38]/30 text-[#f3be52] text-xs font-bold uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span className="font-cinzel">SIMULADOR DE BANQUETE & MESAS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            ARMA TU BANQUETE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e27b49] via-[#f3be52] to-[#e5aa38]">
              NOVOANDINO HUANKA
            </span>
          </h2>

          <p className="text-[#dec3b3] text-sm sm:text-base leading-relaxed">
            Elige los platos y cócteles para tu grupo de amigos o familia y genera tu pedido directo a WhatsApp con reserva de mesa asegurada.
          </p>
        </div>

        {/* 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Comensales Picker */}
            <div className="p-5 rounded-2xl bg-[#1f130d] border border-[#3d2015]">
              <label className="text-xs font-bold text-[#dec3b3] uppercase tracking-wider block mb-3">
                1. ¿Para cuántas personas es la mesa?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[2, 4, 6, 8].map(count => (
                  <button
                    key={count}
                    onClick={() => setPeopleCount(count)}
                    className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
                      peopleCount === count
                        ? 'bg-gradient-to-r from-[#c86a3e] to-[#e5aa38] text-white shadow-md'
                        : 'bg-[#28160e] text-[#dec3b3] hover:text-white border border-[#3d2015]'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{count} pers.</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dishes Selection Grid */}
            <div className="p-5 rounded-2xl bg-[#1f130d] border border-[#3d2015]">
              <label className="text-xs font-bold text-[#dec3b3] uppercase tracking-wider block mb-3">
                2. Elige tus platos favoritos ({selectedDishes.length}/6 seleccionados)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {DISHES_DATA.map(dish => {
                  const isSelected = selectedDishes.some(d => d.id === dish.id);
                  return (
                    <div
                      key={dish.id}
                      onClick={() => handleToggleDish(dish)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#331c12] border-[#e5aa38] shadow-md'
                          : 'bg-[#24140d] border-[#3d2015] hover:border-[#8c6b5a]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-white truncate">{dish.name}</h4>
                          <span className="text-[11px] text-[#f3be52] font-semibold block">
                            S/. {dish.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#e5aa38] text-black font-bold' : 'bg-[#180f0a] border border-[#3d2015] text-[#8c6b5a]'
                      }`}>
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drink Selector */}
            <div className="p-5 rounded-2xl bg-[#1f130d] border border-[#3d2015]">
              <label className="text-xs font-bold text-[#dec3b3] uppercase tracking-wider block mb-3">
                3. Añade tu ronda de cócteles / bebidas
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Huanka Sour de Maíz (x2)',
                  'Cóctel Kusi Raymi (x2)',
                  'Jarra de Chicha Morada',
                ].map(drink => (
                  <button
                    key={drink}
                    onClick={() => setSelectedDrink(drink)}
                    className={`p-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between ${
                      selectedDrink === drink
                        ? 'bg-[#3d1e13] border border-[#e5aa38] text-[#f3be52]'
                        : 'bg-[#24140d] border border-[#3d2015] text-[#dec3b3]'
                    }`}
                  >
                    <span>{drink}</span>
                    {selectedDrink === drink && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & WhatsApp CTA (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#23150e] to-[#1a0f0a] border border-[#e5aa38]/40 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#3d2015] pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#e27b49] font-bold block">
                    RESUMEN DEL BANQUETE
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">
                    Mesa para {peopleCount} Comensales
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#e5aa38]/20 border border-[#e5aa38]/40 flex items-center justify-center text-[#f3be52]">
                  🌽
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedDishes.map((dish) => (
                  <div key={dish.id} className="flex items-center justify-between text-xs py-1.5 border-b border-[#2e1910]">
                    <span className="text-[#dec3b3] truncate pr-2">{dish.name}</span>
                    <span className="font-bold text-white shrink-0">S/. {dish.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#2e1910] text-[#f3be52]">
                  <span>{selectedDrink}</span>
                  <span className="font-bold">{selectedDrink.includes('x2') ? 'S/. 30.00' : 'S/. 20.00'}</span>
                </div>
              </div>

              {/* Total & WhatsApp Button */}
              <div className="pt-4 border-t border-[#3d2015] space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-[#dec3b3]">Total Estimado</span>
                  <span className="font-display text-3xl font-black text-[#f3be52]">
                    S/. {totalPrice.toFixed(2)}
                  </span>
                </div>

                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Enviar Banquete a WhatsApp</span>
                </a>

                <p className="text-[10px] text-center text-[#8c6b5a]">
                  Respuesta inmediata de nuestro equipo en Francisco Cabrera 436, Chiclayo.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
