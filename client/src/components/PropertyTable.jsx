import React, { useEffect, useState } from "react";
import api from "../api";
import { API } from '../config';

const PropertyTable = ({ onEdit, refreshKey }) => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;

  useEffect(() => {
    fetchProperties();
  }, [refreshKey]);

  const fetchProperties = async () => {
    try {
      const res = await api.get("/properties");
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await api.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path; 
    return `${API}${path}`; 
  };

  const filteredProperties = properties.filter((property) => {
    const term = searchTerm.toLowerCase();
    return (
      property.title.toLowerCase().includes(term) ||
      property.location.toLowerCase().includes(term) ||
      property.brokerName.toLowerCase().includes(term) ||
      property.type.toLowerCase().includes(term)
    );
  });

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h4 className="fw-bold text-dark mb-1">Manage Properties</h4>
            <p className="text-muted small mb-0">Overview of all listed real estate properties and broker data</p>
          </div>
          <span className="badge bg-dark px-3 py-2 fs-6">
            Total: {filteredProperties.length}
          </span>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0 shadow-none"
              placeholder="Search by title, location, broker, or type..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light text-uppercase fs-7 text-secondary">
              <tr>
                <th className="py-3">Sr.</th>
                <th className="py-3">Preview</th>
                <th className="py-3">Property Info</th>
                <th className="py-3">Pricing</th>
                <th className="py-3">Type</th>
                <th className="py-3">Key Specs & Features</th>
                <th className="py-3" style={{ minWidth: "185px" }}>Description</th>
                <th className="py-3">Broker Info</th>
                <th className="py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProperties.length > 0 ? (
                currentProperties.map((property, index) => (
                  <tr key={property._id}>
                    <td className="fw-semibold text-muted">
                      {indexOfFirst + index + 1}
                    </td>
                    <td>
                      {property.imageUrl || (property.images && property.images.length > 0) ? (
                        <img
                          src={getFullUrl(property.imageUrl || property.images[0])}
                          alt="preview"
                          className="rounded object-fit-cover shadow-sm"
                          style={{ width: "45px", height: "45px" }}
                        />
                      ) : (
                        <div className="rounded bg-light d-flex align-items-center justify-content-center text-muted" style={{ width: "45px", height: "45px" }}>
                          <i className="bi bi-image"></i>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="fw-bold text-dark text-truncate" style={{ maxWidth: "160px" }}>
                        {property.title}
                      </div>
                      <div className="small text-muted text-truncate" style={{ maxWidth: "160px" }}>
                        <i className="bi bi-geo-alt me-1"></i>{property.location}
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">₹{Number(property.price).toLocaleString()}</div>
                      <div className="small text-muted">Rent: ₹{property.rent ? Number(property.rent).toLocaleString() : '0'}</div>
                    </td>
                    <td>
                      <div>
                        <span className="badge bg-light text-secondary border fw-normal px-2 py-1 mb-1">
                          {property.type}
                        </span>
                      </div>
                      <div className="small text-muted">{property.flatType || '-'}</div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1" style={{ maxWidth: "180px" }}>
                        {property.carpetArea && (
                          <span className="badge bg-light text-dark border px-2 py-1" style={{ fontSize: "0.72rem" }}>
                            <i className="bi bi-aspect-ratio me-1"></i>{property.carpetArea} sq.ft
                          </span>
                        )}
                        {property.furnished && (
                          <span className="badge bg-light text-dark border px-2 py-1" style={{ fontSize: "0.72rem" }}>
                            <i className="bi bi-house-door me-1"></i>{property.furnished}
                          </span>
                        )}
                        {property.parking && (
                          <span className="badge bg-light text-dark border px-2 py-1" style={{ fontSize: "0.72rem" }}>
                            <i className="bi bi-p-square me-1"></i>{property.parking}
                          </span>
                        )}
                        {property.facing && (
                          <span className="badge bg-light text-dark border px-2 py-1" style={{ fontSize: "0.72rem" }}>
                            <i className="bi bi-compass me-1"></i>{property.facing}
                          </span>
                        )}
                        {!property.carpetArea && !property.furnished && !property.parking && !property.facing && (
                          <span className="text-muted small">-</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div 
                        className="text-muted small" 
                        style={{ 
                          display: "-webkit-box", 
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: "vertical", 
                          overflow: "hidden",
                          lineHeight: "1.4" 
                        }} 
                        title={property.description}
                      >
                        {property.description}
                      </div>
                    </td>
                    <td>
                      <div className="fw-medium text-dark">{property.brokerName}</div>
                      <div className="small text-muted">{property.brokerPhone}</div>
                      <div className="small text-muted text-truncate" style={{ maxWidth: "140px" }}>{property.brokerEmail}</div>
                    </td>
                    <td className="text-end text-nowrap">
                      <button
                        className="btn btn-outline-primary btn-sm me-2 px-2 py-1"
                        onClick={() => onEdit(property)}
                        title="Edit Property"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm px-2 py-1"
                        onClick={() => handleDelete(property._id)}
                        title="Delete Property"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-muted">
                    No properties found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination pagination-sm mb-0">
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
    </div>
  );
};

export default PropertyTable;