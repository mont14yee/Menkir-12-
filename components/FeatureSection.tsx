
import React, { forwardRef, ReactNode } from 'react';

interface FeatureSectionProps {
    title: string;
    description: string;
    children: ReactNode;
    id?: string;
}

export const FeatureSection = forwardRef<HTMLElement, FeatureSectionProps>(({ title, description, children, id }, ref) => {
    const sectionClasses = "container mx-auto px-6 py-20 md:py-32 scroll-reveal";

    return (
        <section id={id} ref={ref} className={sectionClasses}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="lg:pr-8 text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        {description}
                    </p>
                </div>
                <div className="flex items-center justify-center min-h-[300px] bg-black/20 rounded-2xl p-4">
                    {children}
                </div>
            </div>
        </section>
    );
});

FeatureSection.displayName = 'FeatureSection';