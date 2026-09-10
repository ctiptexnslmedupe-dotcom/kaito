import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  MapPin, 
  Star, 
  MessageSquare, 
  Share2, 
  FileText,
  Printer,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface PitchPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: BusinessProfile;
}

export const PitchPresentationModal: React.FC<PitchPresentationModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [avgTicket, setAvgTicket] = useState<number>(18);
  const [dailyNewCustomers, setDailyNewCustomers] = useState<number>(25);

  if (!isOpen) return null;

  const monthlyExtraRevenue = avgTicket * dailyNewCustomers * 26; // 26 días operativos al mes
  const yearlyExtraRevenue = monthlyExtraRevenue * 12;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-gray-100 my-auto">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-gray-950 uppercase tracking-wide flex items-center gap-1 shadow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Propuesta Comercial de Alto Impacto</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Plan de Dominación Local en Google Maps
          </h2>
          <p className="text-blue-100 text-sm mt-1 max-w-xl">
            Cómo transformamos la presencia de <strong>{profile.name}</strong> para multiplicar comensales en el local y pedidos de delivery diario.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* 4 Pillars of Optimization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-gray-900">
                Ficha Optimizada & SEO Local
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Categorías gastronómicas exactas, horarios, fotos HD en ángulos correctos y descripción persuasiva con palabras clave ("comida criolla", "menú ejecutivo").
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-gray-900">
                Estrategia de 3 Posts "Antojo"
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Publicaciones periódicas de Menú del Día, Plato Estrella (Seco de Res / Lomo) y Confianza para activar el algoritmo de Google y atraer comensales hambrientos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-gray-900">
                Carta Digital & Botón de Pedido
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Catálogo categorizado con precios actualizados y conexión directa a WhatsApp para cerrar pedidos con 1 solo toque.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h4 className="font-bold text-sm text-gray-900">
                Guion de Cierre Rápido de Ventas
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Plantillas de respuesta instantánea para que ningún cliente potencial que consulte por chat se quede sin comprar su almuerzo o delivery.
              </p>
            </div>

          </div>

          {/* Interactive ROI Calculator for the Business Owner */}
          <div className="p-5 rounded-2xl bg-gray-900 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">
                  Calculadora de Retorno de Inversión (ROI)
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                Estimación de Impacto
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Slider 1: Ticket Promedio */}
              <div className="space-y-1.5 bg-white/5 p-3 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">Ticket promedio por comensal:</span>
                  <span className="font-bold text-yellow-400">S/. {avgTicket}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Slider 2: Clientes Extra por Día */}
              <div className="space-y-1.5 bg-white/5 p-3 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">Nuevos clientes/día por Google Maps:</span>
                  <span className="font-bold text-emerald-400">+{dailyNewCustomers} clientes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={dailyNewCustomers}
                  onChange={(e) => setDailyNewCustomers(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Output Numbers */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-center">
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-xs text-gray-300 block">Facturación Adicional Mensual</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 block">
                  + S/. {monthlyExtraRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-400">Calculado sobre 26 días</span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-xs text-gray-300 block">Facturación Adicional Anual</span>
                <span className="text-xl sm:text-2xl font-black text-yellow-400 mt-1 block">
                  + S/. {yearlyExtraRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-400">Impacto anual sostenido</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
          <div className="text-xs text-gray-500 hidden sm:block">
            Presentación lista para compartir con el dueño del negocio.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-gray-600" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              Cerrar Vista
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
