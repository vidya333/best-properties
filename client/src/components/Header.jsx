import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EnquiryModal from './EnquiryModal';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about-us', label: 'About Us' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/properties', label: 'All Properties' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0D0D0D]/95 backdrop-blur-md shadow-xl py-2'
            : 'bg-[#0D0D0D] py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/images/best-properties/best-properties-logo.jpeg" 
              alt="BEST Properties Logo" 
              className="w-10 h-10 object-cover rounded shadow-sm border border-[#B8975A]/40"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/builder1.jpg'; // Fallback if image path misses
              }}
            />
            <div className="leading-tight">
              <span className="text-white font-semibold tracking-widest text-sm uppercase">
                BEST <span className="text-[#B8975A]">Properties</span>
              </span>
              <div className="text-[#B8975A] text-[10px] tracking-widest uppercase">Nanded City · Pune</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-[13px] font-medium tracking-wide transition-colors duration-200 relative group ${
                  location.pathname === to ? 'text-[#B8975A]' : 'text-white/80 hover:text-[#B8975A]'
                }`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#B8975A] transition-all duration-300 ${
                  location.pathname === to ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}

            {/* Loans Link placed before Contact */}
            <Link
              to="/loans"
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 relative group ${
                location.pathname === '/loans' ? 'text-[#B8975A]' : 'text-white/80 hover:text-[#B8975A]'
              }`}
            >
              Loans
              <span className={`absolute -bottom-1 left-0 h-px bg-[#B8975A] transition-all duration-300 ${
                location.pathname === '/loans' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>

            <Link
              to="/contact"
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 relative group ${
                location.pathname === '/contact' ? 'text-[#B8975A]' : 'text-white/80 hover:text-[#B8975A]'
              }`}
            >
              Contact
              <span className={`absolute -bottom-1 left-0 h-px bg-[#B8975A] transition-all duration-300 ${
                location.pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            
            {/* Desktop Enquire Now Button */}
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="ml-2 border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#0D0D0D] px-5 py-2 text-[12px] font-bold uppercase tracking-widest transition-all duration-300"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Transparent Black Glassmorphism Overlay */}
      <div className={`fixed inset-0 z-30 bg-[#0D0D0D]/80 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-all duration-400 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="text-2xl text-white/80 hover:text-[#B8975A] font-medium tracking-wide transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}

        {/* Loans Link placed before Contact in Mobile Menu */}
        <Link
          to="/loans"
          className="text-2xl text-white/80 hover:text-[#B8975A] font-medium tracking-wide transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Loans
        </Link>

        <Link
          to="/contact"
          className="text-2xl text-white/80 hover:text-[#B8975A] font-medium tracking-wide transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>

        {/* Mobile Enquire Now Button */}
        <button
          onClick={() => {
            setMenuOpen(false);
            setIsEnquiryOpen(true);
          }}
          className="mt-4 border-2 border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-[#0D0D0D] px-8 py-3 text-lg font-bold uppercase tracking-widest transition-all duration-300"
        >
          Enquire Now
        </button>
      </div>

      {/* Global Modal Instance */}
      {isEnquiryOpen && (
        <EnquiryModal 
          onClose={() => setIsEnquiryOpen(false)} 
          prefillMessage="Hello, I would like to inquire about general real estate opportunities."
        />
      )}
    </>
  );
};

export default Header;