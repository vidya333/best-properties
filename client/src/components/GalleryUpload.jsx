import React, { useState, useEffect, useRef } from "react";
import { API } from '../config';
import api from "../api"; 

const GalleryUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("client-stories");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);
  
  // Ref to target the form card smoothly
  const formRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await api.get("/media");
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const getFullUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API}${path}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("title", title);
      
      if (file) {
        formData.append("file", file);
      }

      let res;
      if (editId) {
        // Update existing media item
        res = await api.put(`/media/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImages(images.map((img) => (img._id === editId ? res.data : img)));
        alert("Updated successfully!");
        setEditId(null);
      } else {
        if (!file) {
          alert("Please select a file to upload.");
          setLoading(false);
          return;
        }
        // Create new media item
        res = await api.post("/media/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (onUpload) onUpload(res.data);
        setImages([res.data, ...images]);
        alert("Uploaded successfully!");
      }

      setFile(null);
      setTitle("");
      setCategory("client-stories");
    } catch (err) {
      console.error(err);
      alert("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (img) => {
    setEditId(img._id);
    setTitle(img.title || "");
    setCategory(img.category || "client-stories");
    setFile(null); // File is optional during edit

    // Smooth scroll directly to the form container
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await api.delete(`/media/${id}`);
      setImages(images.filter((img) => img._id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      alert("Delete failed.");
    }
  };

  return (
    <div>
      {/* Attached ref here so it scrolls directly to this card */}
      <form ref={formRef} onSubmit={handleSubmit} className="mt-4 bg-light p-4 rounded-4 shadow-sm border">
        <h5 className="mb-3 fw-bold text-dark">
          {editId ? "Edit Media Asset" : "Upload Gallery Media & Categorize"}
        </h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label text-xs fw-bold text-secondary">
              {editId ? "Replace File (Optional)" : "Select File (Image/Video)"}
            </label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              disabled={loading} 
              className="form-control"
              required={!editId}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label text-xs fw-bold text-secondary">Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="client-stories">Client Stories</option>
              <option value="flats-locations">Flats & Locations</option>
              <option value="inside-office">Inside Office</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label text-xs fw-bold text-secondary">Title / Caption</label>
            <input 
              type="text" 
              placeholder="e.g. Happy Family at Asawari" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-2 d-flex align-items-end gap-2">
            <button type="submit" className="btn w-100 fw-bold text-white rounded-pill" style={{ backgroundColor: "#c5a059" }} disabled={loading}>
              {loading ? "Saving..." : editId ? "Update" : "Upload"}
            </button>
            {editId && (
              <button 
                type="button" 
                className="btn btn-outline-secondary rounded-pill px-3" 
                onClick={() => { setEditId(null); setTitle(""); setCategory("client-stories"); setFile(null); }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {images.length > 0 && (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mt-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-uppercase fs-7 text-secondary tracking-wider">
                <tr>
                  <th className="py-3 px-3" style={{ width: "60px" }}>Sr. No.</th>
                  <th className="py-3">Preview</th>
                  <th className="py-3">Title & Details</th>
                  <th className="py-3">Category</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {images.map((img, index) => (
                  <tr key={img._id}>
                    {/* Serial Number */}
                    <td className="py-3 px-3 fw-semibold text-muted">
                      {index + 1}
                    </td>

                    {/* Preview Column */}
                    <td className="py-3" style={{ width: "90px" }}>
                      <div className="rounded-3 overflow-hidden shadow-sm bg-light" style={{ width: "60px", height: "60px" }}>
                        {img.type === "image" ? (
                          <img 
                            src={getFullUrl(img.src)} 
                            alt={img.title || "uploaded"} 
                            className="w-100 h-100 object-fit-cover" 
                          />
                        ) : (
                          <video 
                            src={getFullUrl(img.src)} 
                            className="w-100 h-100 object-fit-cover" 
                          />
                        )}
                      </div>
                    </td>

                    {/* Title & Type Info */}
                    <td className="py-3">
                      <span className="fw-semibold text-dark d-block">
                        {img.title || <span className="text-muted fst-italic">Untitled</span>}
                      </span>
                      <span className="badge bg-light text-dark border font-monospace mt-1" style={{ fontSize: "10px" }}>
                        {img.type.toUpperCase()}
                      </span>
                    </td>

                    {/* Category Badge */}
                    <td className="py-3">
                      <span className="badge px-2.5 py-1.5 rounded-pill fw-medium" style={{ backgroundColor: "#fdfbf7", color: "#c5a059", border: "1px solid #c5a059" }}>
                        {img.category ? img.category.replace("-", " ") : "Uncategorized"}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="py-3 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button 
                          className="btn btn-sm rounded-circle p-2 lh-1 shadow-sm" 
                          onClick={() => handleEditClick(img)}
                          title="Edit media"
                          style={{ width: "32px", height: "32px", border: "1px solid #c5a059", color: "#c5a059", backgroundColor: "#fff" }}
                        >
                          <i className="bi bi-pencil-fill"></i> 
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm rounded-circle p-2 lh-1 shadow-sm" 
                          onClick={() => handleDelete(img._id)}
                          title="Delete media"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <i className="bi bi-trash"></i> 
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryUpload;