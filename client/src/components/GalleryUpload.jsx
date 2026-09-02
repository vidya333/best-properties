import React, { useState, useEffect } from "react";
import { API } from '../config';
import api from "../api"; 

const GalleryUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
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

    setLoading(true);
    try {
      const res = await api.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpload(res.data);
      setImages([...images, res.data]);
      alert("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
      setFile(null);
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
      <form onSubmit={handleSubmit} className="mt-4 bg-light text-center p-2 rounded">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          disabled={loading} 
          className="form-control d-inline-block w-auto"
        />
        <button type="submit" className="btn btn-primary ms-2" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {images.length > 0 && (
        <table className="table table-bordered table-striped mt-4 align-middle">
          <thead className="table-dark">
            <tr>
              <th>Preview</th>
              <th>File Name</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img) => (
              <tr key={img._id}>
                <td>
                  {img.type === "image" ? (
                    <img src={getFullUrl(img.src)} alt="uploaded" width="60" height="60" className="rounded" />
                  ) : (
                    <video width="100" src={getFullUrl(img.src)} />
                  )}
                </td>
                <td className="text-break">{img.src.split("/").pop()}</td>
                <td className="text-center">
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDelete(img._id)}
                    title="Delete"
                  >
                    {/* Trash Icon */}
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
