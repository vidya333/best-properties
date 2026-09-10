import React, { useEffect, useState, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Added for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; 
import PropertyTable from './PropertyTable';
import AddProject from './AddProject';
import ProjectsTable from './ProjectsTable';
import api from "../api"; 
import GalleryUpload from './GalleryUpload';

const AddProperty = () => {
  const navigate = useNavigate(); // Hook for redirection
  const formRef = useRef(null); 
  const [activeTab, setActiveTab] = useState('properties');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '', location: '', price: '', rent: '', description: '',
    brokerName: '', brokerEmail: '', brokerPhone: '', type: '',
    imageFiles: [], 
    flatType: '', availableFor: '', deposit: '',
    carpetArea: '', parking: '', furnished: '', facing: '', locationPin: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const propertyTypes = [
    { type: "residential-apartment", label: "Residential Apartment" },
    { type: "residential-land", label: "Residential Land" },
    { type: "independent-house-villa", label: "Independent House / Villa" },
    { type: "builder-floor", label: "Builder Floor" },
    { type: "1rk-studio-apartment", label: "1 RK / Studio Apartment" },
    { type: "farm-house", label: "Farm House" },
    { type: "serviced-apartment", label: "Serviced Apartments" },
    { type: "commercial-property", label: "Commercial Property" },
  ];

  // Logout handler function
  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("token"); // Clear authentication token (adjust key if different)
    sessionStorage.clear();
    navigate("/admin/"); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "imageFiles") {
          if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
            fd.append(key, formData[key]);
          }
        }
      });

      if (formData.imageFiles && formData.imageFiles.length > 0) {
        formData.imageFiles.forEach(file => {
          fd.append("images", file); 
        });
      }

      let res;
      if (editId) {
        res = await api.put(`/properties/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        res = await api.post("/properties", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      if (res.status === 200 || res.status === 201) {
        alert(editId ? "Property updated successfully!" : "Property added successfully!");
        setEditId(null);
        resetForm();
        setShowForm(false);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting property");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', location: '', price: '', rent: '', description: '',
      brokerName: '', brokerEmail: '', brokerPhone: '', type: '',
      imageFiles: [], flatType: '', availableFor: '', deposit: '',
      carpetArea: '', parking: '', furnished: '', facing: '', locationPin: ''
    });
  };

  const handleEditProperty = (property) => {
    setEditId(property._id);
    setFormData({
      ...property,
      imageFiles: [] 
    });
    setShowForm(true);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [projectEditId, setProjectEditId] = useState(null);
  const [projectFormData, setProjectFormData] = useState(null);

  const handleEditProject = (project) => {
    setProjectEditId(project._id);
    setProjectFormData(project);
    setActiveTab('projects');
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await api.get("/media");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching media:", err);
    }
  };

  const handleUpload = (newMedia) => {
    setItems([newMedia, ...items]); 
  };

  return (
    <div className="container-fluid bg-light min-vh-100 text-dark" style={{ paddingTop: "110px" }}>
      <div className="row">
        
        {/* LEFT SIDEBAR NAVIGATION (Fixed below top header with correct height) */}
        <div className="col-lg-3 col-xl-2 px-0 bg-white border-end d-none d-lg-flex flex-column position-sticky shadow-sm" style={{ zIndex: 10, top: "110px", height: "calc(100vh - 110px)", paddingTop: "20px" }}>
          <div className="px-4 mb-4">
            <h5 className="fw-bold text-uppercase text-dark" style={{ fontSize: "13px", letterSpacing: "1px" }}>Admin Console</h5>
            <p className="text-muted small mb-0">Best Properties Management</p>
          </div>
          
          <div className="list-group list-group-flush rounded-0 bg-white flex-grow-1">
            <button 
              className={`list-group-item list-group-item-action py-3 px-4 border-0 d-flex align-items-center gap-3 ${activeTab === 'properties' ? 'fw-bold text-dark' : 'text-secondary'}`}
              style={activeTab === 'properties' ? { backgroundColor: '#fdfbf7', borderLeft: '4px solid #c5a059', color: '#c5a059' } : {}}
              onClick={() => { setActiveTab('properties'); setShowForm(false); }}
            >
              <i className="bi bi-house-door"></i> Properties
            </button>
            <button 
              className={`list-group-item list-group-item-action py-3 px-4 border-0 d-flex align-items-center gap-3 ${activeTab === 'projects' ? 'fw-bold text-dark' : 'text-secondary'}`}
              style={activeTab === 'projects' ? { backgroundColor: '#fdfbf7', borderLeft: '4px solid #c5a059', color: '#c5a059' } : {}}
              onClick={() => { setActiveTab('projects'); setShowForm(false); }}
            >
              <i className="bi bi-buildings"></i> Projects
            </button>
            <button 
              className={`list-group-item list-group-item-action py-3 px-4 border-0 d-flex align-items-center gap-3 ${activeTab === 'media' ? 'fw-bold text-dark' : 'text-secondary'}`}
              style={activeTab === 'media' ? { backgroundColor: '#fdfbf7', borderLeft: '4px solid #c5a059', color: '#c5a059' } : {}}
              onClick={() => { setActiveTab('media'); setShowForm(false); }}
            >
              <i className="bi bi-images"></i> Gallery Media
            </button>
          </div>

          {/* LOGOUT BUTTON SECTION */}
          <div className="p-3 border-top bg-white">
            <button
              onClick={handleLogout}
              className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold shadow-sm"
              style={{ border: "1px solid #c5a059", color: "#c5a059", backgroundColor: "#fdfbf7" }}
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>

        {/* MOBILE HORIZONTAL NAV */}
        <div className="d-lg-none col-12 mb-3 px-3">
          <div className="bg-white p-2 rounded-3 d-flex justify-content-between align-items-center shadow-sm border flex-wrap gap-2">
            <div className="d-flex gap-1">
              <button 
                className={`btn btn-sm ${activeTab === 'properties' ? 'fw-bold text-dark' : 'text-secondary'}`}
                style={activeTab === 'properties' ? { backgroundColor: '#fdfbf7', borderBottom: '2px solid #c5a059' } : {}}
                onClick={() => { setActiveTab('properties'); setShowForm(false); }}
              >
                Properties
              </button>
              <button 
                className={`btn btn-sm ${activeTab === 'projects' ? 'fw-bold text-dark' : 'text-secondary'}`}
                style={activeTab === 'projects' ? { backgroundColor: '#fdfbf7', borderBottom: '2px solid #c5a059' } : {}}
                onClick={() => { setActiveTab('projects'); setShowForm(false); }}
              >
                Projects
              </button>
              <button 
                className={`btn btn-sm ${activeTab === 'media' ? 'fw-bold text-dark' : 'text-secondary'}`}
                style={activeTab === 'media' ? { backgroundColor: '#fdfbf7', borderBottom: '2px solid #c5a059' } : {}}
                onClick={() => { setActiveTab('media'); setShowForm(false); }}
              >
                Gallery
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm px-3 py-1 fw-semibold text-white"
              style={{ backgroundColor: "#c5a059" }}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="col-lg-9 col-xl-10 px-4 pb-5">
          
          {/* Header Banner */}
          <div className="bg-white p-4 rounded-4 shadow-sm mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3 border">
            <div>
              <h3 className="fw-bold mb-1 text-capitalize text-dark">{activeTab} Management</h3>
              <p className="text-muted small mb-0">Manage entries, edit listings, and update backend data instantly.</p>
            </div>
            {activeTab === 'properties' && (
              <button 
                className="btn px-4 py-2 rounded-pill fw-bold shadow-sm"
                style={{ backgroundColor: "#c5a059", color: "#ffffff" }}
                onClick={() => { setShowForm(!showForm); setEditId(null); resetForm(); }}
              >
                {showForm ? "✕ Close Form" : "+ Add New Property"}
              </button>
            )}
          </div>

          {/* TAB 1: PROPERTIES */}
          {activeTab === 'properties' && (
            <div>
              {/* Slide-Open Complete Form Container */}
              {showForm && (
                <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border" ref={formRef}>
                  <h4 className="fw-bold mb-3 pb-2 border-bottom text-dark">
                    {editId ? 'Edit Property Details' : 'Add New Property'}
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Title *</label>
                        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Location *</label>
                        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Price *</label>
                        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Rent (optional)</label>
                        <input type="number" name="rent" placeholder="Rent" value={formData.rent} onChange={handleChange} className="form-control" />
                      </div>

                      <div className="col-12">
                        <label className="form-label text-xs fw-bold text-secondary">Description *</label>
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="form-control" rows={3}></textarea>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Property Images</label>
                        <input type="file" name="images" accept="image/*" multiple onChange={(e) => setFormData({ ...formData, imageFiles: Array.from(e.target.files) })} className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Consultant Name *</label>
                        <input type="text" name="brokerName" placeholder="Consultant Name" value={formData.brokerName} onChange={handleChange} required className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Consultant Email *</label>
                        <input type="email" name="brokerEmail" placeholder="Consultant Email" value={formData.brokerEmail} onChange={handleChange} required className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Consultant Phone *</label>
                        <input type="tel" name="brokerPhone" placeholder="Consultant Phone (e.g. 918564799885)" value={formData.brokerPhone} onChange={handleChange} required className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Property Type *</label>
                        <select name="type" value={formData.type} onChange={handleChange} required className="form-control">
                          <option value="">Select Property Type</option>
                          {propertyTypes.map((property) => (
                            <option key={property.type} value={property.type}>{property.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Flat Type</label>
                        <select name="flatType" value={formData.flatType} onChange={handleChange} className="form-control">
                          <option value="">Select Flat Type</option>
                          <option value="1BHK">1 BHK</option>
                          <option value="2BHK">2 BHK</option>
                          <option value="2.5BHK">2.5 BHK</option>
                          <option value="3BHK">3 BHK</option>
                          <option value="3.5BHK">3.5 BHK</option>
                          <option value="4BHK">4 BHK</option>
                          <option value="4.5BHK">4.5 BHK</option>
                          <option value="5BHK">5 BHK</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Available For</label>
                        <select name="availableFor" value={formData.availableFor} onChange={handleChange} className="form-control">
                          <option value="">Available For</option>
                          <option value="rent">Rent</option>
                          <option value="resale">Resale</option>
                          <option value="purchase">Purchase</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Deposit Amount</label>
                        <input type="number" name="deposit" placeholder="Deposit Amount" value={formData.deposit} onChange={handleChange} className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Carpet Area</label>
                        <input type="number" name="carpetArea" placeholder="Carpet Area (sq.ft)" value={formData.carpetArea} onChange={handleChange} className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Parking</label>
                        <select name="parking" value={formData.parking} onChange={handleChange} className="form-control">
                          <option value="">Parking</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Furnishing</label>
                        <select name="furnished" value={formData.furnished} onChange={handleChange} className="form-control">
                          <option value="">Furnishing</option>
                          <option value="unfurnished">Unfurnished</option>
                          <option value="semi-furnished">Semi-furnished</option>
                          <option value="furnished">Furnished</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Facing</label>
                        <input type="text" name="facing" placeholder="Facing (e.g. East)" value={formData.facing} onChange={handleChange} className="form-control" />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-xs fw-bold text-secondary">Google Maps Link</label>
                        <input type="url" name="locationPin" placeholder="Google Maps Link" value={formData.locationPin} onChange={handleChange} className="form-control" />
                      </div>

                      <div className="col-12 text-center mt-4">
                        <button type="submit" disabled={submitting} className="btn px-5 py-2 fw-bold rounded-pill" style={{ backgroundColor: "#c5a059", color: "#ffffff" }}>
                          {submitting ? 'Submitting...' : editId ? 'Update Property' : 'Publish Property'}
                        </button>
                        <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline-secondary px-4 py-2 ms-2 rounded-pill">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Table View */}
              <div className="bg-white p-4 rounded-4 shadow-sm border">
                <PropertyTable onEdit={handleEditProperty} />
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border">
                <AddProject editId={projectEditId} initialData={projectFormData} setEditId={setProjectEditId} />
              </div>
              <div className="bg-white p-4 rounded-4 shadow-sm border">
                <ProjectsTable onEdit={handleEditProject} />
              </div>
            </div>
          )}

          {/* TAB 3: GALLERY MEDIA */}
          {activeTab === 'media' && (
            <div className="bg-white p-4 rounded-4 shadow-sm border">
              <GalleryUpload onUpload={handleUpload} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AddProperty;