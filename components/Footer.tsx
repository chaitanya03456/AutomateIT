import React from 'react';

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <a href={href} className="text-neutral-400 hover:text-white transition-colors duration-300">
      {children}
    </a>
  </li>
);

const ComingSoonLink: React.FC<{ onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <li>
    <a href="#" onClick={onClick} className="text-neutral-400 hover:text-white transition-colors duration-300">
      {children}
    </a>
  </li>
);

const Footer: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const handleComingSoonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate();
  };

  return (
    <footer id="footer" className="bg-neutral-900/50 border-t border-neutral-800">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-full lg:col-span-2 mb-8 lg:mb-0">
            <a href="#" onClick={handleComingSoonClick} className="text-xl font-bold tracking-wider">
              AutomateIt
            </a>
            <p className="text-neutral-400 mt-4 text-sm max-w-xs">
              Your Trusted Partner for AI Consulting, Auditing, Solutions & Training. Smarter systems, Scalable growth, Long-term impact.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <FooterLink href="#features">Services</FooterLink>
              <FooterLink href="#ai-platform">About</FooterLink>
              <FooterLink href="#footer">Contact</FooterLink>
              <ComingSoonLink onClick={handleComingSoonClick}>Blog</ComingSoonLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <ComingSoonLink onClick={handleComingSoonClick}>Privacy Policy</ComingSoonLink>
              <ComingSoonLink onClick={handleComingSoonClick}>Terms of Service</ComingSoonLink>
              <ComingSoonLink onClick={handleComingSoonClick}>Cookie Policy</ComingSoonLink>
              <ComingSoonLink onClick={handleComingSoonClick}>Data Protection</ComingSoonLink>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
<li>
  <a href="" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
    Gmail : info@automateit.co.in
  </a>
</li>
<li>
  <a href="https://www.linkedin.com/company/automateitai" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
    LinkedIn
  </a>
</li>
<li>
  <a href="https://www.instagram.com/automateit.ai"target="_blank"rel="noopener noreferrer"className="text-neutral-400 hover:text-white transition-colors">
    Instagram: @automateit.ai
  </a>
</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} AutomateIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);