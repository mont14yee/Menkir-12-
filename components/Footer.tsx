import { usePortfolioData } from './PortfolioDataProvider';
import React, { useState, useEffect } from 'react';
import { AppStoreIcon, PlayStoreIcon, InstagramIcon, LinkedInIcon, EmailIcon, TelegramIcon, YouTubeIcon, TikTokIcon } from './IconComponents';

export const Footer: React.FC<{ variant?: 'app' | 'portfolio' }> = ({ variant = 'app' }) => { const portfolioData = usePortfolioData();
    const [footerData, setFooterData] = useState<any>(null);

    useEffect(() => { if(portfolioData) setFooterData((portfolioData as any).footer); }, [portfolioData]);
    
    if (variant === 'portfolio') {
        return (
            <footer className="bg-black border-t border-slate-800 py-8">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-slate-100">Stay Updated</h3>
                        <p className="mt-2 text-slate-400">Get my latest posts and updates delivered to your inbox.</p>
                        <form className="mt-6 flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                className="bg-slate-900 border border-slate-700 rounded-md py-2 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 flex-grow"
                                aria-label="Email for newsletter"
                            />
                            <button
                                type="submit"
                                className="bg-red-600 text-white font-bold py-2 px-5 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <div className="flex justify-center space-x-8 mt-10">
                        <a href="mailto:mon14ye@gmail.com" aria-label="Email" className="text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"><EmailIcon className="w-7 h-7" /></a>
                        <a href="https://t.me/Menkiree" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"><TelegramIcon className="w-7 h-7" /></a>
                        <a href="https://www.linkedin.com/in/menkir-wolde-32a1a4108" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"><LinkedInIcon className="w-7 h-7" /></a>
                        <a href="https://www.instagram.com/menkirwolde?igsh=MTY4Nmh1N2FtMHVrNg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"><InstagramIcon className="w-7 h-7" /></a>
                        <a href="https://youtube.com/@menkir127" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"><YouTubeIcon className="w-7 h-7" /></a>
                        <a href="https://www.tiktok.com/@menkirteamir" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"><TikTokIcon className="w-7 h-7" /></a>
                    </div>

                    <div className="mt-12 border-t border-slate-800 pt-8 text-slate-500 text-xs">
                        <p>© {new Date().getFullYear()} {footerData?.copyright || 'Menkir Wolde. All rights reserved.'}</p>
                        <div className="mt-2 space-x-4">
                            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                            <span>&middot;</span>
                            <a href="#" className="hover:text-slate-300">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
    
    return (
        <footer className="bg-black border-t border-slate-800 py-16">
            <div className="container mx-auto px-6">


                <div className="text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} {footerData?.copyright || 'THE FUTURE. All rights reserved.'}</p>
                    <div className="mt-2 space-x-4">
                        <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                        <span>&middot;</span>
                        <a href="#" className="hover:text-slate-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};