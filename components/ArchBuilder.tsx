
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BALLOON_COLORS, BACKDROP_COLORS } from '../constants';
import { Cluster, BackdropShape, Inquiry } from '../types';

export const BalloonSphere = ({ color, className, style }: { color: string; className: string; style?: React.CSSProperties }) => {
  return (
    <div 
      className={`rounded-full absolute ${className} shadow-[inset_-6px_-6px_15px_rgba(0,0,0,0.35),inset_6px_6px_15px_rgba(255,255,255,0.5),0_12px_24px_rgba(0,0,0,0.2)] transition-all`}
      style={{ 
        backgroundColor: color,
        backgroundImage: `
          radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 8%, rgba(255,255,255,0) 40%),
          radial-gradient(circle at 75% 75%, rgba(0,0,0,0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 80%)
        `,
        ...style
      }}
    />
  );
};

export const DetailedCluster = ({ cluster }: { cluster: Cluster }) => {
  return (
    <div className="relative w-full h-full pointer-events-none">
      {/* Main Base Balloons */}
      <BalloonSphere color={cluster.color} className="w-[68%] h-[68%] top-[16%] left-[16%] z-0" />
      <BalloonSphere color={cluster.color} className="w-[52%] h-[52%] top-[0%] left-[24%] z-10" />
      <BalloonSphere color={cluster.color} className="w-[52%] h-[52%] top-[48%] left-[0%] z-10" />
      <BalloonSphere color={cluster.color} className="w-[52%] h-[52%] top-[45%] left-[48%] z-10" />
      <BalloonSphere color={cluster.color} className="w-[40%] h-[40%] top-[12%] left-[4%] z-10" />
      <BalloonSphere color={cluster.color} className="w-[40%] h-[40%] top-[60%] left-[32%] z-10" />
      
      {/* Small 5" Cluster Group 1 */}
      <div className="absolute top-[20%] left-[30%] w-[35%] h-[35%] z-20">
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[0%] left-[20%] z-30" />
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[25%] left-[0%] z-30" />
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[28%] left-[30%] z-30" />
      </div>

      {/* Small 5" Cluster Group 2 */}
      <div className="absolute bottom-[20%] right-[25%] w-[32%] h-[32%] z-20">
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[0%] left-[25%] z-30" />
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[20%] left-[0%] z-30" />
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[22%] left-[35%] z-30" />
      </div>
    </div>
  );
};

export const ArchBackdropRenderer = ({ shape, color }: { shape: BackdropShape, color: string }) => {
  const style = { backgroundColor: color };
  const shadowStyle = "shadow-[inset_0_-10px_20px_rgba(0,0,0,0.05),inset_0_5px_10px_rgba(255,255,255,0.2),5px_15px_30px_rgba(0,0,0,0.1)] transition-all duration-500 border border-stone-200/20";
  const containerClasses = "relative w-full h-[85%] flex items-end justify-center transition-all duration-700 mb-8";

  switch (shape) {
    case 'arch':
      return (
        <div className={containerClasses}>
          <div className={`relative w-[70%] h-full rounded-t-[300px] ${shadowStyle}`} style={style} />
        </div>
      );
    case 'double-arch':
      return (
        <div className={containerClasses}>
          <div className={`w-[55%] h-full rounded-t-[200px] ${shadowStyle} -mr-24 relative z-0 origin-bottom`} style={style} />
          <div className={`w-[55%] h-[85%] rounded-t-[200px] ${shadowStyle} relative z-10 shadow-[-15px_0_25px_rgba(0,0,0,0.25)]`} style={style} />
        </div>
      );
    case 'three-piece-arch':
      return (
        <div className={`${containerClasses} gap-4 px-4`}>
          <div className={`w-[26%] h-[75%] rounded-tl-[240px] ${shadowStyle} relative z-0`} style={style} />
          <div className={`w-[45%] h-full rounded-t-[300px] ${shadowStyle} relative z-0`} style={style} />
          <div className={`w-[26%] h-[75%] rounded-tr-[240px] ${shadowStyle} relative z-0`} style={style} />
        </div>
      );
    case 'square':
      return (
        <div className={containerClasses}>
           <div className="w-[80%] h-[85%] border-t-[30px] border-l-[30px] border-r-[30px] rounded-t-lg transition-all duration-500 shadow-md flex items-end" 
                style={{ borderColor: color }}>
             <div className="w-full h-full bg-stone-50/5" />
           </div>
        </div>
      );
    case 'circle':
      return (
        <div className={containerClasses}>
          <div className="relative w-[85%] aspect-square flex items-center justify-center">
            <div 
              className={`w-full h-full rounded-full transition-all duration-500`} 
              style={{ 
                border: `4px solid ${color}`,
                boxShadow: `0 8px 15px rgba(0,0,0,0.05), inset 0 0 5px rgba(0,0,0,0.02)`
              }} 
            />
          </div>
        </div>
      );
    case 'wall':
      return (
        <div className={containerClasses}>
          <div className={`w-full h-full ${shadowStyle}`} style={style} />
        </div>
      );
    default:
      return null;
  }
};

const ColorSelectionControl = ({ 
  label, 
  currentColor, 
  presets, 
  onColorChange, 
  inputRef 
}: { 
  label: string, 
  currentColor: string, 
  presets: { hex: string }[], 
  onColorChange: (color: string) => void,
  inputRef: React.RefObject<HTMLInputElement>
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black tracking-widest uppercase text-stone-400">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {presets.map((color) => (
          <button
            key={color.hex}
            onClick={() => onColorChange(color.hex)}
            className={`w-9 h-9 rounded-full border-4 transition-all ${
              currentColor.toLowerCase() === color.hex.toLowerCase() ? 'border-stone-900 scale-110 shadow-md' : 'border-white'
            }`}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-sm transition-all hover:border-stone-300">
        <div 
          className="w-10 h-10 rounded-xl cursor-pointer shadow-inner border border-stone-100 flex-shrink-0 relative overflow-hidden group"
          style={{ backgroundColor: currentColor }}
          onClick={() => inputRef.current?.click()}
        >
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-[8px] font-black text-white drop-shadow-md">PICK</span>
          </div>
        </div>
        <div className="flex-grow">
          <label className="block text-[8px] font-black uppercase tracking-widest text-stone-400 mb-0.5">Hex Code</label>
          <div className="flex items-center gap-1">
             <span className="text-stone-300 font-mono text-sm">#</span>
             <input 
              type="text"
              value={currentColor.replace('#', '')}
              onChange={(e) => onColorChange('#' + e.target.value)}
              className="w-full text-sm font-mono font-bold text-stone-900 uppercase bg-transparent outline-none"
              placeholder="FFFFFF"
            />
          </div>
        </div>
        <button 
          onClick={() => inputRef.current?.click()}
          className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl transition-all text-stone-500 active:scale-90"
          title="Open Color Picker"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </button>
        <input 
          type="color" 
          ref={inputRef}
          className="absolute opacity-0 pointer-events-none"
          value={currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : '#ffffff'}
          onChange={(e) => onColorChange(e.target.value)}
        />
      </div>
    </div>
  );
};

const ArchBuilder: React.FC = () => {
  const [backdropColor, setBackdropColor] = useState(BACKDROP_COLORS[2].hex);
  const [selectedBalloonColor, setSelectedBalloonColor] = useState(BALLOON_COLORS[0].hex);
  const [backdropShape, setBackdropShape] = useState<BackdropShape>('arch');
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);
  
  const [otherSpecs, setOtherSpecs] = useState('');
  const [vinylText, setVinylText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [setupLocation, setSetupLocation] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const builderRef = useRef<HTMLDivElement>(null);
  const backdropColorPickerRef = useRef<HTMLInputElement>(null);
  const clusterColorPickerRef = useRef<HTMLInputElement>(null);

  const calculateQuoteTotal = () => {
    let total = 0;
    const basePrices: Record<string, number> = {
      'arch': 250, 'double-arch': 300, 'three-piece-arch': 325,
      'circle': 250, 'square': 275, 'wall': 300
    };
    total += basePrices[backdropShape] || 0;

    const normalizedColor = backdropColor.toUpperCase();
    const isBlackOrWhite = normalizedColor === '#FFFFFF' || normalizedColor === '#111111' || normalizedColor === '#1A1A1A';
    if (!isBlackOrWhite) total += 25;

    const uniqueBalloonColors = Array.from(new Set(clusters.map(c => c.color.toUpperCase())));
    if (uniqueBalloonColors.length > 1) {
      total += (uniqueBalloonColors.length - 1) * 25;
    }

    if (vinylText.trim().length > 0) total += 40;
    return total;
  };

  const isContactInfoFilled = () => {
    return (
      customerName.trim() !== '' && 
      customerEmail.trim() !== '' && 
      customerPhone.trim() !== '' && 
      setupLocation.trim() !== ''
    );
  };

  const handleAddCluster = () => {
    const newCluster: Cluster = {
      id: Math.random().toString(36).substr(2, 9),
      color: selectedBalloonColor,
      x: 50,
      y: 40,
      rotation: Math.random() * 360,
      size: 32, 
    };
    setClusters((prev) => [...prev, newCluster]);
  };

  const handleDragStart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDraggingId(id);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingId || !builderRef.current) return;
    const rect = builderRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    // Area detection for enlarged trash zone
    setIsOverTrash(y > 85 && x > 30 && x < 70);
    setClusters(prev => prev.map(c => 
      c.id === draggingId ? { ...c, x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) } : c
    ));
  }, [draggingId]);

  const handleMouseUp = useCallback(() => {
    if (draggingId && isOverTrash) {
      setClusters(prev => prev.filter(c => c.id !== draggingId));
    }
    setDraggingId(null);
    setIsOverTrash(false);
  }, [draggingId, isOverTrash]);

  useEffect(() => {
    if (draggingId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, handleMouseMove, handleMouseUp]);

  const handleRequestQuote = () => {
    if (!isContactInfoFilled()) {
      alert("Please ensure all fields in Step 3 are filled.");
      return;
    }
    setIsSubmitting(true);
    const inquiry: Inquiry = {
      id: Math.random().toString(36).substr(2, 9),
      name: customerName, email: customerEmail, phone: customerPhone,
      location: setupLocation, date: new Date().toLocaleString(),
      backdropShape, backdropColor, clusters, vinylText, otherSpecs,
      archived: false
    };
    const existing = JSON.parse(localStorage.getItem('balloonsbyaks_inquiries') || '[]');
    localStorage.setItem('balloonsbyaks_inquiries', JSON.stringify([inquiry, ...existing]));
    setTimeout(() => {
      setIsSubmitting(false);
      setIsQuoteModalOpen(false);
      setIsSuccessModalOpen(true);
      setClusters([]); setVinylText(''); setOtherSpecs(''); setCustomerName(''); setCustomerEmail(''); setCustomerPhone(''); setSetupLocation('');
    }, 1500);
  };

  const shapes: { id: BackdropShape; label: string }[] = [
    { id: 'arch', label: 'Classic Arch' },
    { id: 'double-arch', label: 'Double Arch' },
    { id: 'three-piece-arch', label: '3 Piece Arch' },
    { id: 'circle', label: 'Circle Frame' },
    { id: 'square', label: 'Square Backdrop' },
    { id: 'wall', label: 'Full Wall' },
  ];

  return (
    <div className="min-h-[90vh] bg-stone-100 py-12 px-6 animate-in fade-in duration-500">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1fr_450px] gap-12 items-start">
          
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[850px] border border-stone-200">
              <div className="absolute top-12 left-12 z-20">
                <h1 className="text-4xl font-serif text-stone-800 mb-1">Interactive Studio</h1>
                <p className="text-stone-400 text-sm font-medium tracking-wide">Design your Dream Installation</p>
              </div>

              <div 
                ref={builderRef}
                className="relative w-full max-w-2xl aspect-[4/5] flex items-end justify-center transition-all duration-700 select-none pb-20"
              >
                <ArchBackdropRenderer shape={backdropShape} color={backdropColor} />

                {clusters.map((cluster) => (
                  <div
                    key={cluster.id}
                    onMouseDown={(e) => handleDragStart(cluster.id, e)}
                    className={`absolute group/cluster cursor-move transition-transform ${draggingId === cluster.id ? 'z-50 scale-105 opacity-80' : 'z-30 hover:z-40'}`}
                    style={{ 
                      left: `${cluster.x}%`, 
                      top: `${cluster.y}%`, 
                      width: `${cluster.size}%`,
                      aspectRatio: '1/1',
                      transform: `translate(-50%, -50%) rotate(${cluster.rotation}deg)`,
                    }}
                  >
                    <DetailedCluster cluster={cluster} />
                  </div>
                ))}

                {/* Drop to Delete - Enlarged and Restored Label */}
                <div className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full border-2 border-dashed transition-all flex items-center justify-center z-40 ${draggingId ? (isOverTrash ? 'border-rose-500 bg-rose-50 scale-110 opacity-100' : 'border-stone-200 opacity-60 bg-white/50') : 'opacity-0 scale-75 pointer-events-none'}`}>
                  <div className={`flex flex-col items-center gap-1 ${isOverTrash ? 'text-rose-600' : 'text-stone-300'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    <span className="text-[8px] font-black uppercase tracking-widest text-center px-1">Drop to Delete</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-stone-200">
               <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-600 mb-6">Additional Customization</h3>
               <div className="grid md:grid-cols-2 gap-8">
                 <div>
                   <label className="block text-xs font-black uppercase tracking-widest text-stone-900 mb-3">Other Specifications</label>
                   <textarea value={otherSpecs} onChange={(e) => setOtherSpecs(e.target.value)} placeholder="e.g., bows, glitter, floral..." className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl p-4 text-sm focus:border-stone-900 focus:outline-none transition-all h-32 resize-none" />
                   <p className="text-[9px] text-stone-400 mt-2 italic"> These items have various pricing.</p>
                 </div>
                 <div>
                   <label className="block text-xs font-black uppercase tracking-widest text-stone-900 mb-3">Customized Vinyl Request</label>
                   <input type="text" value={vinylText} onChange={(e) => setVinylText(e.target.value)} placeholder="e.g. 'Happy Birthday Chloe'" className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl p-4 text-sm focus:border-stone-900 focus:outline-none transition-all" />
                   <p className="text-[9px] text-stone-400 mt-2 italic"> Sizing and style will be discussed after inquiry.</p>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl space-y-10 sticky top-24 border border-stone-100">
            <div>
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-600 mb-6 flex items-center gap-3"><span className="w-6 h-[2px] bg-stone-200" />Step 1: Choose Frame</h3>
              <div className="grid grid-cols-2 gap-3">
                {shapes.map((shape) => (
                  <button key={shape.id} onClick={() => setBackdropShape(shape.id)} className={`px-4 py-4 rounded-2xl border-2 text-[10px] font-black transition-all text-center uppercase tracking-widest ${backdropShape === shape.id ? 'border-stone-900 bg-stone-900 text-white shadow-lg' : 'border-stone-50 bg-stone-50 text-stone-400 hover:border-stone-200 hover:text-stone-600'}`}>{shape.label}</button>
                ))}
              </div>
            </div>

            <div className="bg-stone-50 rounded-[2rem] p-6 border border-stone-100 space-y-8">
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-600">Step 2: Colors & Clusters</h3>
              <div className="flex flex-col gap-3">
                <button onClick={handleAddCluster} className="w-full py-4 bg-[#fce7f3] text-stone-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-95 transition-all shadow-sm">+ Add Balloon Cluster</button>
              </div>
              <ColorSelectionControl label="Backdrop Color" currentColor={backdropColor} presets={BACKDROP_COLORS} onColorChange={setBackdropColor} inputRef={backdropColorPickerRef} />
              <ColorSelectionControl label="Balloon Cluster Color" currentColor={selectedBalloonColor} presets={BALLOON_COLORS} onColorChange={setSelectedBalloonColor} inputRef={clusterColorPickerRef} />
            </div>

            <div className="bg-stone-50 rounded-[2rem] p-6 border border-stone-100 space-y-4">
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-600">Step 3: Details (Mandatory)</h3>
              <input type="text" required placeholder="Full Name *" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-stone-900 outline-none" />
              <input type="email" required placeholder="Email Address *" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-stone-900 outline-none" />
              <input type="tel" required placeholder="Phone Number *" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-stone-900 outline-none" />
              <input type="text" required placeholder="Setup Location *" value={setupLocation} onChange={(e) => setSetupLocation(e.target.value)} className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-stone-900 outline-none" />
            </div>
            
            <div className="pt-2">
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                disabled={!isContactInfoFilled() || clusters.length === 0}
                className="w-full py-5 bg-stone-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-stone-800 transition-all shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.96]"
              >
                {!isContactInfoFilled() ? 'Fill Details for Quote' : 'View Estimated Quote'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-lg p-12 shadow-2xl border border-stone-100 animate-in zoom-in duration-500 text-center relative">
            <button onClick={() => setIsQuoteModalOpen(false)} className="absolute top-8 right-8 text-stone-300 hover:text-stone-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-300 mb-6 block">Your Custom Design</span>
            <h2 className="text-4xl font-serif text-stone-900 mb-8">Estimated Quote</h2>
            
            <div className="bg-stone-50 rounded-[2.5rem] py-10 mb-10 border border-stone-100">
              <p className="text-6xl font-serif text-stone-900 mb-2">
                <span className="text-2xl align-top mr-1">$</span>{calculateQuoteTotal()}
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Total Calculation</p>
            </div>

            <div className="space-y-4 text-left px-4 mb-10">
              <div className="flex items-start gap-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                <span className="text-xl">📍</span>
                <p className="text-xs text-rose-900 leading-relaxed font-medium italic">
                  Note: There may be a setup and takedown fee depending on the location of the setup.
                </p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-xl">💡</span>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Other specifications listed in your request will have various pricing which we will discuss after your inquiry.
                </p>
              </div>
            </div>

            <button 
              onClick={handleRequestQuote}
              disabled={isSubmitting}
              className="w-full py-5 bg-stone-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-stone-800 transition-all shadow-xl active:scale-[0.96]"
            >
              {isSubmitting ? 'Sending Request...' : 'SUBMIT INQUIRY FOR FINAL QUOTE'}
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-white/80 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in duration-700">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto shadow-inner mb-4">
              <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-4xl font-serif text-stone-900 mb-4">Inquiry Sent Successfully</h2>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto font-medium">
                We'll be in touch within 24-48 hours to further discuss details.
              </p>
            </div>
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="px-10 py-4 bg-stone-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-95 shadow-lg"
            >
              Back to Studio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchBuilder;
