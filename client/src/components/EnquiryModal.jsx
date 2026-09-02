import React, { useState } from 'react';
import { API } from '../config';

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

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${API}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      alert('Enquiry submitted successfully!');
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error submitting enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white p-8 shadow-2xl border border-gray-100 rounded-none">
        
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-[#0D0D0D] text-2xl font-light transition-colors" 
          onClick={onClose}
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
              onChange={handleChange}
              className="w-full text-xs p-3.5 border border-gray-200 outline-none focus:border-[#B8975A] transition-colors bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Your Email *</label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@example.com"
              onChange={handleChange}
              className="w-full text-xs p-3.5 border border-gray-200 outline-none focus:border-[#B8975A] transition-colors bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 98765 43210"
              onChange={handleChange}
              className="w-full text-xs p-3.5 border border-gray-200 outline-none focus:border-[#B8975A] transition-colors bg-white"
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
              className="w-full text-xs p-3.5 border border-gray-200 outline-none focus:border-[#B8975A] transition-colors bg-white"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#0D0D0D] hover:bg-[#B8975A] hover:text-black text-white text-xs font-bold py-3.5 uppercase tracking-widest transition-all duration-300"
            >
              {submitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>

            <button
              onClick={onClose}
              type="button"
              className="border border-gray-300 hover:border-gray-500 text-gray-700 text-xs font-bold px-6 py-3.5 uppercase tracking-widest transition-colors"
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