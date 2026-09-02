import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import api from '../api';

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
  const [submitted, setSubmitted] = useState(false);

  // Automatically update available/intent context if needed when prop changes
  useEffect(() => {
    // You can also pre-select or adjust form fields based on intentType here if required
  }, [intentType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Sends enquiry submission directly to database backend queue for admin review
      await api.post('/property-submissions', { ...formData, intentType });
      setSubmitted(true);
    } catch (err) {
      // Fallback: Opens email client with pre-filled details for admin
      const adminEmail = "admin@bestproperties.com";
      const subject = encodeURIComponent(`[${intentType} Inquiry] ${formData.propertyTitle}`);
      const body = encodeURIComponent(
        `Owner Name: ${formData.ownerName}\n` +
        `Phone: ${formData.ownerPhone}\n` +
        `Email: ${formData.ownerEmail}\n` +
        `Inquiry Type: ${intentType}\n` +
        `Property Title: ${formData.propertyTitle}\n` +
        `Location: ${formData.location}\n` +
        `Expected ${intentType === 'Rent' ? 'Rent' : 'Price'}: ₹${formData.expectedPrice}\n` +
        `Property Type: ${formData.propertyType}\n\n` +
        `Description:\n${formData.description}`
      );
      
      window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-black focus:outline-none"
        >
          <FaTimes />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <h3 className="font-serif font-bold text-xl text-gray-900">Inquiry Sent to Admin!</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Thank you for submitting your <strong>{intentType}</strong> request. Our admin team will review your details and get in touch with you shortly.
            </p>
            <button 
              onClick={onClose} 
              className="mt-4 bg-[#0D0D0D] text-white text-xs px-6 py-2 rounded-lg font-bold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        ) : (
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
                className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A]"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                value={formData.ownerPhone}
                onChange={e => setFormData({...formData, ownerPhone: e.target.value})}
                className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.ownerEmail}
                onChange={e => setFormData({...formData, ownerEmail: e.target.value})}
                className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A]"
              />
              <select
                value={formData.propertyType}
                onChange={e => setFormData({...formData, propertyType: e.target.value})}
                className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A] bg-white"
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
              className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Location / Address *"
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A]"
              />
              <input
                type="number"
                placeholder={`Expected ${intentType === 'Rent' ? 'Rent' : 'Price'} (₹) *`}
                required
                value={formData.expectedPrice}
                onChange={e => setFormData({...formData, expectedPrice: e.target.value})}
                className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A]"
              />
            </div>

            <textarea
              rows="3"
              placeholder="Key Details (Furnishing status, floor no., amenities...)"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#B8975A]"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0D0D0D] hover:bg-[#B8975A] hover:text-black text-white text-xs font-bold py-3 rounded-lg uppercase tracking-wider transition-all"
            >
              {submitting ? 'Submitting...' : `Send ${intentType} Inquiry to Admin`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PropertySubmissionModal;