import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Share2, 
  Bookmark, 
  Navigation, 
  Send, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Utensils, 
  Sparkles, 
  Heart, 
  ThumbsUp, 
  Flame, 
  DollarSign, 
  Check, 
  Info, 
  Camera, 
  Smartphone,
  ShieldCheck,
  AlertCircle,
  Volume2,
  RefreshCw,
  Eye
} from 'lucide-react';
import { BusinessProfile, SocialPost, MenuItem, ReviewItem } from '../types';
import { MENU_ITEMS, REVIEWS_LIST } from '../data/mapsData';

interface GoogleMapsSidebarProps {
  profile: BusinessProfile;
  isOptimized: boolean;
  selectedStarDish: string;
  onSelectStarDish: (dish: string) => void;
  onOpenPhotoGallery: (index?: number) => void;
  onTriggerDirections?: () => void;
  onOpenCustomizer?: () => void;
}

type TabType = 'overview' | 'posts' | 'menu' | 'reviews' | 'photos' | 'script';

export const GoogleMapsSidebar: React.FC<GoogleMapsSidebarProps> = ({
  profile,
  isOptimized,
  selectedStarDish,
  onSelectStarDish,
  onOpenPhotoGallery,
  onTriggerDirections,
  onOpenCustomizer,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('todos');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<{ [key: string]: number }>({
    'post-1': 84,
    'post-2': 142,
    'post-3': 198,
  });

  // Dynamic 3 Antojo Posts based on user input and dynamic dish selection
  const dynamicPosts = [
    {
      id: 'post-1',
      badge: '1. POST DE MENÚ DIARIO',
      headline: '¿No sabes qué almorzar hoy? 🤤🍲',
      copy: '¿No sabes qué almorzar hoy? 🤤 En Sabor y Sazón tenemos el menú perfecto: casero, abundante y con ese toque único que te hará sentir en casa. ¡Ven antes de que se acabe! 🏃💨',
      ctaText: 'Pedir Menú del Día',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      tags: ['#MenuDelDia', '#SaborCriollo', '#AlmuerzoCasero', '#Lima'],
    },
    {
      id: 'post-2',
      badge: '2. POST DE PLATO ESTRELLA',
      headline: `Hay sabores que no se olvidan... 🥘✨`,
      copy: `Hay sabores que no se olvidan... y nuestro ${selectedStarDish} es uno de ellos. 🥘 La combinación perfecta de sazón y frescura. Etiqueta a quien te debe un almuerzo aquí. 👇`,
      ctaText: `Pedir ${selectedStarDish}`,
      image: selectedStarDish.includes('Lomo') 
        ? 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      tags: ['#PlatoEstrella', '#ComidaPeruana', `#${selectedStarDish.replace(/\s+/g, '')}`, '#SaborYSazon'],
    },
    {
      id: 'post-3',
      badge: '3. POST DE CONFIANZA & VALOR',
      headline: 'Sabor, calidad y el mejor precio del barrio ❤️',
      copy: 'Sabor, calidad y el mejor precio de la zona. En Sabor y Sazón cocinamos con amor para que tú disfrutes cada bocado. ¡Te esperamos hoy! ❤️',
      ctaText: 'Cómo Llegar al Local',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      tags: ['#CalidadGarantizada', '#SaborYSazon', '#ElMejorPrecio', '#HechoConAmor'],
    },
  ];

  // Dynamic Sales Script based on user's exact template
  const dynamicSalesScript = `¡Hola! Gracias por escribirnos a Sabor y Sazón 🍲. Con gusto te ayudamos. Hoy tenemos ${selectedStarDish}. ¿Te gustaría hacer un pedido para delivery o prefieres visitarnos en el local? ¡Te esperamos!`;

  const [simulatedChatMessages, setSimulatedChatMessages] = useState<
    { sender: 'user' | 'bot'; text: string; time: string }[]
  >([
    {
      sender: 'user',
      text: '¡Hola! ¿Qué tienen para hoy en el almuerzo?',
      time: '12:45 PM',
    },
    {
      sender: 'bot',
      text: dynamicSalesScript,
      time: '12:46 PM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleSpeakDescription = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(profile.description);
      utterance.lang = 'es-PE';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text: chatInput,
      time: 'Ahora',
    };

    setSimulatedChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      setSimulatedChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot' as const,
          text: `¡Perfecto! El ${selectedStarDish} sale con entrada y refresco natural. ¿Nos envías tu dirección para enviártelo en delivery o te reservamos mesa?`,
          time: 'Ahora',
        },
      ]);
    }, 1000);
  };

  const filteredMenuItems = 
    activeMenuCategory === 'todos' 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(item => item.category === activeMenuCategory);

  return (
    <aside className="w-full md:w-[410px] lg:w-[450px] xl:w-[480px] h-[calc(100vh-61px)] bg-white border-r border-gray-200 shadow-xl overflow-y-auto flex flex-col shrink-0 z-20 transition-all font-sans text-gray-800">
      
      {/* 1. Cover Photos Header (Clickable to open Fullscreen Gallery) */}
      <div 
        onClick={() => onOpenPhotoGallery(0)}
        className="relative h-48 sm:h-52 w-full bg-gray-900 shrink-0 group overflow-hidden cursor-pointer"
        title="Haz clic para ver las fotos en alta resolución"
      >
        <img
          src={profile.coverPhotos[0]?.url}
          alt={profile.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {isOptimized ? (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 text-white shadow-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
              <span>Verificado por Google</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500 text-black shadow-md flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Perfil No Reclamado / Básico</span>
            </span>
          )}
        </div>

        {/* Total Photos Tag */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/75 text-white backdrop-blur-sm border border-white/20 flex items-center gap-1.5 hover:bg-black/95">
          <Camera className="w-3.5 h-3.5 text-blue-400" />
          <span>Ver {isOptimized ? '84 fotos' : '1 foto'} HD</span>
        </div>

        {/* Street View preview thumbnail */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onOpenPhotoGallery(1);
          }}
          className="absolute bottom-3 left-3 w-12 h-12 rounded-lg border-2 border-white overflow-hidden shadow-md cursor-pointer hover:scale-110 transition-transform"
        >
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80"
            alt="Street View"
            className="w-full h-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white bg-black/40">
            360°
          </span>
        </div>
      </div>

      {/* 2. Business Title & Rating Header */}
      <div className="p-4 sm:p-5 border-b border-gray-200">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {profile.name}
              </h1>
              {isOptimized && (
                <div title="Empresa Verificada">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
                </div>
              )}
            </div>
            {isOptimized && (
              <p className="text-xs font-medium text-emerald-700 mt-0.5">
                {profile.subtitle}
              </p>
            )}
          </div>

          {/* Quick Edit button for presenter */}
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 text-xs flex items-center gap-1 shrink-0"
              title="Ajustar datos en vivo"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Ajustar</span>
            </button>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mt-2 flex-wrap text-sm">
          <div className="flex items-center gap-1 text-amber-600 font-bold">
            <span className="text-base text-gray-900">{profile.rating.toFixed(1)}</span>
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(profile.rating)
                      ? 'fill-amber-400 text-amber-500'
                      : i < profile.rating
                      ? 'fill-amber-400/50 text-amber-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <span 
            onClick={() => setActiveTab('reviews')}
            className="text-gray-500 hover:text-blue-600 cursor-pointer underline text-xs font-medium"
          >
            ({profile.reviewCount} opiniones)
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-600 text-xs font-medium">{profile.priceRange}</span>
        </div>

        {/* Category line */}
        <div className="text-xs text-gray-600 mt-1">
          <span>{profile.category}</span>
          {isOptimized && profile.secondaryCategory && (
            <span className="text-gray-500"> • {profile.secondaryCategory}</span>
          )}
        </div>

        {/* 3. Primary Google Action Buttons Bar */}
        <div className="grid grid-cols-5 gap-1 pt-4 mt-2 border-t border-gray-100 text-center">
          
          <button
            onClick={onTriggerDirections}
            className="flex flex-col items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Navigation className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Cómo llegar</span>
          </button>

          <a
            href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(dynamicSalesScript)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Pedir</span>
          </a>

          <button
            onClick={() => copyToClipboard(profile.googleMapsShortUrl, 'link')}
            className="flex flex-col items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
          >
            <div className="w-9 h-9 rounded-full border border-gray-300 text-blue-600 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Guardar</span>
          </button>

          <a
            href={`tel:${profile.phone}`}
            className="flex flex-col items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
          >
            <div className="w-9 h-9 rounded-full border border-gray-300 text-blue-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Llamar</span>
          </a>

          <button
            onClick={() => copyToClipboard(profile.googleMapsShortUrl, 'share')}
            className="flex flex-col items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
          >
            <div className="w-9 h-9 rounded-full border border-gray-300 text-blue-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">
              {copiedItem === 'share' ? 'Copiado!' : 'Compartir'}
            </span>
          </button>

        </div>

      </div>

      {/* 4. Google Maps Tabs Bar */}
      <div className="flex items-center border-b border-gray-200 px-2 overflow-x-auto scrollbar-none bg-white sticky top-0 z-10">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Información general
        </button>

        <button
          onClick={() => setActiveTab('posts')}
          className={`py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap flex items-center gap-1.5 transition-colors ${
            activeTab === 'posts'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <span>3 Posts Antojo</span>
          {isOptimized && (
            <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[9px] font-black animate-pulse">
              3
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'menu'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Menú Criollo
        </button>

        <button
          onClick={() => setActiveTab('script')}
          className={`py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap flex items-center gap-1 transition-colors ${
            activeTab === 'script'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-purple-600 hover:text-purple-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Guion de Cierre</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'reviews'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Opiniones ({profile.reviewCount})
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'photos'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Fotos ({profile.coverPhotos.length})
        </button>
      </div>

      {/* 5. Tab Content Area */}
      <div className="flex-1 p-4 sm:p-5 space-y-6 overflow-y-auto">
        
        {/* ================= TAB: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            {/* Description Box (Exact Copy from User) */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-gray-800 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Descripción Oficial Optimizada</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSpeakDescription}
                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                      isSpeaking ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-100 border border-blue-200'
                    }`}
                    title="Escuchar audio de la descripción"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'Detener' : 'Escuchar'}</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(profile.description, 'desc')}
                    className="p-1.5 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 text-xs text-blue-700 flex items-center gap-1 font-semibold"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedItem === 'desc' ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Exact Description Formatted */}
              <div className="p-3.5 bg-white rounded-xl border border-blue-100 text-xs sm:text-sm leading-relaxed text-gray-800 font-normal">
                {profile.description}
              </div>

              {/* SEO Power Tags */}
              <div className="pt-1">
                <span className="text-[10px] font-bold text-blue-900 block mb-1">
                  Puntos clave de conversión incluidos en este texto:
                </span>
                <div className="flex flex-wrap gap-1">
                  {['Auténtica Sazón Peruana', 'Ingredientes Frescos', 'Menús Diarios Nutritivos', 'Platos Especiales', 'El Secreto del Barrio'].map((kw, i) => (
                    <span key={i} className="text-[10px] font-medium bg-blue-100/70 text-blue-800 px-2 py-0.5 rounded-md">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Details List */}
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-700">
              
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{profile.address}</p>
                  <p className="text-gray-500 text-xs">{profile.district}, {profile.city}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(profile.address, 'addr')}
                  className="text-gray-400 hover:text-blue-600 p-1"
                  title="Copiar dirección"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Hours Dropdown */}
              <div className="flex items-start gap-3.5 border-t border-gray-100 pt-3">
                <Clock className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div 
                    onClick={() => setIsHoursOpen(!isHoursOpen)}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <span className="font-semibold text-emerald-700">Abierto ahora</span>
                      <span className="text-gray-600 text-xs ml-1.5">
                        • Cierra a las {profile.hours.closesAt}
                      </span>
                    </div>
                    {isHoursOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    )}
                  </div>

                  {/* Expanded Schedule */}
                  {isHoursOpen && (
                    <div className="mt-2.5 space-y-1.5 bg-gray-50 p-3 rounded-lg text-xs border border-gray-200">
                      {profile.hours.schedule.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between py-0.5 ${
                            item.isToday ? 'font-bold text-blue-700' : 'text-gray-600'
                          }`}
                        >
                          <span>{item.day}:</span>
                          <span>{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-center gap-3.5 border-t border-gray-100 pt-3">
                <Phone className="w-5 h-5 text-gray-500 shrink-0" />
                <div className="flex-1">
                  <a href={`tel:${profile.phone}`} className="text-blue-600 hover:underline font-medium">
                    {profile.phone}
                  </a>
                </div>
              </div>

              {/* Website */}
              {profile.website && (
                <div className="flex items-center gap-3.5 border-t border-gray-100 pt-3">
                  <Globe className="w-5 h-5 text-gray-500 shrink-0" />
                  <div className="flex-1">
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>{profile.website.replace('https://', '')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

            </div>

            {/* Attributes & Service Options */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Opciones del servicio & Atributos
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                {profile.attributes.serviceOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{opt}</span>
                  </div>
                ))}
                {profile.attributes.payments.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{opt}</span>
                  </div>
                ))}
                {profile.attributes.amenities.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB: 3 POSTS ANTOJO ================= */}
        {activeTab === 'posts' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Dish selector for Post 2 */}
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>3 Ideas de Posts "Antojo" para Google Maps & Redes</span>
                </span>
              </div>
              <p className="text-amber-900 leading-relaxed">
                Selecciona qué plato estrella quieres promocionar hoy en el <strong>Post 2</strong>:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Seco de Res con Frejoles',
                  'Lomo Saltado al Wok',
                  'Ají de Gallina Cremoso',
                  'Arroz con Pollo Criollo',
                ].map((dish) => (
                  <button
                    key={dish}
                    onClick={() => onSelectStarDish(dish)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      selectedStarDish === dish
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    {dish}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Antojo Posts Loop */}
            <div className="space-y-5">
              {dynamicPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
                >
                  {/* Post Image (Click to enlarge) */}
                  <div 
                    onClick={() => onOpenPhotoGallery(0)}
                    className="relative h-44 w-full bg-gray-100 cursor-pointer group overflow-hidden"
                    title="Clic para ver foto"
                  >
                    <img
                      src={post.image}
                      alt={post.headline}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-600 text-white shadow">
                      {post.badge}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>Ver foto HD</span>
                    </div>
                  </div>

                  {/* Post Body */}
                  <div className="p-4 space-y-3">
                    <h4 className="font-bold text-sm text-gray-900 leading-tight">
                      {post.headline}
                    </h4>

                    {/* Copy text with 1-click Copy */}
                    <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-800 leading-relaxed border border-gray-100 relative">
                      <p className="font-medium italic">"{post.copy}"</p>
                      
                      {/* Copy post text button */}
                      <button
                        onClick={() => copyToClipboard(post.copy, post.id)}
                        className="mt-2 text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedItem === post.id ? '¡Copiado para tus redes / Google!' : 'Copiar este texto para publicar'}</span>
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button & Likes Simulation */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setPostLikes((prev) => ({
                            ...prev,
                            [post.id]: (prev[post.id] || 0) + 1,
                          }));
                        }}
                        className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{postLikes[post.id] || 84} me gusta</span>
                      </button>

                      <a
                        href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
                          `¡Hola Sabor y Sazón! Vi su publicación de *${post.headline}* y deseo hacer un pedido.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <span>{post.ctaText}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB: GUION DE CIERRE DE VENTAS ================= */}
        {activeTab === 'script' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-3 text-purple-950 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Guion de Cierre de Ventas (Para sus Mensajes)</span>
                </span>
                <button
                  onClick={() => copyToClipboard(dynamicSalesScript, 'script-all')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-1 shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedItem === 'script-all' ? '¡Copiado!' : 'Copiar Guion'}</span>
                </button>
              </div>

              <p className="text-xs leading-relaxed text-purple-900 font-medium">
                Plantilla exacta para que el dueño o su equipo cierren pedidos de inmediato cuando un cliente les escribe desde Google Maps o WhatsApp:
              </p>

              {/* Dynamic Script Box */}
              <div className="p-3.5 bg-white rounded-xl border border-purple-200 text-xs sm:text-sm text-gray-800 font-sans shadow-inner leading-relaxed">
                "{dynamicSalesScript}"
              </div>

              {/* Dish Selector to customize script */}
              <div className="pt-1">
                <span className="text-[11px] font-bold text-purple-900 block mb-1">
                  Cambiar plato del día en el guion:
                </span>
                <div className="flex flex-wrap gap-1">
                  {['Seco de Res con Frejoles', 'Lomo Saltado Jugoso', 'Ají de Gallina', 'Arroz con Pollo'].map((d) => (
                    <button
                      key={d}
                      onClick={() => onSelectStarDish(d)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors ${
                        selectedStarDish === d
                          ? 'bg-purple-700 text-white'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Interactive Chat Simulator */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-gray-50">
              
              <div className="bg-emerald-700 p-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    🍲
                  </div>
                  <div>
                    <h5 className="font-bold text-xs">Simulador de Chat en Vivo</h5>
                    <span className="text-[10px] text-emerald-200">Prueba cómo responde el guion a un cliente</span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(dynamicSalesScript)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 rounded-md text-white flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Probar en WhatsApp</span>
                </a>
              </div>

              {/* Chat Body */}
              <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                {simulatedChatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Escribe como cliente (ej. ¿Tienen seco de res?)..."
                  className="flex-1 px-3 py-2 text-xs bg-gray-100 rounded-xl outline-none focus:ring-1 focus:ring-emerald-500 text-gray-800"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>
        )}

        {/* ================= TAB: MENU & CARTA ================= */}
        {activeTab === 'menu' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['todos', 'Menús del Día', 'Platos a la Carta', 'Bebidas Caseras'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveMenuCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeMenuCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'todos' ? 'Todo el Menú' : cat}
                </button>
              ))}
            </div>

            {/* Menu items list */}
            <div className="space-y-3">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-gray-200 hover:border-blue-400 bg-white shadow-sm flex items-start gap-3.5 group transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => onOpenPhotoGallery(0)}
                    className="w-20 h-20 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    {item.badge && (
                      <span className="text-[9px] font-extrabold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded mb-1 inline-block">
                        {item.badge}
                      </span>
                    )}
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                      <span className="text-xs font-bold text-gray-900">
                        S/. {item.price.toFixed(2)}
                      </span>
                      <a
                        href={`https://wa.me/${profile.whatsapp}?text=Hola!%20Deseo%20pedir:%20*${encodeURIComponent(item.name)}*%20(S/.%20${item.price.toFixed(2)})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Pedir a WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB: REVIEWS ================= */}
        {activeTab === 'reviews' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            {/* Rating Summary Card */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-gray-900">
                  {profile.rating.toFixed(1)}
                </span>
                <div className="flex text-amber-500 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  Basado en {profile.reviewCount} opiniones verificadas
                </span>
              </div>

              {/* Bars */}
              <div className="space-y-1 text-[10px] text-gray-500 w-36">
                {[
                  { star: 5, pct: '92%' },
                  { star: 4, pct: '6%' },
                  { star: 3, pct: '2%' },
                  { star: 2, pct: '0%' },
                  { star: 1, pct: '0%' },
                ].map((b) => (
                  <div key={b.star} className="flex items-center gap-1.5">
                    <span>{b.star}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: b.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {REVIEWS_LIST.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl border border-gray-200 bg-white space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.authorAvatar}
                        alt={rev.authorName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="font-bold text-xs text-gray-900">{rev.authorName}</h5>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          {rev.isLocalGuide && (
                            <span className="text-amber-700 font-bold">★ Local Guide</span>
                          )}
                          <span>• {rev.reviewsCount} opiniones</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">{rev.timeAgo}</span>
                  </div>

                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    ))}
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed">
                    {rev.comment}
                  </p>

                  {/* Owner Response */}
                  {rev.response && (
                    <div className="p-3 rounded-lg bg-gray-50 border-l-2 border-blue-600 text-xs text-gray-700 space-y-1">
                      <span className="font-bold text-blue-800 text-[11px] block">
                        Respuesta del propietario ({rev.response.date}):
                      </span>
                      <p className="italic">{rev.response.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB: PHOTOS ================= */}
        {activeTab === 'photos' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">
                Galería de Fotos ({profile.coverPhotos.length})
              </span>
              <button
                onClick={() => onOpenPhotoGallery(0)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Pantalla Completa</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {profile.coverPhotos.map((photo, i) => (
                <div
                  key={i}
                  onClick={() => onOpenPhotoGallery(i)}
                  className="relative h-32 rounded-xl overflow-hidden group cursor-pointer border border-gray-200 shadow-sm"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-[10px] text-white font-medium truncate">
                      {photo.caption}
                    </span>
                  </div>
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-sm">
                    {photo.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </aside>
  );
};
