import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const PropertySubmissionModal = ({ intentType, onClose }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    propertyTitle: '',
    location: '',
    expectedPrice: '',
    propertyType: '2 BHK Apartment',
    description: ''
  });
  
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // You can pre-select or adjust form fields based on intentType here if required
  }, [intentType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const businessWhatsApp = "919623935935";
      const priceLabel = intentType === 'Rent' ? 'Expected Rent' : 'Expected Price';
      
      // Formatting details matching your requested style
      const text = `Hii, my name is ${formData.ownerName} (email: ${formData.ownerEmail || 'N/A'}). ` +
                   `I want to submit a *${intentType}* request for my property *${formData.propertyTitle}* located at *${formData.location}* ` +
                   `(${formData.propertyType}, ${priceLabel}: ₹${formData.expectedPrice}). ` +
                   `Details: ${formData.description || 'N/A'}. ` +
                   `You can contact me on this number: ${formData.ownerPhone}`;

      const encodedMessage = encodeURIComponent(text);
      
      // Open WhatsApp directly with prefilled details
      window.open(`https://wa.me/${businessWhatsApp}?text=${encodedMessage}`, "_blank");

      onClose();
    } catch (err) {
      console.error(err);
      alert('Error opening WhatsApp');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-black focus:outline-none cursor-pointer"
          type="button"
        >
          <FaTimes />
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#B8975A] uppercase block">
              Property Inquiry
            </span>
            <h2 className="font-serif text-xl font-bold text-gray-900">
              Submit {intentType} Request
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your Name *"
              required
              value={formData.ownerName}
              onChange={e => setFormData({...formData, ownerName: e.target.value})}
              className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A] bg-white text-gray-800"
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              required
              value={formData.ownerPhone}
              onChange={e => setFormData({...formData, ownerPhone: e.target.value})}
              className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A] bg-white text-gray-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.ownerEmail}
              onChange={e => setFormData({...formData, ownerEmail: e.target.value})}
              className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A] bg-white text-gray-800"
            />
            <select
              value={formData.propertyType}
              onChange={e => setFormData({...formData, propertyType: e.target.value})}
              className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A] bg-white text-gray-800"
            >
              <option value="1 BHK Apartment">1 BHK Apartment</option>
              <option value="2 BHK Apartment">2 BHK Apartment</option>
              <option value="3 BHK Apartment">3 BHK Apartment</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Villa">Villa / Row House</option>
              <option value="Commercial">Commercial Space</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Property Name / Society Title *"
            required
            value={formData.propertyTitle}
            onChange={e => setFormData({...formData, propertyTitle: e.target.value})}
            className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A] bg-white text-gray-800"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Location / Address *"
              required
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A] bg-white text-gray-800"
            />
            <input
              type="number"
              placeholder={`Expected ${intentType === 'Rent' ? 'Rent' : 'Price'} (₹) *`}
              required
              value={formData.expectedPrice}
              onChange={e => setFormData({...formData, expectedPrice: e.target.value})}
              className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A] bg-white text-gray-800"
            />
          </div>

          <textarea
            rows="3"
            placeholder="Key Details (Furnishing status, floor no., amenities...)"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A] bg-white text-gray-800"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0D0D0D] hover:bg-[#B8975A] hover:text-black text-white text-xs font-bold py-3 rounded-lg uppercase tracking-wider transition-all cursor-pointer"
          >
            {submitting ? 'Redirecting...' : `Send ${intentType} Inquiry to WhatsApp`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertySubmissionModal;