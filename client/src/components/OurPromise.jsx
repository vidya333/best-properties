import React, { useState } from 'react';

const OurPromise = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const businessWhatsApp = "919623935935" ;
      
      // Formatting the details cleanly for WhatsApp
      const text = `Hii, my name is ${formData.name} (email: ${formData.email}). ${formData.message} You can contact me on this number: ${formData.phone}`;

      const encodedMessage = encodeURIComponent(text);
      
      // Open WhatsApp chat with prefilled message
      window.open(`https://wa.me/${businessWhatsApp}?text=${encodedMessage}`, "_blank");

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error opening WhatsApp. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#FAF9F5] py-10 px-4 sm:px-6 border-t border-gray-200" id="contact">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left — Promise text */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-[10px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-1">
            Our Commitment
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D] mb-3">
            We Promise Excellence at Every Step
          </h2>
          <p className="text-[#6B6B6B] text-xs sm:text-sm leading-relaxed mb-5">
            When you choose <strong className="text-[#B8975A] font-semibold">BEST Properties</strong>, you're not just
            finding a property - you're entering a partnership built on trust, transparency,
            and expertise.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {[
              { icon: 'bi-shield-check', text: 'Verified listings with full legal clarity' },
              { icon: 'bi-currency-rupee', text: 'Transparent pricing, zero hidden charges' },
              { icon: 'bi-headset', text: 'End-to-end support from search to possession' },
              { icon: 'bi-geo-alt', text: '20+ years of Nanded City market expertise' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 p-2.5 bg-[#FAF9F5] rounded border border-gray-100">
                <div className="w-7 h-7 rounded bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center flex-shrink-0">
                  <i className={`bi ${icon} text-xs`}></i>
                </div>
                <p className="text-[#333333] text-sm font-medium leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Contact Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-1">Get In Touch</h3>
          <p className="text-[#6B6B6B] text-xs mb-2">Fill out the form and our team will reach out shortly.</p>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-[#B8975A]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="bi bi-check2 text-[#B8975A] text-xl"></i>
              </div>
              <h4 className="font-serif text-lg text-[#0D0D0D] mb-1">Enquiry Submitted!</h4>
              <p className="text-[#6B6B6B] text-xs">We'll get back to you within 24 hours.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-[#B8975A] text-xs font-semibold underline cursor-pointer"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {[
                { name: 'name', placeholder: 'Your Name', type: 'text' },
                { name: 'email', placeholder: 'Email Address', type: 'email' },
                { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
              ].map(({ name, placeholder, type }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded px-3.5 py-2.5 text-xs text-[#0D0D0D] outline-none focus:border-[#B8975A] transition-colors bg-white"
                />
              ))}
              <textarea
                name="message"
                placeholder="Your message or enquiry..."
                value={formData.message}
                onChange={handleChange}
                rows={3}
                required
                className="w-full border border-gray-200 rounded px-3.5 py-2.5 text-xs text-[#0D0D0D] outline-none focus:border-[#B8975A] transition-colors resize-none bg-white"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#B8975A] hover:bg-[#9A7A42] text-white py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-60 mt-1 cursor-pointer"
              >
                {submitting ? 'Redirecting...' : 'Send to WhatsApp'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default OurPromise;