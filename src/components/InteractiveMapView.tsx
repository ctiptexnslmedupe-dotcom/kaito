import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Compass, 
  Layers, 
  Navigation2, 
  MapPin, 
  Star, 
  Utensils, 
  Car, 
  User, 
  Volume2, 
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface InteractiveMapViewProps {
  profile: BusinessProfile;
  isOptimized: boolean;
  showDirections: boolean;
  onCloseDirections: () => void;
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  profile,
  isOptimized,
  showDirections,
  onCloseDirections,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(15);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [showTraffic, setShowTraffic] = useState<boolean>(true);
  const [selectedPin, setSelectedPin] = useState<string>('main');

  const competitors = [
    {
      id: 'comp1',
      name: 'Menú Doña Rosa',
      rating: 3.8,
      reviews: 24,
      x: '32%',
      y: '28%',
      price: 'S/. 12',
    },
    {
      id: 'comp2',
      name: 'El Buen Rincón Criollo',
      rating: 4.1,
      reviews: 45,
      x: '68%',
      y: '34%',
      price: 'S/. 18',
    },
    {
      id: 'comp3',
      name: 'Comida Rápida San Isidro',
      rating: 3.6,
      reviews: 18,
      x: '25%',
      y: '72%',
      price: 'S/. 15',
    },
  ];

  return (
    <div className="relative flex-1 h-[calc(100vh-61px)] w-full overflow-hidden select-none bg-[#e5e3df]">
      
      {/* Map Graphic Canvas / Vector Simulation */}
      <div 
        className={`w-full h-full transition-all duration-300 relative ${
          mapType === 'satellite' ? 'bg-[#1b2a32]' : 'bg-[#e5e3df]'
        }`}
        style={{
          transform: `scale(${zoomLevel / 15})`,
          transformOrigin: '50% 50%',
        }}
      >
        {mapType === 'roadmap' ? (
          /* Roadmap Vector Grid */
          <svg className="w-full h-full absolute inset-0 opacity-90" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#d5d3ce" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Background & Urban Area */}
            <rect width="100%" height="100%" fill="#e8ece9" />
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Parks / Green Zones */}
            <path d="M 50,50 Q 200,80 280,300 T 500,450 L 500,100 Z" fill="#cbe6a3" opacity="0.7" />
            <path d="M 650,400 Q 800,450 900,700 L 700,800 Z" fill="#cbe6a3" opacity="0.6" />
            <rect x="15%" y="65%" width="200" height="140" rx="20" fill="#c8e49d" opacity="0.65" />

            {/* Main Avenues (White with orange borders / Google Style) */}
            <path d="M -50,220 L 1400,280" stroke="#fbd988" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d="M -50,220 L 1400,280" stroke="#ffffff" strokeWidth="12" fill="none" strokeLinecap="round" />

            <path d="M 450,-50 L 520,1000" stroke="#fbd988" strokeWidth="18" fill="none" />
            <path d="M 450,-50 L 520,1000" stroke="#ffffff" strokeWidth="14" fill="none" />

            <path d="M 100,850 L 1200,150" stroke="#ffc085" strokeWidth="14" fill="none" />
            <path d="M 100,850 L 1200,150" stroke="#ffffff" strokeWidth="10" fill="none" />

            {/* Secondary Streets */}
            <path d="M 150,50 L 220,800" stroke="#ffffff" strokeWidth="7" fill="none" strokeDasharray="none" />
            <path d="M 300,50 L 370,800" stroke="#ffffff" strokeWidth="7" fill="none" />
            <path d="M 680,50 L 750,800" stroke="#ffffff" strokeWidth="8" fill="none" />
            <path d="M 850,50 L 920,800" stroke="#ffffff" strokeWidth="6" fill="none" />

            <path d="M 50,450 L 1100,490" stroke="#ffffff" strokeWidth="8" fill="none" />
            <path d="M 50,620 L 1100,660" stroke="#ffffff" strokeWidth="7" fill="none" />
            <path d="M 50,780 L 1100,810" stroke="#ffffff" strokeWidth="6" fill="none" />

            {/* Traffic Layer Lines (Green / Orange) */}
            {showTraffic && (
              <>
                <path d="M 20,222 L 400,240" stroke="#34A853" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 420,242 L 700,256" stroke="#FBBC05" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 460,-10 L 500,450" stroke="#34A853" strokeWidth="3" fill="none" />
                <path d="M 505,510 L 520,850" stroke="#34A853" strokeWidth="3" fill="none" />
              </>
            )}

            {/* Active Navigation Route (If user requested Directions) */}
            {showDirections && (
              <g>
                <path
                  d="M 220,680 L 350,690 L 370,470 L 490,480"
                  stroke="#1a73e8"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
                <circle cx="220" cy="680" r="7" fill="#1a73e8" stroke="#ffffff" strokeWidth="3" />
                <text x="180" y="715" fill="#1a73e8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  Tu ubicación
                </text>
              </g>
            )}

            {/* Street Labels */}
            <text x="470" y="180" fill="#70757a" fontSize="11" fontWeight="500" transform="rotate(82, 470, 180)">
              Av. Principal de San Isidro
            </text>
            <text x="600" y="270" fill="#70757a" fontSize="11" fontWeight="500">
              Av. Los Conquistadores
            </text>
            <text x="260" y="475" fill="#70757a" fontSize="10" fontWeight="500">
              Jr. Los Claveles
            </text>
          </svg>
        ) : (
          /* Satellite View Simulation */
          <div className="w-full h-full absolute inset-0 bg-[radial-gradient(#2d4b3b_1px,transparent_1px)] [background-size:16px_16px] bg-[#1e2f23]">
            <div className="w-full h-full opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950 via-slate-900 to-black" />
          </div>
        )}

        {/* Competitor Pins (To demonstrate why Sabor y Sazón ranks #1) */}
        {competitors.map((comp) => (
          <div
            key={comp.id}
            onClick={() => setSelectedPin(comp.id)}
            style={{ left: comp.x, top: comp.y }}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group z-10"
          >
            <div className="flex flex-col items-center">
              <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md shadow text-[10px] font-semibold text-gray-700 flex items-center gap-1 whitespace-nowrap border border-gray-200 group-hover:scale-105 transition-transform">
                <span>{comp.name}</span>
                <span className="text-amber-500 font-bold">★ {comp.rating}</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center shadow-md mt-0.5">
                <Utensils className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}

        {/* Main Business Pin: Sabor y Sazón */}
        <div
          onClick={() => setSelectedPin('main')}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full cursor-pointer z-20"
        >
          <div className="flex flex-col items-center animate-bounce-short">
            
            {/* Business Card Tag */}
            <div className={`px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2 whitespace-nowrap border transition-all ${
              isOptimized 
                ? 'bg-white border-blue-500 ring-4 ring-blue-500/20' 
                : 'bg-white border-gray-300'
            }`}>
              <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                <Utensils className="w-3 h-3" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-gray-900">{profile.name}</span>
                  {isOptimized && <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-600">
                  <span className="font-bold text-amber-600 flex items-center">
                    ★ {profile.rating.toFixed(1)}
                  </span>
                  <span>({profile.reviewCount})</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">Abierto</span>
                </div>
              </div>
            </div>

            {/* Red Google Pin Beacon */}
            <div className="relative mt-1">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl ring-4 ring-white">
                <MapPin className="w-6 h-6 fill-white text-red-600" />
              </div>
              {/* Pulsing Beacon Circle */}
              {isOptimized && (
                <div className="absolute -inset-2 rounded-full border-2 border-red-500 animate-ping opacity-75 pointer-events-none" />
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Floating Directions Route Card (When active) */}
      {showDirections && (
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80 bg-white rounded-2xl shadow-2xl border border-blue-200 p-4 z-30 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <Car className="w-4 h-4" />
              <span>Ruta Recomendada</span>
            </div>
            <button
              onClick={onCloseDirections}
              className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-emerald-600">8 min</span>
                <span className="text-xs text-gray-500 ml-1.5">(2.4 km)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Tráfico fluido
              </span>
            </div>
            <p className="text-xs text-gray-600">
              La ruta más rápida actual por Av. Javier Prado y Jr. Los Claveles.
            </p>
            <a
              href={profile.googleMapsShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm mt-2"
            >
              <Navigation2 className="w-3.5 h-3.5" />
              <span>Iniciar en Google Maps Real</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Map Controls (Right Side) */}
      <div className="absolute bottom-6 right-4 flex flex-col items-center gap-2 z-20">
        
        {/* Traffic / Layer Toggle */}
        <button
          onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
          className="p-2.5 rounded-xl bg-white shadow-lg border border-gray-200 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
          title="Cambiar a vista satélite / mapa"
        >
          <Layers className="w-5 h-5" />
        </button>

        {/* Street View Pegman */}
        <button
          className="p-2.5 rounded-xl bg-white shadow-lg border border-gray-200 text-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
          title="Street View 360"
        >
          <User className="w-5 h-5 fill-amber-500" />
        </button>

        {/* Zoom Controls */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 1, 18))}
            className="p-2.5 text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100"
            title="Acercar"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 1, 12))}
            className="p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
            title="Alejar"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
