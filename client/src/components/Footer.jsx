import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#080808]" id="contact">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[#B8975A] flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">B</span>
              </div>
              <span className="text-white font-semibold tracking-widest text-sm uppercase">
                BEST <span className="text-[#B8975A]">Properties</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-4 max-w-xs">
              Premium real estate services in Nanded City & Pune. Finding you the best home since 2012.
            </p>
            
            {/* RERA Number */}
            <div className="mb-6 inline-block bg-white/5 border border-white/10 px-3 py-1.5 rounded text-xs text-[#B8975A] font-medium tracking-wide">
              RERA No: A52100044024
            </div>

            {/* Social Links including Google Business Profile */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: 'bi-facebook', href: 'https://www.facebook.com/share/1LZ8iBYHtQ/?mibextid=wwXIfr' },
                { icon: 'bi-instagram', href: 'https://www.instagram.com/nanded_city_best_properties' },
                { icon: 'bi-google', href: 'https://maps.app.goo.gl/vFvbeVZCmtCFwNVLA?g_st=ic' },
                { icon: 'bi-whatsapp', href: 'https://wa.me/919623935935' },
              ].map(({ icon, href }) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#B8975A] hover:text-[#B8975A] transition-all duration-300"
                >
                  <i className={`bi ${icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-5 font-sans">
              Quick Links
            </h5>
            <div className="flex flex-col gap-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about-us', label: 'About Us' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/properties', label: 'All Properties' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-white/40 text-sm hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Explore / Browse By */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-5 font-sans">
              Explore
            </h5>
            <div className="flex flex-col gap-3">
              {[
                { to: '/properties?status=Sale', label: 'Properties for Sale' },
                { to: '/properties?status=Rent', label: 'Properties for Rent' },
                { to: '/properties?search=Nanded+City', label: 'Nanded City Listings' },
                { to: '/properties?search=Pune', label: 'Pune Region' },
              ].map(({ to, label }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-white/40 text-sm hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[11px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-5 font-sans">
              Contact
            </h5>
            <div className="flex flex-col gap-3 text-white/40 text-sm">
              <p className="leading-relaxed">
                Shop No. G-97, Destination Centre-1, Opposite to D-Mart, <br />
                Nanded City Pune - 411041
              </p>
              <a href="tel:+919623935935" className="text-white/40 hover:text-white transition-colors">
                +91 96239 35935
              </a>
              <a href="mailto:info@bestproperties.com" className="text-white/40 hover:text-white transition-colors">
                info@bestproperties.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/20">
          <p>© {new Date().getFullYear()} BEST Properties. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/admin" 
              className="text-white/30 hover:text-[#B8975A] transition-colors duration-200 tracking-wider uppercase text-[10px]"
            >
              Admin Portal ↗
            </Link>
            
            <a 
              href="https://www.vidyasofficial.world/" 
              target="_blank" 
              rel="noreferrer"
              className="text-white/30 hover:text-white transition-colors duration-200"
            >
              Designed & Developed by Vidya Tandel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;