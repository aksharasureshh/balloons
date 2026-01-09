
import React from 'react';
import { Section } from '../types';

interface HomeProps {
  onNavigate: (section: Section) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const testimonials = [
    {
      name: "Corporate Client",
      event: "Health and Safety Event",
      quote: "I used balloonsbyaks for a health and safety event - absolutely amazing work! This was a last-minute request, and she still managed to deliver everything by the next morning. She was on time, professional, and completed the setup beautifully.",
      rating: 5
    },
    {
      name: "Private Client",
      event: "Birthday Party",
      quote: "Thank you so much for the balloons, you absolutely killed it. They were exactly what I envisioned, you nailed the colours perfectly, and you truly brought my vision to life. Can’t wait to book you again! :)",
      rating: 5
    },
    {
      name: "Private Client",
      event: "Birthday Party",
      quote: "I had an amazing experience with BalloonsByAks. Her professionalism, creativity, and attention to detail truly stood out, and the balloon setup was absolutely beautiful. I used her services for both my birthday and my brother’s event and will definitely be booking again!",
      rating: 5
    },
    {
      name: "Private Client",
      event: "Birthday Party",
      quote: "I hired BalloonsByAks for my birthday and I’m honestly so happy I did. The balloon setup looked even better than I imagined. My guests couldn’t stop complimenting it and taking pictures. If you’re looking for balloon décor that feels professional and elevated (not rushed or messy), I 100% recommend her!",
      rating: 5
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden bg-white">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-stone-900 leading-tight">
              Because Every Celebration <span className="italic text-[#fce7f3] brightness-90">Deserves</span> Balloons Done Right.
            </h1>
            <p className="text-lg text-stone-500 mb-10 max-w-lg font-light leading-relaxed">
              Elevate your celebration with balloon installations tailored to your unique vision.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('builder')}
                className="px-8 py-4 bg-stone-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg active:scale-95"
              >
                BUILD YOUR OWN ARCH TODAY
              </button>
              <button 
                onClick={() => onNavigate('gallery')}
                className="px-8 py-4 bg-white border border-stone-200 text-stone-900 rounded-full font-bold text-xs uppercase tracking-widest hover:border-stone-400 transition-all active:scale-95"
              >
                View Gallery
              </button>
            </div>
            
            {/* Stats section */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-stone-100 pt-12 max-w-sm">
              <div>
                <span className="block text-2xl font-serif text-stone-900">70+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Events</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-stone-900">GTA</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Coverage</span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-[4/5]">
              <div className="absolute inset-0 bg-stone-50 rounded-[2.5rem] translate-x-4 translate-y-4 -z-10"></div>
              <img 
                src="/hero.JPG" 
                alt="Luxury Black, White and Tan Balloon Installation with Happy Birthday Neon Sign" 
                className="w-full h-full object-cover rounded-[2.5rem] shadow-xl border border-stone-100 relative z-10"
                onError={(e) => {
                  const target = e.currentTarget;
                  // Use a high-quality backup that matches the aesthetic if the local file is missing
                  target.src = "https://images.unsplash.com/photo-1530103862676-fa8c913a3d67?q=80&w=1200&auto=format&fit=crop";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services/Features */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { title: 'Custom Installations', icon: '✨', desc: 'Custom organic designs that flow naturally with your space.' },
              { title: 'Event Styling', icon: '🎨', desc: 'Professional color curation and backdrop matching for every theme.' },
              { title: 'Full Delivery', icon: '🚚', desc: 'Stress-free setup and teardown across the Greater Toronto Area.' }
            ].map((s, i) => (
              <div key={i} className="group">
                <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform">{s.icon}</span>
                <h3 className="text-xl font-serif text-stone-900 mb-4">{s.title}</h3>
                <p className="text-stone-500 font-light text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-900 mb-4">What Our Clients Say</h2>
            <div className="w-12 h-1 bg-[#fce7f3] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-10 rounded-3xl border border-stone-100 bg-white hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
                <div>
                  <div className="text-[#fce7f3] brightness-75 mb-6 flex gap-1">
                    {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="text-stone-700 italic font-serif text-lg mb-8 leading-relaxed">"{t.quote}"</p>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-stone-900">{t.name}</h4>
                  <p className="text-stone-400 text-[10px] font-medium uppercase tracking-widest mt-1">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Builder CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-stone-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Build Your Own Design</h2>
              <p className="text-stone-400 mb-10 font-light">
                Use our interactive builder to experiment with colors and shapes before you book.
              </p>
              <button 
                onClick={() => onNavigate('builder')}
                className="px-10 py-5 bg-white text-stone-900 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#fce7f3] transition-all shadow-xl"
              >
                Launch Arch Builder
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
