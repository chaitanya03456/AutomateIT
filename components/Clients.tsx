import React, { useRef } from 'react';
import { cn } from '../lib/utils';
import { useOnScreen } from '../hooks/useOnScreen';

const ClientLogo: React.FC<{ name: string }> = ({ name }) => (
    <div className="flex items-center justify-center h-16">
        <span className="text-2xl font-bold text-neutral-600 tracking-widest uppercase filter grayscale hover:grayscale-0 transition-all duration-300">
            {name}
        </span>
    </div>
);

const Clients: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef);
  const clients = ["NEXUS", "ORION", "QUANTUM", "AEGIS", "HELIX", "SPECTRA"];

  return (
    <section id="clients" ref={sectionRef} className="py-20 sm:py-24 bg-black border-t border-b border-neutral-900">
      <div className="container mx-auto px-6">
        <h2 className={cn("text-center text-sm font-semibold text-neutral-500 tracking-widest uppercase fade-in-up", isVisible && 'is-visible')}>
          Trusted by the world's most innovative companies
        </h2>
        <div className={cn("mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 stagger-children", isVisible && 'is-visible')}>
          {clients.map(client => (
            <ClientLogo key={client} name={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;