import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// Design Tokens
const colors = {
  basalt: '#15161A',
  fieldPaper: '#EDE7DA',
  contourRust: '#B3542E',
  lichen: '#7C8768',
  benchmarkBrass: '#9C8552'
};

const typography = {
  display: 'Fraunces, serif',
  data: '"IBM Plex Mono", monospace',
  body: 'Inter, sans-serif'
};

// Data Model
interface PhotoEntry {
  id: string;
  entry_number: number;
  title: string;
  date: string;
  location: {
    place: string;
    region: string;
    country: string;
    lat: number;
    lng: number;
  };
  category: string;
  story: string;
  premium: boolean;
  camera?: { make: string; model: string; lens: string; settings: string };
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  orientation: 'landscape' | 'portrait' | 'square';
}

const photoEntries: PhotoEntry[] = [
  {
    id: "coastal-scene",
    entry_number: 1,
    title: "Coastal Subduction",
    date: "2025-10-12",
    location: {
      place: "Big Sur",
      region: "California",
      country: "USA",
      lat: 36.2704,
      lng: -121.8081
    },
    category: "Landscape",
    story: "The marine layer broke just as the tide reached its lowest point. We documented the exposed sea stacks before the water reclaimed them.",
    premium: true,
    camera: { make: "Hasselblad", model: "X2D 100C", lens: "XCD 45mm", settings: "f/11 · 1/60s · ISO 64" },
    image: {
      src: "https://images.unsplash.com/photo-1506744626753-eba7bc335530?q=80&w=2070&auto=format&fit=crop",
      alt: "Dramatic ocean waves crashing on rugged rocks, sea stacks and caves in soft warm light, reflections on wet sand, vibrant orange-pink-purple sky with dramatic clouds.",
      width: 2070,
      height: 1380
    },
    orientation: "landscape"
  },
  {
    id: "dolomites-mist",
    entry_number: 2,
    title: "Alpine Fracture",
    date: "2025-09-28",
    location: {
      place: "Dolomites",
      region: "South Tyrol",
      country: "Italy",
      lat: 46.4395,
      lng: 11.9723
    },
    category: "Geological",
    story: "Climbed before dawn to catch the thermal inversion. The jagged limestone peaks pierced through the valley fog like teeth.",
    premium: false,
    camera: { make: "Sony", model: "A7R V", lens: "FE 24-70mm GM II", settings: "f/8 · 1/125s · ISO 100" },
    image: {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop",
      alt: "Ethereal morning mist rolling through jagged mountain peaks, creating a moody and atmospheric landscape.",
      width: 2074,
      height: 1383
    },
    orientation: "landscape"
  },
  {
    id: "rainforest-stream",
    entry_number: 3,
    title: "Riparian Zone",
    date: "2025-05-14",
    location: {
      place: "Hoh Rainforest",
      region: "Washington",
      country: "USA",
      lat: 47.8609,
      lng: -123.9348
    },
    category: "Botanical",
    story: "The density of the moss absorbs all sound. A complete canopy block, forcing long exposures even at midday.",
    premium: true,
    camera: { make: "Fujifilm", model: "GFX 100S", lens: "GF 32-64mm", settings: "f/16 · 2.5s · ISO 100" },
    image: {
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
      alt: "A tranquil stream winding through an ancient, moss-draped temperate rainforest.",
      width: 2070,
      height: 1380
    },
    orientation: "landscape"
  },
  {
    id: "desert-dunes",
    entry_number: 4,
    title: "Aeolian Transport",
    date: "2025-02-08",
    location: {
      place: "Namib Desert",
      region: "Erongo",
      country: "Namibia",
      lat: -24.7299,
      lng: 15.3400
    },
    category: "Landscape",
    story: "Tracking the migration of dune crests. The iron oxidation gives the sand a hyper-saturated rust color right at sunset.",
    premium: false,
    camera: { make: "Leica", model: "SL2", lens: "APO-Summicron 75mm", settings: "f/5.6 · 1/500s · ISO 200" },
    image: {
      src: "https://images.unsplash.com/photo-1542125387-c71274d94f0a?q=80&w=2070&auto=format&fit=crop",
      alt: "Vast, sweeping red sand dunes under a clear sky.",
      width: 2070,
      height: 1380
    },
    orientation: "landscape"
  }
];

const BenchmarkStamp = ({ entry, className = "" }: { entry: PhotoEntry, className?: string }) => {
  const isPremium = entry.premium;
  return (
    <div className={`flex items-center justify-center rounded-full border border-[${colors.benchmarkBrass}] ${isPremium ? `bg-[${colors.benchmarkBrass}] text-[${colors.basalt}]` : `bg-transparent text-[${colors.benchmarkBrass}]`} ${className}`} style={{ width: '48px', height: '48px', borderColor: colors.benchmarkBrass, backgroundColor: isPremium ? colors.benchmarkBrass : 'transparent', color: isPremium ? colors.basalt : colors.benchmarkBrass }}>
      <div className="flex flex-col items-center justify-center leading-none" style={{ fontFamily: typography.data, fontSize: '0.5rem' }}>
        <span className="font-bold tracking-widest">{entry.entry_number.toString().padStart(3, '0')}</span>
        <span className="opacity-70 mt-0.5" style={{ fontSize: '0.4rem' }}>{Math.abs(entry.location.lat).toFixed(1)}°{entry.location.lat >= 0 ? 'N' : 'S'}</span>
      </div>
    </div>
  );
};

export const PhotosView: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<PhotoEntry | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredEntryId, setHoveredEntryId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(photoEntries.map(e => e.category)))];

  const filteredEntries = activeCategory === 'All' 
    ? photoEntries 
    : photoEntries.filter(e => e.category === activeCategory);

  // Close detail view on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedEntry) setSelectedEntry(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEntry]);

  // Lock body scroll when detail view is open
  useEffect(() => {
    if (selectedEntry) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedEntry]);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: colors.basalt, color: colors.fieldPaper, fontFamily: typography.body }}>
      
      {/* Hero */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img 
            src={photoEntries[0].image.src} 
            alt={photoEntries[0].image.alt}
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#15161A]/50 to-[#15161A]"></div>
        </motion.div>

        <div className="relative z-10 text-center mt-20">
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl tracking-tight" 
            style={{ fontFamily: typography.display }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Natural
          </motion.h1>
          <motion.p 
            className="mt-6 text-xs md:text-sm tracking-[0.2em] uppercase opacity-60"
            style={{ fontFamily: typography.data }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Field Expedition Log · 2025
          </motion.p>
        </div>

        <motion.div 
          className="absolute bottom-12 w-[1px] h-16 bg-[#EDE7DA] opacity-30 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
        />
      </section>

      {/* Main Gallery / Journey */}
      <section className="max-w-[90vw] md:max-w-[80vw] lg:max-w-7xl mx-auto py-24 md:py-32">
        
        {/* Filter */}
        <div className="flex gap-8 mb-24 overflow-x-auto pb-4 hide-scrollbar border-b border-[#EDE7DA]/10">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs uppercase tracking-widest relative pb-4 transition-colors duration-500"
              style={{ 
                fontFamily: typography.data,
                color: activeCategory === cat ? colors.contourRust : `${colors.fieldPaper}80` 
              }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  style={{ backgroundColor: colors.contourRust }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Entries */}
        <div className="flex flex-col gap-32 md:gap-48">
          {filteredEntries.map((entry, index) => {
            const isFullBleed = index % 3 === 0;
            return (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col ${isFullBleed ? 'w-full' : 'w-full md:w-2/3 ml-auto'}`}
              >
                
                {/* Contour Line Separator above if not first */}
                {index > 0 && (
                  <div className="absolute -top-16 md:-top-24 left-0 w-full flex justify-center opacity-10">
                    <svg width="100%" height="20" preserveAspectRatio="none" viewBox="0 0 1000 20">
                      <path d="M0 10 Q 250 20 500 10 T 1000 10" fill="none" stroke={colors.fieldPaper} strokeWidth="1" />
                    </svg>
                  </div>
                )}

                {/* Entry Identifier */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase opacity-50" style={{ fontFamily: typography.data }}>
                    Entry {entry.entry_number.toString().padStart(3, '0')}
                  </span>
                  <div className="h-[1px] flex-grow bg-[#EDE7DA]/10"></div>
                </div>

                {/* Photo container */}
                <div 
                  className="relative cursor-none group overflow-hidden"
                  onClick={() => setSelectedEntry(entry)}
                  onMouseEnter={() => setHoveredEntryId(entry.id)}
                  onMouseLeave={() => setHoveredEntryId(null)}
                >
                  <motion.div layoutId={`image-container-${entry.id}`} className="relative w-full aspect-[3/2] bg-[#1a1b20]">
                    <motion.img 
                      layoutId={`image-${entry.id}`}
                      src={entry.image.src} 
                      alt={entry.image.alt}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Benchmark Stamp */}
                  <BenchmarkStamp 
                    entry={entry} 
                    className="absolute top-4 left-4 md:top-6 md:left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                  />

                  {/* Custom Cursor "View" */}
                  <AnimatePresence>
                    {hoveredEntryId === entry.id && (
                      <CustomCursor label="VIEW" />
                    )}
                  </AnimatePresence>
                </div>

                {/* Metadata Line */}
                <div className="mt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <h3 className="text-xl md:text-2xl" style={{ fontFamily: typography.display }}>{entry.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase opacity-60" style={{ fontFamily: typography.data }}>
                    <span>{entry.location.place}</span>
                    <span>·</span>
                    <span>{entry.date}</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      {/* The Collection (About) */}
      <section className="w-full bg-[#111215] py-32 mt-32 border-t border-[#EDE7DA]/5 relative">
        <div className="max-w-[80vw] lg:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="order-2 md:order-1 relative">
             <img src={photoEntries[1].image.src} className="w-4/5 h-auto opacity-70 filter grayscale sepia-[0.2]" alt="Collection background" />
             <div className="absolute -bottom-8 -right-8 w-1/2 p-4 bg-[#15161A] border border-[#EDE7DA]/10">
               <p className="text-[9px] tracking-widest uppercase opacity-50 mb-2" style={{ fontFamily: typography.data }}>Location Verified</p>
               <p className="text-xs" style={{ fontFamily: typography.body }}>The pursuit of geological anomalies and transient light.</p>
             </div>
          </div>
          <div className="order-1 md:order-2 flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: typography.display }}>The <br/>Collection</h2>
            <p className="text-sm md:text-base leading-relaxed opacity-70" style={{ fontFamily: typography.body }}>
              This is not a gallery of perfected moments. It is a log of field expeditions—a raw, coordinate-stamped record of real places really visited. Every frame documents a specific intersection of light, geology, and atmospheric conditions.
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#B3542E]" style={{ fontFamily: typography.data }}>
              Initiated 2025
            </p>
          </div>
        </div>
      </section>

      {/* Detail View Takeover */}
      <AnimatePresence>
        {selectedEntry && (
          <DetailView 
            entry={selectedEntry} 
            onClose={() => setSelectedEntry(null)} 
            onNext={() => {
              const currentIdx = filteredEntries.findIndex(e => e.id === selectedEntry.id);
              const nextIdx = (currentIdx + 1) % filteredEntries.length;
              setSelectedEntry(filteredEntries[nextIdx]);
            }}
            onPrev={() => {
              const currentIdx = filteredEntries.findIndex(e => e.id === selectedEntry.id);
              const prevIdx = (currentIdx - 1 + filteredEntries.length) % filteredEntries.length;
              setSelectedEntry(filteredEntries[prevIdx]);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

// Custom Cursor Component for the gallery images
const CustomCursor = ({ label }: { label: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full bg-[#EDE7DA] text-[#15161A] text-[9px] tracking-widest mix-blend-difference"
      style={{ 
        width: '60px', height: '60px',
        fontFamily: typography.data 
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: mousePos.x - 30,
        y: mousePos.y - 30
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
    >
      {label}
    </motion.div>
  );
};

// Detail View Component
const DetailView = ({ entry, onClose, onNext, onPrev }: { entry: PhotoEntry, onClose: () => void, onNext: () => void, onPrev: () => void }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col md:flex-row overflow-hidden"
      style={{ backgroundColor: colors.basalt }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top Bar Mobile */}
      <div className="md:hidden absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20 mix-blend-difference text-[#EDE7DA]">
         <BenchmarkStamp entry={entry} className="scale-75 origin-left" />
         <button onClick={onClose} className="text-[10px] tracking-widest uppercase" style={{ fontFamily: typography.data }}>Close</button>
      </div>

      {/* Image Container */}
      <div className="relative w-full md:w-3/4 h-[60vh] md:h-full flex items-center justify-center p-4 md:p-12">
        <motion.div layoutId={`image-container-${entry.id}`} className="relative w-full h-full flex items-center justify-center">
          <motion.img 
            layoutId={`image-${entry.id}`}
            src={entry.image.src} 
            alt={entry.image.alt}
            className="max-w-full max-h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
        
        {/* Desktop close button over image */}
        <button 
          onClick={onClose}
          className="hidden md:flex absolute top-12 left-12 w-12 h-12 items-center justify-center rounded-full border border-[#EDE7DA]/30 text-[#EDE7DA]/50 hover:text-[#EDE7DA] hover:border-[#EDE7DA] transition-all duration-500 z-20 mix-blend-difference"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Metadata Panel */}
      <motion.div 
        className="w-full md:w-1/4 h-[40vh] md:h-full bg-[#111215] border-t md:border-t-0 md:border-l border-[#EDE7DA]/10 p-8 md:p-12 flex flex-col overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="hidden md:block mb-12">
          <BenchmarkStamp entry={entry} />
        </div>

        <div className="flex-grow flex flex-col gap-8">
          <div>
            <p className="text-[9px] tracking-widest text-[#7C8768] uppercase mb-3" style={{ fontFamily: typography.data }}>{entry.category}</p>
            <h2 className="text-3xl md:text-4xl leading-tight" style={{ fontFamily: typography.display }}>{entry.title}</h2>
          </div>

          <div className="h-[1px] w-full bg-[#EDE7DA]/10"></div>

          <div className="grid grid-cols-2 gap-y-6 text-[10px] tracking-wider uppercase opacity-70" style={{ fontFamily: typography.data }}>
            <div>
              <p className="opacity-50 mb-1">Date</p>
              <p>{entry.date}</p>
            </div>
            <div>
              <p className="opacity-50 mb-1">Coordinates</p>
              <p>{entry.location.lat.toFixed(4)}, {entry.location.lng.toFixed(4)}</p>
            </div>
            <div className="col-span-2">
              <p className="opacity-50 mb-1">Location</p>
              <p>{entry.location.place}</p>
              <p className="opacity-50">{entry.location.region}, {entry.location.country}</p>
            </div>
          </div>

          <div className="h-[1px] w-full bg-[#EDE7DA]/10"></div>

          <div className="text-sm leading-loose opacity-80" style={{ fontFamily: typography.body }}>
            {entry.story}
          </div>

          {entry.camera && (
            <div className="mt-auto pt-8">
              <p className="text-[9px] tracking-widest uppercase opacity-40 mb-2" style={{ fontFamily: typography.data }}>EXIF Data</p>
              <p className="text-[10px] tracking-wide opacity-60" style={{ fontFamily: typography.data }}>
                {entry.camera.make} {entry.camera.model}<br/>
                {entry.camera.lens}<br/>
                {entry.camera.settings}
              </p>
            </div>
          )}
        </div>

        {/* Prev/Next Controls */}
        <div className="mt-12 flex gap-4">
          <button onClick={onPrev} className="flex-1 py-3 border border-[#EDE7DA]/20 text-[9px] tracking-widest uppercase hover:bg-[#EDE7DA]/10 transition-colors" style={{ fontFamily: typography.data }}>Previous</button>
          <button onClick={onNext} className="flex-1 py-3 border border-[#EDE7DA]/20 text-[9px] tracking-widest uppercase hover:bg-[#EDE7DA]/10 transition-colors" style={{ fontFamily: typography.data }}>Next</button>
        </div>
      </motion.div>
    </motion.div>
  );
};
