import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; 
import EnquiryModal from '../components/EnquiryModal'; 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { API } from '../config';
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PropertyCard from '../components/PropertyCard';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaCalendarCheck, FaMapMarkerAlt } from 'react-icons/fa';

// Fallback Property Data (Only used if the ID completely fails to load)
const FALLBACK_PROPERTY = {
  _id: "demo-prop-1",
  title: "Asawari Luxury 3 BHK Residence",
  location: "Nanded City, Sinhagad Road, Pune",
  locationPin: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.44299388132!2d73.78458927598835!3d18.46359037091418!2m3!1f0!0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2961d563e4ef3%3A0x6b8aa75e03eb156d!2sNanded%20City%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  description: "Experience premium living in the heart of Nanded City. This spacious property offers panoramic skyline views, maximum natural ventilation, and access to world-class township amenities.",
  price: 9500000,
  rent: 28000,
  type: "Residential Apartment",
  flatType: "3 BHK",
  carpetArea: "1250",
  furnished: "Semi-Furnished",
  parking: "Covered Reserved",
  facing: "East",
  brokerPhone: "+919876543210",
  brokerEmail: "sales@bestproperties.com",
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
  ]
};

const FALLBACK_RELATED = [];

const formatPrice = (value) => {
  if (!value) return 'N/A';
  const n = Number(value);
  if (n >= 10000000) return `${(n/10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `${(n/100000).toFixed(1)} L`;
  if (n >= 1000) return `${Math.round(n/1000)}K`;
  return n;
};

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [related, setRelated] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState("");

  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path; 
    return `${API}${path}`; 
  };

  useEffect(() => {
    const applyFallback = () => {
      setProperty(FALLBACK_PROPERTY);
      setMainImage(FALLBACK_PROPERTY.images[0]);
      setRelated(FALLBACK_RELATED);
    };

    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        const data = res.data;
        
        if (data && data._id) {
          setProperty(data);
          const imagesArr = Array.isArray(data.images) && data.images.length 
            ? data.images 
            : (data.imageUrl ? [data.imageUrl] : []);
          
          if (imagesArr.length) setMainImage(getFullUrl(imagesArr[0]));

          const relRes = await api.get(`/properties?type=${encodeURIComponent(data.type)}`);
          if (Array.isArray(relRes.data) && relRes.data.length) {
            setRelated(relRes.data.filter(p => p._id !== data._id).slice(0, 6));
          } else {
            setRelated([]);
          }
        } else {
          applyFallback();
        }
      } catch (err) {
        applyFallback();
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="w-full min-h-screen bg-[#FAF9F6] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#B8975A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Loading Details…</p>
        </div>
      </div>
    );
  }

  const images = Array.isArray(property.images) && property.images.length 
    ? property.images 
    : (property.imageUrl ? [property.imageUrl] : []);

  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen p-0 m-0 overflow-x-hidden">
      
      {/* Top Banner */}
      <section className="relative w-full bg-[#0D0D0D] pt-24 pb-1 px-4 sm:px-8 text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full border border-[#B8975A]/40 bg-[#B8975A]/10 text-[9px] font-semibold tracking-[1.5px] uppercase text-[#B8975A] mb-1.5">
              {property.type || "Exclusive Property"}
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
              {property.title}
            </h1>
            <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
              <FaMapMarkerAlt className="text-[#B8975A] text-xs shrink-0" />
              Located in {property.location}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-1.5 text-right shrink-0">
            <span className="text-[9px] text-gray-400 block uppercase tracking-wider font-semibold">
              Guide Price
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#B8975A]">
              ₹{formatPrice(property.price)}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Gallery View (Left) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-200/60 shadow-md h-[320px] sm:h-[440px]">
              {images.length > 0 ? (
                <img 
                  src={mainImage || getFullUrl(images[0])} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No Image Available</div>
              )}
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {images.map((src, i) => {
                  const fullSrc = getFullUrl(src);
                  const isActive = fullSrc === mainImage;
                  return (
                    <button
                      key={i}
                      onClick={() => setMainImage(fullSrc)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all shrink-0 w-20 h-16 ${
                        isActive ? 'border-[#B8975A] scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={fullSrc} alt={`Thumb ${i+1}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Summary & Map Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-1">Location View</h3>
              <p className="text-xs text-gray-500">Interactive map view for instant site context</p>
            </div>

            {/* Map Frame */}
            <div className="rounded-xl overflow-hidden border border-gray-200 h-48 w-full relative">
              <iframe
                title="view on map"
                className="w-full h-full border-0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.title + ' ' + property.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                loading="lazy"
              />
              
              {property.locationPin && (
                <a
                  href={property.locationPin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white text-xs px-2.5 py-1.5 rounded-md shadow transition"
                >
                  Open in Google Maps <i className="bi bi-box-arrow-up-right ml-1"></i>
                </a>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-3 gap-2">
                <a
                  className="flex items-center justify-center gap-1.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] hover:bg-[#25D366] hover:text-white py-2.5 px-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 no-underline"
                  href={`https://wa.me/${property.brokerPhone || '918564799885'}?text=${encodeURIComponent(`Hi, I'm interested in "${property.title}" (${property.location}). Could you share more details?`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-sm" /> WhatsApp
                </a>

                <a
                  className="flex items-center justify-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-900 hover:text-white py-2.5 px-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 no-underline"
                  href={`mailto:${property.brokerEmail || 'sales@bestproperties.com'}?subject=Enquiry about ${encodeURIComponent(property.title)}&body=Hi, I'm interested in ${property.title} at ${property.location}.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FaEnvelope className="text-xs" /> Email
                </a>

                <a 
                  className="flex items-center justify-center gap-1.5 bg-[#B8975A]/10 border border-[#B8975A]/30 text-[#9A7A42] hover:bg-[#B8975A] hover:text-white py-2.5 px-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 no-underline" 
                  href={`tel:${property.brokerPhone || '918564799885'}`}
                >
                  <FaPhoneAlt className="text-xs" /> Call
                </a>
              </div>

              <button 
                className="w-full flex items-center justify-center gap-2 bg-[#111] hover:bg-[#B8975A] text-white py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg" 
                onClick={() => setShowModal(true)}
              >
                <FaCalendarCheck className="text-sm" /> Enquire / Schedule Visit
              </button>
            </div>
          </div>

        </div>

        {/* Overview & Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 p-6 sm:p-8 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-serif font-bold text-xl text-gray-900">Property Overview</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{property.description}</p>
            
            <div className="flex flex-wrap gap-6 pt-3 border-t border-gray-100 mt-4">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">Selling Price</span>
                <span className="text-base font-bold text-[#B8975A]">₹{formatPrice(property.price)}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">Expected Rent</span>
                <span className="text-base font-bold text-gray-800">₹{property.rent ? formatPrice(property.rent) : 'N/A'}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">Property Category</span>
                <span className="text-base font-bold text-gray-800">{property.type || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 space-y-3">
            <h4 className="font-serif font-bold text-lg text-gray-900">Key Features</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Flat Type</span>
                <span className="font-semibold text-gray-800">{property.flatType || 'N/A'}</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Carpet Area</span>
                <span className="font-semibold text-gray-800">{property.carpetArea ? `${property.carpetArea} sqft.` : 'N/A'}</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Furnishing</span>
                <span className="font-semibold text-gray-800">{property.furnished || 'N/A'}</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Parking</span>
                <span className="font-semibold text-gray-800">{property.parking || 'N/A'}</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Facing</span>
                <span className="font-semibold text-gray-800">{property.facing || 'N/A'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Similar Properties */}
        {related.length > 0 && (
          <section className="mt-12">
            <h4 className="font-serif font-bold text-2xl text-gray-900 mb-6">Similar Properties</h4>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              navigation
              breakpoints={{
                320: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
              }}
            >
              {related.map(p => (
                <SwiperSlide key={p._id}>
                  <PropertyCard property={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

      </div>

      {showModal && (
        <EnquiryModal 
          onClose={() => setShowModal(false)} 
          prefill={{ propertyId: property._id, propertyTitle: property.title }} 
        />
      )}
    </div>
  );
};

export default PropertyDetailPage;