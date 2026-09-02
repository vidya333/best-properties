import React, { useState, useMemo } from "react";
import { API } from '../config';
import { 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaPlay, 
  FaExpand,
  FaMapMarkerAlt,
  FaVrCardboard,
  FaVideo,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import NewProjectsSection from "./NewProjectsSection";

// 12 High-Res Fallback Items
const FALLBACK_ITEMS = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    title: "Luxury Modern Villa",
    location: "Nanded City, Pune",
    description: "4 BHK Premium Villa with private garden and modern amenities."
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    title: "Asawari Towers",
    location: "Nanded City, Pune",
    description: "Spacious 3 BHK apartment with scenic views."
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "Bageshree Walkthrough",
    location: "Sinhagad Road, Pune",
    description: "Complete virtual tour of ready-to-move 2 BHK apartments."
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    title: "Destination Centre Commercial Space",
    location: "Nanded City, Pune",
    description: "Prime retail and office spaces for high-yield investments."
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
    title: "Pancham Residences",
    location: "Nanded City, Pune",
    description: "Elegant interior designs with modular kitchen setups."
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
    title: "Sargam High-Rise Towers",
    location: "Sinhagad Road, Pune",
    description: "Ultra-luxury penthouse with private terrace."
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Township Aerial Overview",
    location: "Nanded City, Pune",
    description: "Drone view of green township landscapes and sports complexes."
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
    title: "Shubhamangalam Complex",
    location: "Nanded City, Pune",
    description: "Premium gated community with 24/7 security."
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    title: "Lalit Project Phase II",
    location: "Sinhagad Road, Pune",
    description: "Modern architectural design with spacious balconies."
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    title: "Contemporary Living Room",
    location: "Nanded City, Pune",
    description: "Sample flat interior showcasing luxury fittings."
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    title: "Clubhouse & Recreation Center",
    location: "Nanded City, Pune",
    description: "World-class clubhouse, swimming pool, and gym access."
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    title: "Executive Penthouse Suite",
    location: "Sinhagad Road, Pune",
    description: "Top-floor residence with panoramic city views."
  }
];

const Gallery = ({ items = [] }) => {
  const displayItems = items && items.length > 0 ? items : FALLBACK_ITEMS;

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API}${path}`;
  };

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return displayItems;
    return displayItems.filter((item) => item.type === activeTab);
  }, [displayItems, activeTab]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedItemIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedItemIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const selectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <div className="w-100 bg-[#FAF9F6] min-vh-100 pb-12">
      
      {/* 1. Hero Banner */}
      <section className="relative w-full min-h-[75vh]  flex items-center justify-center overflow-hidden bg-[#0D0D0D] text-white py-20">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="Gallery Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        />
        
        {/* Clean Dark Overlay (Replaced light gradient fade) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl text-center px-6 mx-auto mt-8">
          {/* Outline Pill Badge (Identical to About Us) */}
          <div className="inline-block px-5 py-1.5 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm text-[10px] sm:text-[11px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-6">
            EXCLUSIVE MEDIA SHOWCASE
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-wide text-white">
            Our Architectural Portfolio
          </h1>

          {/* Description */}
          <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Take an immersive tour through our premium developments, verified site photos, and high-definition luxury walk-through videos.
          </p>
        </div>
      </section>

      {/* 2. 360° Virtual Tour Banner Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 mb-12">
        <div className="bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#262626] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#B8975A]/20 border border-[#B8975A]/40 flex items-center justify-center shrink-0">
              <FaVrCardboard className="text-3xl text-[#B8975A]" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-[2px] text-[#B8975A] uppercase">
                Interactive Experience
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-0.5">
                Explore 360° Virtual Walkthroughs
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light mt-1 max-w-xl">
                Experience full 3D interactive site visits right from your phone or desktop before scheduling an in-person viewing.
              </p>
            </div>
          </div>
          <a
            href="#inquiry"
            className="shrink-0 bg-[#B8975A] hover:bg-[#9A7A42] text-white px-6 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-lg hover:scale-105"
          >
            Launch Virtual Tour
          </a>
        </div>
      </div>

      {/* 3. Main Media Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        
        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-3 mb-10">
          {[
            { id: "all", label: "All Media" },
            { id: "image", label: "Photos" },
            { id: "video", label: "Video Tours" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedItemIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#B8975A] text-white shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedItemIndex(index)}
              className="group relative h-[300px] sm:h-[340px] rounded-2xl overflow-hidden bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {item.type === "image" ? (
                <img
                  src={getFullUrl(item.src)}
                  alt={item.title || `gallery-${index}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                />
              ) : (
                <video
                  src={getFullUrl(item.src)}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              )}

              {/* Hover Dark Card Detail Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <div className="flex items-end justify-between text-white">
                  <div className="pr-4">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#B8975A] text-[9px] uppercase font-bold tracking-widest text-white mb-2">
                      {item.type === "image" ? "Photo" : "Video Tour"}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mb-1">
                      {item.title || `Property View #${index + 1}`}
                    </h4>
                    {item.location && (
                      <p className="text-xs text-white/80 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[#B8975A]" />
                        {item.location}
                      </p>
                    )}
                  </div>

                  <div className="w-10 h-10 shrink-0 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white group-hover:scale-110 transition-transform">
                    {item.type === "image" ? <FaExpand className="text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Township Master Plan Map Highlights */}
      <section className="bg-white py-16 border-y border-gray-200/60 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#B8975A]">
              Township Layout
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 mt-1">
              Master Plan Highlights
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Locate major sectors, green belts, and commercial hubs across Nanded City.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Residential Towers",
                subtitle: "Asawari, Sargam & Pancham",
                desc: "High-rise towers designed with maximum cross-ventilation and panoramic valley views.",
                tag: "Phase I & II"
              },
              {
                title: "Destination Centre",
                subtitle: "Commercial & Retail Hub",
                desc: "Walkable shopping plazas, essential stores, banks, and dining spots built right inside.",
                tag: "Township Center"
              },
              {
                title: "Sports & Green Spaces",
                subtitle: "Clubhouse & Eco Park",
                desc: "Over 70% open green space with jogging tracks, swimming pools, and tennis courts.",
                tag: "Lifestyle"
              }
            ].map((box, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FAF9F6] border border-gray-200/80 hover:border-[#B8975A] transition-all duration-300">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#B8975A] bg-[#B8975A]/10 px-3 py-1 rounded-full">
                  {box.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mt-4 mb-1">{box.title}</h3>
                <h4 className="text-xs text-[#B8975A] font-semibold mb-3">{box.subtitle}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. In-Gallery Live Tour Request Form */}
      <section id="inquiry" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#111111] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-[#B8975A]/20 border border-[#B8975A]/40 text-[#B8975A] flex items-center justify-center mx-auto mb-4">
              <FaVideo className="text-lg" />
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold">
              Want a Personalized Live Video Tour?
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2 mb-8">
              Can't visit in person? Our property advisors will walk you through any project live over WhatsApp video call.
            </p>

            {formSubmitted ? (
              <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 flex items-center justify-center gap-2 text-sm">
                <FaCheckCircle /> Request received! Our advisor will connect with you shortly.
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#B8975A]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#B8975A]"
                />
                <button
                  type="submit"
                  className="bg-[#B8975A] hover:bg-[#9A7A42] text-white px-6 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <FaPaperPlane className="text-xs" /> Request Tour
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. Lightbox Zoom Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedItemIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedItemIndex(null)}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all"
            title="Close Lightbox"
          >
            <FaTimes className="text-lg" />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-[#B8975A] text-white flex items-center justify-center border border-white/20 transition-all"
            title="Previous Item"
          >
            <FaChevronLeft className="text-base" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-[#B8975A] text-white flex items-center justify-center border border-white/20 transition-all"
            title="Next Item"
          >
            <FaChevronRight className="text-base" />
          </button>

          {/* Active Content Overlay */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === "image" ? (
              <img
                src={getFullUrl(selectedItem.src)}
                alt={selectedItem.title || "Zoomed Preview"}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            ) : (
              <video
                src={getFullUrl(selectedItem.src)}
                controls
                autoPlay
                loop
                playsInline
                className="max-w-full max-h-[70vh] w-full rounded-xl shadow-2xl border border-white/10"
              />
            )}

            {/* Detailed Caption Footer in Lightbox */}
            <div className="text-center text-white mt-4 max-w-xl">
              <h3 className="font-serif text-xl font-bold">{selectedItem.title}</h3>
              {selectedItem.location && (
                <p className="text-xs text-[#B8975A] font-medium mt-1 flex items-center justify-center gap-1">
                  <FaMapMarkerAlt /> {selectedItem.location}
                </p>
              )}
              {selectedItem.description && (
                <p className="text-xs text-white/70 mt-2 font-light">{selectedItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* new projects */}
      <NewProjectsSection/>
    </div>
  );
};

export default Gallery;