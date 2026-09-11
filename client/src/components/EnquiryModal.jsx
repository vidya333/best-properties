import React, { useState } from 'react';

const EnquiryModal = ({ onClose, onSuccess, prefillMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: prefillMessage || '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const businessWhatsApp = "919920155441";
      
     // Formatting the details cleanly for WhatsApp
      const text = `Hii, my name is ${formData.name} (email: ${formData.email}). ${formData.message || prefillMessage || ''} You can contact me on this number: ${formData.phone}`;

      const encodedMessage = encodeURIComponent(text);
      
      // Open WhatsApp chat with prefilled message
      window.open(`https://wa.me/${businessWhatsApp}?text=${encodedMessage}`, "_blank");

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error opening WhatsApp');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white p-8 shadow-2xl border border-gray-100 rounded-none">
        
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-[#0D0D0D] text-2xl font-light transition-colors cursor-pointer" 
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        {/* Title Heading */}
        <div className="mb-6">
          <div className="text-[10px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-1">Direct Assistance</div>
          <h2 className="font-serif text-2xl font-bold text-[#0D0D0D]">Get In Touch</h2>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Your Name *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-xs p-3.5 border border-gray-200 outline-none focus:border-[#B8975A] transition-colors bg-white text-gray-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Your Email *</label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-xs p-3.5 border border-gray-200 outline-none focus:border-[#B8975A] transition-colors bg-white text-gray-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-xs p-3.5 border border-gray-200 outline-none focus:border-[#B8975A] transition-colors bg-white text-gray-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Your Enquiry / Message *</label>
            <textarea
              name="message"
              rows="4"
              required
              placeholder="I would like to download the brochure / know more details..."
              onChange={handleChange}
              value={formData.message}
              className="w-full text-xs p-3.5 border border-gray-200 outline-none focus:border-[#B8975A] transition-colors bg-white text-gray-800"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#0D0D0D] hover:bg-[#B8975A] hover:text-black text-white text-xs font-bold py-3.5 uppercase tracking-widest transition-all duration-300 cursor-pointer"
            >
              {submitting ? 'Redirecting...' : 'Send Enquiry'}
            </button>

            <button
              onClick={onClose}
              type="button"
              className="border border-gray-300 hover:border-gray-500 text-gray-700 text-xs font-bold px-6 py-3.5 uppercase tracking-widest transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EnquiryModal;