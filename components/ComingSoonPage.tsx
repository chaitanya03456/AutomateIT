import React from 'react';
import Button from './ui/Button';

interface ComingSoonPageProps {
    onBack: () => void;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ onBack }) => {
    // A more thematic background image path
    const backgroundImageUrl = "/bgcs1.jpeg";

    return (
        <section id="coming-soon" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center -z-10 ken-burns-bg" 
                style={{ backgroundImage: `url("${backgroundImageUrl}")` }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/70 -z-10" aria-hidden="true" />

            <div className="relative z-10 container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto fade-in-slow">
                    <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
                        Something New is Coming
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-neutral-300">
                        We're putting the finishing touches on an exciting new section of our website.
                        <br/>
                        Check back soon for updates.
                    </p>

                    <div className="mt-12">
                        <Button onClick={onBack} variant="secondary">
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(ComingSoonPage);