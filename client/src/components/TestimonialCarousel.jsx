import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../api'; 

const fallbackTestimonials = [
  {
    name: 'Prashant',
    location: 'Asawari, Nanded City',
    feedback: 'Truly to the name, Very Reliable & truly dependable. One can be rest assured that you will be hand held right across the entire process & deal with utter transparency & honesty. Strong recommendation!',
    tag: 'Verified Buyer',
    rating: 5,
  },
  {
    name: 'Shailesh Kulkarni',
    location: 'Destination Center, Pune',
    feedback: 'Truly to the name Reliable and truly dependable. One can trust BEST Properties for hassle free dealings. Very good knowledge in real estate. I would recommend if you want to do any Buy/Sell transactions in Nanded City.',
    tag: 'Verified Buyer',
    rating: 5,
  },
  {
    name: 'Siddhi Hegishte',
    location: 'Pancham, Nanded City',
    feedback: 'We bought a flat in Nanded City through BEST Properties. As per the name they are very Reliable and dependable. He is very responsive and honest. Strongly recommended for your real estate needs.',
    tag: 'Verified Buyer',
    rating: 5,
  },
  {
    name: 'Sukhada Bakshi',
    location: 'Sargam, Nanded City',
    feedback: 'We had a very good experience for our residential property deal. All document work and formalities were taken care of. He is quite understanding and considerate of the client needs — that\'s the best thing.',
    tag: 'Verified Buyer',
    rating: 5,
  },
  {
    name: 'Anita & Rajesh Kulkarni',
    location: 'Bageshree, Nanded City',
    feedback: 'BEST Properties made the entire buying process smooth and stress-free. They were honest, clear, and genuinely cared about our needs.',
    tag: 'Professional & Transparent',
    rating: 5,
  },
  {
    name: 'Sanjay Patwardhan',
    location: 'Commercial Investor',
    feedback: 'With their guidance, I invested in a plot that doubled in value in just 3 years. I couldn\'t be happier with the outcome!',
    tag: 'Best Investment Decision',
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials');
        if (res.data && res.data.length > 0) {
          const mappedData = res.data.map(item => ({
            name: item.clientName || 'Client',
            location: item.company ? `${item.company}${item.role ? ` - ${item.role}` : ''}` : (item.role || 'Verified Client'),
            feedback: item.message || '',
            tag: item.tag || 'Verified Buyer',
            rating: item.rating || 5,
            image: item.image ? getImageUrl(item.image) : null,
          }));
          setTestimonials(mappedData);
          setCurrent(0); // Reset index so it never goes out of bounds
        }
      } catch (err) {
        console.error("Failed to fetch backend testimonials, using fallback data:", err);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => setCurrent(p => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const item = testimonials[current];
  if (!item) return null; // Extra safety guard to prevent undefined crash

  return (
    <section className="bg-white py-16 px-6 relative overflow-hidden">
      {/* Background ambient shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#B8975A]/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-2 bg-[#B8975A]/10 px-3 py-0.5 rounded-full">
            <i className="bi bi-star-fill text-[8px]"></i> What Our Clients Say
          </div>
        </div>

        {/* Card Container - Light Theme */}
        <div className="bg-[#FAF9F5] border border-gray-200/60 rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg relative min-h-[380px] md:min-h-[320px] flex flex-col justify-between">
          
          {/* Quote Accent */}
          <div className="font-serif text-7xl text-[#B8975A]/20 absolute top-2 right-6 select-none pointer-events-none">
            “
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-grow">
            
            {/* Left Profile Box */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-full object-cover shadow-md mb-3 border-2 border-[#B8975A]"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-[#B8975A] to-[#8C6D33] rounded-full flex items-center justify-center font-serif text-white font-bold text-2xl shadow-md mb-3">
                  {item.name ? item.name.charAt(0) : 'C'}
                </div>
              )}

              <h3 className="font-semibold text-[#0D0D0D] text-lg text-center md:text-left">{item.name}</h3>
              <p className="text-xs text-[#6B6B6B] mb-2">{item.location}</p>

              <div className="bg-[#B8975A]/15 text-[#B8975A] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                {item.tag}
              </div>
            </div>

            {/* Right Quote Content */}
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="flex gap-1 text-[#B8975A] mb-3">
                {[...Array(Number(item.rating) || 5)].map((_, idx) => (
                  <i key={idx} className="bi bi-star-fill text-xs"></i>
                ))}
              </div>

              {/* Min-height container prevents layout shifts */}
              <div className="min-h-[110px] md:min-h-[90px] flex items-center">
                <p className="text-[#333333] text-base sm:text-lg leading-relaxed font-light italic">
                  "{item.feedback}"
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Row */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${i === current ? 'w-8 bg-[#B8975A]' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length)}
                className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-[#B8975A] hover:text-white transition-all flex items-center justify-center"
              >
                <i className="bi bi-arrow-left text-xs"></i>
              </button>
              <button
                onClick={() => setCurrent(p => (p + 1) % testimonials.length)}
                className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-[#B8975A] hover:text-white transition-all flex items-center justify-center"
              >
                <i className="bi bi-arrow-right text-xs"></i>
              </button>
            </div>
          </div>

        </div>

        {/* Stats Row - Light Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#B8975A]">100%</div>
            <div className="text-[11px] text-[#6B6B6B] uppercase tracking-wider mt-0.5">Transparent Deals</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#B8975A]">20+</div>
            <div className="text-[11px] text-[#6B6B6B] uppercase tracking-wider mt-0.5">Families Assisted</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#B8975A]">20+ Yrs</div>
            <div className="text-[11px] text-[#6B6B6B] uppercase tracking-wider mt-0.5">Nanded City Expertise</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#B8975A]">5 ★</div>
            <div className="text-[11px] text-[#6B6B6B] uppercase tracking-wider mt-0.5">Average Client Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
}