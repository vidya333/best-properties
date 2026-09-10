import React, { useState, useEffect } from "react";
import { API } from '../config';
import api from "../api"; 

const GalleryUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("client-stories");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

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
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("title", title);

    setLoading(true);
    try {
      const res = await api.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (onUpload) onUpload(res.data);
      setImages([res.data, ...images]);
      setFile(null);
      setTitle("");
      alert("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
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
      <form onSubmit={handleSubmit} className="mt-4 bg-light p-4 rounded shadow-sm">
        <h5 className="mb-3">Upload Gallery Media & Categorize</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label text-xs font-bold">Select File (Image/Video)</label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              disabled={loading} 
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label text-xs font-bold">Category</label>
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
            <label className="form-label text-xs font-bold">Title / Caption</label>
            <input 
              type="text" 
              placeholder="e.g. Happy Family at Asawari" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </form>

      {images.length > 0 && (
        <table className="table table-bordered table-striped mt-4 align-middle">
          <thead className="table-dark">
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th>Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img) => (
              <tr key={img._id}>
                <td>
                  {img.type === "image" ? (
                    <img src={getFullUrl(img.src)} alt="uploaded" width="60" height="60" className="rounded object-fit-cover" />
                  ) : (
                    <video width="80" src={getFullUrl(img.src)} />
                  )}
                </td>
                <td>{img.title || "Untitled"}</td>
                <td>
                  <span className="badge bg-secondary text-uppercase">{img.category}</span>
                </td>
                <td className="text-center">
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDelete(img._id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GalleryUpload;