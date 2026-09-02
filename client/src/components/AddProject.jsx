import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import api from "../api"; 

const AddProject = ({ editId, initialData, setEditId }) => {
  const navigate = useNavigate();
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
        images: [], // Keep empty to allow new uploads
        brochure: null,
        whatsappNumber: initialData.whatsappNumber || "",
        email: initialData.email || "",
      });
    }
    if (formRef.current && initialData) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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

      // Append multiple images
      formData.images.forEach((file) => fd.append("images", file));

      // Append brochure
      if (formData.brochure) {
        fd.append("brochure", formData.brochure);
      }

      let res;
      if (editId) {
        // Use api utility for PUT
        res = await api.put(`/projects/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        // Use api utility for POST
        res = await api.post("/projects", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      // api (axios) returns status
      if (res.status === 200 || res.status === 201) {
        alert(editId ? "Project updated successfully!" : "Project added successfully!");
        
        // Reset state
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

        if (!editId) {
          navigate("/"); 
        }      
      } 
    } catch (err) {
      console.error("Project submission error:", err);
      alert("Error submitting project. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid pt-5 property-form" ref={formRef}>
      <h2 className="mb-4 text-center text-dark mt-4">
        {editId ? "Edit Project" : "Add New Project"}
      </h2>

      <form onSubmit={handleSubmit} className="container bg-form p-3 rounded">
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required className="form-control" />
          </div>

          <div className="col-md-6">
            <input type="text" name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-12">
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-control" rows={3} required></textarea>
          </div>

          <div className="col-12">
            <textarea name="features" placeholder="Enter features separated by commas" value={formData.features} onChange={handleChange} className="form-control" rows={2}></textarea>
          </div>

          <div className="col-md-6">
            <label className="form-label small text-muted">Project Images</label>
            <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} className="form-control" />
          </div>

          <div className="col-md-6">
            <label className="form-label small text-muted">Brochure (PDF/DOC)</label>
            <input type="file" name="brochure" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="form-control" />
          </div>

          <div className="col-md-6">
            <input type="text" name="whatsappNumber" placeholder="WhatsApp Number (e.g. 91...)" value={formData.whatsappNumber} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6">
            <input type="email" name="email" placeholder="Contact Email" value={formData.email} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-12 text-center mb-5">
            <button type="submit" disabled={submitting} className="btn btn-primary px-5">
              {submitting ? "Submitting..." : (editId ? "Update Project" : "Add Project")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
