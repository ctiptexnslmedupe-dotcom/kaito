import React, { useState, useMemo } from 'react';
import { Sparkles, Search, Flame, Filter, Utensils, Info, Coffee, Wine, Layers } from 'lucide-react';
import { MENU_CATEGORIES, DISHES_DATA } from '../data/menuData';
import { Dish, DishCategory } from '../types';

interface MenuExplorerProps {
  onSelectDish: (dish: Dish) => void;
  onOpenReservation: () => void;
}

export const MenuExplorer: React.FC<MenuExplorerProps> = ({ onSelectDish, onOpenReservation }) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('todos');

  const filteredDishes = useMemo(() => {
    return DISHES_DATA.filter((dish) => {
      const matchesCategory = selectedCategory === 'todos' || dish.category === selectedCategory;
      const matchesSearch = 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = selectedTag === 'todos' || dish.tags.includes(selectedTag);
      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  return (
    <section id="carta" className="py-24 bg-[#140c08] relative overflow-hidden">
      
      {/* Ambient Backdrop Glows */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#c86a3e]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#e5aa38]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e5aa38]/10 border border-[#e5aa38]/30 text-[#f3be52] text-xs font-bold uppercase tracking-widest mb-4">
            <Utensils className="w-3.5 h-3.5" />
            <span className="font-cinzel">CARTA HUANKA NOVOANDINO & CAFÉ</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            EXPLORA NUESTRA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e27b49] via-[#f3be52] to-[#e5aa38]">
              PROPUESTA GASTRONÓMICA
            </span>
          </h2>

          <p className="text-[#dec3b3] text-sm sm:text-base leading-relaxed">
            Insumos autóctonos de Lambayeque, técnicas contemporáneas y el inconfundible sabor del norte peruano.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="space-y-6 mb-12">
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-[#b89582] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por plato o ingrediente (ej. chicharrón, lomo, pisco)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#1f130d] border border-[#3d2015] focus:border-[#e5aa38] text-sm text-white placeholder-[#8c6b5a] outline-none shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#b89582] hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#c86a3e] to-[#e5aa38] text-white shadow-[0_0_20px_rgba(200,106,62,0.4)] scale-105 border border-[#f3be52]/40'
                    : 'bg-[#1f130d] text-[#dec3b3] hover:text-white hover:bg-[#2e1910] border border-[#3d2015]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-[#1f130d]/50 rounded-3xl border border-[#3d2015]">
            <Utensils className="w-12 h-12 text-[#b89582] mx-auto mb-3 opacity-50" />
            <p className="text-lg font-bold text-white mb-1">No encontramos platos con esos términos</p>
            <p className="text-xs text-[#dec3b3]">Prueba con otra palabra clave o selecciona otra categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="rounded-3xl bg-[#1c110b] border border-[#3d2015] hover:border-[#e5aa38]/50 overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(229,170,56,0.2)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c110b] via-transparent to-black/30" />
                    
                    {/* Portion Tag */}
                    {dish.portionText && (
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#140c08]/85 text-[#f3be52] border border-[#e5aa38]/30 backdrop-blur-md">
                        {dish.portionText}
                      </span>
                    )}

                    {/* Primary Badge */}
                    {dish.tags[0] && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#c86a3e]/90 text-white border border-[#f3be52]/40 backdrop-blur-md">
                        {dish.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {dish.nativeOrigin && (
                      <span className="text-[10px] font-semibold text-[#e27b49] uppercase tracking-wider block mb-1">
                        {dish.nativeOrigin}
                      </span>
                    )}

                    <h3 className="font-display text-xl font-bold text-white group-hover:text-[#f3be52] transition-colors mb-2">
                      {dish.name}
                    </h3>

                    <p className="text-xs text-[#dec3b3] leading-relaxed line-clamp-3 mb-4">
                      {dish.description}
                    </p>

                    {/* Ingredients Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {dish.ingredients.slice(0, 3).map((ing, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#28160e] text-[#dec3b3] border border-[#3d2015]">
                          {ing}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#28160e] text-[#8c6b5a]">
                          +{dish.ingredients.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="p-6 pt-0 border-t border-[#2e1910] mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8c6b5a] block">Precio</span>
                    <span className="font-display text-2xl font-black text-[#f3be52]">
                      S/. {dish.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDish(dish);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#f7efe6] bg-[#2d180f] group-hover:bg-[#c86a3e] border border-[#3d2015] group-hover:border-[#f3be52]/40 transition-all flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Ver Detalle</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
