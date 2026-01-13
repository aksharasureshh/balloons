
import React from 'react';
import { Section } from '../types';

interface FooterProps {
  onNavigate?: (section: Section) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const logoUrl = "https://raw.githubusercontent.com/aksharasureshh/balloons/main/logo.png";

  const handleNav = (section: Section) => {
    if (onNavigate) {
      onNavigate(section);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 border-b border-stone-800 pb-16 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-8">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-white flex items-center justify-center p-2 shadow-xl border-4 border-stone-800">
                 <img 
                  src={logoUrl} 
                  alt="BalloonsByAks" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            <h2 className="text-white font-serif text-2xl mb-4">BalloonsByAks</h2>
            <p className="max-w-xs text-sm leading-relaxed text-stone-500 font-light">
              Crafting luxury installations and bespoke event decor across the Greater Toronto Area. Artistry in every detail.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-black text-[10px] tracking-[0.3em] uppercase mb-8">Navigation</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><button onClick={() => handleNav('gallery')} className="hover:text-[#fce7f3] transition-colors">Portfolio</button></li>
              <li><button onClick={() => handleNav('builder')} className="hover:text-[#fce7f3] transition-colors">Arch Studio</button></li>
              <li><button className="hover:text-[#fce7f3] transition-colors opacity-50 cursor-not-allowed">Rentals</button></li>
              <li><button className="hover:text-[#fce7f3] transition-colors opacity-50 cursor-not-allowed">Process</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black text-[10px] tracking-[0.3em] uppercase mb-8">Details</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><button className="hover:text-[#fce7f3] transition-colors">Toronto & GTA</button></li>
              <li><button onClick={() => handleNav('faq')} className="hover:text-[#fce7f3] transition-colors">FAQ</button></li>
              <li><button className="hover:text-[#fce7f3] transition-colors">Booking</button></li>
              <li><button className="hover:text-[#fce7f3] transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black text-[10px] tracking-[0.3em] uppercase mb-8">Social</h3>
            <div className="space-y-4">
              <a 
                href="https://instagram.com/balloonsbyaks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[#fce7f3] transition-colors group"
              >
                <span className="text-stone-600">Instagram:</span> @balloonsbyaks
              </a>
              <p className="flex items-start gap-3">
                <span className="text-stone-600">Location:</span> 
                <span className="text-stone-400">Ontario, Canada</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-600 gap-6">
          <p>© {new Date().getFullYear()} BalloonsByAks. All rights reserved.</p>
          <div className="flex gap-8 items-center">
            <button onClick={() => handleNav('admin')} className="text-stone-800 hover:text-stone-500 transition-colors">Management Portal</button>
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
