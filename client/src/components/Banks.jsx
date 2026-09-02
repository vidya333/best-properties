import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./BusinessPartner.css";

const partners = [
  "/images/BankLogos/adityabirla.jpeg",
  "/images/BankLogos/axis.jpeg",
  "/images/BankLogos/bajaj.jpeg",
  "/images/BankLogos/bandhan.jpeg",
  "/images/BankLogos/bankofbaroda.jpeg",
  "/images/BankLogos/bankofindia.jpeg",
  "/images/BankLogos/bankofmaharashtra.jpeg",
  "/images/BankLogos/centralbank.jpeg",
  "/images/BankLogos/hdfc.jpeg",
  "/images/BankLogos/icici.jpeg",
  "/images/BankLogos/idfc.jpeg",
  "/images/BankLogos/indian.jpeg",
  "/images/BankLogos/kotak.jpeg",
  "/images/BankLogos/lic.jpeg",
  "/images/BankLogos/muthoot.jpeg",
  "/images/BankLogos/pnb.jpeg",
  "/images/BankLogos/sbi.jpeg",
  "/images/BankLogos/union.jpeg",
  "/images/BankLogos/yesbank.jpeg",
];

const Banks = () => {
  return (
    <div className="partners-container mt-5">
      <h2 className="partners-title py-3">Associated Banks</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        
      >
        {partners.map((logo, index) => (
          <SwiperSlide key={index} className="mt-3">
            <img src={logo} alt={`Partner ${index + 1}`} className="partner-logo" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banks;
