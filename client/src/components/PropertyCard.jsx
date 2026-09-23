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
    videos, 
    brokerEmail, 
    brokerPhone, 
    rent, 
    type 
  } = property;

  // Combine images and videos into a single media array
  const rawImages = Array.isArray(images) && images.length > 0 ? images : (imageUrl ? [imageUrl] : []);
  const rawVideos = Array.isArray(videos) ? videos : [];
  
  const rawMediaArray = [...rawImages, ...rawVideos];
  const mediaArray = rawMediaArray.length > 0 ? rawMediaArray.map(m => getFullUrl(m)) : ['/images/builder1.jpg'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (mediaArray.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(p => (p + 1) % mediaArray.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [mediaArray.length]);

  const propertyUrl = `${window.location.origin}/property/${property._id}`;
  const shareText = `Check out this property: ${title || 'Property'} at ${location || 'Nanded City'}!`;

  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(propertyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareInstagram = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(false);

    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'Property',
          text: shareText,
          url: propertyUrl,
        });
        return;
      } catch (err) {
        if (err?.name === 'AbortError') return;
      }
    }

    navigator.clipboard.writeText(propertyUrl);
    alert("Property link copied! Open Instagram and paste it into a DM or your story.");
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/video/upload/');
  };

  return (
    <div className="group bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
      {/* Media & Link Wrapper */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Link to={`/property/${property._id}`} className="block w-full h-full">
          {isVideo(mediaArray[currentIndex]) ? (
            <video
              src={mediaArray[currentIndex]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={mediaArray[currentIndex]}
              alt={title || "Property"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/builder1.jpg';
              }}
            />
          )}
        </Link>

        {/* Type badge */}
        <div className="absolute top-3 left-3 bg-[#B8975A] text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-1 pointer-events-none">
          {type?.replace('IndependentHouse/', '') || 'Property'}
        </div>

        {/* Share Button Overlay */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowShareMenu(!showShareMenu);
            }}
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            title="Share Property"
          >
            <i className="bi bi-share-fill text-xs text-[#B8975A]"></i>
          </button>

          {showShareMenu && (
            <div 
              className="absolute right-0 top-10 bg-white rounded-lg shadow-xl border border-gray-200 p-2 w-48 z-30 text-left animate-fadeIn"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <div className="text-[10px] font-bold text-gray-400 uppercase px-2 pb-1 mb-1 border-b border-gray-100">
                Share Property
              </div>
              
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + propertyUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
                onClick={(e) => { e.stopPropagation(); setShowShareMenu(false); }}
              >
                <i className="bi bi-whatsapp text-[#25D366]"></i> WhatsApp
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
                onClick={(e) => { e.stopPropagation(); setShowShareMenu(false); }}
              >
                <i className="bi bi-facebook text-[#1877F2]"></i> Facebook
              </a>

              <button
                onClick={handleShareInstagram}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors text-left cursor-pointer"
              >
                <i className="bi bi-instagram text-[#E4405F]"></i> Instagram
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#B8975A] font-medium hover:bg-gray-50 rounded transition-colors text-left border-t border-gray-100 mt-1 pt-1.5 cursor-pointer"
              >
                <i className="bi bi-clipboard"></i> {copied ? 'Copied Link!' : 'Copy Link'}
              </button>
            </div>
          )}
        </div>

        {/* Media indicator dots */}
        {mediaArray.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 pointer-events-none z-10">
            {mediaArray.map((_, i) => (
              <span
                key={i}
                className={`h-[2px] transition-all duration-300 ${i === currentIndex ? 'w-5 bg-[#B8975A]' : 'w-2 bg-white/60'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-3 sm:p-4 bg-white flex flex-col justify-between">
        <div>
          <Link to={`/property/${property._id}`}>
            <h3 className="font-serif text-base font-bold text-[#0D0D0D] truncate mb-1 hover:text-[#B8975A] transition-colors" title={title || "Spacious Property"}>
              {title || "Spacious Property"}
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mb-2">
            <i className="bi bi-geo-alt-fill text-[#B8975A] text-xs"></i>
            <span className="truncate">{location || "Location not specified"}</span>
          </div>

          {description && (
            <p className="text-xs text-gray-500 line-clamp-1 mb-3">
              {description}
            </p>
          )}

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

        {/* Action Buttons */}
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
            href={`mailto:${brokerEmail || "madhukarmangnale89@gmail.com"}?subject=Inquiry%20for%20${encodeURIComponent(title || "Property")}`}
            className="flex-1 bg-[#1A1A1A] hover:bg-black text-white py-1.5 px-2 rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <i className="bi bi-envelope-fill text-[11px]"></i>
            <span>Email</span>
          </a>

          <a
            href={`tel:${brokerPhone || "+919623935935"}`}
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