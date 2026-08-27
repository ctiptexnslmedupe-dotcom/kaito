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
  Zap,
  Wine,
  Star
} from 'lucide-react';
import { Dish, DishCategory } from '../types';
import { DISHES_DATA, MENU_CATEGORIES } from '../data/menuData';
import { playInteractiveSizzle } from '../utils/audioLounge';

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
  const [flamingDishId, setFlamingDishId] = useState<string | null>(null);

  const filterOptions = [
    { id: 'todos', label: 'Toda la Selección' },
    { id: 'favoritos', label: '★ Signature Rolls' },
    { id: 'flameados', label: '🔥 Flameados al Soplete' },
    { id: 'acevichados', label: '🍋 Clásicos Acevichados' },
    { id: 'crocantes', label: '⚡ Crocantes & Furai' },
    { id: 'barra-libre', label: '🍣 En Barra Libre' },
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

  const handleFlameDish = (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    setFlamingDishId(dishId);
    playInteractiveSizzle();
    setTimeout(() => {
      setFlamingDishId(null);
    }, 2000);
  };

  return (
    <section id="carta" className="py-24 bg-[#06080d] relative overflow-hidden border-b border-amber-500/10">
      
      {/* Background Lighting */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none animate-float-reverse" />

      {/* Japanese Seal Watermark */}
      <div className="absolute top-12 left-8 font-jp text-[120px] font-black text-amber-500/5 select-none pointer-events-none">
        美味
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Utensils className="w-3.5 h-3.5" />
            <span className="font-cinzel">CARTA GASTRONÓMICA NIKKEI</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            COLECCIÓN <span className="font-serif-luxury italic font-normal text-amber-200">Gourmet</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400">
              KAI-TO
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            El rigor del corte de pescado japonés y el alma vibrante del ají peruano. Cada pieza es armada en frío y sopleteada al instante con tare artesanal.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white border-pink-400/40 shadow-[0_0_20px_rgba(236,72,153,0.35)] scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              <span className="font-jp text-xs opacity-70">{cat.jp}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar, Filters & View Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b0e17]/90 border border-slate-800 backdrop-blur-xl mb-10 shadow-xl">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por maki, salmón, ají..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/60 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  activeFilter === f.id
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(229,195,120,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'grid' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-500 hover:text-white'
              }`}
              title="Vista en Tarjetas de Galería"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('editorial')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'editorial' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-500 hover:text-white'
              }`}
              title="Vista Editorial de Degustación"
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
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950"
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
              const isDishFlaming = flamingDishId === dish.id;
              const hasFlameTag = dish.tags.includes('Flameado en Mesa');

              return (
                <div
                  key={dish.id}
                  className="group rounded-3xl bg-gradient-to-b from-[#0f131f] via-[#0b0e17] to-[#07090f] border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(229,195,120,0.12)] flex flex-col overflow-hidden relative"
                >
                  
                  {/* Dish Image Banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                        isDishFlaming ? 'scale-105 filter brightness-110' : 'group-hover:scale-105'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-transparent to-black/40" />

                    {/* Tag badge overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
                      {dish.tags.slice(0, 1).map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/70 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow">
                          {t}
                        </span>
                      ))}
                      {dish.isIncludedInBarraLibre && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-600/90 text-white backdrop-blur-md shadow">
                          Barra Libre
                        </span>
                      )}
                    </div>

                    {/* Flame Animation Overlay if Active */}
                    {isDishFlaming && (
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 to-amber-500/20 pointer-events-none flex flex-col items-center justify-center animate-heat-wave">
                        <div className="p-2.5 rounded-xl bg-black/80 border border-orange-500 backdrop-blur-md animate-torch-flicker text-center">
                          <Flame className="w-6 h-6 text-orange-400 mx-auto animate-bounce" />
                          <span className="font-cinzel text-[10px] font-black text-amber-300 uppercase tracking-widest block">
                            ¡FLAMEADO AL SOPLETE!
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Quick Flame Trigger on Card */}
                    {hasFlameTag && (
                      <button
                        onClick={(e) => handleFlameDish(e, dish.id)}
                        className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 hover:bg-orange-600 border border-orange-500/50 text-orange-300 hover:text-white text-[10px] font-bold transition-all flex items-center gap-1 backdrop-blur-md shadow"
                        title="Probar efecto soplete en vivo"
                      >
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span>Flamear 🔥</span>
                      </button>
                    )}

                    {/* Quick View Button */}
                    <button
                      onClick={() => onSelectDish(dish)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-amber-500 hover:text-slate-950 text-slate-200 backdrop-blur-md border border-slate-700/60 transition-all shadow"
                      title="Ver Ficha Técnica & Maridaje"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {dish.japaneseName && (
                        <span className="font-jp text-[11px] text-amber-400 font-semibold block mb-0.5 tracking-wider">
                          {dish.japaneseName}
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 
                          onClick={() => onSelectDish(dish)}
                          className="font-display text-lg font-bold text-white group-hover:text-amber-200 transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </h3>
                        <span className="font-display font-black text-amber-300 text-lg shrink-0">
                          S/. {dish.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                        {dish.description}
                      </p>

                      {/* Ingredients Pills */}
                      <div className="flex flex-wrap gap-1">
                        {dish.ingredients.slice(0, 3).map((ing, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                            {ing}
                          </span>
                        ))}
                        {dish.ingredients.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-slate-500">
                            +{dish.ingredients.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectDish(dish)}
                        className="text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 group/link"
                      >
                        <span>Ficha Técnica</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </button>

                      {onAddToRound && (
                        <button
                          onClick={() => onAddToRound(dish)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isAdded
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-900 hover:bg-gradient-to-r hover:from-pink-600 hover:to-amber-500 text-slate-200 hover:text-white border border-slate-800'
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

        {/* Dishes Presentation - EDITORIAL VIEW */}
        {viewMode === 'editorial' && (
          <div className="space-y-4 max-w-5xl mx-auto">
            {filteredDishes.map((dish) => {
              const isAdded = roundDishesIds.includes(dish.id);
              return (
                <div
                  key={dish.id}
                  onClick={() => onSelectDish(dish)}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0b0e17]/90 hover:bg-[#101422] border border-slate-800 hover:border-amber-500/40 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-800 group-hover:border-amber-400 transition-colors"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        {dish.japaneseName && (
                          <span className="font-jp text-[11px] text-amber-400 font-semibold">
                            {dish.japaneseName}
                          </span>
                        )}
                        {dish.isIncludedInBarraLibre && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 font-bold border border-pink-500/30">
                            Barra Libre
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0 border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                    <span className="font-display text-lg font-black text-amber-300">
                      S/. {dish.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDish(dish);
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 transition-colors"
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
