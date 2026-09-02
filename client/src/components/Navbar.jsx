import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0D0D0D]/95 backdrop-blur-md shadow-lg py-3' : 'bg-[#0D0D0D] py-4'
    } border-b border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 text-white no-underline">
          <div className="w-9 h-9 bg-[#B8975A] text-black font-serif font-bold text-xl flex items-center justify-center rounded-sm">
            B
          </div>
          <div>
            <span className="font-serif font-bold tracking-widest text-sm sm:text-base block uppercase text-white">
              Best Properties
            </span>
            <span className="text-[9px] tracking-[2px] text-[#B8975A] block uppercase">
              Nanded City · Pune
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Loans removed) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase">
          <Link to="/" className="text-white hover:text-[#B8975A] transition-colors no-underline">Home</Link>
          <Link to="/properties" className="text-white hover:text-[#B8975A] transition-colors no-underline">All Properties</Link>
          <Link to="/about-us" className="text-white hover:text-[#B8975A] transition-colors no-underline">About Us</Link>
          <Link to="/gallery" className="text-white hover:text-[#B8975A] transition-colors no-underline">Gallery</Link>
          <Link to="/contact" className="text-white hover:text-[#B8975A] transition-colors no-underline">Contact</Link>
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => navigate('/properties')}
            className="bg-[#B8975A] hover:bg-[#a3834a] text-black px-4 py-2 rounded-md text-xs font-bold tracking-wider uppercase transition-all"
          >
            Explore
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-b border-white/10 px-6 py-4 space-y-3 flex flex-col text-xs font-semibold uppercase tracking-wider">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-white no-underline">Home</Link>
          <Link to="/properties" onClick={() => setMenuOpen(false)} className="text-white no-underline">All Properties</Link>
          <Link to="/about-us" onClick={() => setMenuOpen(false)} className="text-white no-underline">About Us</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)} className="text-white no-underline">Gallery</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-white no-underline">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;