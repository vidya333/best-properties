import React from 'react';

export default function LocationSection() {
  return (
    <section className="bg-[#FAF9F5] py-10 px-4 sm:px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-7 h-[320px] sm:h-[380px] lg:h-auto min-h-[300px] rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <iframe
              title="Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.8115598688417!2d73.7801!3d18.4468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI2JzE4LjUiTiA3M8KwNDYnNDguNCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Right Column: Address & Details */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-1">
                Visit Our Office
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0D0D] mb-6">
                Locate Us
              </h3>

              {/* Detail Items */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="bi bi-geo-alt-fill text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider mb-0.5">Office Address</h4>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">
                      Shop No. G-97, Destination Centre-1, Opposite to D-Mart, Nanded City Pune - 411041
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="bi bi-clock-fill text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider mb-0.5">Working Hours</h4>
                    <p className="text-xs text-[#6B6B6B]">Monday – Sunday: 10:00 AM – 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="bi bi-telephone-fill text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0D0D0D] uppercase tracking-wider mb-0.5">Phone & Email</h4>
                    <p className="text-xs text-[#6B6B6B]">+91 96239 35935</p>
                    <p className="text-xs text-[#6B6B6B] -mt-3 ps-1">madhukarmangnale89@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direction Action Button */}
            <div className="pt-6 mt-6 border-t border-gray-100">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full py-2.5 text-xs font-semibold tracking-wider uppercase text-center flex items-center justify-center gap-2 rounded-sm"
              >
                <i className="bi bi-sign-turn-right text-sm"></i>
                Get Directions
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}