
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
  
  // State for additional customer requirements
  const [otherSpecs, setOtherSpecs] = useState('');
  const [vinylText, setVinylText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  
  const builderRef = useRef<HTMLDivElement>(null);
  const backdropInputRef = useRef<HTMLInputElement>(null);
  const balloonInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeBalloonColorObj = BALLOON_COLORS.find(c => c.hex.toLowerCase() === selectedBalloonColor.toLowerCase());

  const addCluster = useCallback((e: React.MouseEvent) => {
    if (draggingId) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('textarea')) return;
    
    if (!builderRef.current) return;
    
    const rect = builderRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (y > 92) return;

    const newCluster: Cluster = {
      id: Math.random().toString(36).substr(2, 9),
      color: selectedBalloonColor,
      x,
      y,
      rotation: Math.random() * 360,
      size: 155,
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

  const generateAndDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed internal resolution that matches the 4/5 aspect ratio
    const W = 1600;
    const H = 2000;
    canvas.width = W;
    canvas.height = H;

    // Fill background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);

    // Draw Backdrop
    const drawExactBackdrop = () => {
      ctx.fillStyle = backdropColor;
      ctx.strokeStyle = backdropColor;
      
      const centerX = W / 2;
      const bottomY = H * 0.85;
      
      ctx.beginPath();
      switch (backdropShape) {
        case 'arch': {
          const w = W * 0.7;
          const h = H * 0.85;
          ctx.roundRect(centerX - w/2, bottomY - h, w, h, [w/2, w/2, 0, 0]);
          ctx.fill();
          break;
        }
        case 'double-arch': {
          const w = W * 0.55;
          const hMain = H * 0.85;
          const hOffset = hMain * 0.85;
          const overlapOffset = 96 * (W / 672);
          ctx.roundRect(centerX - w + overlapOffset, bottomY - hMain, w, hMain, [w/2, w/2, 0, 0]);
          ctx.fill();
          ctx.beginPath();
          ctx.shadowBlur = 30;
          ctx.shadowColor = 'rgba(0,0,0,0.15)';
          ctx.roundRect(centerX - overlapOffset, bottomY - hOffset, w, hOffset, [w/2, w/2, 0, 0]);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }
        case 'three-piece-arch': {
          const gap = 16 * (W/400);
          const wCenter = W * 0.45;
          const wSide = W * 0.26;
          ctx.roundRect(centerX - wCenter/2 - gap - wSide, bottomY - H*0.63, wSide, H*0.63, [wSide, 0, 0, 0]);
          ctx.roundRect(centerX - wCenter/2, bottomY - H*0.85, wCenter, H*0.85, [wCenter/2, wCenter/2, 0, 0]);
          ctx.roundRect(centerX + wCenter/2 + gap, bottomY - H*0.63, wSide, H*0.63, [0, wSide, 0, 0]);
          ctx.fill();
          break;
        }
        case 'square': {
          const w = W * 0.8;
          const h = H * 0.72;
          ctx.lineWidth = 30 * (W/672);
          ctx.strokeRect(centerX - w/2, bottomY - h, w, h);
          break;
        }
        case 'circle': {
          const radius = (W * 0.85) / 2;
          ctx.lineWidth = 4 * (W/672);
          ctx.beginPath();
          ctx.arc(centerX, H * 0.42, radius, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }
        case 'wall': {
          ctx.fillRect(0, bottomY - H*0.85, W, H*0.85);
          break;
        }
      }
    };
    drawExactBackdrop();

    const drawBalloon = (x: number, y: number, r: number, color: string) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      const grad = ctx.createRadialGradient(x - r*0.3, y - r*0.3, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255,255,255,0.4)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fill();
    };

    clusters.forEach(c => {
      const cx = (c.x / 100) * W;
      const cy = (c.y / 100) * H;
      const size = c.size * (W/672) * 1.2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(c.rotation * Math.PI / 180);
      const b = (pct: number) => (pct / 100) * size;
      drawBalloon(b(30-50), b(-5-50), b(25), c.color);
      drawBalloon(b(5-50), b(95-50), b(25), c.color);
      drawBalloon(b(95-50), b(10-50), b(25), c.color);
      drawBalloon(0, 0, b(37.5), c.color);
      drawBalloon(b(-5-50), b(40-50), b(17.5), c.color);
      drawBalloon(b(100-50), b(30-50), b(17.5), c.color);
      const innerSize = size * 0.45;
      const ib = (pct: number) => (pct / 100) * innerSize;
      ctx.save();
      drawBalloon(0, ib(-8-50), ib(32.5), c.color);
      drawBalloon(0, ib(108-50), ib(32.5), c.color);
      drawBalloon(ib(-8-50), 0, ib(32.5), c.color);
      drawBalloon(ib(108-50), 0, ib(32.5), c.color);
      ctx.restore();
      ctx.restore();
    });

    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'bold 40px serif';
    ctx.textAlign = 'center';
    ctx.fillText('BalloonsByAks Official Mockup', W/2, 100);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#78716c';
    ctx.fillText(`Configuration: ${backdropShape.toUpperCase()} | Vinyl: ${vinylText || 'N/A'}`, W/2, 150);

    const link = document.createElement('a');
    link.download = `BalloonsByAks_Design_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const getInquiryMessage = () => {
    const balloonSummary = clusters.length > 0 
      ? Array.from(new Set(clusters.map(c => {
          const colorObj = BALLOON_COLORS.find(bc => bc.hex.toLowerCase() === c.color.toLowerCase());
          return colorObj ? colorObj.name : c.color;
        }))).join(', ')
      : 'No specific balloon clusters placed';

    return `Hello BalloonsByAks!

I've just designed an installation on your website and would like a quote. 

IMPORTANT: I have attached my custom design mockup (BalloonsByAks_Design.png) to this email!

DESIGN DETAILS:
---------------------------
- Backdrop Shape: ${backdropShape.replace('-', ' ').toUpperCase()}
- Backdrop Color: ${backdropColor}
- Balloon Colors Used: ${balloonSummary}
- Custom Vinyl Text: ${vinylText || 'None requested'}
- Other Specifications: ${otherSpecs || 'None specified'}

Please get back to me with a quote and availability!`;
  };

  const handleRequestQuote = () => {
    setIsSubmitting(true);
    generateAndDownloadImage();
    const message = getInquiryMessage();
    const recipient = "akshara.nalliah@gmail.com";
    const subject = encodeURIComponent("New Design Inquiry - BalloonsByAks");
    const body = encodeURIComponent(message);
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setShowCopyMessage(true);
    }, 1000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(getInquiryMessage());
    alert("Summary copied! Please paste it into your email and attach the design image from your downloads.");
  };

  const getBargainBalloonsUrl = () => {
    if (!activeBalloonColorObj) return null;
    const query = activeBalloonColorObj.bargainBalloonsQuery || activeBalloonColorObj.name;
    return `https://bargainballoons.ca/search.asp?keyword=${encodeURIComponent(query)}`;
  };

  const renderBackdrop = () => {
    const style = { backgroundColor: backdropColor };
    const shadowStyle = "shadow-[inset_0_-10px_20px_rgba(0,0,0,0.05),inset_0_5px_10px_rgba(255,255,255,0.2),5px_15px_30px_rgba(0,0,0,0.1)] transition-all duration-500 border border-stone-200/20";
    const containerClasses = "relative w-full h-[85%] flex items-end justify-center transition-all duration-700 mb-8";

    switch (backdropShape) {
      case 'arch':
        return (
          <div className={containerClasses}>
            <div className={`w-[70%] h-full rounded-t-[300px] ${shadowStyle}`} style={style} />
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
                  style={{ borderColor: backdropColor }}>
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
                  border: `4px solid ${backdropColor}`,
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
        return (
          <div className={containerClasses}>
            <div className={`w-[70%] h-full rounded-t-[300px] ${shadowStyle}`} style={style} />
          </div>
        );
    }
  };

  const shapes: { id: BackdropShape; label: string }[] = [
    { id: 'arch', label: 'Classic Arch' },
    { id: 'double-arch', label: 'Double Arch' },
    { id: 'three-piece-arch', label: '3 Piece Arch' },
    { id: 'circle', label: 'Circle Frame' },
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
      <canvas ref={canvasRef} className="hidden" />
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
                onClick={addCluster}
                className="relative w-full max-w-2xl aspect-[4/5] flex items-end justify-center cursor-crosshair transition-all duration-700 select-none pb-20"
              >
                {renderBackdrop()}

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
                   <div className="p-4 bg-[#fce7f3]/30 rounded-xl text-[10px] text-stone-600 font-medium leading-relaxed">
                     * Vinyl customization is perfect for names, ages, or branding on your backdrop.
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
                <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-400">Step 2: Base Color</h3>
                <div className="flex flex-wrap gap-2">
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
              </div>

              <div className="relative">
                <button 
                  onClick={() => backdropInputRef.current?.click()}
                  className="w-full flex items-center justify-between bg-white px-5 py-3 rounded-2xl border-2 border-stone-200 hover:border-stone-900 group transition-all"
                >
                  <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Custom Shade</span>
                  <div className="w-8 h-8 rounded-lg border-2 border-stone-100" style={{ backgroundColor: backdropColor }} />
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

            <div className="bg-stone-50 rounded-[2rem] p-6 border border-stone-100">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-400">Step 3: Balloon Hue</h3>
                  {activeBalloonColorObj && (
                    <a 
                      href={getBargainBalloonsUrl() || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[9px] font-black text-stone-400 hover:text-stone-900 uppercase tracking-widest transition-colors flex items-center gap-1.5"
                    >
                      Matching Latex
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2">
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
              </div>

              <div className="relative">
                <button 
                  onClick={() => balloonInputRef.current?.click()}
                  className="w-full flex items-center justify-between bg-white px-5 py-3 rounded-2xl border-2 border-stone-200 hover:border-stone-900 group transition-all"
                >
                  <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Custom Balloon</span>
                  <div className="w-8 h-8 rounded-lg border-2 border-stone-100" style={{ backgroundColor: selectedBalloonColor }} />
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
            
            <p className="text-[9px] text-stone-400 font-bold tracking-widest uppercase text-center px-4 leading-relaxed">
              * Colors will be matched as closely as possible to your design based on availability.
            </p>

            <div className="pt-2 space-y-3">
              <button 
                onClick={handleRequestQuote}
                disabled={isSubmitting}
                className={`w-full py-5 bg-stone-900 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-stone-800 transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.96] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Finalizing Design...' : 'SEND INQUIRY FOR QUOTE'}
              </button>
              
              <div className={`p-4 bg-emerald-50 border border-emerald-100 rounded-2xl transition-all duration-500 ${showCopyMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                 <p className="text-[10px] text-emerald-900 font-bold uppercase tracking-tight mb-3">
                   Design saved to downloads! 
                 </p>
                 <button 
                  onClick={handleCopyMessage}
                  className="w-full py-3 bg-white border border-emerald-200 text-emerald-800 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-emerald-600 transition-all shadow-sm"
                 >
                   Copy Summary & Instructions
                 </button>
              </div>

              <button 
                onClick={() => window.print()}
                className="w-full py-5 border-[3px] border-stone-900 text-stone-900 rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-4 active:scale-[0.96]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export Mockup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchBuilder;
