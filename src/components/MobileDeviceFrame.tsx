import React from 'react';
import { Smartphone, Battery, Wifi, Signal } from 'lucide-react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({ children }) => {
  return (
    <div className="flex-1 h-[calc(100vh-61px)] bg-gray-900/90 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Smartphone Outer Casing */}
      <div className="w-[390px] h-[780px] max-h-[92vh] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-white/20 flex flex-col relative overflow-hidden">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] ring-1 ring-blue-900/40" />
          <div className="w-3 h-3 rounded-full bg-[#121212] ring-1 ring-purple-900/30" />
        </div>

        {/* Screen Status Bar */}
        <div className="h-9 w-full bg-white text-black px-6 pt-2 flex items-center justify-between text-[11px] font-semibold shrink-0 z-30 select-none">
          <span>12:45</span>
          <div className="flex items-center gap-1.5 text-gray-800">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Inner Screen Content */}
        <div className="flex-1 w-full bg-white rounded-[36px] overflow-hidden flex flex-col relative">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="w-32 h-1 bg-white/40 rounded-full mx-auto mt-2 shrink-0" />

      </div>

    </div>
  );
};
