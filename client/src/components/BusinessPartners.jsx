import React from 'react';

const partners = [
  '/images/BusinessPartners/nandedcity.jpeg',
  '/images/BusinessPartners/abhinandan.jpeg',
  '/images/BusinessPartners/bramha.jpeg',
  '/images/BusinessPartners/godrej.jpeg',
  '/images/BusinessPartners/hiranandani.jpeg',
  '/images/BusinessPartners/kalpataru.jpeg',
  '/images/BusinessPartners/koltepatil.jpeg',
  '/images/BusinessPartners/krisala.jpeg',
  '/images/BusinessPartners/kumarproperties.jpeg',
  '/images/BusinessPartners/lodha.jpeg',
  '/images/BusinessPartners/magarpatta.jpeg',
  '/images/BusinessPartners/nyati.jpeg',
  '/images/BusinessPartners/panchratna.jpeg',
  '/images/BusinessPartners/paranjape.jpeg',
  '/images/BusinessPartners/riverview.jpeg',
  '/images/BusinessPartners/shapoorji.jpeg',
  '/images/BusinessPartners/tatacapital.jpeg',
  '/images/BusinessPartners/vanaha.jpeg',
  '/images/BusinessPartners/vilasjavdekar.jpeg',
  '/images/BusinessPartners/vtp.jpeg',
];

const BusinessPartners = () => {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="bg-white py-4 px-4 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-6">
        
        {/* Compact Inline Label */}
        <div className="flex-shrink-0 text-center md:text-left z-10 bg-white md:pr-4">
          <div className="text-[16px] font-semibold tracking-[2px] uppercase text-[#B8975A]">
            Trusted Builders
          </div>
          <h2 className="font-serif text-sm font-bold text-[#0D0D0D] tracking-wide whitespace-nowrap">
            Our Business Partners
          </h2>
        </div>

        {/* Pure Tailwind Infinite Marquee Ticker */}
        <div className="w-full min-w-0 overflow-hidden relative flex group">
          
          {/* Gradient Fade Edges for Luxury Look */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-marquee whitespace-nowrap gap-8 items-center group-hover:[animation-play-state:paused]">
            {duplicatedPartners.map((logo, i) => (
              <div 
                key={i} 
                className="flex items-center justify-center h-10 px-2 opacity-70 hover:opacity-100 transition-all duration-300 flex-shrink-0"
              >
                <img
                  src={logo}
                  alt={`Partner ${(i % partners.length) + 1}`}
                  className="max-h-9 max-w-[95px] object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/builder1.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Tailwind Custom Keyframes Injection */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BusinessPartners;