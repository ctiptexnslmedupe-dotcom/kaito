import React from 'react';
import { 
  Search, 
  Mic, 
  Layers, 
  Menu as MenuIcon, 
  Sparkles, 
  ArrowLeftRight, 
  Smartphone, 
  Monitor, 
  DollarSign, 
  FileText,
  Share2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface GoogleMapsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isOptimized: boolean;
  setIsOptimized: (opt: boolean) => void;
  viewMode: 'desktop' | 'mobile';
  setViewMode: (mode: 'desktop' | 'mobile') => void;
  onOpenPitchModal: () => void;
}

export const GoogleMapsHeader: React.FC<GoogleMapsHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isOptimized,
  setIsOptimized,
  viewMode,
  setViewMode,
  onOpenPitchModal,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-30 sticky top-0 px-3 py-2 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-between gap-3">
      
      {/* Left: Google Maps Logo & Search Box */}
      <div className="flex items-center gap-3 flex-1 min-w-[280px] max-w-xl">
        <div className="flex items-center gap-1.5 cursor-pointer select-none">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            <span className="text-white font-sans">G</span>
          </div>
          <span className="font-medium text-gray-700 text-lg tracking-tight hidden sm:inline">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
            <span className="ml-1 text-gray-700 font-semibold">Maps</span>
          </span>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 flex items-center bg-white border border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:shadow-md rounded-full px-3.5 py-1.5 transition-all">
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en Google Maps (ej. Sabor y Sazón)"
            className="w-full text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none font-normal"
          />
          <button 
            title="Búsqueda por voz"
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: Agency & Pitch Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        
        {/* Toggle Before / After */}
        <button
          onClick={() => setIsOptimized(!isOptimized)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
            isOptimized
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
              : 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
          }`}
          title="Alternar entre ficha sin optimizar y ficha profesionalmente optimizada"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>
            {isOptimized ? (
              <>
                <span className="font-bold text-emerald-800">✅ Ficha Optimizada</span> (Con Agencia)
              </>
            ) : (
              <>
                <span className="font-bold text-amber-800">⚠️ Ficha Sin Optimizar</span> (Antes)
              </>
            )}
          </span>
        </button>

        {/* View Mode Toggle (Desktop vs Mobile Phone) */}
        <div className="bg-gray-100 p-0.5 rounded-lg border border-gray-200 hidden md:flex items-center">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Vista de escritorio"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Vista en smartphone / iPhone"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Pitch / Propuesta CTA for Client */}
        <button
          onClick={onOpenPitchModal}
          className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:shadow"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Ver Propuesta & ROI</span>
        </button>

      </div>

    </header>
  );
};
