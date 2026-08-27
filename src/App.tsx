import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BarraLibreSection } from './components/BarraLibreSection';
import { MenuExplorer } from './components/MenuExplorer';
import { PromotionsSection } from './components/PromotionsSection';
import { CustomRoundBuilder } from './components/CustomRoundBuilder';
import { NeonWallExperience } from './components/NeonWallExperience';
import { LocationsSection } from './components/LocationsSection';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { Dish } from './types';
import { MessageCircle, Calendar, ArrowUp, Flame, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [reservationLocationId, setReservationLocationId] = useState<string>('miraflores');
  const [roundDishes, setRoundDishes] = useState<Dish[]>([]);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Monitor scroll for back to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenReservation = (locationId?: string) => {
    if (locationId) {
      setReservationLocationId(locationId);
    }
    setIsReservationOpen(true);
  };

  const handleAddToRound = (dish: Dish) => {
    if (roundDishes.some((d) => d.id === dish.id)) {
      setRoundDishes(roundDishes.filter((d) => d.id !== dish.id));
    } else {
      if (roundDishes.length < 3) {
        setRoundDishes([...roundDishes, dish]);
      } else {
        setRoundDishes([roundDishes[0], roundDishes[1], dish]);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col relative selection:bg-pink-500 selection:text-white">
      
      {/* Top Floating Navbar */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        onOpenMenu={() => {
          const el = document.getElementById('carta');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <HeroSection
          onOpenReservation={() => handleOpenReservation()}
          onExploreMenu={() => {
            const el = document.getElementById('carta');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Barra Libre All-You-Can-Eat Highlight */}
        <BarraLibreSection
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 3. Interactive Menu Explorer (Masa NYC structured layout + Neon Nikkei energy) */}
        <MenuExplorer
          onSelectDish={(dish) => setSelectedDish(dish)}
          onAddToRound={handleAddToRound}
          roundDishesIds={roundDishes.map((d) => d.id)}
        />

        {/* 4. Combos & Promotions */}
        <PromotionsSection
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 5. Interactive "Arma tu Ronda / Mesa" Builder */}
        <CustomRoundBuilder
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 6. Neon Wall & Instagram Community Experience */}
        <NeonWallExperience />

        {/* 7. Locations (Miraflores & Surco) */}
        <LocationsSection
          onOpenReservationWithLocation={(locId) => handleOpenReservation(locId)}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* Modals */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToRound={handleAddToRound}
        isInRound={selectedDish ? roundDishes.some((d) => d.id === selectedDish.id) : false}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        initialLocationId={reservationLocationId}
      />

      {/* Floating Action Buttons: WhatsApp & Back to Top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* WhatsApp Quick Trigger with pulsing badge */}
        <a
          href="https://wa.me/51951770377?text=Hola%20Kai-To!%20Quisiera%20hacer%20un%20pedido%20o%20reserva"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] hover:scale-110 active:scale-95 transition-all duration-300"
          title="Escríbenos por WhatsApp (+51 951 770 377)"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-[#090b10] animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-[#090b10]" />
        </a>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg flex items-center justify-center transition-all animate-fadeIn"
            title="Volver arriba"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
