import React, { useState } from 'react';
import { GoogleMapsHeader } from './components/GoogleMapsHeader';
import { GoogleMapsSidebar } from './components/GoogleMapsSidebar';
import { InteractiveMapView } from './components/InteractiveMapView';
import { PitchPresentationModal } from './components/PitchPresentationModal';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { PhotoGalleryModal } from './components/PhotoGalleryModal';
import { LiveCustomizerDrawer } from './components/LiveCustomizerDrawer';
import { OPTIMIZED_PROFILE, UNOPTIMIZED_PROFILE } from './data/mapsData';
import { BusinessProfile } from './types';
import { 
  Sparkles, 
  ArrowLeftRight, 
  Eye, 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  Share2, 
  CheckCircle2, 
  AlertTriangle,
  Sliders,
  Camera
} from 'lucide-react';

export default function App() {
  const [isOptimized, setIsOptimized] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [searchQuery, setSearchQuery] = useState<string>('Restaurante Sabor y Sazón, San Isidro');
  const [isPitchModalOpen, setIsPitchModalOpen] = useState<boolean>(false);
  const [showDirections, setShowDirections] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  
  // Interactive Photo Gallery Modal state
  const [galleryState, setGalleryState] = useState<{
    isOpen: boolean;
    initialIndex: number;
  }>({
    isOpen: false,
    initialIndex: 0,
  });

  // Dynamic Star Dish selection
  const [selectedStarDish, setSelectedStarDish] = useState<string>('Seco de Res a la Norteña con Frejoles');

  // Customizer dynamic profile state
  const [customOptimizedProfile, setCustomOptimizedProfile] = useState<BusinessProfile>(OPTIMIZED_PROFILE);

  const activeProfile = isOptimized ? customOptimizedProfile : UNOPTIMIZED_PROFILE;

  const handleUpdateProfile = (updated: Partial<BusinessProfile>) => {
    setCustomOptimizedProfile((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const customDishOptions = [
    'Seco de Res a la Norteña con Frejoles',
    'Lomo Saltado Clásico al Wok',
    'Ají de Gallina Cremoso',
    'Arroz con Pollo Criollo',
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-[#f8f9fa] overflow-hidden select-none font-sans">
      
      {/* 1. Google Maps Header & Sales Control Bar */}
      <GoogleMapsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isOptimized={isOptimized}
        setIsOptimized={setIsOptimized}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenPitchModal={() => setIsPitchModalOpen(true)}
      />

      {/* Floating Pitch Badge & Quick Action Toolbar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white px-3 sm:px-4 py-1.5 text-xs flex items-center justify-between shadow-sm z-20 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Demostración Google Maps:</span>
          </span>
          <span className="text-blue-100 hidden md:inline">
            Ficha renovada para <strong>{activeProfile.name}</strong> con fotos HD, 3 posts de antojo y guion de cierre.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setGalleryState({ isOpen: true, initialIndex: 0 })}
            className="text-[11px] font-bold bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
            title="Ver galería de fotos"
          >
            <Camera className="w-3 h-3 text-blue-200" />
            <span>Ver Fotos HD</span>
          </button>

          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="text-[11px] font-bold bg-amber-400 hover:bg-amber-300 text-gray-950 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 shadow-sm"
            title="Editar textos y platos en vivo"
          >
            <Sliders className="w-3 h-3" />
            <span>Ajustar Datos</span>
          </button>

          <button
            onClick={() => setIsOptimized(!isOptimized)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 border ${
              isOptimized 
                ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40' 
                : 'bg-amber-500/20 text-amber-200 border-amber-400/40'
            }`}
          >
            <ArrowLeftRight className="w-3 h-3" />
            <span>{isOptimized ? 'Ver Antes (Básico)' : 'Ver Optimizado'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {viewMode === 'desktop' ? (
          /* Desktop View: Google Maps Left Sidebar + Right Map Canvas */
          <div className="flex w-full h-full">
            <GoogleMapsSidebar
              profile={activeProfile}
              isOptimized={isOptimized}
              selectedStarDish={selectedStarDish}
              onSelectStarDish={setSelectedStarDish}
              onOpenPhotoGallery={(idx) => setGalleryState({ isOpen: true, initialIndex: idx || 0 })}
              onTriggerDirections={() => setShowDirections(true)}
              onOpenCustomizer={() => setIsCustomizerOpen(true)}
            />
            <InteractiveMapView
              profile={activeProfile}
              isOptimized={isOptimized}
              showDirections={showDirections}
              onCloseDirections={() => setShowDirections(false)}
            />
          </div>
        ) : (
          /* Mobile Smartphone Frame Simulation */
          <MobileDeviceFrame>
            <div className="h-full w-full overflow-y-auto">
              <GoogleMapsSidebar
                profile={activeProfile}
                isOptimized={isOptimized}
                selectedStarDish={selectedStarDish}
                onSelectStarDish={setSelectedStarDish}
                onOpenPhotoGallery={(idx) => setGalleryState({ isOpen: true, initialIndex: idx || 0 })}
                onTriggerDirections={() => setShowDirections(true)}
                onOpenCustomizer={() => setIsCustomizerOpen(true)}
              />
            </div>
          </MobileDeviceFrame>
        )}

      </div>

      {/* 3. Interactive Fullscreen Photo Gallery Modal */}
      <PhotoGalleryModal
        isOpen={galleryState.isOpen}
        onClose={() => setGalleryState((prev) => ({ ...prev, isOpen: false }))}
        initialIndex={galleryState.initialIndex}
        photos={activeProfile.coverPhotos}
        businessName={activeProfile.name}
      />

      {/* 4. Live Customizer Drawer (Ajuste de datos en vivo) */}
      <LiveCustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={activeProfile}
        onUpdateProfile={handleUpdateProfile}
        selectedStarDish={selectedStarDish}
        onSelectStarDish={setSelectedStarDish}
        customDishOptions={customDishOptions}
      />

      {/* 5. Pitch Presentation & ROI Modal */}
      <PitchPresentationModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
        profile={activeProfile}
      />

    </div>
  );
}
