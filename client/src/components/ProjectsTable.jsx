import React, { useEffect, useState } from "react";
import { API } from '../config';
import api from "../api";

const ProjectsTable = ({ onEdit, refreshKey }) => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;

  useEffect(() => {
    fetchProjects();
  }, [refreshKey]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path; 
    return `${API}${path}`; 
  };

  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(term) ||
      (project.subtitle && project.subtitle.toLowerCase().includes(term)) ||
      project.description.toLowerCase().includes(term)
    );
  });

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h4 className="fw-bold text-dark mb-1">Manage Projects</h4>
            <p className="text-muted small mb-0">Overview of all real estate projects and features</p>
          </div>
          <span className="badge bg-dark px-3 py-2 fs-6">
            Total: {filteredProjects.length}
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
              placeholder="Search by title, subtitle, or description..."
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
                <th className="py-3">Project Info</th>
                <th className="py-3" style={{ minWidth: "220px" }}>Description</th>
                <th className="py-3" style={{ minWidth: "200px" }}>Features</th>
                <th className="py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.length > 0 ? (
                currentProjects.map((project, index) => (
                  <tr key={project._id}>
                    <td className="fw-semibold text-muted">
                      {indexOfFirst + index + 1}
                    </td>
                    <td>
                      {project.images && project.images.length > 0 ? (
                        <img
                          src={getFullUrl(project.images[0])}
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
                      <div className="fw-bold text-dark text-truncate" style={{ maxWidth: "180px" }}>
                        {project.title}
                      </div>
                      <div className="small text-muted text-truncate" style={{ maxWidth: "180px" }}>
                        {project.subtitle || '-'}
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
                        title={project.description}
                      >
                        {project.description}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {project.features && project.features.length > 0 ? (
                          project.features.map((f, i) => (
                            <span key={i} className="badge bg-light text-secondary border fw-normal px-2 py-1" style={{ fontSize: "0.75rem" }}>
                              {f}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted small">-</span>
                        )}
                      </div>
                    </td>
                    <td className="text-end text-nowrap">
                      <button
                        className="btn btn-outline-primary btn-sm me-2 px-2 py-1"
                        onClick={() => onEdit(project)}
                        title="Edit Project"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm px-2 py-1"
                        onClick={() => handleDelete(project._id)}
                        title="Delete Project"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No projects found matching your search.
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

export default ProjectsTable;