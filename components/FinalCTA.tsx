import React, { forwardRef } from 'react';
import { AppStoreIcon, PlayStoreIcon } from './IconComponents';

export const FinalCTA = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className="py-24 bg-gray-900/30 scroll-reveal">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-6">
                    Enter Your Future—Download Now.
                </h2>
                <div className="flex justify-center items-center space-x-4 mt-8">
                     <a href="#" className="transform transition-transform hover:scale-105"><AppStoreIcon /></a>
                     <a href="#" className="transform transition-transform hover:scale-105"><PlayStoreIcon /></a>
                </div>
            </div>
        </section>
    );
});

FinalCTA.displayName = 'FinalCTA';
