
import React from 'react';

interface Photo {
  id: number;
  title: string;
  img: string;
}

const Gallery: React.FC = () => {
  // Updated list using raw.githubusercontent.com for consistent image loading
  const photos: Photo[] = [
    { id: 1, title: 'Midnight & Gold Luxe', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/1.JPG' },
    { id: 2, title: 'Spider-Man Birthday Stage', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/2.JPG' },
    { id: 3, title: 'Golden Congratulations', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/3.JPG' },
    { id: 4, title: 'Monochrome Birthday', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/4.JPG' },
    { id: 5, title: 'Marquee Milestone 50', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/5.JPG' },
    { id: 6, title: 'Hello Thirty White Luxe', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/6.JPG' },
    { id: 7, title: 'Crimson & Gold Hoop', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/7.JPG' },
    { id: 8, title: 'Signature 36 Neon', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/8.JPG' },
    { id: 9, title: 'OVO Themed Luxury', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/9.JPG' },
    { id: 10, title: 'Classic White Neon Arch', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/10.JPG' },
    { id: 11, title: 'Sage & Gold Garden', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/11.JPG' },
    { id: 12, title: "Let's Party Black & Gold", img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/12.JPG' },
    { id: 13, title: 'Carousel Unicorn Fantasy', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/13.JPG' },
    { id: 14, title: 'Luxe Entrance Pillars', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/14.JPG' },
    { id: 15, title: 'Toy Story Custom', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/15.JPG' },
    { id: 16, title: 'Teal & Gold Organic', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/16.JPG' },
    { id: 17, title: 'Black Chrome Pedestals', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/17.JPG' },
    { id: 18, title: 'Sage Grass Wall', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/18.JPG' },
    { id: 19, title: 'Soft Cream Arch', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/19.JPG' },
    { id: 20, title: 'Sports Fan Special', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/20.JPG' },
    { id: 21, title: 'Bride To Be Bow', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/21.JPG' },
    { id: 22, title: 'Red & Gold Studio', img: 'https://raw.githubusercontent.com/aksharasureshh/balloons/main/22.JPG' },
  ];

  return (
    <div className="py-16 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl font-serif mb-6 text-stone-900 tracking-tight">Portfolio</h1>
          <p className="text-stone-500 text-lg font-light leading-relaxed">
            A curated showcase of our balloon installations. Every setup is a unique reflection of our commitment to excellence and artistry.
          </p>
          <div className="w-20 h-1 bg-[#fce7f3] mt-8"></div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative group overflow-hidden rounded-[2.5rem] bg-stone-200/40 shadow-sm hover:shadow-2xl transition-all duration-700 break-inside-avoid-column transform-gpu"
            >
              <img 
                src={photo.img} 
                alt={photo.title} 
                loading="lazy"
                className="w-full h-auto block object-cover transition-all duration-1000 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  const parent = target.closest('.break-inside-avoid-column');
                  if (parent) (parent as HTMLElement).style.display = 'none';
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10 pointer-events-none">
                <span className="text-[#fce7f3] text-[10px] font-black tracking-[0.4em] uppercase mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  BalloonsByAks
                </span>
                <h3 className="text-white text-2xl font-serif transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Connection */}
        <div className="mt-32 text-center bg-stone-900 rounded-[4rem] py-24 px-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fce7f3]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-[#fce7f3] text-xs font-black uppercase tracking-[0.5em] mb-12">Let's Design Your Dream Event</p>
            <a 
              href="https://instagram.com/balloonsbyaks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex flex-col md:flex-row items-center gap-8 group"
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#fce7f3] transition-all duration-500 shadow-2xl">
                <svg className="w-10 h-10 text-stone-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-white text-4xl font-serif mb-2">@balloonsbyaks</span>
                <span className="text-stone-500 text-xs font-black uppercase tracking-[0.3em]">Direct Message to book</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
