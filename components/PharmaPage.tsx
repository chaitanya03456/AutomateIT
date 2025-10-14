import React from 'react';
import Button from './ui/Button';

const CheckIcon: React.FC = () => (
    <svg className="h-6 w-6 shrink-0 mt-1" style={{ color: 'rgb(var(--accent-text-rgb))' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface PharmaPageProps {
    onBack: () => void;
}

const PharmaPage: React.FC<PharmaPageProps> = ({ onBack }) => {
    const challenges = [
        'Regulatory compliance tracking and documentation',
        'Supply chain coordination and route planning',
        'Inventory and order management',
        'Quality control documentation'
    ];

    return (
        <section id="pharma-details" className="py-32 sm:py-40 bg-black min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <Button onClick={onBack} variant="secondary" className="mb-12">
                        &larr; Back to Home
                    </Button>

                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Focus in the Pharmaceutical Industry</h1>
                        <p className="mt-6 text-lg leading-8 text-neutral-400">
                            We are actively conducting research within the pharmaceutical industry, with a particular emphasis on the distribution and branding sectors. We are actively engaging with the industry and conducting thorough research to better understand existing challenges. Our objective is to assist small and medium-sized enterprises (SMEs) in transforming their operations and adopting artificial intelligence.
                        </p>
                    </div>

                    <div className="mt-20 text-left">
                        <p className="text-lg leading-8 text-neutral-300">
                            Some of the most time-consuming and repetitive processes prevalent in the industry include:
                        </p>
                        <ul role="list" className="mt-8 space-y-4 text-neutral-300">
                            {challenges.map((challenge) => (
                                <li key={challenge} className="flex gap-x-4">
                                    <CheckIcon />
                                    <span>{challenge}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-lg leading-8 text-neutral-400">
                            Additionally, we have identified interest in more intelligent solutions such as demand forecasting and supply chain optimization.
                        </p>
                        <p className="mt-8 text-lg leading-8 text-neutral-300">
                            At Automatelt, we are committed to addressing these challenges by providing businesses with innovative and intelligent solutions. We strive to be transformational partners for our clients, supporting them at every stage of their journey toward success. Our objective is to help them navigate the complexities of the Al era, empowering them with a competitive advantage in their respective industries.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(PharmaPage);