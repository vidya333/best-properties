import React, { useState, useEffect } from 'react';
import { API } from '../config';
import { Link } from 'react-router-dom';

const formatPrice = (value) => {
  if (!value) return 'N/A';
  const formatSingle = (num) => {
    num = Number(num);
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)} L`;
    if (num >= 1000) return `${Math.round(num / 1000)}K`;
    return num;
  };
  if (typeof value === 'string' && value.includes('-')) {
    const [min, max] = value.split('-');
    return `${formatSingle(min)} – ${formatSingle(max)}`;
  }
  return formatSingle(value);
};

const getFullUrl = (path) => {
  if (!path) return '/images/builder1.jpg';
  if (path.startsWith('http') || path.startsWith('/images/')) return path;
  if (path.startsWith('images/')) return `/${path}`;
  return `${API}${path}`;
};

const PropertyCard = ({ property }) => {
  const { 
    title, 
    location, 
    price, 
    description, 
    imageUrl, 
    images, 
    brokerEmail, 
    brokerPhone, 
    rent, 
    type 
  } = property;

  const rawImgArray = Array.isArray(images) && images.length > 0 ? images : (imageUrl ? [imageUrl] : []);
  const imgArray = rawImgArray.length > 0 ? rawImgArray.map(img => getFullUrl(img)) : ['/images/builder1.jpg'];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imgArray.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(p => (p + 1) % imgArray.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [imgArray.length]);

  return (
    <div className="group bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Image */}
      <Link to={`/property/${property._id}`}>
        <div className="relative h-56 overflow-hidden bg-gray-100">
          <img
            src={imgArray[currentIndex]}
            alt={title || "Property"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/builder1.jpg';
            }}
          />
          {/* Type badge */}
          <div className="absolute top-3 left-3 bg-[#B8975A] text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-1">
            {type?.replace('IndependentHouse/', '') || 'Property'}
          </div>
          {/* Dot indicators */}
          {imgArray.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {imgArray.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.preventDefault(); setCurrentIndex(i); }}
                  className={`h-[2px] transition-all duration-300 ${i === currentIndex ? 'w-5 bg-[#B8975A]' : 'w-2 bg-white/60'}`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Card Content Area */}
      <div className="p-3 sm:p-4 bg-white flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-serif text-base font-bold text-[#0D0D0D] truncate mb-1" title={title || "Spacious Property"}>
            {title || "Spacious Property"}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mb-2">
            <i className="bi bi-geo-alt-fill text-[#B8975A] text-xs"></i>
            <span className="truncate">{location || "Location not specified"}</span>
          </div>

          {/* Short Description Snippet */}
          {description && (
            <p className="text-xs text-gray-500 line-clamp-1 mb-3">
              {description}
            </p>
          )}

          {/* Price & Rent */}
          <div className="flex items-center gap-6 mb-3">
            {price && (
              <div>
                <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Price</span>
                <span className="text-sm font-bold text-[#0D0D0D]">₹{formatPrice(price)}</span>
              </div>
            )}
            {rent && (
              <div>
                <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Rent</span>
                <span className="text-sm font-bold text-[#0D0D0D]">₹{formatPrice(rent)}/mo</span>
              </div>
            )}
          </div>
        </div>

        {/* Divider & Action Buttons */}
        <div className="pt-2.5 border-t border-gray-100 flex items-center gap-1.5">
          <a
            href={`https://wa.me/${brokerPhone || "919112456000"}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-1.5 px-2 rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <i className="bi bi-whatsapp"></i>
            <span>WhatsApp</span>
          </a>

          <a
            href={`mailto:${brokerEmail || "vidya.nk07@gmail.com"}?subject=Inquiry%20for%20${encodeURIComponent(title || "Property")}`}
            className="flex-1 bg-[#1A1A1A] hover:bg-black text-white py-1.5 px-2 rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <i className="bi bi-envelope-fill text-[11px]"></i>
            <span>Email</span>
          </a>

          <a
            href={`tel:${brokerPhone || "+919112456000"}`}
            className="flex-1 border border-gray-200 hover:border-[#B8975A] text-[#B8975A] py-1.5 px-2 rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <i className="bi bi-telephone-fill text-[11px]"></i>
            <span>Call</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;