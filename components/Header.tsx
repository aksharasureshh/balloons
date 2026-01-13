
import React from 'react';
import { Section } from '../types';

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const logoUrl = "https://raw.githubusercontent.com/aksharasureshh/balloons/main/logo.png";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100">
      <div className="container mx-auto px-6 py-1 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')}
          className="group transition-all duration-300 hover:scale-105 active:scale-95 py-2"
        >
          <div className="h-20 w-20 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm border border-stone-50">
            <img 
              src={logoUrl} 
              alt="BalloonsByAks Logo" 
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.logo-fallback')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'logo-fallback flex flex-col items-center justify-center h-full w-full bg-[#fce7f3]';
                  fallback.innerHTML = '<span class="text-[10px] font-black text-stone-900 tracking-tighter">BBA</span>';
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { id: 'home', label: 'Home' },
            { id: 'gallery', label: 'Gallery' },
            { id: 'builder', label: 'Arch Builder' },
            { id: 'faq', label: 'FAQ' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Section)}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-1 ${
                activeSection === item.id 
                  ? 'text-stone-900' 
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fce7f3] animate-in slide-in-from-left duration-300"></span>
              )}
            </button>
          ))}
          <a 
            href="https://instagram.com/balloonsbyaks" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-7 py-3 bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-stone-800 transition-all active:scale-95 shadow-lg shadow-stone-200"
          >
            Connect
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
