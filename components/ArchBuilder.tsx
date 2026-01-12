
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BALLOON_COLORS, BACKDROP_COLORS } from '../constants';
import { Cluster, BackdropShape, Inquiry } from '../types';

export const BalloonSphere = ({ color, className, style }: { color: string; className: string; style?: React.CSSProperties }) => {
  // Enhanced metallic chrome effect with high-contrast specular highlights
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
  /**
   * Refined Composition (Organic & Metallic):
   * 1. 18" Balloon: Positioned at the back (z-0)
   * 2. 12" Balloons: 3x middle layer (z-10)
   * 3. 9" Balloons: 2x middle layer (z-10)
   * 4. 5" Clusters: 2 groups of 3 balloons each, positioned on top (z-20)
   */
  
  return (
    <div className="relative w-full h-full pointer-events-none">
      {/* --- LAYER 1: BACK (The 18" Heart) --- */}
      <BalloonSphere color={cluster.color} className="w-[68%] h-[68%] top-[16%] left-[16%] z-0" />

      {/* --- LAYER 2: MIDDLE (3x 12" and 2x 9") --- */}
      {/* 3x 12" */}
      <BalloonSphere color={cluster.color} className="w-[52%] h-[52%] top-[0%] left-[24%] z-10" />
      <BalloonSphere color={cluster.color} className="w-[52%] h-[52%] top-[48%] left-[0%] z-10" />
      <BalloonSphere color={cluster.color} className="w-[52%] h-[52%] top-[45%] left-[48%] z-10" />

      {/* 2x 9" */}
      <BalloonSphere color={cluster.color} className="w-[40%] h-[40%] top-[12%] left-[4%] z-10" />
      <BalloonSphere color={cluster.color} className="w-[40%] h-[40%] top-[60%] left-[32%] z-10" />

      {/* --- LAYER 3: TOP (2 clusters of 3x 5") --- */}
      {/* Small Cluster A */}
      <div className="absolute top-[20%] left-[30%] w-[35%] h-[35%] z-20">
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[0%] left-[20%] z-30" />
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[25%] left-[0%] z-30" />
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[28%] left-[30%] z-30" />
      </div>

      {/* Small Cluster B */}
      <div className="absolute bottom-[20%] right-[25%] w-[32%] h-[32%] z-20">
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[0%] left-[25%] z-30" />
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[20%] left-[0%] z-30" />
         <BalloonSphere color={cluster.color} className="w-[45%] h-[45%] top-[22%] left-[35%] z-30" />
      </div>
    </div>
  );
};

// Removed vinylText display functionality as requested.
export const ArchBackdropRenderer = ({ shape, color }: { shape: BackdropShape, color: string }) => {
  const style = { backgroundColor: color };
  const shadowStyle = "shadow-[inset_0_-10px_20px_rgba(0,0,0,0.05),inset_0_5px_10px_rgba(255,255,255,0.2),5px_15px_30px_rgba(0,0,0,0.1)] transition-all duration-500 border border-stone-200/20";
  const containerClasses = "relative w-full h-[85%] flex items-end justify-center transition-all duration-700 mb-8";

  switch (shape) {
    case 'arch':
      return (
        <div className={containerClasses}>
          <div className={`relative w-[70%] h-full rounded-t-[300px] ${shadowStyle} flex items-center justify-center`} style={style} />
        </div>
      );
    case 'double-arch':
      return (
        <div className={containerClasses}>
          <div className={`w-[55%] h-full rounded-t-[200px] ${shadowStyle} -mr-24 relative z-0 origin-bottom`} style={style} />
          <div className={`w-[55%] h-[85%] rounded-t-[200px] ${shadowStyle} relative z-10 shadow-[-15px_0_25px_rgba(0,0,0,0.25)] flex items-center justify-center`} style={style} />
        </div>
      );
    case 'three-piece-arch':
      return (
        <div className={`${containerClasses} gap-4 px-4`}>
          <div className={`w-[26%] h-[75%] rounded-tl-[240px] ${shadowStyle} relative z-0`} style={style} />
          <div className={`relative w-[45%] h-full rounded-t-[300px] ${shadowStyle} relative z-0 flex items-center justify-center`} style={style} />
          <div className={`w-[26%] h-[75%] rounded-tr-[240px] ${shadowStyle} relative z-0`} style={style} />
        </div>
      );
    case 'square':
      return (
        <div className={containerClasses}>
           <div className="relative w-[80%] h-[85%] border-t-[30px] border-l-[30px] border-r-[30px] rounded-t-lg transition-all duration-500 shadow-md flex items-center justify-center" 
                style={{ borderColor: color }}>
             <div className="w-full h-full bg-stone-50/5 flex items-center justify-center relative" />
           </div>
        </div>
      );
    case 'circle':
      return (
        <div className={containerClasses}>
          <div className="relative w-[85%] aspect-square flex items-center justify-center">
            <div 
              className={`relative w-full h-full rounded-full transition-all duration-500 flex items-center justify-center`} 
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
          <div className={`relative w-full h-full ${shadowStyle} flex items-center justify-center`} style={style} />
        </div>
      );
    default:
      return null;
  }
};

const ArchBuilder: React.FC = () => {
  const [backdropColor, setBackdropColor] = useState(BACKDROP_COLORS[0].hex);
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
  const [showSuccess, setShowSuccess] = useState(false);
  
  const builderRef = useRef<HTMLDivElement>(null);
  const backdropColorInputRef = useRef<HTMLInputElement>(null);
  const clusterColorInputRef = useRef<HTMLInputElement>(null);

  const handleAddCluster = () => {
    const newCluster: Cluster = {
      id: Math.random().toString(36).substr(2, 9),
      color: selectedBalloonColor,
      x: 50,
      y: 40,
      rotation: Math.random() * 360,
      size: 190, 
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

    const overTrash = y > 82 && x > 35 && x < 65;
    setIsOverTrash(overTrash);

    const constrainedX = Math.max(2, Math.min(98, x));
    const constrainedY = Math.max(2, Math.min(98, y));

    setClusters(prev => prev.map(c => 
      c.id === draggingId ? { ...c, x: constrainedX, y: constrainedY } : c
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
    if (!customerName || !customerEmail || !customerPhone || !setupLocation) {
      alert("Please fill in all contact information, including setup location.");
      return;
    }
    
    setIsSubmitting(true);
    
    const inquiry: Inquiry = {
      id: Math.random().toString(36).substr(2, 9),
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      location: setupLocation,
      date: new Date().toLocaleString(),
      backdropShape,
      backdropColor,
      clusters,
      vinylText,
      otherSpecs
    };

    const existingInquiries = JSON.parse(localStorage.getItem('balloonsbyaks_inquiries') || '[]');
    localStorage.setItem('balloonsbyaks_inquiries', JSON.stringify([inquiry, ...existingInquiries]));

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setClusters([]);
      setVinylText('');
      setOtherSpecs('');
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setSetupLocation('');
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
                {/* Vinyl text visualization removed as requested */}
                <ArchBackdropRenderer shape={backdropShape} color={backdropColor} />

                {clusters.map((cluster) => (
                  <div
                    key={cluster.id}
                    onMouseDown={(e) => handleDragStart(cluster.id, e)}
                    className={`absolute group/cluster cursor-move transition-transform ${draggingId === cluster.id ? 'z-50 scale-105 opacity-80' : 'z-30 hover:z-40'}`}
                    style={{ 
                      left: `${cluster.x}%`, 
                      top: `${cluster.y}%`, 
                      width: `${cluster.size}px`,
                      height: `${cluster.size}px`,
                      transform: `translate(-50%, -50%) rotate(${cluster.rotation}deg)`,
                    }}
                  >
                    <DetailedCluster cluster={cluster} />
                  </div>
                ))}

                <div 
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-dashed transition-all flex items-center justify-center z-40 ${
                    draggingId 
                      ? (isOverTrash ? 'border-rose-500 bg-rose-50 scale-125 opacity-100 shadow-lg' : 'border-stone-200 opacity-60 bg-white/50') 
                      : 'opacity-0 scale-75'
                  }`}
                >
                  <div className={`flex flex-col items-center gap-1 transition-colors ${isOverTrash ? 'text-rose-600' : 'text-stone-300'}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Drop to Delete</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-stone-200">
               <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-400 mb-6">Additional Customization</h3>
               <div className="grid md:grid-cols-2 gap-8">
                 <div>
                   <label className="block text-xs font-black uppercase tracking-widest text-stone-900 mb-3">Other Specifications</label>
                   <textarea 
                     value={otherSpecs}
                     onChange={(e) => setOtherSpecs(e.target.value)}
                     placeholder="e.g., Star balloons, bows, glitter balloons, floral accents..."
                     className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl p-4 text-sm focus:border-stone-900 focus:outline-none transition-all h-32 resize-none"
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-black uppercase tracking-widest text-stone-900 mb-3">Customized Vinyl</label>
                   <input 
                     type="text"
                     value={vinylText}
                     onChange={(e) => setVinylText(e.target.value)}
                     placeholder="What text would you like? (e.g. 'Happy Birthday Chloe')"
                     className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl p-4 text-sm focus:border-stone-900 focus:outline-none transition-all mb-4"
                   />
                   <div className="p-4 bg-stone-50 rounded-xl text-[10px] text-stone-400 font-medium leading-relaxed">
                     * vinyl text is collected for your booking order.
                   </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl space-y-10 sticky top-24 border border-stone-100">
            <div>
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-400 mb-6 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-stone-200" />
                Step 1: Choose Frame
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {shapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setBackdropShape(shape.id)}
                    className={`px-4 py-4 rounded-2xl border-2 text-[10px] font-black transition-all text-center uppercase tracking-widest ${
                      backdropShape === shape.id 
                        ? 'border-stone-900 bg-stone-900 text-white shadow-lg transform translate-y-[-2px]' 
                        : 'border-stone-50 bg-stone-50 text-stone-400 hover:border-stone-200 hover:text-stone-600'
                    }`}
                  >
                    {shape.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-stone-50 rounded-[2rem] p-6 border border-stone-100">
              <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-400">Step 2: Colors & Clusters</h3>
                
                <button 
                  onClick={handleAddCluster}
                  className="w-full py-4 bg-[#fce7f3] text-stone-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-95 transition-all shadow-sm mb-4"
                >
                  + Add Balloon Cluster
                </button>

                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="w-full text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">Backdrop Color Swatches</span>
                  {BACKDROP_COLORS.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setBackdropColor(color.hex)}
                      className={`w-9 h-9 rounded-full border-4 transition-all ${
                        backdropColor.toLowerCase() === color.hex.toLowerCase() ? 'border-stone-900 scale-110 shadow-md' : 'border-white'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center gap-3 pt-2 mt-2 border-t border-stone-200">
                  <div className="flex-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-1">Custom Backdrop Hex</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={backdropColor}
                        onChange={(e) => setBackdropColor(e.target.value)}
                        className="bg-white border border-stone-200 rounded-lg px-2 py-1 text-[10px] font-mono w-full focus:border-stone-900 outline-none"
                        placeholder="#HEXCODE"
                      />
                      <button 
                        onClick={() => backdropColorInputRef.current?.click()}
                        className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs hover:bg-stone-800 transition-all"
                      >
                        🎨
                      </button>
                      <input 
                        type="color" 
                        ref={backdropColorInputRef}
                        className="absolute opacity-0 pointer-events-none"
                        value={backdropColor.startsWith('#') ? backdropColor : '#ffffff'}
                        onChange={(e) => setBackdropColor(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="w-full text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">Cluster Color Swatches</span>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {BALLOON_COLORS.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedBalloonColor(color.hex)}
                      className={`w-8 h-8 rounded-full border-4 transition-all relative ${
                        selectedBalloonColor.toLowerCase() === color.hex.toLowerCase() ? 'border-stone-900 scale-110 shadow-md' : 'border-white'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2 mt-2 border-t border-stone-200">
                  <div className="flex-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-stone-400 block mb-1">Custom Cluster Hex</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={selectedBalloonColor}
                        onChange={(e) => setSelectedBalloonColor(e.target.value)}
                        className="bg-white border border-stone-200 rounded-lg px-2 py-1 text-[10px] font-mono w-full focus:border-stone-900 outline-none"
                        placeholder="#HEXCODE"
                      />
                      <button 
                        onClick={() => clusterColorInputRef.current?.click()}
                        className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs hover:bg-stone-800 transition-all"
                      >
                        🎨
                      </button>
                      <input 
                        type="color" 
                        ref={clusterColorInputRef}
                        className="absolute opacity-0 pointer-events-none"
                        value={selectedBalloonColor.startsWith('#') ? selectedBalloonColor : '#ffffff'}
                        onChange={(e) => setSelectedBalloonColor(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 rounded-[2rem] p-6 border border-stone-100 space-y-4">
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-400">Contact & Location</h3>
              <input 
                type="text" placeholder="Full Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-stone-900 outline-none"
              />
              <input 
                type="email" placeholder="Email Address" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-stone-900 outline-none"
              />
              <input 
                type="tel" placeholder="Phone Number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-stone-900 outline-none"
              />
              <input 
                type="text" placeholder="Setup Location (Address or Nearest Intersection)" value={setupLocation} onChange={(e) => setSetupLocation(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-stone-900 outline-none"
              />
            </div>
            
            <div className="pt-2">
              <button 
                onClick={handleRequestQuote}
                disabled={isSubmitting || clusters.length === 0}
                className={`w-full py-5 bg-stone-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-stone-800 transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.96] disabled:opacity-50`}
              >
                {isSubmitting ? 'Sending Request...' : 'SEND INQUIRY FOR QUOTE'}
              </button>
              
              {showSuccess && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in zoom-in duration-300">
                  <p className="text-[10px] text-emerald-900 font-bold uppercase tracking-tight text-center">
                    ✨ Inquiry Sent Successfully! We'll reach out soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchBuilder;
