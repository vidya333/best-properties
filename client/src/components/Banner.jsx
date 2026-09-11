import React, { useState, useEffect } from 'react';
import EnquiryModal from './EnquiryModal';

const slides = [
  {
    img: '/images/ecopark1.jpg',
    label: 'Welcome To',
    title: 'BEST Properties &\nDevelopers',
    sub: 'BEST Properties – Madhukar Mangnale | Real Estate Agent',
    desc: 'Your trusted partner in Nanded City Pune. Delivering absolute transparency, unyielding trust, and deep-rooted local expertise to bring you your dream spaces.',
  },
  {
    img: '/images/circle.jpg',
    label: 'Residential',
    title: 'Find Your Perfect\nHome in Pune',
    sub: 'Premium apartments & villas in Nanded City',
    desc: 'Discover luxurious living spaces thoughtfully designed for modern families. Nestled in prime locations across Nanded City, Pune, our properties blend world-class amenities with tranquil surroundings.',
  },
  {
    img: '/images/droneview.jpg',
    label: 'Investment',
    title: 'Smart Property\nInvestments',
    sub: 'High-value properties with exceptional returns',
    desc: 'Maximize your wealth with handpicked real estate opportunities across high-growth corridors. Benefit from strong capital appreciation, high rental yields, and seamless end-to-end guidance.',
  },
  {
    img: '/images/nandedcity.jpg',
    label: 'Commercial',
    title: 'Premium Commercial\nSpaces',
    sub: 'Where business meets opportunity in Pune',
    desc: 'Position your business for success in prime corporate hubs. Offering modern office spaces, high-footfall retail units, and state-of-the-art infrastructure tailored for modern enterprises.',
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
  //   }
  // };

  const slide = slides[current];

  return (
    <div className="relative h-screen min-h-[790px] overflow-hidden mt-2 bg-[#0D0D0D]">
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${s.img})`,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85" />

      {/* Main Content Area */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-20">
        
        {/* Fixed Height Wrapper to Stop Layout Shifting */}
        <div className="min-h-[280px] sm:min-h-[320px] max-w-2xl flex flex-col justify-end">
          {/* Category Tag */}
          <div>
            <span className="inline-block border border-[#B8975A]/60 text-[#B8975A] text-[11px] tracking-[4px] uppercase px-3.5 py-1 mb-3 font-semibold">
              {slide.label}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-2 whitespace-pre-line">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[#B8975A] text-base sm:text-lg font-medium mb-2">
            {slide.sub}
          </p>

          {/* Paragraph */}
          <p className="text-white/75 text-sm sm:text-base leading-relaxed font-light min-h-[60px]">
            {slide.desc}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-6 mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#B8975A] hover:bg-[#9A7A42] text-white px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 shadow-md"
          >
            Enquire Now
          </button>
          <a
            href="#properties"
            className="border border-white/40 hover:border-[#B8975A] text-white hover:text-[#B8975A] px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 no-underline"
          >
            View Properties
          </a>
        </div>

        {/* Search bar */}
        {/* <form
          onSubmit={handleSearch}
          className="bg-black/40 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row max-w-2xl w-full shadow-2xl"
        >
          <input
            type="text"
            placeholder="Search by location or property name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/60 px-5 py-3 text-sm outline-none font-sans"
          />
          <button
            type="submit"
            className="bg-[#B8975A] hover:bg-[#9A7A42] text-white px-8 py-3 text-sm font-medium tracking-wide transition-all whitespace-nowrap"
          >
            Search
          </button>
        </form> */}

        {/* Slide Indicator Dots */}
        <div className="flex gap-2 mt-0">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[3px] transition-all duration-300 ${
                i === current ? 'w-8 bg-[#B8975A]' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Stats Belt - Fixed Absolute Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full bg-[#0D0D0D]/90 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 divide-x divide-white/10">
          {[
            { num: '43+', label: 'Properties' },
            { num: '1K+', label: 'Happy Clients' },
            { num: '20+', label: 'Years Experience' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center py-3 sm:py-4">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#B8975A]">{num}</div>
              <div className="text-[10px] sm:text-[11px] tracking-[2px] uppercase text-white/50 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Banner;