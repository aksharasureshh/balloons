
import React, { useState, useEffect } from 'react';
import { Section } from '../types';

interface HomeProps {
  onNavigate: (section: Section) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [currentReview, setCurrentReview] = useState(0);

  const testimonials = [
    {
      name: "Private Client",
      event: "Birthday Party",
      quote: "Absolutely loved my setup! She was so creative and literally brought my inspo to life. Everything turned out even better than I imagined. 10/10 would recommend 💗.",
      rating: 5
    },
    {
      name: "Private Client",
      event: "Birthday Party",
      quote: "Balloonsbyaks was truly a pleasure all around to work with. I told them the theme colours and what i was looking for and they brought my vision to life 😍!!! all for an amazing price. so communicative and very understanding. they offer so many stunning add ons to level up your balloon backdrop to your expectations.",
      rating: 5
    },
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

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % testimonials.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(nextReview, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden bg-white">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-stone-900 leading-tight">
              Because Every Celebration <span className="italic text-[#fce7f3] brightness-90">Deserves</span> Balloons Done Right.
            </h1>
            <p className="text-lg text-stone-500 mb-10 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              Elevate your celebration with balloon installations tailored to your unique vision.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
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
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-stone-100 pt-12 max-w-sm mx-auto lg:mx-0">
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
                src="https://raw.githubusercontent.com/aksharasureshh/balloons/main/hero.JPG" 
                alt="Luxury Balloon Installation" 
                className="w-full h-full object-cover rounded-[2.5rem] shadow-xl border border-stone-100 relative z-10"
                onError={(e) => {
                  const target = e.currentTarget;
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
              { title: 'Custom Installations', desc: 'Custom organic designs that flow naturally with your space.' },
              { title: 'Event Styling', desc: 'Professional color curation and backdrop matching for every theme.' },
              { title: 'Full Delivery', desc: 'Stress-free setup and teardown across the Greater Toronto Area.' }
            ].map((s, i) => (
              <div key={i} className="group">
                <span className="text-stone-300 font-serif text-4xl mb-6 block group-hover:text-[#fce7f3] transition-colors">•</span>
                <h3 className="text-xl font-serif text-stone-900 mb-4">{s.title}</h3>
                <p className="text-stone-500 font-light text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section - Carousel */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-900 mb-4">What Our Clients Say</h2>
            <div className="w-12 h-1 bg-[#fce7f3] mx-auto"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Navigation */}
            <div className="absolute inset-y-0 -left-4 md:-left-12 flex items-center z-10">
              <button onClick={prevReview} className="p-3 rounded-full bg-stone-50 text-stone-400 hover:text-stone-900 hover:bg-white hover:shadow-md transition-all active:scale-90">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
            </div>
            <div className="absolute inset-y-0 -right-4 md:-right-12 flex items-center z-10">
              <button onClick={nextReview} className="p-3 rounded-full bg-stone-50 text-stone-400 hover:text-stone-900 hover:bg-white hover:shadow-md transition-all active:scale-90">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Carousel Card */}
            <div className="relative min-h-[350px] flex items-center">
              {testimonials.map((t, i) => (
                <div 
                  key={i}
                  className={`absolute inset-0 transition-all duration-700 flex flex-col justify-center items-center text-center px-12 md:px-20 ${
                    i === currentReview ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="mb-6">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#fce7f3]/30 text-stone-600 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                      {t.event}
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl font-serif text-stone-800 leading-relaxed italic mb-8">
                    "{t.quote}"
                  </p>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-stone-900">{t.name}</h4>
                    <div className="flex justify-center gap-1 mt-3">
                      {[...Array(5)].map((_, idx) => (
                        <span key={idx} className="text-xs text-[#fce7f3] brightness-90">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReview(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentReview ? 'w-8 bg-stone-900' : 'bg-stone-200'
                  }`}
                />
              ))}
            </div>
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
