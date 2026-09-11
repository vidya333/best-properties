import React from 'react';

const partners = [
  '/images/BankLogos/adityabirla.jpeg',
  '/images/BankLogos/axis.jpeg',
  '/images/BankLogos/bajaj.jpeg',
  '/images/BankLogos/bandhan.jpeg',
  '/images/BankLogos/bankofbaroda.jpeg',
  '/images/BankLogos/bankofindia.jpeg',
  '/images/BankLogos/bankofmaharashtra.jpeg',
  '/images/BankLogos/centralbank.jpeg',
  '/images/BankLogos/hdfc.jpeg',
  '/images/BankLogos/icici.jpeg',
  '/images/BankLogos/idfc.jpeg',
  '/images/BankLogos/indian.jpeg',
  '/images/BankLogos/kotak.jpeg',
  '/images/BankLogos/lic.jpeg',
  '/images/BankLogos/muthoot.jpeg',
  '/images/BankLogos/pnb.jpeg',
  '/images/BankLogos/sbi.jpeg',
  '/images/BankLogos/union.jpeg',
  '/images/BankLogos/yesbank.jpeg',
];

const Banks = () => {
  // Duplicate array for seamless endless scrolling loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="bg-white py-6 px-4 border-y border-gray-100 overflow-hidden mt-5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0D0D] tracking-wide text-center mb-6">
          Associated Banks
        </h2>

        {/* Pure Tailwind Infinite Marquee Track */}
        <div className="w-full min-w-0 overflow-hidden relative flex group">
          
          {/* Subtle Side Fades for High-End Look */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-marquee whitespace-nowrap gap-10 items-center group-hover:[animation-play-state:paused]">
            {duplicatedPartners.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center h-14 px-3 opacity-60 hover:opacity-100 transition-all duration-300 flex-shrink-0"
              >
                <img 
                  src={logo} 
                  alt={`Associated Bank ${(index % partners.length) + 1}`} 
                  className="max-h-12 max-w-[120px] object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/builder1.jpg'; // Safe fallback image if logo path misses
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded Tailwind Marquee Animation Keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Banks;