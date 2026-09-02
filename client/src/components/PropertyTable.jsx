import React, { useEffect, useState } from "react";
import api from "../api"; // Using your custom api utility
import { API } from '../config';

const PropertyTable = ({ onEdit }) => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 10;

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      // Replaced direct axios with api instance
      const res = await api.get("/properties");
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      // Replaced direct axios with api instance
      await api.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  // Helper to handle both Cloudinary and Local paths for the table preview
  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path; 
    return `${API}${path}`; 
  };

  // Filter properties based on search term
  const filteredProperties = properties.filter((property) => {
    const term = searchTerm.toLowerCase();
    return (
      property.title.toLowerCase().includes(term) ||
      property.location.toLowerCase().includes(term) ||
      property.brokerName.toLowerCase().includes(term) ||
      property.type.toLowerCase().includes(term)
    );
  });

  // Pagination logic
  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h3 className="mb-0 text-dark">All Properties</h3>
        <p className="mb-0 text-dark">Total Properties: {filteredProperties.length}</p>
      </div>

      {/* Search bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, location, broker, or type..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Sr No.</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Rent</th>
              <th>Type</th>
              <th>Description</th>
              <th>Image Preview</th>
              <th>Broker Name</th>
              <th>Broker Email</th>
              <th>Broker Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProperties.length > 0 ? (
              currentProperties.map((property, index) => (
                <tr key={property._id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{property.title}</td>
                  <td>{property.location}</td>
                  <td>{property.price}</td>
                  <td>{property.rent || "-"}</td>
                  <td>{property.type}</td>
                  <td style={{ maxWidth: "200px", whiteSpace: "normal" }}>
                    {property.description}
                  </td>
                  <td>
                    {/* Fixed to handle hybrid image paths */}
                    {property.imageUrl || (property.images && property.images.length > 0) ? (
                      <img
                        src={getFullUrl(property.imageUrl || property.images[0])}
                        alt="main"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{property.brokerName}</td>
                  <td style={{ maxWidth: "150px", whiteSpace: "normal",overflowX:"scroll" }}>
                    {property.brokerEmail}
                  </td>
                  <td>{property.brokerPhone}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2 p-1"
                      onClick={() => onEdit(property)}
                      title="Edit" 
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm p-1"
                      onClick={() => handleDelete(property._id)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center">
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage((p) => p - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage((p) => p + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PropertyTable;
