import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api"; 

const AddProject = ({ editId, initialData, setEditId, isOpen, onClose }) => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    features: "",
    images: [],
    brochure: null,
    whatsappNumber: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        description: initialData.description || "",
        features: initialData.features
          ? initialData.features.join(", ")
          : "",
        images: [], 
        brochure: null,
        whatsappNumber: initialData.whatsappNumber || "",
        email: initialData.email || "",
      });
    }
  }, [initialData]);

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // File change handler
  const handleFileChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    } else if (e.target.name === "brochure") {
      setFormData({ ...formData, brochure: e.target.files[0] });
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fd = new FormData();

      fd.append("title", formData.title);
      fd.append("subtitle", formData.subtitle);
      fd.append("description", formData.description);
      fd.append("features", formData.features);
      fd.append("whatsappNumber", formData.whatsappNumber);
      fd.append("email", formData.email);

      formData.images.forEach((file) => fd.append("images", file));

      if (formData.brochure) {
        fd.append("brochure", formData.brochure);
      }

      let res;
      if (editId) {
        res = await api.put(`/projects/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        res = await api.post("/projects", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      if (res.status === 200 || res.status === 201) {
        alert(editId ? "Project updated successfully!" : "Project added successfully!");
        
        if (setEditId) setEditId(null);
        
        setFormData({
          title: "",
          subtitle: "",
          description: "",
          features: "",
          images: [],
          brochure: null,
          whatsappNumber: "",
          email: "",
        });

        if (onClose) onClose();
      } 
    } catch (err) {
      console.error("Project submission error:", err);
      alert("Error submitting project. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={formRef}>
      <div className="bg-white p-4 rounded-4 shadow-sm border">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <h4 className="fw-bold mb-0 text-dark">
            {editId ? 'Edit Project Details' : 'Add New Project'}
          </h4>
          {onClose && (
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-sm btn-outline-secondary rounded-pill px-3"
            >
              ✕ Close
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-xs fw-bold text-secondary">Project Title *</label>
              <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required className="form-control" />
            </div>

            <div className="col-md-6">
              <label className="form-label text-xs fw-bold text-secondary">Subtitle</label>
              <input type="text" name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} className="form-control" />
            </div>

            <div className="col-12">
              <label className="form-label text-xs fw-bold text-secondary">Description *</label>
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-control" rows={3} required></textarea>
            </div>

            <div className="col-12">
              <label className="form-label text-xs fw-bold text-secondary">Features</label>
              <textarea name="features" placeholder="Enter features separated by commas" value={formData.features} onChange={handleChange} className="form-control" rows={2}></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label text-xs fw-bold text-secondary">Project Images</label>
              <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} className="form-control" />
            </div>

            <div className="col-md-6">
              <label className="form-label text-xs fw-bold text-secondary">Brochure (PDF/DOC)</label>
              <input type="file" name="brochure" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="form-control" />
            </div>

            <div className="col-md-6">
              <label className="form-label text-xs fw-bold text-secondary">WhatsApp Number</label>
              <input type="text" name="whatsappNumber" placeholder="WhatsApp Number (e.g. 91...)" value={formData.whatsappNumber} onChange={handleChange} className="form-control" />
            </div>

            <div className="col-md-6">
              <label className="form-label text-xs fw-bold text-secondary">Contact Email</label>
              <input type="email" name="email" placeholder="Contact Email" value={formData.email} onChange={handleChange} className="form-control" />
            </div>

            <div className="col-12 text-center mt-4">
              <button type="submit" disabled={submitting} className="btn px-5 py-2 fw-bold rounded-pill" style={{ backgroundColor: "#c5a059", color: "#ffffff" }}>
                {submitting ? 'Submitting...' : editId ? 'Update Project' : 'Publish Project'}
              </button>
              {onClose && (
                <button type="button" onClick={onClose} className="btn btn-outline-secondary px-4 py-2 ms-2 rounded-pill">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;