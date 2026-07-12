import React, { forwardRef } from 'react';
import { ArrowRight } from './ExtractedIcons';

export const FinalCTA = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className="py-24 bg-gray-900/30 scroll-reveal">
            <div className="container mx-auto px-6 text-center flex justify-center">
                <a href="#" className="group inline-flex items-center gap-6 transition-all hover:scale-105 cursor-pointer">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 group-hover:from-white group-hover:to-white transition-all m-0 p-0">
                        Download Full Design
                    </h2>
                    <ArrowRight className="w-10 h-10 md:w-12 md:h-12 text-slate-400 group-hover:text-white transition-colors" />
                </a>
            </div>
        </section>
    );
});
FinalCTA.displayName = 'FinalCTA';