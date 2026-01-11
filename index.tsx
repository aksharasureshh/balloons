
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---
type Section = 'home' | 'gallery' | 'builder' | 'faq';
type BackdropShape = 'arch' | 'double-arch' | 'three-piece-arch' | 'square' | 'circle' | 'wall';

interface BalloonColor {
  name: string;
  hex: string;
  type: 'matte' | 'chrome' | 'pastel';
  bargainBalloonsQuery?: string;
}

interface Cluster {
  id: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

// --- CONSTANTS ---
const BALLOON_COLORS: BalloonColor[] = [
  { name: 'Signature Pink', hex: '#fce7f3', type: 'matte', bargainBalloonsQuery: 'pastel pink latex' },
  { name: 'Classic Gold', hex: '#D4AF37', type: 'chrome', bargainBalloonsQuery: 'chrome gold latex' },
  { name: 'Silver Sparkle', hex: '#C0C0C0', type: 'chrome', bargainBalloonsQuery: 'chrome silver latex' },
  { name: 'Rose Gold', hex: '#B76E79', type: 'chrome', bargainBalloonsQuery: 'chrome rose gold latex' },
  { name: 'Chrome Blue', hex: '#005bb7', type: 'chrome', bargainBalloonsQuery: 'chrome blue latex' },
  { name: 'Chrome Mauve', hex: '#915f6d', type: 'chrome', bargainBalloonsQuery: 'chrome mauve latex' },
  { name: 'Deep Black', hex: '#1A1A1A', type: 'matte', bargainBalloonsQuery: 'black latex' },
  { name: 'Clean White', hex: '#FFFFFF', type: 'matte', bargainBalloonsQuery: 'white latex' },
  { name: 'Soft Sand', hex: '#F5E6D3', type: 'matte', bargainBalloonsQuery: 'sand latex' },
  { name: 'Dusty Rose', hex: '#DCAE96', type: 'matte', bargainBalloonsQuery: 'dusty rose latex' },
  { name: 'Eucalyptus', hex: '#445B4D', type: 'matte', bargainBalloonsQuery: 'eucalyptus latex' },
  { name: 'Slate Blue', hex: '#708090', type: 'matte', bargainBalloonsQuery: 'slate blue latex' },
  { name: 'Terracotta', hex: '#E2725B', type: 'matte', bargainBalloonsQuery: 'terracotta latex' },
  { name: 'Pastel Lavender', hex: '#E6E6FA', type: 'pastel', bargainBalloonsQuery: 'lavender latex' },
  { name: 'Pastel Blue', hex: '#B0C4DE', type: 'pastel', bargainBalloonsQuery: 'pastel blue latex' },
  { name: 'Lemonade', hex: '#FFFACD', type: 'pastel', bargainBalloonsQuery: 'pale yellow latex' },
];

const BACKDROP_COLORS = [
  { name: 'Brand Pink', hex: '#fce7f3' },
  { name: 'Midnight Black', hex: '#111111' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Soft Cream', hex: '#FDF5E6' },
  { name: 'Emerald Night', hex: '#064e3b' },
  { name: 'Champagne', hex: '#F7E7CE' },
];

// --- COMPONENTS ---

const Header = ({ activeSection, onNavigate }: { activeSection: Section, onNavigate: (s: Section) => void }) => {
  const logoUrl = "https://github.com/aksharasureshh/balloons/blob/main/logo.png?raw=true";
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100">
      <div className="container mx-auto px-6 py-1 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="group transition-all duration-300 hover:scale-105 py-2">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm border border-stone-50">
            <img src={logoUrl} alt="BBA Logo" className="w-full h-full object-contain p-1" onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'flex items-center justify-center h-full w-full bg-[#fce7f3] text-[10px] font-black';
              fallback.innerText = 'BBA';
              e.currentTarget.parentElement?.appendChild(fallback);
            }} />
          </div>
        </button>
        <nav className="hidden md:flex items-center gap-10">
          {['home', 'gallery', 'builder', 'faq'].map((id) => (
            <button key={id} onClick={() => onNavigate(id as Section)} className={`text-[11px] font-black uppercase tracking-[0.2em] relative py-1 ${activeSection === id ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}>
              {id === 'builder' ? 'Arch Builder' : id.charAt(0).toUpperCase() + id.slice(1)}
              {activeSection === id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#fce7f3]"></span>}
            </button>
          ))}
          <a href="https://instagram.com/balloonsbyaks" target="_blank" rel="noopener noreferrer" className="px-7 py-3 bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-stone-800 transition-all shadow-lg">Connect</a>
        </nav>
      </div>
    </header>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (s: Section) => void }) => {
  const logoUrl = "https://github.com/aksharasureshh/balloons/blob/main/logo.png?raw=true";
  return (
    <footer className="bg-stone-900 text-stone-300 py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 border-b border-stone-800 pb-16 mb-12">
          <div>
            <div className="h-24 w-24 rounded-full overflow-hidden bg-white flex items-center justify-center p-2 mb-6 border-4 border-stone-800">
               <img src={logoUrl} alt="BalloonsByAks" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-white font-serif text-2xl mb-4">BalloonsByAks</h2>
            <p className="text-sm text-stone-500 font-light">Crafting luxury installations and bespoke event decor across the GTA.</p>
          </div>
          <div>
            <h3 className="text-white font-black text-[10px] tracking-[0.3em] uppercase mb-8">Navigation</h3>
            <ul className="space-y-4 text-sm font-light">
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-[#fce7f3]">Portfolio</button></li>
              <li><button onClick={() => onNavigate('builder')} className="hover:text-[#fce7f3]">Arch Studio</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-[#fce7f3]">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-black text-[10px] tracking-[0.3em] uppercase mb-8">Social</h3>
            <a href="https://instagram.com/balloonsbyaks" target="_blank" className="block text-sm hover:text-[#fce7f3]">@balloonsbyaks</a>
          </div>
        </div>
        <p className="text-[10px] text-stone-600 uppercase tracking-widest">© {new Date().getFullYear()} BalloonsByAks.</p>
      </div>
    </footer>
  );
};

const Home = ({ onNavigate }: { onNavigate: (s: Section) => void }) => (
  <div className="animate-in fade-in duration-700">
    <section className="relative pt-16 pb-32 overflow-hidden bg-white">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 text-stone-900 leading-tight">
            Because Every Celebration <span className="italic text-[#fce7f3] brightness-90">Deserves</span> Balloons Done Right.
          </h1>
          <p className="text-lg text-stone-500 mb-10 max-w-lg font-light">Elevate your celebration with balloon installations tailored to your unique vision.</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate('builder')} className="px-8 py-4 bg-stone-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-stone-800 shadow-lg">BUILD YOUR ARCH</button>
            <button onClick={() => onNavigate('gallery')} className="px-8 py-4 bg-white border border-stone-200 text-stone-900 rounded-full font-bold text-xs uppercase tracking-widest">View Gallery</button>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px] aspect-[4/5]">
            <img src="https://github.com/aksharasureshh/balloons/blob/main/hero.JPG?raw=true" alt="Hero" className="w-full h-full object-cover rounded-[2.5rem] shadow-xl" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1530103862676-fa8c913a3d67?q=80&w=1200&auto=format&fit=crop"; }} />
          </div>
        </div>
      </div>
    </section>
  </div>
);

const Gallery = () => {
  const photos = Array.from({ length: 22 }, (_, i) => ({
    id: i + 1,
    img: `https://github.com/aksharasureshh/balloons/blob/main/${i + 1}.JPG?raw=true`
  }));
  return (
    <div className="py-16 bg-stone-50 min-h-screen px-6">
      <div className="container mx-auto">
        <h1 className="text-5xl font-serif mb-12">Portfolio</h1>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.map(p => (
            <div key={p.id} className="rounded-[2rem] overflow-hidden shadow-sm bg-stone-200">
              <img src={p.img} className="w-full h-auto block" loading="lazy" onError={e => e.currentTarget.parentElement?.remove()} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArchBuilder = () => {
  const [backdropColor, setBackdropColor] = useState(BACKDROP_COLORS[0].hex);
  const [selectedBalloonColor, setSelectedBalloonColor] = useState(BALLOON_COLORS[0].hex);
  const [backdropShape, setBackdropShape] = useState<BackdropShape>('arch');
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const builderRef = useRef(null);
  const canvasRef = useRef(null);

  const addCluster = (e) => {
    if (!builderRef.current) return;
    const rect = builderRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (y > 90) return;
    setClusters([...clusters, { id: Math.random().toString(), color: selectedBalloonColor, x, y, rotation: Math.random() * 360, size: 155 }]);
  };

  // Fix: Make style optional by providing a default value and adding proper types
  const BalloonSphere = ({ color, className, style = {} }: { color: string; className: string; style?: React.CSSProperties }) => (
    <div className={`rounded-full absolute ${className} shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.2),inset_4px_4px_10px_rgba(255,255,255,0.4)]`} style={{ backgroundColor: color, ...style }} />
  );

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-6">
      <div className="container mx-auto grid lg:grid-cols-[1fr_400px] gap-12">
        <div ref={builderRef} onClick={addCluster} className="bg-white rounded-[2.5rem] p-12 min-h-[700px] relative shadow-xl border border-stone-200 cursor-crosshair flex items-end justify-center">
          <div className={`w-[70%] h-[80%] rounded-t-[300px] border border-stone-200 shadow-lg`} style={{ backgroundColor: backdropColor }} />
          {clusters.map(c => (
            <div key={c.id} className="absolute pointer-events-none" style={{ left: `${c.x}%`, top: `${c.y}%`, width: '150px', height: '150px', transform: `translate(-50%, -50%) rotate(${c.rotation}deg)` }}>
               <BalloonSphere color={c.color} className="w-full h-full" />
            </div>
          ))}
          <p className="absolute top-8 left-8 text-stone-400 uppercase text-[10px] tracking-widest font-black">Click to place balloon clusters</p>
        </div>
        <div className="space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100">
           <h2 className="text-xl font-serif">Customization</h2>
           <div>
             <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block mb-4">Backdrop Shape</label>
             <select className="w-full p-4 bg-stone-50 rounded-2xl border-2 border-stone-100 text-xs font-bold" onChange={e => setBackdropShape(e.target.value as BackdropShape)}>
               <option value="arch">Classic Arch</option>
               <option value="circle">Circle</option>
               <option value="wall">Full Wall</option>
             </select>
           </div>
           <div>
             <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 block mb-4">Balloon Color</label>
             <div className="grid grid-cols-5 gap-2">
               {BALLOON_COLORS.map(c => (
                 <button key={c.hex} onClick={() => setSelectedBalloonColor(c.hex)} className={`w-8 h-8 rounded-full border-2 ${selectedBalloonColor === c.hex ? 'border-black' : 'border-white'}`} style={{ backgroundColor: c.hex }} />
               ))}
             </div>
           </div>
           <p className="text-[9px] text-stone-400 uppercase tracking-widest text-center mt-10">* Colors will be matched as closely as possible.</p>
           <button onClick={() => alert('Summary copied! Please message us on Instagram.')} className="w-full py-5 bg-stone-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl">REQUEST QUOTE</button>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "How far in advance should I book?", a: "We recommend 1-3 weeks." },
    { q: "Do you cover the GTA?", a: "Yes, we cover all of Toronto and surrounding areas." },
    { q: "Do you do the takedown?", a: "Yes, we offer professional takedown services." },
    { q: "How long do setups take?", a: "Generally 1-2 hours depending on the scale." }
  ];
  return (
    <div className="py-24 bg-stone-50 min-h-screen px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-serif mb-12">FAQ</h1>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
              <h3 className="text-lg font-serif mb-4">{f.q}</h3>
              <p className="text-sm text-stone-500 font-light">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const renderContent = () => {
    switch (activeSection) {
      case 'home': return <Home onNavigate={setActiveSection} />;
      case 'gallery': return <Gallery />;
      case 'builder': return <ArchBuilder />;
      case 'faq': return <FAQ />;
      default: return <Home onNavigate={setActiveSection} />;
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onNavigate={setActiveSection} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
