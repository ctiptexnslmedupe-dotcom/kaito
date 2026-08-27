import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  MessageCircle, 
  Flame, 
  Utensils, 
  CupSoda, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Dish } from '../types';
import { DISHES_DATA } from '../data/menuData';

interface CustomRoundBuilderProps {
  onOpenReservation: () => void;
}

export const CustomRoundBuilder: React.FC<CustomRoundBuilderProps> = ({ onOpenReservation }) => {
  const makisAvailable = DISHES_DATA.filter((d) => d.category.startsWith('makis'));
  const complementosAvailable = DISHES_DATA.filter((d) => d.category === 'entradas-alitas' || d.category === 'piqueos-gyozas');
  const bebidasOptions = [
    { id: 'chicha-morada', name: 'Chicha Morada Artesanal (Vaso)' },
    { id: 'inca-kola', name: 'Inca Kola Personal 500ml' },
    { id: 'coca-cola', name: 'Coca-Cola Personal 500ml' },
    { id: 'ice-tea', name: 'Ice Tea de Lychee & Jazmín' },
    { id: 'limonada-maracuya', name: 'Limonada de Maracuyá Frozen' },
  ];

  // State
  const [selectedMakis, setSelectedMakis] = useState<Dish[]>([
    makisAvailable[0], // Dragon Tartar
    makisAvailable[1], // Acevichado
    makisAvailable[5], // Volcano
  ]);
  const [selectedComplement, setSelectedComplement] = useState<Dish | null>(
    complementosAvailable[0] // Alitas Nikkei
  );
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([
    'Chicha Morada Artesanal (Vaso)',
    'Inca Kola Personal 500ml'
  ]);
  const [orderType, setOrderType] = useState<'salon' | 'delivery'>('salon');

  // Toggle Maki
  const handleToggleMaki = (dish: Dish) => {
    if (selectedMakis.some((m) => m.id === dish.id)) {
      setSelectedMakis(selectedMakis.filter((m) => m.id !== dish.id));
    } else {
      if (selectedMakis.length < 3) {
        setSelectedMakis([...selectedMakis, dish]);
      } else {
        // Replace the last one
        setSelectedMakis([selectedMakis[0], selectedMakis[1], dish]);
      }
    }
  };

  // Toggle Drink
  const handleToggleDrink = (drinkName: string) => {
    if (selectedDrinks.includes(drinkName)) {
      if (selectedDrinks.length > 1) {
        setSelectedDrinks(selectedDrinks.filter((d) => d !== drinkName));
      }
    } else {
      if (selectedDrinks.length < 2) {
        setSelectedDrinks([...selectedDrinks, drinkName]);
      } else {
        setSelectedDrinks([selectedDrinks[0], drinkName]);
      }
    }
  };

  // Calculate regular price vs combo price
  const regularTotal = 
    selectedMakis.reduce((acc, m) => acc + m.price, 0) +
    (selectedComplement ? selectedComplement.price : 0) +
    (selectedDrinks.length * 10);

  const promoComboPrice = selectedComplement && selectedDrinks.length === 2 ? 95.00 : 68.00;
  const savings = Math.max(0, regularTotal - promoComboPrice);

  // Generate WhatsApp Message
  const whatsappUrl = React.useMemo(() => {
    const makisList = selectedMakis.map((m, i) => `   ${i + 1}. ${m.name}`).join('\n');
    const compText = selectedComplement ? `🍢 *Complemento:* ${selectedComplement.name}` : '🍢 Sin complemento';
    const drinksText = selectedDrinks.length > 0 ? `🥤 *Bebidas:* ${selectedDrinks.join(', ')}` : '';
    
    const message = `🍱 *HOLA KAI-TO! QUIERO PEDIR MI RONDA PERSONALIZADA* 🍱\n\n` +
      `📍 *Modalidad:* ${orderType === 'salon' ? 'Mesa en Salón' : 'Pedido Delivery'}\n\n` +
      `🍣 *Mis 3 Tablas de Makis (36 cortes):*\n${makisList}\n\n` +
      `${compText}\n` +
      `${drinksText}\n\n` +
      `💰 *Precio Promo Combo:* S/. ${promoComboPrice.toFixed(2)}\n\n` +
      `¿Tienen disponibilidad ahora?`;

    return `https://wa.me/51951770377?text=${encodeURIComponent(message)}`;
  }, [selectedMakis, selectedComplement, selectedDrinks, orderType, promoComboPrice]);

  return (
    <section id="arma-tu-ronda" className="py-24 bg-[#090b10] relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador Interactivo de Mesa</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            ARMA TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-cyan-400">RONDA PERFECTA</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Combina 3 tablas de makis (36 cortes), tu piqueo favorito y bebidas. Te calculamos el precio de promoción y generamos tu pedido directo a WhatsApp.
          </p>
        </div>

        {/* Builder Layout: Selection Columns + Live Preview Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Steps Area */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Makis Selection */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-pink-400 block">Paso 1 de 3</span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-pink-400" />
                    Elige tus 3 Tablas de Makis (36 cortes)
                  </h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {selectedMakis.length}/3 Seleccionados
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
                {makisAvailable.map((maki) => {
                  const isSelected = selectedMakis.some((m) => m.id === maki.id);
                  return (
                    <div
                      key={maki.id}
                      onClick={() => handleToggleMaki(maki)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-pink-500/15 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                          : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <img
                        src={maki.image}
                        alt={maki.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-display text-xs sm:text-sm font-bold block truncate">
                          {maki.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {maki.ingredients.slice(0, 2).join(', ')}
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-pink-500 text-white' : 'border border-slate-600 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Complemento Selection */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 block">Paso 2 de 3</span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-cyan-400" />
                    Elige 1 Complemento Crujiente
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {complementosAvailable.slice(0, 4).map((comp) => {
                  const isSelected = selectedComplement?.id === comp.id;
                  return (
                    <div
                      key={comp.id}
                      onClick={() => setSelectedComplement(comp)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <img
                        src={comp.image}
                        alt={comp.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-display text-xs sm:text-sm font-bold block truncate">
                          {comp.name}
                        </span>
                        <span className="text-[10px] text-cyan-400 font-semibold block">
                          {comp.piecesText}
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-cyan-500 text-white' : 'border border-slate-600 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Drinks */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block">Paso 3 de 3</span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <CupSoda className="w-5 h-5 text-amber-400" />
                    Elige 2 Bebidas para Acompañar
                  </h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {selectedDrinks.length}/2
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {bebidasOptions.map((drink) => {
                  const isSelected = selectedDrinks.includes(drink.name);
                  return (
                    <button
                      key={drink.id}
                      onClick={() => handleToggleDrink(drink.name)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/30'
                          : 'bg-slate-800/60 text-slate-300 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                      <span>{drink.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Live Order & Summary Ticket */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-[#111623] to-[#0a0d14] border border-pink-500/40 shadow-[0_0_35px_rgba(236,72,153,0.2)]">
              
              {/* Order Mode Selector */}
              <div className="flex rounded-xl bg-slate-800/80 p-1 mb-6 border border-slate-700">
                <button
                  onClick={() => setOrderType('salon')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    orderType === 'salon' ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Para Salón (Miraflores / Surco)
                </button>
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    orderType === 'delivery' ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Para Delivery / Box
                </button>
              </div>

              {/* Receipt Title */}
              <div className="border-b border-slate-800 pb-4 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Ticket Simulado</span>
                  <h4 className="font-display text-lg font-extrabold text-white">Tu Ronda Kai-To (36 Makis)</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Listo para ordenar
                </span>
              </div>

              {/* Selected Makis List */}
              <div className="space-y-3 mb-6 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">Makis Seleccionados:</span>
                  {selectedMakis.map((maki, i) => (
                    <div key={maki.id} className="flex items-center justify-between py-1 text-slate-200">
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-[9px]">
                          {i + 1}
                        </span>
                        <span>{maki.name}</span>
                      </span>
                      <span className="text-slate-400">10 cortes</span>
                    </div>
                  ))}
                  {selectedMakis.length < 3 && (
                    <p className="text-[11px] text-pink-400 italic mt-1">
                      Falta seleccionar {3 - selectedMakis.length} tabla(s) más.
                    </p>
                  )}
                </div>

                {selectedComplement && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">Complemento:</span>
                    <div className="flex items-center justify-between text-slate-200">
                      <span>{selectedComplement.name}</span>
                      <span className="text-cyan-400">{selectedComplement.piecesText}</span>
                    </div>
                  </div>
                )}

                {selectedDrinks.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">Bebidas:</span>
                    {selectedDrinks.map((dr, idx) => (
                      <div key={idx} className="flex items-center justify-between text-slate-200 py-0.5">
                        <span>{dr}</span>
                        <span className="text-amber-400">Incluida</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="p-4 rounded-2xl bg-[#090b10] border border-slate-800 space-y-2 mb-6">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Precio regular por separado:</span>
                  <span className="line-through">S/. {regularTotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                    <span>Ahorro con Promo Combo:</span>
                    <span>- S/. {savings.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="font-display text-sm font-bold text-white uppercase">Total a pagar:</span>
                  <span className="font-display text-3xl font-black text-emerald-400">
                    S/. {promoComboPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Ronda por WhatsApp</span>
                </a>

                <button
                  onClick={onOpenReservation}
                  className="w-full py-3 rounded-2xl text-xs font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors"
                >
                  Reservar Mesa con esta Ronda
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
