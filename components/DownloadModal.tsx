import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from './ExtractedIcons';

export const DownloadModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [shareLink, setShareLink] = useState('');

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setStatus('idle');
            setShareLink('');
        };
        window.addEventListener('open-download-modal', handleOpen);
        return () => window.removeEventListener('open-download-modal', handleOpen);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        
        // Simulate API call to backend or Formspree/EmailJS
        setTimeout(() => {
            setStatus('success');
            setShareLink(`https://thefuture.design/share/${Math.random().toString(36).substring(2, 10)}`);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative animate-fade-in-up">
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {status === 'success' ? (
                    <div className="text-center py-8 animate-fade-in-up">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="w-16 h-16 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                        <p className="text-slate-400 mb-6">
                            We'll send the Full Design to your email shortly.
                        </p>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <p className="text-sm text-slate-300 mb-2 font-medium">Your unique shareable link:</p>
                            <input 
                                type="text" 
                                readOnly 
                                value={shareLink} 
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-400 text-sm focus:outline-none focus:border-slate-500 transition-colors cursor-pointer"
                                onClick={(e) => (e.target as HTMLInputElement).select()}
                            />
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <div className="animate-fade-in-up">
                        <h3 className="text-2xl font-bold text-white mb-2">Get the Full Design</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Enter your email and make minor customizations to receive the complete design files.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address <span className="text-red-500">*</span></label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    required 
                                    placeholder="you@example.com"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="theme" className="block text-sm font-medium text-slate-300 mb-1">Preferred Color Theme</label>
                                <select 
                                    id="theme"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                                >
                                    <option value="dark">Cosmic Dark (Default)</option>
                                    <option value="light">Pristine Light</option>
                                    <option value="brand">Brand Custom Colors</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-1">Specific Notes / Brand Name</label>
                                <textarea 
                                    id="notes" 
                                    rows={3}
                                    placeholder="Any specific requests or your brand name..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'loading'}
                                className="w-full bg-white text-black hover:bg-slate-200 font-bold py-3.5 rounded-xl transition-colors mt-2 flex justify-center items-center gap-2 disabled:opacity-70"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    'Submit Request'
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};
