
import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { ArchBackdropRenderer, DetailedCluster } from './ArchBuilder';

const AdminPortal: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [view, setView] = useState<'active' | 'archived'>('active');

  const ADMIN_PASSWORD = "aks-admin-2025"; 

  useEffect(() => {
    const savedInquiries = JSON.parse(localStorage.getItem('balloonsbyaks_inquiries') || '[]');
    setInquiries(savedInquiries);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid management passcode.');
    }
  };

  const archiveInquiry = (id: string) => {
    setInquiries(prev => {
      const updated = prev.map(iq => 
        iq.id === id ? { ...iq, archived: true } : iq
      );
      localStorage.setItem('balloonsbyaks_inquiries', JSON.stringify(updated));
      return updated;
    });
  };

  const restoreInquiry = (id: string) => {
    setInquiries(prev => {
      const updated = prev.map(iq => 
        iq.id === id ? { ...iq, archived: false } : iq
      );
      localStorage.setItem('balloonsbyaks_inquiries', JSON.stringify(updated));
      return updated;
    });
  };

  const permanentlyDeleteInquiry = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this inquiry? This action cannot be undone.")) {
      setInquiries(prev => {
        const updated = prev.filter(iq => iq.id !== id);
        localStorage.setItem('balloonsbyaks_inquiries', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const filteredInquiries = inquiries.filter(iq => 
    view === 'active' ? !iq.archived : iq.archived
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl border border-stone-100 text-center">
          <div className="w-20 h-20 bg-[#fce7f3] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-3xl font-serif text-stone-900 mb-2">Management Portal</h1>
          <p className="text-stone-400 text-sm font-light mb-8 italic">BalloonsByAks Internal Access Only</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-center text-lg focus:border-stone-900 focus:bg-white outline-none transition-all"
            />
            {error && <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}
            <button 
              type="submit"
              className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-stone-800 transition-all shadow-lg active:scale-95"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-stone-50 min-h-screen animate-in fade-in duration-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-serif mb-4 text-stone-900 tracking-tight">Management</h1>
            <p className="text-stone-500 text-lg font-light leading-relaxed">
              Review and manage incoming {view} designs.
            </p>
            <div className="w-20 h-1 bg-[#fce7f3] mt-6"></div>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm">
            <button 
              onClick={() => setView('active')}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'active' ? 'bg-stone-900 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
            >
              Active Inquiries
            </button>
            <button 
              onClick={() => setView('archived')}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'archived' ? 'bg-stone-900 text-white shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
            >
              Archive
            </button>
          </div>
        </div>

        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-24 text-center border border-stone-100 shadow-sm">
            <span className="text-4xl mb-6 block text-stone-200">{view === 'active' ? '✉️' : '📁'}</span>
            <h2 className="text-2xl font-serif text-stone-300">
              {view === 'active' ? 'No active inquiries' : 'Your archive is empty'}
            </h2>
            <p className="text-stone-400 mt-2 font-light">
              {view === 'active' 
                ? 'New designs will appear here as customers submit them.' 
                : 'Deleted inquiries will be stored here for review.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-12">
            {filteredInquiries.map((iq) => (
              <div key={iq.id} className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-stone-100 flex flex-col lg:grid lg:grid-cols-[1fr_450px]">
                <div className="p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-full ${view === 'active' ? 'bg-rose-50 text-rose-600' : 'bg-stone-100 text-stone-500'}`}>
                      {view === 'active' ? 'New Request' : 'Archived'}
                    </span>
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
                        <li>Vinyl Request: <span className="text-stone-400 italic">{iq.vinylText || 'None'}</span></li>
                      </ul>
                    </div>
                  </div>

                  {iq.otherSpecs && (
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mb-8">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Other Specifications</h4>
                      <p className="text-sm text-stone-600 italic">"{iq.otherSpecs}"</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    {view === 'active' ? (
                      <>
                        <a 
                          href={`mailto:${iq.email}?subject=Quote for your BalloonsByAks Design&body=Hi ${iq.name}, I loved your design!`} 
                          className="px-8 py-4 bg-stone-900 text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center gap-2 shadow-lg"
                        >
                          Send Email Quote
                        </a>
                        <button 
                          onClick={() => archiveInquiry(iq.id)}
                          className="px-8 py-4 bg-stone-50 text-stone-400 rounded-full font-bold text-[10px] uppercase tracking-widest hover:text-stone-900 transition-all border border-stone-100"
                        >
                          Move to Archive
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => restoreInquiry(iq.id)}
                          className="px-8 py-4 bg-stone-900 text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg"
                        >
                          Restore to Active
                        </button>
                        <button 
                          onClick={() => permanentlyDeleteInquiry(iq.id)}
                          className="px-8 py-4 bg-stone-50 text-rose-400 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-all border border-rose-100"
                        >
                          Delete Permanently
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-stone-50 p-6 flex items-center justify-center relative min-h-[500px] border-l border-stone-100 overflow-hidden">
                  <div className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 z-10">Design Mockup</div>
                  <div className="relative w-full max-w-[320px] aspect-[4/5] flex items-end justify-center select-none pb-12">
                    <ArchBackdropRenderer shape={iq.backdropShape} color={iq.backdropColor} />
                    {iq.clusters.map((cluster) => (
                      <div
                        key={cluster.id}
                        className="absolute"
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
