import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import api from '../api';
import LocationSection from '../components/LocationSection';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Sends contact form enquiry directly to your backend API
      await api.post('/contact-inquiries', formData);
      setSubmitted(true);
    } catch (err) {
      // Fallback: Opens email client if backend is disconnected
      const adminEmail = "admin@bestproperties.com";
      const mailSubject = encodeURIComponent(`[Website Contact] ${formData.subject || 'General Inquiry'}`);
      const mailBody = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
      );
      window.location.href = `mailto:${adminEmail}?subject=${mailSubject}&body=${mailBody}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-semibold tracking-[4px] uppercase text-[#B8975A] mb-2">Get in Touch</div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#0D0D0D] mb-4">We'd Love to Hear From You</h1>
          <p className="text-[#6B6B6B] text-sm leading-relaxed">
            Whether you're looking to buy your dream home, sell a property, or have questions about listings in Nanded City, our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 bg-[#F8F5F0] p-8 border border-gray-100 space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-2">Contact Information</h3>
              <p className="text-xs text-[#6B6B6B]">Reach out to us directly or visit our office for a consultation.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D]">Office Address</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                    Shop No. G-97, Destination Centre-1, Opposite to D-Mart, Nanded City Pune - 411041
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D]">Phone Number</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1">+91 96239 35935</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D]">Email Address</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1">contact@bestproperties.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center shrink-0">
                  <FaClock />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D]">Working Hours</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1">Monday – Sunday: 10:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Container */}
          <div className="lg:col-span-2 bg-white p-8 border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#B8975A]/20 text-[#B8975A] rounded-full flex items-center justify-center mx-auto text-2xl">✓</div>
                <h3 className="font-serif font-bold text-2xl text-[#0D0D0D]">Message Sent Successfully!</h3>
                <p className="text-xs text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. One of our senior property advisors will review your message and get back to you shortly.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', subject: '', message: '' }); }}
                  className="mt-4 border-2 border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-black text-xs font-bold uppercase tracking-widest px-6 py-3 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0D0D0D] mb-1">Send Us a Message</h3>
                  <p className="text-xs text-[#6B6B6B]">Fill out the form below and our team will respond within 24 hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full text-xs p-3.5 rounded-none border border-gray-200 focus:outline-none focus:border-[#B8975A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full text-xs p-3.5 rounded-none border border-gray-200 focus:outline-none focus:border-[#B8975A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full text-xs p-3.5 rounded-none border border-gray-200 focus:outline-none focus:border-[#B8975A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Subject / Inquiry Type</label>
                    <input
                      type="text"
                      placeholder="Property Inquiry / Site Visit"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="w-full text-xs p-3.5 rounded-none border border-gray-200 focus:outline-none focus:border-[#B8975A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    rows="5"
                    required
                    placeholder="Tell us about the property or requirements you have in mind..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full text-xs p-3.5 rounded-none border border-gray-200 focus:outline-none focus:border-[#B8975A] transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0D0D0D] hover:bg-[#B8975A] hover:text-black text-white text-xs font-bold py-4 uppercase tracking-widest transition-all duration-300"
                >
                  {submitting ? 'Sending Message...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
      {/* location */}
          <LocationSection/>
    </div>
  );
};

export default ContactPage;