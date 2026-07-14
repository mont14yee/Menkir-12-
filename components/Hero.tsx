import { usePortfolioData } from './PortfolioDataProvider';
import React, { useState, useEffect, useRef } from 'react';
import { NeuralNetworkIcon, PaletteIcon, TrophyIcon } from './IconComponents';

export const Hero: React.FC = () => { const portfolioData = usePortfolioData();
    const [isSparkVisible, setIsSparkVisible] = useState(false);
    const [goal, setGoal] = useState('');
    const [heroData, setHeroData] = useState<any>(null);
    const [isPaused, setIsPaused] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => { if(portfolioData) setHeroData((portfolioData as any).hero); }, [portfolioData]);

    useEffect(() => {
        let isVisible = true;
        let isPageVisible = document.visibilityState === 'visible';

        const updatePauseState = () => {
            setIsPaused(!isVisible || !isPageVisible);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                updatePauseState();
            });
        }, { threshold: 0 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        const handleVisibilityChange = () => {
            isPageVisible = document.visibilityState === 'visible';
            updatePauseState();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handleGeneratePreview = () => {
        const section = document.getElementById('yearly-goals-doorway');
        section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <section ref={sectionRef} className={`min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden ${isPaused ? 'animations-paused' : ''}`}>
            <div className="vortex-background" aria-hidden="true">
                <div className="vortex-layer"></div>
                <div className="vortex-layer"></div>
                <div className="vortex-layer"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 animate-hologram">
                    {heroData?.title || 'THE FUTURE'}<span className="text-slate-400">: {heroData?.subtitle || 'Your Future, Designed.'}</span>
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300 leading-relaxed mb-10 animate-fade-in-up">
                    {heroData?.description || 'Move beyond planning. Architect a year of purpose, achievement, and growth.'}
                </p>

                <div 
                    className="quick-spark-container relative mb-12"
                    onMouseEnter={() => setIsSparkVisible(true)}
                    onMouseLeave={() => setIsSparkVisible(false)}
                >
                    <div className={`transition-all duration-500 ease-in-out ${isSparkVisible ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
                        <div className="bg-white text-black font-bold text-lg py-3 px-8 rounded-full glow-pulse cursor-pointer">
                            {heroData?.cta || 'Begin Your Blueprint \u2192'}
                        </div>
                    </div>
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${isSparkVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                        <input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder={heroData?.inputPlaceholder || 'Launch my podcast...'}
                            className="bg-gray-900 border border-slate-700 rounded-full py-3 px-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 w-64 md:w-80"
                            aria-label="Enter your primary goal"
                        />
                        <button
                            onClick={handleGeneratePreview}
                            className="ml-2 bg-slate-200 text-black font-bold py-3 px-6 rounded-full hover:bg-white transition-colors transform hover:scale-105"
                        >
                            {heroData?.buttonText || 'Generate'}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 animate-fade-in-up-delayed">
                    <div className="orb-container">
                        <div className="orb"><NeuralNetworkIcon /></div>
                        <span className="orb-tooltip">AI Goal Nudges</span>
                    </div>
                    <div className="orb-container">
                        <div className="orb"><PaletteIcon /></div>
                        <span className="orb-tooltip">Custom Themes</span>
                    </div>
                    <div className="orb-container">
                        <div className="orb"><TrophyIcon /></div>
                        <span className="orb-tooltip">Unlock Achievements</span>
                    </div>
                </div>
            </div>
            
        </section>
    );
};
