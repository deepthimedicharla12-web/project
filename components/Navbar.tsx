
import React from 'react';

interface NavbarProps {
  onNavigate: (view: any) => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onNavigate('home')}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          BrandPulse <span className="text-violet-400">AI</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <button 
          onClick={() => onNavigate('home')}
          className={`hover:text-white transition-colors ${currentView === 'home' ? 'text-white border-b-2 border-violet-500 pb-1' : ''}`}
        >
          Tools
        </button>
        <button 
          onClick={() => onNavigate('consultant')}
          className={`hover:text-white transition-colors ${currentView === 'consultant' ? 'text-white border-b-2 border-violet-500 pb-1' : ''}`}
        >
          Consultant
        </button>
      </div>

      <div className="flex items-center gap-4">
        <select className="bg-transparent border border-white/10 text-xs text-white rounded px-2 py-1 outline-none">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="hi">Hindi</option>
        </select>
        <button className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold py-2 px-4 rounded-full transition-all active:scale-95 shadow-lg shadow-violet-600/20">
          Get Started
        </button>
      </div>
    </nav>
  );
};
