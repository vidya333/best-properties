import React, { useEffect, useState } from "react";
import api from "../api";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { API } from '../config';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EnquiryModal from "./EnquiryModal";

// Fallback Mock Projects matching public/images folder
const FALLBACK_PROJECTS = [
  {
    _id: "p1",
    title: "Destination Center Luxury Hub",
    subtitle: "Premium Commercial & Office Spaces",
    description: "Experience state-of-the-art office spaces located at the heart of Nanded City. Ideal for businesses looking for modern infrastructure, ample parking, and maximum footfall.",
    features: [
      "24/7 Security & High-Speed Elevators",
      "Ample Multi-Level Parking",
      "100% Power Backup for Common Areas",
      "Proximity to Main Highway",
      "Modern Clubhouse",
      "Fully Equipped Gymnasium"
    ],
    images: ["/images/builder2.jpg", "/images/builder1.jpg"],
    brochure: "/images/builder1.jpg",
    whatsappNumber: "919876543210",
    email: "info@bestproperties.com"
  },
  {
    _id: "p2",
    title: "Asawari Towers",
    subtitle: "Exclusive Modern Living",
    description: "Ultra-luxury residential apartments designed with high-end architecture, private balconies overlooking lush green garden views, and smart home provisions.",
    features: [
      "Clubhouse & Swimming Pool",
      "Fully Equipped Gymnasium",
      "Children's Play Area & Jogging Track",
      "Lush Green Central Park",
      "Indoor Games Room",
      "24/7 Centralized Security"
    ],
    images: ["/images/builder3.jpg", "/images/builder4.jpg"],
    brochure: "/images/builder3.jpg",
    whatsappNumber: "919876543210",
    email: "info@bestproperties.com"
  }
];

// Helper to handle Cloudinary, local server, and root static paths
const getFullUrl = (path) => {
  if (!path) return "/images/builder1.jpg";
  if (path.startsWith("http") || path.startsWith("/images/")) return path;
  if (path.startsWith("images/")) return `/${path}`;
  return `${API}${path}`;
};

function SkeletonLoader() {
  return (
    <section className="bg-[#F8F5F0] py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
        <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-10"></div>
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#eae5d9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 h-[350px] bg-gray-200 rounded-xl"></div>
            <div className="lg:col-span-7 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProjectCard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState("");
  const [prefillMessage, setPrefillMessage] = useState("");

  useEffect(() => {
    api.get("/projects")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      })
      .catch((err) => {
        console.warn("Error/Server Disconnected, showing fallback projects:", err);
        setProjects(FALLBACK_PROJECTS);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  const handleBrochureClick = (brochureUrl, projectTitle) => {
    setSelectedBrochure(getFullUrl(brochureUrl));
    setPrefillMessage(`I am interested in the brochure for: ${projectTitle}`);
    setShowModal(true);
  };

  const handleFormSuccess = () => {
    if (selectedBrochure) {
      window.open(selectedBrochure, "_blank");
      setSelectedBrochure("");
    }
  };

  return (
    <section className="bg-[#F8F5F0] py-16 px-2 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-[11px] font-semibold tracking-[4px] uppercase text-[#B8975A] text-center mb-2">
          New Launches
        </div>
        <h2 className="font-serif text-3xl font-bold text-center text-[#0D0D0D] mb-10">
          Featured Projects
        </h2>

        <Swiper 
          modules={[Navigation]} 
          spaceBetween={20} 
          slidesPerView={1} 
          navigation={false}
          autoHeight={true}
        >
          {projects.map((project) => (
            <SwiperSlide key={project._id} className="h-auto">
              <ProjectSlide project={project} onBrochureClick={handleBrochureClick} />
            </SwiperSlide>
          ))}
          <CustomNavButtons />
        </Swiper>
      </div>

      {showModal && (
        <EnquiryModal
          onClose={() => setShowModal(false)}
          onSuccess={handleFormSuccess}
          prefillMessage={prefillMessage}
        />
      )}
    </section>
  );
}

function ProjectSlide({ project, onBrochureClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rawImages = Array.isArray(project.images) && project.images.length > 0 ? project.images : ["/images/builder1.jpg"];
  const projectImages = rawImages.map(img => getFullUrl(img));

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#eae5d9] p-3 sm:p-6 lg:p-8 mx-1 sm:mx-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Left Column: Image Container */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[420px] rounded-xl overflow-hidden border border-[#eae5d9]">
            <img
              src={projectImages[currentIndex]}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/builder1.jpg";
              }}
            />

            {projectImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-[#212529] shadow-md flex items-center justify-center hover:bg-white transition-all z-10 cursor-pointer"
                  title="Previous Image"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                <button 
                  onClick={nextImage}
                  className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-[#212529] shadow-md flex items-center justify-center hover:bg-white transition-all z-10 cursor-pointer"
                  title="Next Image"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 p-1 rounded-pill bg-black/30 backdrop-blur-xs z-10">
                  {projectImages.map((_, index) => (
                    <span
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className="cursor-pointer transition-all duration-300 rounded-full"
                      style={{
                        width: index === currentIndex ? "20px" : "8px",
                        height: "8px",
                        backgroundColor: index === currentIndex ? "#fff" : "rgba(255,255,255,0.5)"
                      }}
                    ></span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Project Details */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#B8975A] mb-1">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
            {project.subtitle}
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
            {project.description}
          </p>

          {project.features && (
            <div className="mb-6">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0D0D0D] mb-3 border-b border-[#eae5d9] pb-2">
                Key Features & Amenities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#B8975A] font-bold">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#eae5d9]">
            <p className="text-sm font-semibold text-[#0D0D0D] mb-0.5">Where business meets opportunity!</p>
            <p className="text-xs text-gray-400 mb-4">Book your space now – Limited availability!</p>

            <div className="flex flex-wrap gap-3">
              <button
                className="px-5 py-2.5 rounded-full bg-[#B8975A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#a3824b] transition-all shadow-xs cursor-pointer"
                onClick={() => onBrochureClick(project.brochure, project.title)}
              >
                Download Brochure
              </button>
              <a
                href={`https://wa.me/${project.whatsappNumber || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-[#B8975A] text-[#B8975A] text-xs font-bold uppercase tracking-widest hover:bg-[#B8975A] hover:text-white transition-all text-decoration-none"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${project.email || ''}`}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-widest hover:border-gray-800 transition-all text-decoration-none"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function CustomNavButtons() {
  const swiper = useSwiper();
  return (
    <div className="flex justify-center items-center gap-2 mt-8 px-2">
      <button 
        className="px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-white transition-all bg-white cursor-pointer shadow-xs" 
        onClick={() => swiper.slidePrev()}
      >
        ← Prev
      </button>
      <button 
        className="px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-white transition-all bg-white cursor-pointer shadow-xs" 
        onClick={() => swiper.slideNext()}
      >
        Next →
      </button>
    </div>
  );
}