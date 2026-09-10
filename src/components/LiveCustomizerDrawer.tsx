import React from 'react';
import { 
  X, 
  Sparkles, 
  Edit3, 
  Check, 
  Flame, 
  Utensils, 
  Phone, 
  Star, 
  RotateCcw,
  Sliders
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface LiveCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: BusinessProfile;
  onUpdateProfile: (updated: Partial<BusinessProfile>) => void;
  selectedStarDish: string;
  onSelectStarDish: (dish: string) => void;
  customDishOptions: string[];
}

export const LiveCustomizerDrawer: React.FC<LiveCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  selectedStarDish,
  onSelectStarDish,
  customDishOptions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-yellow-300" />
            <div>
              <h3 className="font-bold text-sm">Personalizador en Vivo</h3>
              <p className="text-[11px] text-blue-200">Ajusta los datos del cliente frente a él</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-5 space-y-5 overflow-y-auto text-xs text-gray-700">
          
          {/* Quick Dish Switcher */}
          <div className="space-y-2 bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100">
            <label className="font-bold text-blue-900 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-blue-600" />
              <span>Plato Estrella / Plato del Día Activo:</span>
            </label>
            <p className="text-[11px] text-blue-700">
              Al cambiar este plato, se actualizarán automáticamente el Post 2 ("Plato Estrella") y el Guion de Cierre de Ventas.
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {customDishOptions.map((dish) => (
                <button
                  key={dish}
                  onClick={() => onSelectStarDish(dish)}
                  className={`p-2 rounded-xl text-left font-semibold text-[11px] transition-all flex items-center justify-between ${
                    selectedStarDish === dish
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="truncate">{dish}</span>
                  {selectedStarDish === dish && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Business Name */}
          <div className="space-y-1">
            <label className="font-bold text-gray-800">Nombre del Restaurante en Google Maps:</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onUpdateProfile({ name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Subtitle / Slogan */}
          <div className="space-y-1">
            <label className="font-bold text-gray-800">Subtítulo / Especialidad:</label>
            <input
              type="text"
              value={profile.subtitle}
              onChange={(e) => onUpdateProfile({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Rating & Reviews Slider */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-800">Estrellas Google:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={profile.rating}
                  onChange={(e) => onUpdateProfile({ rating: parseFloat(e.target.value) || 4.9 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-bold text-amber-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-800">N° Opiniones:</label>
              <input
                type="number"
                value={profile.reviewCount}
                onChange={(e) => onUpdateProfile({ reviewCount: parseInt(e.target.value) || 184 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900"
              />
            </div>
          </div>

          {/* Description Editor */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-800">Descripción del Propietario (Google Maps):</label>
              <span className="text-[10px] text-gray-400">{profile.description.length} caracteres</span>
            </div>
            <textarea
              rows={5}
              value={profile.description}
              onChange={(e) => onUpdateProfile({ description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-xl text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-3 pt-2 border-t border-gray-200">
            <div className="space-y-1">
              <label className="font-bold text-gray-800">Teléfono / WhatsApp de Pedidos:</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => onUpdateProfile({ phone: e.target.value, whatsapp: e.target.value.replace(/\D/g, '') })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-800">Dirección Física:</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => onUpdateProfile({ address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs text-gray-900"
              />
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            Aplicar Cambios en la Ficha
          </button>
        </div>

      </div>

    </div>
  );
};
