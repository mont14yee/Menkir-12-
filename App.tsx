
import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { FinalCTA } from './components/FinalCTA';
import { Portfolio } from './components/Portfolio';
import { InterfaceView } from './components/InterfaceView';
import { DesignView } from './components/DesignView';
import { PhotosView } from './components/PhotosView';
import Resume from './components/Resume';
import { Season, Currency, ExchangeRates, CurrencyContext, CurrencyContextType, View, GoalsContext, GoalsContextType, GoalNode, TimelineEvent } from './types';
import { FeatureContent } from './constants';

// --- Goals Management ---

const initialGoals: GoalNode[] = [
    { id: 'career', name: 'Career', color: 'bg-sky-500' },
    { id: 'wellness', name: 'Wellness', color: 'bg-emerald-500' },
    { id: 'legacy', name: 'Legacy', color: 'bg-indigo-500' },
];

const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [availableGoals, setAvailableGoals] = useState<GoalNode[]>(() => {
        const saved = localStorage.getItem('life-architect-available-goals');
        return saved ? JSON.parse(saved) : initialGoals;
    });
    const [orbitingGoals, setOrbitingGoals] = useState<GoalNode[]>(() => {
        const saved = localStorage.getItem('life-architect-orbiting-goals');
        return saved ? JSON.parse(saved) : [];
    });
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(() => {
        const saved = localStorage.getItem('life-architect-timeline-events');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('life-architect-available-goals', JSON.stringify(availableGoals));
    }, [availableGoals]);
    
    useEffect(() => {
        localStorage.setItem('life-architect-orbiting-goals', JSON.stringify(orbitingGoals));
    }, [orbitingGoals]);

    useEffect(() => {
        localStorage.setItem('life-architect-timeline-events', JSON.stringify(timelineEvents));
    }, [timelineEvents]);

    return (
        <GoalsContext.Provider value={{ availableGoals, setAvailableGoals, orbitingGoals, setOrbitingGoals, timelineEvents, setTimelineEvents }}>
            {children}
        </GoalsContext.Provider>
    );
};

export const useGoals = () => {
    const context = useContext(GoalsContext);
    if (!context) throw new Error('useGoals must be used within GoalsProvider');
    return context;
};

// --- Currency Management ---

// Static rates with USD as the base
const exchangeRates: ExchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 157.2,
    ETB: 57.3
};

const currencySymbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    ETB: 'Br'
};

// Provider Component
const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrencyState] = useState<Currency>(() => {
        // Fallback to 'USD' if localStorage is not available or value is invalid
        const savedCurrency = localStorage.getItem('life-architect-currency');
        return (savedCurrency && exchangeRates[savedCurrency as Currency]) ? (savedCurrency as Currency) : 'USD';
    });

    useEffect(() => {
        localStorage.setItem('life-architect-currency', currency);
    }, [currency]);

    const setCurrency = (newCurrency: Currency) => {
        if (exchangeRates[newCurrency]) {
            setCurrencyState(newCurrency);
        }
    };

    const getSymbol = (curr: Currency = currency): string => currencySymbols[curr];

    const convertFromUSD = (amount: number, targetCurrency: Currency = currency): number => {
        if (isNaN(amount)) return 0;
        return amount * exchangeRates[targetCurrency];
    };
    
    const convertToUSD = (amount: number, sourceCurrency: Currency = currency): number => {
        if (isNaN(amount)) return 0;
        return amount / exchangeRates[sourceCurrency];
    };

    const formatCurrency = (amountUSD: number, targetCurrency: Currency = currency): string => {
        const convertedAmount = convertFromUSD(amountUSD, targetCurrency);
        const symbol = getSymbol(targetCurrency);
        
        const formatter = new Intl.NumberFormat(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        // Ethiopian Birr format often places the symbol after the number, but for consistency we'll prefix.
        return `${symbol}${formatter.format(convertedAmount)}`;
    };

    const contextValue: CurrencyContextType = {
        currency,
        setCurrency,
        rates: exchangeRates,
        getSymbol,
        formatCurrency,
        convertFromUSD,
        convertToUSD,
    };

    return <CurrencyContext.Provider value={contextValue}>{children}</CurrencyContext.Provider>;
};

// Custom hook for easy context access
export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};


const App: React.FC = () => {
    const [season, setSeason] = useState<Season>(Season.Winter);
    const [currentView, setCurrentView] = useState<View>('portfolio');
    const [searchQuery, setSearchQuery] = useState('');
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, [currentView]); // Re-run when view changes to observe new elements
    
    const handleSetView = (view: View) => {
        if (currentView !== view) {
            setSearchQuery(''); // Clear search when changing main views
        }
        setCurrentView(view);
        window.scrollTo(0, 0);
    };

    const seasonalClasses: Record<Season, string> = {
        [Season.Winter]: 'seasonal-bg-winter',
        [Season.Spring]: 'seasonal-bg-spring',
        [Season.Fall]: 'seasonal-bg-fall',
    };

    const MainContent = () => (
        <>
            <main>
                <Hero />
                {FeatureContent.map((feature, index) => (
                    <FeatureSection
                        key={index}
                        id={feature.id}
                        title={feature.title}
                        description={feature.description}
                        ref={el => { sectionRefs.current[index] = el }}
                    >
                        {feature.visual}
                    </FeatureSection>
                ))}
                <FinalCTA ref={el => { sectionRefs.current[FeatureContent.length] = el }}/>
            </main>
            <Footer />
        </>
    );

    return (
        <GoalsProvider>
        <CurrencyProvider>
            <div className={`relative min-h-screen bg-black overflow-x-hidden ${currentView === 'portfolio' ? 'portfolio-active' : ''}`}>
                <div className={`absolute inset-0 transition-opacity duration-1000 ${seasonalClasses[season]}`}></div>
                <div className="relative z-10">
                    {currentView !== 'resume' && (
                        <Header 
                            setView={handleSetView} 
                            season={season}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery} 
                        />
                    )}
                    
                    {currentView === 'portfolio' ? (
                        <>
                            <Portfolio searchQuery={searchQuery} setView={handleSetView} />
                            <Footer variant="portfolio" />
                        </>
                     ) : currentView === 'interface' ? (
                        <InterfaceView />
                     ) : currentView === 'design' ? (
                        <DesignView />
                     ) : currentView === 'photos' ? (
                        <PhotosView />
                     ) : currentView === 'resume' ? (
                        <Resume setView={handleSetView} />
                     ) : <MainContent />}

                    {/* Season Switcher for Demo */}
                    {currentView !== 'resume' && (
                        <div className="fixed bottom-4 right-4 z-50 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-slate-700">
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-slate-400">Theme:</span>
                                <button onClick={() => setSeason(Season.Winter)} className={`w-6 h-6 rounded-full border-2 ${season === Season.Winter ? 'border-white' : 'border-transparent'} bg-blue-900 flex items-center justify-center text-white`}>❄</button>
                                <button onClick={() => setSeason(Season.Spring)} className={`w-6 h-6 rounded-full border-2 ${season === Season.Spring ? 'border-white' : 'border-transparent'} bg-pink-300 flex items-center justify-center text-black`}>🌸</button>
                                <button onClick={() => setSeason(Season.Fall)} className={`w-6 h-6 rounded-full border-2 ${season === Season.Fall ? 'border-white' : 'border-transparent'} bg-orange-600 flex items-center justify-center text-white`}>🍂</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CurrencyProvider>
        </GoalsProvider>
    );
};

export default App;
