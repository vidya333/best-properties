import axios from 'axios';

const rawURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const baseURL = rawURL.endsWith('/api') ? rawURL : `${rawURL}/api`;

const api = axios.create({
  baseURL,
});

export default api;