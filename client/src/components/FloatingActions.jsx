import React from 'react';

export default function FloatingActions() {
  const phoneNumber = '919623935935'; 

  return (
    <div className="fixed bottom-20 mb-7 right-6 z-50 flex flex-col gap-2">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=Hi%2C%20I%20am%20interested%20in%20properties%20at%20Nanded%20City.`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      >
        <i className="bi bi-whatsapp text-xl"></i>
      </a>

      {/* Call Button */}
      <a
        href={`tel:+${phoneNumber}`}
        aria-label="Call Us"
        className="w-12 h-12 bg-[#B8975A] hover:bg-[#9A7A42] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      >
        <i className="bi bi-telephone-fill text-lg"></i>
      </a>
    </div>
  );
}