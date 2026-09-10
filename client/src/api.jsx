import axios from 'axios';

const rawURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const baseURL = rawURL.endsWith('/api') ? rawURL : `${rawURL}/api`;

const api = axios.create({
  baseURL,
});

export default api;

// Helper to handle both Cloudinary and Local AWS/Localhost paths
export const getImageUrl = (path) => {
  if (!path) return "";
  
  // If it's already a full URL (Cloudinary starts with http), return it as is
  if (path.startsWith("http")) {
    return path;
  }
  
  // If it's a local path (starts with /uploads), add the backend base URL
  const backendBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
  return `${backendBase}${path}`;
};