import axios from 'axios';

const rawURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const baseURL = rawURL.endsWith('/api') ? rawURL : `${rawURL}/api`;

const api = axios.create({
  baseURL,
});

// Add the interceptor to include the auth token automatically
api.interceptors.request.use(
  (config) => {
    // 1. Check standard direct keys
    let token = localStorage.getItem('token') || 
                localStorage.getItem('adminToken') || 
                localStorage.getItem('jwt');

    // 2. If not found, check if it's stored inside the 'user' JSON object
    if (!token) {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const userObj = JSON.parse(userStr);
          token = userObj.token || userObj.accessToken || userObj.jwt;
        }
      } catch (e) {
        console.error("Error parsing user object from localStorage", e);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;

// Helper to handle both Cloudinary and Local AWS/Localhost paths
export const getImageUrl = (path) => {
  if (!path) return "";
  
  if (path.startsWith("http")) {
    return path;
  }
  
  // If it's a local path (starts with /uploads), add the backend base URL
  const backendBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
  return `${backendBase}${path}`;
};