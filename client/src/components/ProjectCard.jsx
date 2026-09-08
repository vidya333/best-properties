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
      "Proximity to Main Highway"
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
      "Lush Green Central Park"
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

function MiniProjectLoader() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container my-5 d-flex justify-content-center align-items-center">
      <div
        className="position-relative text-center px-4 py-4"
        style={{
          width: "100%",
          maxWidth: "360px",
          borderRadius: "28px",
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* animated circles */}
        <div className="d-flex justify-content-center gap-2 mb-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff7a00, #ffb347)",
                animation: "loaderBounce 1.4s infinite ease-in-out",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        <h5 className="fw-semibold mb-1">
          Loading Properties & Projects
        </h5>

        <p
          className="text-muted mb-3"
          style={{ fontSize: "14px" }}
        >
          First visit might take few seconds...
        </p>

        {/* minimal progress */}
        <div
          style={{
            height: "5px",
            borderRadius: "999px",
            background: "#ececec",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(seconds * 5, 90)}%`,
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, #db6f0a, #dd7119)",
              transition: "width 1s ease",
            }}
          />
        </div>

        <small className="text-muted d-block mt-2">
          {seconds}s elapsed
        </small>
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
    return <MiniProjectLoader />;
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
    <section className="project-card-section container my-5">
      <Swiper modules={[Navigation]} spaceBetween={30} slidesPerView={1} navigation={false}>
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <ProjectSlide project={project} onBrochureClick={handleBrochureClick} />
          </SwiperSlide>
        ))}
        <CustomNavButtons />
      </Swiper>

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
    <div className="project-card d-flex flex-column flex-lg-row align-items-center">
      {/* Image Container with clean modern next/prev arrows and dot indicators */}
      <div 
        className="image-container position-relative w-100 flex-shrink-0 mb-4 mb-lg-0 overflow-hidden rounded shadow-sm" 
        style={{ maxWidth: "520px", height: "380px" }}
      >
        <img
          src={projectImages[currentIndex]}
          alt={project.title}
          className="w-100 h-100 object-fit-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/builder1.jpg";
          }}
        />

        {projectImages.length > 1 && (
          <>
            {/* Left Button */}
            <button 
              onClick={prevImage}
              className="position-absolute top-50 start-0 translate-middle-y ms-2 border-0 rounded-circle d-flex align-items-center justify-content-center shadow"
              style={{ width: "38px", height: "38px", background: "rgba(255, 255, 255, 0.85)", color: "#212529", zIndex: 5, transition: "all 0.2s ease" }}
              title="Previous Image"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {/* Right Button */}
            <button 
              onClick={nextImage}
              className="position-absolute top-50 end-0 translate-middle-y me-2 border-0 rounded-circle d-flex align-items-center justify-content-center shadow"
              style={{ width: "38px", height: "38px", background: "rgba(255, 255, 255, 0.85)", color: "#212529", zIndex: 5, transition: "all 0.2s ease" }}
              title="Next Image"
            >
              <i className="bi bi-chevron-right"></i>
            </button>

            {/* Pagination Dots at Bottom */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-1 p-1 rounded-pill" style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", zIndex: 5 }}>
              {projectImages.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: index === currentIndex ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    backgroundColor: index === currentIndex ? "#fff" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Details Container */}
      <div className="details-container py-2 ps-lg-5 flex-grow-1">
        <h2 className="font-serif font-bold text-dark mb-1">{project.title}</h2>
        <h3 className="text-muted fs-6 mb-3">{project.subtitle}</h3>
        <p className="text-secondary mb-3">{project.description}</p>

        {project.features && (
          <ul className="mb-4">
            {project.features.map((feature, idx) => (
              <li key={idx} className="text-secondary">• {feature}</li>
            ))}
          </ul>
        )}

        <p className="fw-bold mb-1">Where business meets opportunity!</p>
        <p className="text-muted small mb-4">Book your space now – Limited availability!</p>

        <div className="d-flex gap-2 flex-wrap">
          <button
            className="standard-btn w-auto"
            onClick={() => onBrochureClick(project.brochure, project.title)}
          >
            Download Brochure
          </button>
          <a
            href={`https://wa.me/${project.whatsappNumber || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="standard-btn w-auto text-decoration-none"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${project.email || ''}`}
            className="standard-btn w-auto text-decoration-none"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}

function CustomNavButtons() {
  const swiper = useSwiper();
  return (
    <div className="custom-nav-buttons text-center mt-3">
      <button className="btn btn-outline-dark mx-2" onClick={() => swiper.slidePrev()}>
         Prev Project
      </button>
      <button className="btn btn-outline-dark mx-2" onClick={() => swiper.slideNext()}>
        Next Project 
      </button>
    </div>
  );
}