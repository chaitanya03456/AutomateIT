import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { useScrollPosition } from '../hooks/useScrollPosition';

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface HeaderProps {
  onNavigate: (page: string, anchor?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollPosition > 10;

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Our Process' },
    { href: '#our-work', label: 'Our Work' },
    { href: '#ai-platform', label: 'Platform' },
    { href: '#footer', label: 'Contact' },
  ];

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isMenuOpen) {
      setMenuOpen(false);
    }
    const href = event.currentTarget.getAttribute('href');
    if (!href) return;

    const anchor = href.substring(1);
    
    // When href is '#home', we want to scroll to the top, so we pass an undefined anchor.
    // For other links, we pass the anchor name. This ensures all links work from any page.
    onNavigate('home', anchor === 'home' ? undefined : anchor);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
          isScrolled || isMenuOpen ? 'bg-black/60 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" aria-label="AutomateIt homepage" onClick={handleLinkClick}>
            <img src="/Images/pur_white.png" alt="AutomateIt logo" className="h-8 w-auto" />
          </a>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-neutral-300 hover:text-white transition-colors">{link.label}</a>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-neutral-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      
      <div className={cn(
        'md:hidden fixed inset-0 z-40 bg-black/95 transition-opacity duration-300 ease-in-out',
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}>
        <nav className="flex flex-col items-center justify-center h-full pt-16">
          <ul className="flex flex-col items-center space-y-8">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={handleLinkClick} className="text-2xl text-neutral-300 hover:text-white transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default React.memo(Header);