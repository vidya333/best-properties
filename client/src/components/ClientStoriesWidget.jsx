import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api"; 

const ClientStoriesWidget = () => {
  const [clientStories, setClientStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null); // For click-to-zoom modal

  useEffect(() => {
    api.get("/media?category=client-stories")
      .then(res => {
        setClientStories(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching client stories:", err);
        setLoading(false);
      });
  }, []);

  if (loading || clientStories.length === 0) return null;

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-[#B8975A]">Client Stories & Moments</h2>
          <p className="text-muted">Hear and see how we've helped our clients find their dream spaces.</p>
        </div>
        
        <div className="row g-4 mb-4">
          {clientStories.map((item) => (
            <div key={item._id} className="col-md-3 col-sm-6">
              <div 
                className="card h-100 shadow-sm border-0 overflow-hidden cursor-pointer"
                onClick={() => setActiveImage(item)} // Opens modal on click
                style={{ cursor: "pointer" }}
              >
                <div style={{ height: "220px", overflow: "hidden" }} className="position-relative">
                  <img 
                    src={item.src} 
                    alt={item.title || "Client Story"} 
                    className="w-100 h-100 object-fit-cover transition-transform duration-300"
                    style={{ transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                  {/* Zoom hint icon overlay on hover */}
                  <div className="position-absolute bottom-0 end-0 p-2 bg-dark bg-opacity-50 text-white rounded-start">
                    <i className="bi bi-zoom-in"></i>
                  </div>
                </div>
                {item.title && (
                  <div className="card-body p-3">
                    <h6 className="card-title text-dark mb-0 text-truncate">{item.title}</h6>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery Button */}
        <div className="text-center">
          <Link to="/gallery" className="btn btn-outline-dark px-4 py-2 rounded-pill fw-semibold">
            View Full Gallery <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>

      {/* Click-to-Zoom Modal Lightbox */}
      {activeImage && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
          onClick={() => setActiveImage(null)} // Close when clicking backdrop
        >
          <div className="position-relative max-w-lg p-3 bg-white rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
            <button 
              className="position-absolute top-0 end-0 m-3 btn-close" 
              onClick={() => setActiveImage(null)}
            ></button>
            <img 
              src={activeImage.src} 
              alt={activeImage.title || "Enlarged view"} 
              className="img-fluid rounded mb-2 max-h-[70vh] object-fit-contain w-100"
              style={{ maxHeight: "70vh" }}
            />
            {activeImage.title && <h5 className="text-center text-dark mt-2">{activeImage.title}</h5>}
          </div>
        </div>
      )}
    </section>
  );
};

export default ClientStoriesWidget;