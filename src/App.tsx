import React, { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LiveStatusTicker } from './components/LiveStatusTicker';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PromotionsSection } from './components/PromotionsSection';
import { MenuExplorer } from './components/MenuExplorer';
import { CustomRoundBuilder } from './components/CustomRoundBuilder';
import { NeonWallExperience } from './components/NeonWallExperience';
import { LocationsSection } from './components/LocationsSection';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { Dish } from './types';
import { MessageCircle, Calendar, ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [reservationLocationId, setReservationLocationId] = useState<string>('huanka-chiclayo-principal');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Monitor scroll for back to top button
  useEffect(() => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#120b08] text-[#f7efe6] flex flex-col relative selection:bg-[#c86a3e] selection:text-white">
      
      {/* 1. Animated Moving 60fps Background with Embers & Particle Mesh */}
      <AnimatedBackground />

      {/* 2. Top Floating Navbar */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        onOpenMenu={() => {
          const el = document.getElementById('carta');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Page Content */}
      <main className="flex-1 relative z-10">
        
        {/* 3. Hero Section with Sizzle Simulator & Dish Switcher */}
        <HeroSection
          onOpenReservation={() => handleOpenReservation()}
          onExploreMenu={() => {
            const el = document.getElementById('carta');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Live Status Ticker (Horarios Chiclayo & Happy Hour) */}
        <LiveStatusTicker />

        {/* 5. Promociones & Momentos Huanka (Desayunos, Happy Hour, Cenas Románticas) */}
        <PromotionsSection
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 6. Interactive Menu Explorer */}
        <MenuExplorer
          onSelectDish={(dish) => setSelectedDish(dish)}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 7. Interactive "Arma tu Banquete / Tabla" Builder */}
        <CustomRoundBuilder />

        {/* 8. Comunidad Huankilovers & Instagram Wall */}
        <NeonWallExperience />

        {/* 9. Sede Chiclayo (Francisco Cabrera 436) */}
        <LocationsSection
          onOpenReservation={() => handleOpenReservation()}
        />

      </main>

      {/* 10. Footer */}
      <Footer onOpenReservation={() => handleOpenReservation()} />

      {/* Modals */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        initialLocationId={reservationLocationId}
      />

      {/* Floating Bottom Quick Action Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#140c08]/95 border-t border-[#e5aa38]/30 backdrop-blur-xl sm:hidden flex items-center gap-2">
        <a
          href="https://wa.me/51953368821"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Delivery WhatsApp</span>
        </a>

        <button
          onClick={() => handleOpenReservation()}
          className="flex-1 py-3 px-2 rounded-xl bg-gradient-to-r from-[#c86a3e] to-[#e5aa38] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg"
        >
          <Calendar className="w-4 h-4" />
          <span>Reservar Mesa</span>
        </button>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-[#28160e]/90 border border-[#e5aa38]/40 text-[#f3be52] hover:text-white hover:bg-[#c86a3e] shadow-2xl backdrop-blur-md transition-all active:scale-95 group"
          title="Volver arriba"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

    </div>
  );
}
