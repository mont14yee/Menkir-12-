import React, { useState, useEffect } from 'react';

const photos = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1506744626753-eba7bc335530?q=80&w=2070&auto=format&fit=crop',
        title: 'Golden Hour Coastal Scene',
        location: 'Big Sur, California',
        description: 'Dramatic ocean waves crashing on rugged rocks, sea stacks and caves in soft warm light, reflections on wet sand, vibrant orange-pink-purple sky with dramatic clouds.'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop',
        title: 'Misty Mountain Peaks',
        location: 'Dolomites, Italy',
        description: 'Ethereal morning mist rolling through jagged mountain peaks, creating a moody and atmospheric landscape.'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop',
        title: 'Serene Forest Stream',
        location: 'Olympic Peninsula, Washington',
        description: 'A tranquil stream winding through an ancient, moss-draped temperate rainforest.'
    }
];

export const PhotosView: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const nextPhoto = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        setTimeout(() => setIsTransitioning(false), 800);
    };

    const prevPhoto = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
        setTimeout(() => setIsTransitioning(false), 800);
    };

    const currentPhoto = photos[currentIndex];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
            {/* Full-bleed Hero Image */}
            <div className="relative w-full h-screen overflow-hidden">
                {photos.map((photo, index) => (
                    <div
                        key={photo.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        <img width="1200" height="800"
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                        {/* Subtle gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    </div>
                ))}

                {/* Editorial Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-16 pointer-events-none">
                    <div className="mt-20 md:mt-24">
                        <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/70 mb-4 font-light">
                            Fine Art Archive
                        </p>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-white mb-4" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                            {currentPhoto.title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                            {currentPhoto.location}
                        </p>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="max-w-md hidden md:block">
                            <p className="text-sm text-white/80 leading-relaxed font-light">
                                {currentPhoto.description}
                            </p>
                        </div>
                        
                        {/* Navigation Controls */}
                        <div className="flex gap-4 pointer-events-auto">
                            <button
                                onClick={prevPhoto}
                                className="w-14 h-14 flex items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 group"
                                aria-label="Previous photo"
                            >
                                <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextPhoto}
                                className="w-14 h-14 flex items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 group"
                                aria-label="Next photo"
                            >
                                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hint of grid below */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none flex items-end justify-center pb-6">
                <div className="flex gap-4 opacity-80 overflow-hidden px-8 w-full max-w-7xl mx-auto">
                    {photos.map((photo, index) => (
                        <div 
                            key={photo.id} 
                            className={`relative h-20 w-32 rounded-lg overflow-hidden transition-all duration-500 cursor-pointer pointer-events-auto ${index === currentIndex ? 'ring-2 ring-white opacity-100 scale-105' : 'opacity-50 hover:opacity-100'}`}
                            onClick={() => {
                                if (!isTransitioning) {
                                    setIsTransitioning(true);
                                    setCurrentIndex(index);
                                    setTimeout(() => setIsTransitioning(false), 800);
                                }
                            }}
                        >
                            <img width="800" height="600" src={photo.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
