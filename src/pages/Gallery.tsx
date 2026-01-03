
import React, { useState } from 'react';

type Album = '2k26' | '2k25' | '2k24';

const galleryData: Record<Album, string[]> = {
  '2k24': [
    'https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop',
  ],
  '2k25': [
    'https://images.unsplash.com/photo-1514525253348-8d9407c52085?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1475721027187-4024733924f7?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop',
  ],
  '2k26': [
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531058021387-49351d42a4b7?q=80&w=600&auto=format&fit=crop',
  ],
};

export const GalleryPage: React.FC = () => {
  const [activeAlbum, setActiveAlbum] = useState<Album>('2k25');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-20 px-6 lg:px-20 animate-fade-in min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white/40 text-xs tracking-[0.5em] font-bold uppercase mb-4">Memories</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-10">
            JUNO <span className="font-serif italic text-pink-500 lowercase">Gallery</span>
          </h1>
          
          {/* Album Tabs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
            {(['2k24', '2k25', '2k26'] as Album[]).map((album) => (
              <button 
                key={album}
                onClick={() => setActiveAlbum(album)}
                className={`px-10 py-3 rounded-full border transition-all duration-300 text-sm font-black tracking-widest ${
                  activeAlbum === album 
                  ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                  : 'border-white/10 bg-white/5 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                {album.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {galleryData[activeAlbum].map((src, idx) => (
            <div 
              key={`${activeAlbum}-${idx}`} 
              className="aspect-square bg-white/5 rounded-2xl overflow-hidden cursor-zoom-in group relative border border-white/5 hover:border-cyan-400/30 transition-all duration-500"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`Gallery ${activeAlbum} ${idx}`} 
                className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
              <img 
                src={selectedImage} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
                alt="Full View"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
