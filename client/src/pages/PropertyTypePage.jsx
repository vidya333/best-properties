import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api"; // Use your custom api instance
import PropertyCard from "../components/PropertyCard";

const PropertyTypePage = () => {
  const { typeSlug } = useParams();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rentRange, setRentRange] = useState("");
  const [bhkFilter, setBhkFilter] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  const decodedType = typeSlug;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Updated to use the 'api' instance
        const response = await api.get("/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  // Apply filters logic stays the same
  useEffect(() => {
    const filtered = properties.filter((property) => {
      const matchesType = property.type === decodedType;

      const matchesSearch =
        property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchQuery.toLowerCase());

      let withinPriceRange = true;
      if (priceRange && property.price !== undefined) {
        const [min, max] = priceRange.split("-").map(Number);
        withinPriceRange = property.price >= min && property.price <= max;
      }

      let withinRentRange = true;
      if (rentRange && property.rent !== undefined) {
        const [min, max] = rentRange.split("-").map(Number);
        withinRentRange = property.rent >= min && property.rent <= max;
      }

      let matchesBhk = true;
      if (bhkFilter) {
        matchesBhk = property.flatType === bhkFilter;
      }

      return (
        matchesType &&
        matchesSearch &&
        withinPriceRange &&
        withinRentRange &&
        matchesBhk
      );
    });

    setFilteredProperties(filtered);
  }, [searchQuery, priceRange, rentRange, bhkFilter, properties, decodedType]);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="Property-title my-4 text-center" id="properties">
        Find Your Dream Property
      </h2>

      {/* Filter Bar */}
      <div className="filter-bar row my-4">
        <div className="col-lg-3 mb-2">
          <input
            type="text"
            placeholder="Search by Location or Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-lg-2 mb-2">
          <select
            value={rentRange}
            onChange={(e) => setRentRange(e.target.value)}
            className="form-control"
          >
            <option value="">Select Rent Range</option>
            <option value="0-10000">Below ₹10K</option>
            <option value="10000-20000">₹10K – ₹20K</option>
            <option value="20000-50000">₹20K – ₹50K</option>
            <option value="50000-100000">Above ₹50K</option>
          </select>
        </div>

        <div className="col-lg-2 mb-2">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="form-control"
          >
            <option value="">Select Price Range</option>
            <option value="0-5000000">Below ₹50 Lakhs</option>
            <option value="5000000-10000000">₹50L – ₹1 Cr</option>
            <option value="10000000-20000000">₹1 Cr – ₹2 Cr</option>
            <option value="20000000-100000000">Above ₹2 Cr</option>
          </select>
        </div>

        <div className="col-lg-2 mb-2">
          <select
            value={bhkFilter}
            onChange={(e) => setBhkFilter(e.target.value)}
            className="form-control"
          >
            <option value="">Select BHK</option>
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="4BHK">4 BHK</option>
            <option value="5BHK">5 BHK+</option>
          </select>
        </div>

        <div className="col-lg-2 mb-2">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              setSearchQuery("");
              setPriceRange("");
              setRentRange("");
              setBhkFilter(""); 
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="row">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property._id} className="col-md-4 mb-4">
              {/* This component already has the Smart Path logic */}
              <PropertyCard property={property} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p style={{height:"90vh"}}>No properties found matching the criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyTypePage;
