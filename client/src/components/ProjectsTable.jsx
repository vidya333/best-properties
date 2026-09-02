import React, { useEffect, useState } from "react";
import { API } from '../config';
import api from "../api"; // Using your custom api utility

const ProjectsTable = ({ onEdit }) => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Replaced direct axios with api instance
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      // Replaced direct axios with api instance
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Helper to handle both Cloudinary and Local paths for the table preview
  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path; 
    return `${API}${path}`; 
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(term) ||
      project.subtitle.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term)
    );
  });

  // Pagination logic
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h3 className="mb-0 text-dark">All Projects</h3>
        <p className="mb-0 text-dark">Total Projects: {filteredProjects.length}</p>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, subtitle or description..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Sr No.</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Description</th>
              <th>Features</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.length > 0 ? (
              currentProjects.map((project, index) => (
                <tr key={project._id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{project.title}</td>
                  <td>{project.subtitle}</td>
                  <td style={{ maxWidth: "200px", whiteSpace: "normal" }}>
                    {project.description}
                  </td>
                  <td>
                    {project.features && project.features.length > 0 ? (
                      <ul style={{ paddingLeft: "20px" }}>
                        {project.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    ) : (
                      "-"
                    )}
                  </td>
                 <td>
                    {project.images && project.images.length > 0 ? (
                        <img
                        src={getFullUrl(project.images[0])} 
                        alt="main"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                    ) : (
                        "-"
                    )}
                    </td>

                  <td>
                   <button
                    className="btn btn-warning btn-sm me-2 p-1"
                    onClick={() => onEdit(project)}
                    title="Edit"
                    >
                    <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="btn btn-danger btn-sm p-1"
                      onClick={() => handleDelete(project._id)}
                      title="Delete"
                    >
                     <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

export default ProjectsTable;
