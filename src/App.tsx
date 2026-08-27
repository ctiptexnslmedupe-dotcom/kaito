import React, { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LiveStatusTicker } from './components/LiveStatusTicker';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BarraLibreSection } from './components/BarraLibreSection';
import { MenuExplorer } from './components/MenuExplorer';
import { CustomRoundBuilder } from './components/CustomRoundBuilder';
import { PromotionsSection } from './components/PromotionsSection';
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
  const [reservationLocationId, setReservationLocationId] = useState<string>('miraflores');
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
    <div className="min-h-screen bg-[#07070c] text-white flex flex-col relative selection:bg-[#ff0055] selection:text-white">
      
      {/* 1. Canvas Animated Ambient Background */}
      <AnimatedBackground />

      {/* 2. Top Floating Navigation */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        onOpenMenu={() => {
          const el = document.getElementById('carta');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Page Content */}
      <main className="flex-1 relative z-10">
        
        {/* 3. Hero Section with Interactive Sizzle Simulator */}
        <HeroSection
          onOpenReservation={() => handleOpenReservation()}
          onExploreMenu={() => {
            const el = document.getElementById('carta');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Live Status Ticker (Horarios & Happy Hour) */}
        <LiveStatusTicker />

        {/* 5. Barra Libre All You Can Eat Showcase */}
        <BarraLibreSection
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 6. Interactive Menu Explorer with Filters & Search */}
        <MenuExplorer
          onSelectDish={(dish) => setSelectedDish(dish)}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 7. Interactive "Arma tu Tabla" Builder (30/50 Cortes) */}
        <CustomRoundBuilder />

        {/* 8. Weekly Promotions & Birthday Perks */}
        <PromotionsSection
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 9. Neon Wall & Customer Experiences */}
        <NeonWallExperience />

        {/* 10. Sedes Miraflores & Surco with Interactive Maps */}
        <LocationsSection
          onOpenReservation={(locId) => handleOpenReservation(locId)}
        />

      </main>

      {/* 11. Footer */}
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
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#0d0d14]/95 border-t border-white/10 backdrop-blur-xl sm:hidden flex items-center gap-2">
        <a
          href="https://wa.me/51987654321"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-2 rounded-xl bg-[#00ffff]/15 border border-[#00ffff]/30 text-[#00ffff] font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Delivery WhatsApp</span>
        </a>

        <button
          onClick={() => handleOpenReservation()}
          className="flex-1 py-3 px-2 rounded-xl bg-gradient-to-r from-[#ff0055] to-[#ffaa00] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg"
        >
          <Calendar className="w-4 h-4" />
          <span>Reservar Mesa</span>
        </button>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-[#141422]/90 border border-white/15 text-[#00ffff] hover:text-white hover:bg-[#ff0055] shadow-2xl backdrop-blur-md transition-all active:scale-95 group"
          title="Volver arriba"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

    </div>
  );
}
