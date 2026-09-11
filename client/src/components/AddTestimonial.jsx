import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../api";
import TestimonialTable from './TestimonialTable';

const AddTestimonial = () => {
  const formRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    role: '',
    company: '',
    message: '',
    rating: '5',
    imageFile: null
  });

  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger table refresh after submit/edit

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "imageFile" && formData[key]) {
          fd.append("image", formData[key]);
        } else if (key !== "imageFile" && formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
          fd.append(key, formData[key]);
        }
      });

      let res;
      if (editId) {
        res = await api.put(`/testimonials/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        res = await api.post("/testimonials", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      if (res.status === 200 || res.status === 201) {
        alert(editId ? "Testimonial updated successfully!" : "Testimonial added successfully!");
        setEditId(null);
        resetForm();
        setShowForm(false);
        setRefreshKey(prev => prev + 1); // Refresh table data
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      role: '',
      company: '',
      message: '',
      rating: '5',
      imageFile: null
    });
  };

  const handleEditTestimonial = (testimonial) => {
    setEditId(testimonial._id);
    setFormData({
      clientName: testimonial.clientName || '',
      role: testimonial.role || '',
      company: testimonial.company || '',
      message: testimonial.message || '',
      rating: testimonial.rating || '5',
      imageFile: null
    });
    setShowForm(true);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 text-dark" style={{ paddingTop: "110px" }}>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-11 px-4 pb-5">
          
          {/* Header Banner */}
          <div className="bg-white p-4 rounded-4 shadow-sm mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3 border">
            <div>
              <h3 className="fw-bold mb-1 text-dark">Testimonials Management</h3>
              <p className="text-muted small mb-0">Manage client reviews, ratings, and feedback entries seamlessly.</p>
            </div>
            <button 
              className="btn px-4 py-2 rounded-pill fw-bold shadow-sm"
              style={{ backgroundColor: "#c5a059", color: "#ffffff" }}
              onClick={() => { setShowForm(!showForm); setEditId(null); resetForm(); }}
            >
              {showForm ? "✕ Close Form" : "+ Add New Testimonial"}
            </button>
          </div>

          {/* Slide-Open Form Container */}
          {showForm && (
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border" ref={formRef}>
              <h4 className="fw-bold mb-3 pb-2 border-bottom text-dark">
                {editId ? 'Edit Testimonial Details' : 'Add New Testimonial'}
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  
                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-secondary">Client Name *</label>
                    <input 
                      type="text" 
                      name="clientName" 
                      placeholder="e.g. John Doe" 
                      value={formData.clientName} 
                      onChange={handleChange} 
                      required 
                      className="form-control" 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-secondary">Role / Designation</label>
                    <input 
                      type="text" 
                      name="role" 
                      placeholder="e.g. Homeowner / Investor" 
                      value={formData.role} 
                      onChange={handleChange} 
                      className="form-control" 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-secondary">Company / Location</label>
                    <input 
                      type="text" 
                      name="company" 
                      placeholder="e.g. New York / Acme Corp" 
                      value={formData.company} 
                      onChange={handleChange} 
                      className="form-control" 
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-secondary">Rating (1-5)</label>
                    <select 
                      name="rating" 
                      value={formData.rating} 
                      onChange={handleChange} 
                      className="form-control"
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-xs fw-bold text-secondary">Client Photo</label>
                    <input 
                      type="file" 
                      name="imageFile" 
                      accept="image/*" 
                      onChange={handleChange} 
                      className="form-control" 
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label text-xs fw-bold text-secondary">Testimonial Message *</label>
                    <textarea 
                      name="message" 
                      placeholder="Write feedback remarks here..." 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      className="form-control" 
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button 
                      type="submit" 
                      disabled={submitting} 
                      className="btn px-5 py-2 fw-bold rounded-pill" 
                      style={{ backgroundColor: "#c5a059", color: "#ffffff" }}
                    >
                      {submitting ? 'Submitting...' : editId ? 'Update Testimonial' : 'Publish Testimonial'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setShowForm(false); setEditId(null); resetForm(); }} 
                      className="btn btn-outline-secondary px-4 py-2 ms-2 rounded-pill"
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              </form>
            </div>
          )}

          {/* Table View Component */}
          <div className="bg-white p-4 rounded-4 shadow-sm border">
            <TestimonialTable key={refreshKey} onEdit={handleEditTestimonial} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddTestimonial;