import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  ThumbsUp, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  User, 
  Camera, 
  Sparkles 
} from 'lucide-react';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  photos: {
    url: string;
    caption: string;
    tag: string;
    author?: string;
    date?: string;
  }[];
  businessName: string;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  onClose,
  initialIndex = 0,
  photos,
  businessName,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>('Todas');

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    setZoomScale(1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    setZoomScale(1);
  };

  const categories = ['Todas', 'Comida & Menús', 'Ambiente', 'Del Propietario', 'Videos Cortos'];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col select-none animate-in fade-in duration-200">
      
      {/* Top Bar (Google Maps Photos Header) */}
      <div className="h-14 bg-black/80 border-b border-white/10 px-4 flex items-center justify-between text-white shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md">
              {businessName}
            </h3>
            <p className="text-[11px] text-gray-400">
              Foto {currentIndex + 1} de {photos.length} • {currentPhoto.tag}
            </p>
          </div>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomScale((z) => (z === 1 ? 1.5 : 1))}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
            title="Zoom"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(currentPhoto.url);
              alert('Enlace de la foto copiado');
            }}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
            title="Compartir foto"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
        
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* The Photo */}
        <div className="max-w-4xl max-h-[70vh] flex items-center justify-center transition-transform duration-300">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            style={{ transform: `scale(${zoomScale})` }}
            className="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl transition-transform"
          />
        </div>

        {/* Photo Info Overlay at Bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/15 text-white max-w-lg text-center shadow-2xl">
          <p className="text-sm font-bold text-white">{currentPhoto.caption}</p>
          <div className="flex items-center justify-center gap-3 text-xs text-gray-400 mt-1">
            <span className="text-amber-400 font-semibold">{currentPhoto.tag}</span>
            <span>•</span>
            <span>Publicado por el Propietario</span>
            <span>•</span>
            <span className="text-emerald-400">Calidad HD</span>
          </div>
        </div>

      </div>

      {/* Bottom Thumbnails Strip */}
      <div className="h-20 bg-black/90 border-t border-white/10 px-4 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
        {photos.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              setZoomScale(1);
            }}
            className={`h-14 w-20 rounded-lg overflow-hidden shrink-0 transition-all relative border-2 ${
              idx === currentIndex
                ? 'border-blue-500 scale-105 shadow-lg'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

    </div>
  );
};
