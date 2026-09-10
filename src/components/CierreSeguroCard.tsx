import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Copy, Volume2, Flame, TrendingUp, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface CierreSeguroCardProps {
  onOpenGallery?: () => void;
  onOpenPitch?: () => void;
}

export const CierreSeguroCard: React.FC<CierreSeguroCardProps> = ({ onOpenGallery, onOpenPitch }) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const exactDescription =
    '🍲 Sabor y Sazón: El corazón del sabor casero en tu mesa. Disfruta de la auténtica sazón peruana con ingredientes frescos y el cariño de nuestra cocina. Desde nuestros menús diarios nutritivos hasta nuestros platos especiales, cada bocado es una experiencia de sabor inolvidable. ¡Visítanos y descubre por qué somos el secreto mejor guardado del barrio! ✨';

  const handleCopy = () => {
    navigator.clipboard.writeText(exactDescription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(exactDescription);
      utterance.lang = 'es-PE';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-50/70 via-white to-white border-2 border-amber-400/80 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden transition-all text-gray-900">
      
      {/* Badge Top */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
          <span>Fórmula de Cierre Seguro (5 Minutos)</span>
        </span>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Alta Conversión</span>
        </span>
      </div>

      {/* 1. Foto Impactante de Portada */}
      <div 
        onClick={onOpenGallery}
        className="relative h-48 sm:h-52 w-full rounded-xl overflow-hidden shadow-md group cursor-pointer border border-amber-200 mb-4 bg-gray-900"
        title="Haz clic para ver la foto en alta resolución"
      >
        <img
          src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=80"
          alt="Pollo Dorado Jugoso con Sazón Casera"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Floating Photo Tag */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-amber-500 text-white shadow flex items-center gap-1">
          <Flame className="w-3.5 h-3.5" />
          <span>1. FOTO IMPACTANTE (ALTA RESOLUCIÓN)</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-xs font-bold drop-shadow-sm flex items-center gap-1">
            <span>🍗 Pollo Dorado y Sazón Casera que Abre el Apetito</span>
          </p>
          <p className="text-[11px] text-amber-200 drop-shadow-sm">
            Tus clientes deciden qué comer con los ojos en menos de 3 segundos
          </p>
        </div>
      </div>

      {/* 2. El Título */}
      <div className="mb-3.5">
        <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-900 uppercase tracking-wider mb-0.5">
          <span>2. Título Optimizado:</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-1.5">
          <span>Sabor y Sazón - Perfil Optimizado ✨</span>
        </h2>
        <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Posicionado #1 en búsquedas locales de Google Maps</span>
        </p>
      </div>

      {/* 3. La Descripción Profesional */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1">
            <span>3. Descripción Profesional Redactada:</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSpeak}
              className="px-2 py-1 rounded-md text-[11px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-950 flex items-center gap-1 transition-colors"
              title="Escuchar locución"
            >
              <Volume2 className="w-3 h-3" />
              <span>{isSpeaking ? 'Detener' : 'Escuchar'}</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-2 py-1 rounded-md text-[11px] font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 transition-colors shadow-xs"
              title="Copiar texto"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-gray-800 leading-relaxed font-normal shadow-xs">
          "{exactDescription}"
        </div>
      </div>

      {/* 4. Checklist de Beneficios */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 mb-3">
        <span className="text-[11px] font-extrabold text-emerald-950 uppercase tracking-wider block mb-2">
          4. Checklist de Beneficios para el Dueño:
        </span>
        
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
          <li className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold text-base">✅</span>
            <span><strong>Mayor visibilidad en Google:</strong> Aparece primero cuando busquen dónde almorzar.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold text-base">✅</span>
            <span><strong>Textos que generan antojo:</strong> Convierten visitas en llamadas y pedidos inmediatos.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold text-base">✅</span>
            <span><strong>Imagen profesional y confiable:</strong> Destaca por encima de cualquier competidor del barrio.</span>
          </li>
        </ul>
      </div>

      {/* Frase de Impacto Final */}
      <div className="text-center pt-2">
        <p className="text-xs font-bold text-gray-600 italic">
          "¡Wow, así quiero que se vea mi negocio!"
        </p>
      </div>

    </div>
  );
};
