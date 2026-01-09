
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BALLOON_COLORS, BACKDROP_COLORS } from '../constants';
import { Cluster, BackdropShape } from '../types';

const ArchBuilder: React.FC = () => {
  const [backdropColor, setBackdropColor] = useState(BACKDROP_COLORS[0].hex);
  const [selectedBalloonColor, setSelectedBalloonColor] = useState(BALLOON_COLORS[0].hex);
  const [backdropShape, setBackdropShape] = useState<BackdropShape>('arch');
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);
  
  const builderRef = useRef<HTMLDivElement>(null);
  const backdropInputRef = useRef<HTMLInputElement>(null);
  const balloonInputRef = useRef<HTMLInputElement>(null);

  const addCluster = useCallback((e: React.MouseEvent) => {
    // Prevent adding when dragging or clicking UI controls
    if (draggingId) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input')) return;
    
    if (!builderRef.current) return;
    
    const rect = builderRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Prevent adding clusters in the extreme bottom area
    if (y > 92) return;

    const newCluster: Cluster = {
      id: Math.random().toString(36).substr(2, 9),
      color: selectedBalloonColor,
      x,
      y,
      rotation: Math.random() * 360,
      size: 155, // Increased from 110 for better visibility as requested
    };

    setClusters((prev) => [...prev, newCluster]);
  }, [selectedBalloonColor, draggingId]);

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

    // Check if over trash zone (bottom 15% of workspace, middle area)
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

  const renderBackdrop = () => {
    const style = { backgroundColor: backdropColor };
    const shadowStyle = "shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1),inset_0_5px_10px_rgba(255,255,255,0.2),5px_5px_15px_rgba(0,0,0,0.15)] transition-all duration-500 border border-stone-200/20";
    
    const containerClasses = "relative w-full h-[85%] flex items-end justify-center transition-all duration-700 mb-8";

    switch (backdropShape) {
      case 'arch':
        return (
          <div className={containerClasses}>
            <div className={`w-[70%] h-full rounded-t-[300px] ${shadowStyle}`} style={style} />
          </div>
        );
      case 'double-chiara':
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
                  style={{ borderColor: backdropColor }}>
               <div className="w-full h-full bg-stone-50/5" />
             </div>
          </div>
        );
      case 'ring':
        return (
          <div className={containerClasses}>
            <div className="w-[85%] aspect-square rounded-full border-[25px] shadow-lg relative flex items-center justify-center transition-all duration-500" 
                 style={{ borderColor: backdropColor, borderStyle: 'solid' }}>
               <div className="absolute inset-2 rounded-full border border-black/5" />
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
        return (
          <div className={containerClasses}>
            <div className={`w-[70%] h-full rounded-t-[300px] ${shadowStyle}`} style={style} />
          </div>
        );
    }
  };

  const shapes: { id: BackdropShape; label: string }[] = [
    { id: 'arch', label: 'Classic Arch' },
    { id: 'double-chiara', label: 'Double Chiara' },
    { id: 'three-piece-arch', label: '3 Piece Arch' },
    { id: 'ring', label: 'Balloon Ring' },
    { id: 'square', label: 'Square Backdrop' },
    { id: 'wall', label: 'Full Wall' },
  ];

  const BalloonSphere = ({ color, className, style }: { color: string; className: string; style?: React.CSSProperties }) => (
    <div 
      className={`rounded-full absolute ${className} shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.2),inset_4px_4px_10px_rgba(255,255,255,0.4),0_8px_15px_rgba(0,0,0,0.15)] transition-all`}
      style={{ 
        backgroundColor: color,
        backgroundImage: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
        ...style
      }}
    />
  );

  return (
    <div className="min-h-[90vh] bg-stone-100 py-12 px-6 animate-in fade-in duration-500">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1fr_450px] gap-12 items-start">
          
          {/* Main Visualizer Area */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[850px] border border-stone-200">
              <div className="absolute top-12 left-12 z-20">
                <h1 className="text-4xl font-serif text-stone-800 mb-1">Interactive Studio</h1>
                <p className="text-stone-400 text-sm font-medium tracking-wide">Place clusters • Drag to delete</p>
              </div>

              {/* Interaction Area */}
              <div 
                ref={builderRef}
                onClick={addCluster}
                className="relative w-full max-w-2xl aspect-[4/5] flex items-end justify-center cursor-crosshair transition-all duration-700 select-none pb-20"
              >
                {/* Visual Backdrop Rendering */}
                {renderBackdrop()}

                {/* Balloon Clusters */}
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
                    <div className="relative w-full h-full pointer-events-none">
                      <BalloonSphere color={cluster.color} className="w-[75%] h-[75%] top-[12.5%] left-[12.5%] z-10" />
                      <BalloonSphere color={cluster.color} className="w-[50%] h-[50%] top-[-5%] left-[30%] z-[5]" />
                      <BalloonSphere color={cluster.color} className="w-[50%] h-[50%] bottom-[-5%] left-[5%] z-[5]" />
                      <BalloonSphere color={cluster.color} className="w-[50%] h-[50%] bottom-[10%] right-[-5%] z-[5]" />
                      <BalloonSphere color={cluster.color} className="w-[35%] h-[35%] top-[40%] right-[55%] z-[15]" />
                      <BalloonSphere color={cluster.color} className="w-[35%] h-[35%] top-[30%] right-[0%] z-[15]" />

                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="relative w-[45%] h-[45%]">
                          <BalloonSphere color={cluster.color} className="w-[65%] h-[65%] top-[-8%] left-[17.5%]" />
                          <BalloonSphere color={cluster.color} className="w-[65%] h-[65%] bottom-[-8%] left-[17.5%]" />
                          <BalloonSphere color={cluster.color} className="w-[65%] h-[65%] left-[-8%] top-[17.5%]" />
                          <BalloonSphere color={cluster.color} className="w-[65%] h-[65%] right-[-8%] top-[17.5%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Drag to Delete Zone (The Bin) */}
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
            
            <div className="flex justify-between items-center px-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                   {clusters.slice(0, 5).map(c => (
                     <div key={c.id} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: c.color }} />
                   ))}
                </div>
                <span className="text-stone-700 text-sm font-black tracking-widest uppercase">{clusters.length} {clusters.length === 1 ? 'Cluster' : 'Clusters'} placed</span>
              </div>
            </div>
          </div>

          {/* Side Control Panel */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl space-y-12 sticky top-24 border border-stone-100">
            
            {/* 1. Shape Selection */}
            <div>
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-400 mb-8 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-stone-200" />
                Step 1: Choose Base
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {shapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setBackdropShape(shape.id)}
                    className={`px-4 py-5 rounded-2xl border-2 text-[10px] font-black transition-all text-center uppercase tracking-widest ${
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

            {/* 2. Backdrop Color */}
            <div className="bg-stone-50 rounded-[2rem] p-8 border border-stone-100">
              <div className="flex flex-col gap-6 mb-8">
                <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-400">Step 2: Base Color</h3>
                <div className="flex flex-wrap gap-3">
                  {BACKDROP_COLORS.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setBackdropColor(color.hex)}
                      className={`w-11 h-11 rounded-full border-4 transition-all ${
                        backdropColor.toLowerCase() === color.hex.toLowerCase() ? 'border-stone-900 scale-125 shadow-xl ring-4 ring-stone-200' : 'border-white'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Enhanced High-Visibility Color Picker Button */}
              <div className="relative">
                <button 
                  onClick={() => backdropInputRef.current?.click()}
                  className="w-full flex items-center justify-between bg-white px-6 py-5 rounded-3xl border-2 border-stone-200 hover:border-stone-900 group transition-all shadow-sm active:scale-[0.98]"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 group-hover:text-stone-900 transition-colors">Custom Shade</span>
                    <span className="text-xs font-black font-mono text-stone-900 uppercase tracking-[0.2em]">{backdropColor}</span>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-2xl border-2 border-stone-100 shadow-inner transform group-hover:scale-110 transition-transform flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: backdropColor }}
                  >
                    <svg className={`w-5 h-5 ${parseInt(backdropColor.replace('#',''), 16) > 0xffffff/1.5 ? 'text-stone-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </button>
                <input 
                  ref={backdropInputRef}
                  type="color" 
                  value={backdropColor} 
                  onChange={(e) => setBackdropColor(e.target.value)}
                  className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
                />
              </div>
            </div>

            {/* 3. Balloon Color */}
            <div className="bg-stone-50 rounded-[2rem] p-8 border border-stone-100">
              <div className="flex flex-col gap-6 mb-8">
                <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-400">Step 3: Balloon Hue</h3>
                <div className="grid grid-cols-5 gap-4">
                  {BALLOON_COLORS.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedBalloonColor(color.hex)}
                      className={`w-10 h-10 rounded-full border-4 transition-all relative ${
                        selectedBalloonColor.toLowerCase() === color.hex.toLowerCase() ? 'border-stone-900 scale-125 shadow-xl ring-4 ring-stone-200' : 'border-white'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {color.type === 'chrome' && (
                         <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced High-Visibility Color Picker Button */}
              <div className="relative">
                <button 
                  onClick={() => balloonInputRef.current?.click()}
                  className="w-full flex items-center justify-between bg-white px-6 py-5 rounded-3xl border-2 border-stone-200 hover:border-stone-900 group transition-all shadow-sm active:scale-[0.98]"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 group-hover:text-stone-900 transition-colors">Custom Balloon</span>
                    <span className="text-xs font-black font-mono text-stone-900 uppercase tracking-[0.2em]">{selectedBalloonColor}</span>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-2xl border-2 border-stone-100 shadow-inner transform group-hover:scale-110 transition-transform flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: selectedBalloonColor }}
                  >
                    <svg className={`w-5 h-5 ${parseInt(selectedBalloonColor.replace('#',''), 16) > 0xffffff/1.5 ? 'text-stone-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </button>
                <input 
                  ref={balloonInputRef}
                  type="color" 
                  value={selectedBalloonColor} 
                  onChange={(e) => setSelectedBalloonColor(e.target.value)}
                  className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
                />
              </div>
            </div>

            {/* Final Actions */}
            <div className="pt-4 space-y-4">
              <button 
                onClick={() => window.print()}
                className="w-full py-6 bg-stone-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-stone-800 transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.96]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export Mockup
              </button>
              <a 
                href="https://instagram.com/balloonsbyaks"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-6 border-[3px] border-stone-900 text-stone-900 rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-4 active:scale-[0.96]"
              >
                Inquire via DM
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArchBuilder;
