
import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { ArchBackdropRenderer, DetailedCluster } from './ArchBuilder';

const AdminPortal: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const savedInquiries = JSON.parse(localStorage.getItem('balloonsbyaks_inquiries') || '[]');
    setInquiries(savedInquiries);
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all inquiry history? This cannot be undone.")) {
      localStorage.removeItem('balloonsbyaks_inquiries');
      setInquiries([]);
    }
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(iq => iq.id !== id);
    localStorage.setItem('balloonsbyaks_inquiries', JSON.stringify(updated));
    setInquiries(updated);
  };

  return (
    <div className="py-24 bg-stone-50 min-h-screen animate-in fade-in duration-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-serif mb-4 text-stone-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-stone-500 text-lg font-light leading-relaxed">
              Review incoming quote requests and installation designs.
            </p>
            <div className="w-20 h-1 bg-[#fce7f3] mt-6"></div>
          </div>
          <button 
            onClick={clearHistory}
            className="px-6 py-3 border border-stone-300 rounded-xl text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-rose-500 hover:border-rose-200 transition-all"
          >
            Clear All History
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-24 text-center border border-stone-100 shadow-sm">
            <span className="text-4xl mb-6 block">✨</span>
            <h2 className="text-2xl font-serif text-stone-300">No inquiries yet</h2>
            <p className="text-stone-400 mt-2 font-light">New designs will appear here as customers submit them.</p>
          </div>
        ) : (
          <div className="grid gap-12">
            {inquiries.map((iq) => (
              <div key={iq.id} className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-stone-100 flex flex-col lg:grid lg:grid-cols-[1fr_400px]">
                <div className="p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[9px] font-black uppercase rounded-full">New Request</span>
                    <span className="text-stone-300 text-[10px] font-bold uppercase tracking-widest">{iq.date}</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-10 mb-10">
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">Customer Info</h3>
                      <p className="text-2xl font-serif text-stone-900 mb-2">{iq.name}</p>
                      <div className="space-y-1">
                        <p className="text-sm text-stone-500 flex items-center gap-2">✉️ {iq.email}</p>
                        <p className="text-sm text-stone-500 flex items-center gap-2">📞 {iq.phone}</p>
                        <p className="text-sm text-stone-800 flex items-center gap-2 font-medium">📍 {iq.location}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">Design Specs</h3>
                      <ul className="text-sm space-y-2 text-stone-700 font-medium">
                        <li>Frame: <span className="uppercase text-stone-400">{iq.backdropShape}</span></li>
                        <li>Clusters: <span className="uppercase text-stone-400">{iq.clusters.length} units</span></li>
                        <li>Vinyl: <span className="text-stone-400">{iq.vinylText || 'None'}</span></li>
                      </ul>
                    </div>
                  </div>

                  {iq.otherSpecs && (
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mb-8">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Other Specifications</h4>
                      <p className="text-sm text-stone-600 italic">"{iq.otherSpecs}"</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <a 
                      href={`mailto:${iq.email}?subject=Quote for your BalloonsByAks Design&body=Hi ${iq.name}, I loved your design!`} 
                      className="px-8 py-4 bg-stone-900 text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center gap-2 shadow-lg"
                    >
                      Send Email Quote
                    </a>
                    <button 
                      onClick={() => deleteInquiry(iq.id)}
                      className="px-8 py-4 bg-stone-50 text-stone-400 rounded-full font-bold text-[10px] uppercase tracking-widest hover:text-rose-500 transition-all"
                    >
                      Archive
                    </button>
                  </div>
                </div>

                <div className="bg-stone-50 p-10 flex items-center justify-center relative min-h-[500px] border-l border-stone-100">
                  <div className="absolute top-8 left-8 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Exact Design Mockup</div>
                  <div className="relative w-full aspect-[4/5] flex items-end justify-center transform scale-75">
                    {/* Vinyl text display logic removed from renderer usage */}
                    <ArchBackdropRenderer shape={iq.backdropShape} color={iq.backdropColor} />
                    {iq.clusters.map((cluster) => (
                      <div
                        key={cluster.id}
                        className="absolute"
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
