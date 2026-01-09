
import React from 'react';

const Gallery: React.FC = () => {
  const photos = [
    { id: 1, title: 'Midnight Arch', category: 'Birthday', img: 'https://picsum.photos/seed/aks1/600/800' },
    { id: 2, title: 'Gold & White Gala', category: 'Wedding', img: 'https://picsum.photos/seed/aks2/600/600' },
    { id: 3, title: 'Pastel Dreams', category: 'Baby Shower', img: 'https://picsum.photos/seed/aks3/800/600' },
    { id: 4, title: 'Chrome Excellence', category: 'Corporate', img: 'https://picsum.photos/seed/aks4/600/700' },
    { id: 5, title: 'Emerald Entrance', category: 'Gala', img: 'https://picsum.photos/seed/aks5/700/600' },
    { id: 6, title: 'Rose Garden', category: 'Engagement', img: 'https://picsum.photos/seed/aks6/600/800' },
    { id: 7, title: 'Organic Cascade', category: 'Birthday', img: 'https://picsum.photos/seed/aks7/800/800' },
    { id: 8, title: 'Personalized Decal', category: 'Special Event', img: 'https://picsum.photos/seed/aks8/600/900' },
  ];

  return (
    <div className="py-16 bg-stone-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl font-serif mb-4">Our Work</h1>
          <p className="text-stone-600 text-lg">Browse through our portfolio of custom-designed balloon installations across Toronto and the GTA.</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all"
            >
              <img 
                src={photo.img} 
                alt={photo.title} 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <span className="text-rose-300 text-xs font-bold tracking-widest uppercase mb-1">
                  {photo.category}
                </span>
                <h3 className="text-white text-xl font-serif">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-stone-500 mb-6">See more on our Instagram</p>
          <a 
            href="https://instagram.com/balloonsbyaks" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-stone-900 font-bold hover:text-rose-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            @balloonsbyaks
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
