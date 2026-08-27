import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Search, 
  Sparkles, 
  ChevronRight, 
  Filter, 
  Utensils, 
  Check, 
  Plus, 
  Eye, 
  Layers, 
  Grid, 
  List,
  Zap
} from 'lucide-react';
import { Dish, DishCategory } from '../types';
import { DISHES_DATA, MENU_CATEGORIES } from '../data/menuData';

interface MenuExplorerProps {
  onSelectDish: (dish: Dish) => void;
  onAddToRound?: (dish: Dish) => void;
  roundDishesIds?: string[];
}

export const MenuExplorer: React.FC<MenuExplorerProps> = ({
  onSelectDish,
  onAddToRound,
  roundDishesIds = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');

  const filterOptions = [
    { id: 'todos', label: 'Todos' },
    { id: 'favoritos', label: '⭐ Favoritos Kai-To' },
    { id: 'flameados', label: '🔥 Flameados' },
    { id: 'acevichados', label: '🍋 Acevichados' },
    { id: 'crocantes', label: '⚡ Crocantes' },
    { id: 'barra-libre', label: '🍣 Incluidos en Barra Libre' },
  ];

  const filteredDishes = useMemo(() => {
    return DISHES_DATA.filter((dish) => {
      // Category filter
      if (selectedCategory !== 'todos' && dish.category !== selectedCategory) {
        return false;
      }

      // Quick filter
      if (activeFilter === 'favoritos' && !dish.tags.includes('Favorito de la Casa')) {
        return false;
      }
      if (activeFilter === 'flameados' && !dish.tags.includes('Flameado en Mesa')) {
        return false;
      }
      if (activeFilter === 'acevichados' && !dish.tags.includes('Acevichado')) {
        return false;
      }
      if (activeFilter === 'crocantes' && !dish.tags.includes('Crocante')) {
        return false;
      }
      if (activeFilter === 'barra-libre' && !dish.isIncludedInBarraLibre) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesIngredients = dish.ingredients.some((ing) => ing.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesIngredients;
      }

      return true;
    });
  }, [selectedCategory, activeFilter, searchQuery]);

  return (
    <section id="carta" className="py-24 bg-[#090b10] relative overflow-hidden">
      
      {/* Background Neon accents */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Utensils className="w-3.5 h-3.5" />
            <span>Carta Nikkei & Fusión de Autor</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            NUESTRA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300">CARTA GASTRONÓMICA</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Inspirada en la precisión del corte japonés y el atrevimiento criollo peruano. Cada tabla es armada y sopleteada al instante con ingredientes premium.
          </p>
        </div>

        {/* Sticky-like Category Selector Tabs (Masa NYC style with neon glow) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="font-jp text-xs opacity-70">{cat.jp}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar, Filters & View Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md mb-10">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre o ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'grid' ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista de Cuadrícula con Fotos"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('editorial')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'editorial' ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Editorial Estilo Menú Degustación"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Empty State */}
        {filteredDishes.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 max-w-md mx-auto">
            <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-white mb-1">No encontramos platillos</h3>
            <p className="text-xs text-slate-400 mb-4">Intenta cambiar los filtros de búsqueda o categoría.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('todos');
                setSelectedCategory('todos');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-500 text-white"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

        {/* Dishes Presentation - GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => {
              const isAdded = roundDishesIds.includes(dish.id);
              return (
                <div
                  key={dish.id}
                  className="group rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0f131d] to-[#090c14] border border-slate-800/80 hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.15)] flex flex-col overflow-hidden"
                >
                  
                  {/* Dish Image Banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f131d] via-transparent to-black/30" />

                    {/* Tag badge overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
                      {dish.tags.slice(0, 1).map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-500/90 text-white backdrop-blur-md shadow">
                          {t}
                        </span>
                      ))}
                      {dish.isIncludedInBarraLibre && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/90 text-white backdrop-blur-md shadow">
                          Barra Libre
                        </span>
                      )}
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={() => onSelectDish(dish)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-pink-500 text-slate-200 hover:text-white backdrop-blur-md border border-slate-700/60 transition-all"
                      title="Ver Detalles e Ingredientes"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {dish.japaneseName && (
                        <span className="font-jp text-[11px] text-pink-400 font-semibold block mb-0.5 tracking-wider">
                          {dish.japaneseName}
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 
                          onClick={() => onSelectDish(dish)}
                          className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-pink-300 transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        <span className="font-display font-black text-amber-400 text-lg shrink-0">
                          S/. {dish.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                        {dish.description}
                      </p>

                      {/* Ingredients Pills Preview */}
                      <div className="flex flex-wrap gap-1">
                        {dish.ingredients.slice(0, 3).map((ing, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50">
                            {ing}
                          </span>
                        ))}
                        {dish.ingredients.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                            +{dish.ingredients.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectDish(dish)}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/link"
                      >
                        <span>Ver Ficha Técnica</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </button>

                      {onAddToRound && (
                        <button
                          onClick={() => onAddToRound(dish)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isAdded
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-800 hover:bg-pink-600 text-slate-200 hover:text-white border border-slate-700'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>En Ronda</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Añadir</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Dishes Presentation - EDITORIAL VIEW (Masa NYC clean tasting menu style) */}
        {viewMode === 'editorial' && (
          <div className="space-y-4 max-w-5xl mx-auto">
            {filteredDishes.map((dish) => {
              const isAdded = roundDishesIds.includes(dish.id);
              return (
                <div
                  key={dish.id}
                  onClick={() => onSelectDish(dish)}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-pink-500/40 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-700 group-hover:border-pink-400 transition-colors"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        {dish.japaneseName && (
                          <span className="font-jp text-[11px] text-pink-400 font-semibold">
                            {dish.japaneseName}
                          </span>
                        )}
                        {dish.isIncludedInBarraLibre && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                            Barra Libre
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0 border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                    <span className="font-display text-lg font-black text-amber-400">
                      S/. {dish.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDish(dish);
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-pink-600 hover:text-white transition-colors"
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
