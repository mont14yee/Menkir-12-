
import React, { useState } from 'react';
import { NeuralNetworkIcon, PaletteIcon, TrophyIcon } from './IconComponents';

export const Hero: React.FC = () => {
    const [isSparkVisible, setIsSparkVisible] = useState(false);
    const [goal, setGoal] = useState('');

    const handleGeneratePreview = () => {
        const section = document.getElementById('yearly-goals-doorway');
        section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
            <div className="vortex-background" aria-hidden="true">
                <div className="vortex-layer"></div>
                <div className="vortex-layer"></div>
                <div className="vortex-layer"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 animate-hologram">
                    THE FUTURE<span className="text-slate-400">: Your Future, Designed.</span>
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300 leading-relaxed mb-10 animate-fade-in-up">
                    Move beyond planning. Architect a year of purpose, achievement, and growth.
                </p>

                <div 
                    className="quick-spark-container relative mb-12"
                    onMouseEnter={() => setIsSparkVisible(true)}
                    onMouseLeave={() => setIsSparkVisible(false)}
                >
                    <div className={`transition-all duration-500 ease-in-out ${isSparkVisible ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
                        <div className="bg-white text-black font-bold text-lg py-3 px-8 rounded-full glow-pulse cursor-pointer">
                            Begin Your Blueprint &rarr;
                        </div>
                    </div>
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${isSparkVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                        <input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="Launch my podcast..."
                            className="bg-gray-900 border border-slate-700 rounded-full py-3 px-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 w-64 md:w-80"
                            aria-label="Enter your primary goal"
                        />
                        <button
                            onClick={handleGeneratePreview}
                            className="ml-2 bg-slate-200 text-black font-bold py-3 px-6 rounded-full hover:bg-white transition-colors transform hover:scale-105"
                        >
                            Generate
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
             <style>{`
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out 0.5s forwards;
                    opacity: 0;
                }
                 @keyframes fade-in-up-delayed {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up-delayed {
                    animation: fade-in-up-delayed 1s ease-out 1s forwards;
                    opacity: 0;
                }

                /* Hologram Text */
                @keyframes hologram {
                    0%, 100% { text-shadow: 0 0 2px #C0C0C0, 0 0 8px #C0C0C0, 0 0 1px hsl(200 100% 50% / 0.5); }
                    50% { text-shadow: 0 0 5px #E0E0E0, 0 0 15px #E0E0E0, 0 0 1px hsl(290 100% 50% / 0.5); }
                }
                .animate-hologram {
                    background: linear-gradient(135deg, #E0E0E0 0%, #FFFFFF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: hologram 4s infinite linear, fade-in-up 1s ease-out forwards;
                }
                
                /* Vortex Background */
                .vortex-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                .vortex-layer {
                    position: absolute;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                }
                .vortex-layer:nth-child(1) {
                    width: 200vmin;
                    height: 200vmin;
                    margin-left: -100vmin;
                    margin-top: -100vmin;
                    background: radial-gradient(circle, rgba(100, 116, 139, 0.2) 0%, rgba(100, 116, 139, 0) 60%);
                    animation: vortex 20s linear infinite;
                }
                .vortex-layer:nth-child(2) {
                    width: 150vmin;
                    height: 150vmin;
                    margin-left: -75vmin;
                    margin-top: -75vmin;
                    background: radial-gradient(circle, rgba(203, 213, 225, 0.1) 0%, rgba(203, 213, 225, 0) 50%);
                    animation: vortex 30s linear infinite reverse;
                }
                .vortex-layer:nth-child(3) {
                     width: 250vmin;
                     height: 250vmin;
                     margin-left: -125vmin;
                     margin-top: -125vmin;
                     background-image: radial-gradient(rgba(226, 232, 240, 0.1) 1px, transparent 1.5px);
                     background-size: 50px 50px;
                     animation: vortex 45s linear infinite;
                }

                @keyframes vortex {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                /* Orbs */
                .orb-container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .orb {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: radial-gradient(circle, #334155, #0f172a);
                    border: 2px solid #475569;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #e2e8f0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }
                .orb:hover {
                    transform: scale(1.1);
                    border-color: #94a3b8;
                    box-shadow: 0 0 15px #94a3b8, 0 0 30px #475569;
                }
                .orb::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }
                 .orb:hover::before {
                    animation: ripple 1.5s ease-out infinite;
                    border-color: #94a3b8;
                 }
                .orb-tooltip {
                    position: absolute;
                    bottom: 120%;
                    background-color: #1e293b;
                    color: #e2e8f0;
                    padding: 4px 12px;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    white-space: nowrap;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                    pointer-events: none;
                }
                .orb-container:hover .orb-tooltip {
                    opacity: 1;
                    transform: translateY(0);
                }

                @keyframes ripple {
                    0% { transform: scale(1); opacity: 0.7; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
            `}</style>
        </section>
    );
};
