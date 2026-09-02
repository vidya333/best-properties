import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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
  return (
    <section className="bg-white py-4 px-4 border-y border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-6">
        
        {/* Compact Inline Label */}
        <div className="flex-shrink-0 text-center md:text-left">
          <div className="text-[16px] font-semibold tracking-[2px] uppercase text-[#B8975A]">
            Trusted Builders
          </div>
          <h2 className="font-serif text-sm font-bold text-[#0D0D0D] tracking-wide whitespace-nowrap">
            Our Business Partners
          </h2>
        </div>

        {/* Minimal Ticker Slider Belt */}
        <div className="w-full min-w-0">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={3}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              480: { slidesPerView: 5 },
              640: { slidesPerView: 7 },
              768: { slidesPerView: 8 },
              1024: { slidesPerView: 10 },
            }}
          >
            {partners.map((logo, i) => (
              <SwiperSlide key={i}>
                <div className="flex items-center justify-center h-6 px-1 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300">
                  <img
                    src={logo}
                    alt={`Partner ${i + 1}`}
                    className="max-h-9 max-w-[95px] object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/builder1.jpg';
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default BusinessPartners;