import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyTypeSlider.css";

const propertyTypes = [
  {
    type: "residential-apartment",
    label: "Residential Apartment",
    count: 45,
    image: "/images/residential-apartment.jpg",
    bgColor: "#E0FFFF",
  },
  {
    type: "residential-land",
    label: "Residential Land",
    count: 20,
    image: "/images/residential-land.jpg",
    bgColor: "#E6E6FA",
  },
  {
    type: "independent-house-villa",
    label: "Independent House / Villa",
    count: 15,
    image: "/images/independent-house.jpg",
    bgColor: "#FFFACD",
  },
  {
    type: "commercial-property",
    label: "Commercial Property",
    count: 5,
    image: "/images/serviced-apartment.jpg",
    bgColor: "#F0D9FF",
  },
  {
    type: "builder-floor",
    label: "Builder Floor",
    count: 10,
    image: "/images/independent-builder.jpg",
    bgColor: "#F5DEB3",
  },
  {
    type: "1rk-studio-apartment",
    label: "1 RK/ Studio Apartment",
    count: 70,
    image: "/images/1rk-studio-apartment.jpg",
    bgColor: "#FFE5B4",
  },
  {
    type: "farm-house",
    label: "Farm House",
    count: 8,
    image: "/images/farmhouse.jpg",
    bgColor: "#D0F0C0",
  },
  {
    type: "serviced-apartment",
    label: "Serviced Apartments",
    count: 5,
    image: "/images/serviced-apartment.jpg",
    bgColor: "#F0D9FF",
  },
];

const PropertyTypeSlider = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

 const scrollRight = () => {
  if (sliderRef.current) {
    const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;

    // Add tolerance to avoid floating point issues
    if (scrollLeft + clientWidth >= scrollWidth - 5) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  }
};

  const handleClick = (type) => {
    navigate(`/properties/type/${type}`);
  };

  useEffect(() => {
  const interval = setInterval(scrollRight, 3000);
  return () => clearInterval(interval);
}, []);


  return (
    <div className="property-slider-wrapper my-0">
      <div className="property-type-slider-container">
        <button className="property-type-scroll-btn left" onClick={scrollLeft}>
          &#10094;
        </button>

        <div className="property-type-slider" ref={sliderRef}>
          {propertyTypes.map((item, index) => (
            <div
              key={index}
              className="property-type-card"
              onClick={() => handleClick(item.type)}
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="property-type-info px-lg-4">
                <h3>{item.label}</h3>
                {/* <p>{item.count}+ Properties</p> */}
              </div>
              <img src={item.image} alt={item.label} />
            </div>
          ))}
        </div>

        <button className="property-type-scroll-btn right" onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default PropertyTypeSlider;
