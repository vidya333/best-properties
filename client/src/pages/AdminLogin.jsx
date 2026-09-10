import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/add-property');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#B8975A] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-serif font-bold text-2xl">B</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white mb-1">Admin Access</h1>
          <p className="text-white/40 text-sm">BEST Properties - Admin Only Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 flex flex-col gap-4">
          <div>
            <label className="text-[11px] tracking-[2px] uppercase text-white/40 block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#B8975A] transition-colors font-sans"
              placeholder="admin@email.com"
            />
          </div>
          <div>
            <label className="text-[11px] tracking-[2px] uppercase text-white/40 block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-[#B8975A] transition-colors font-sans"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#B8975A] hover:bg-[#9A7A42] text-white py-3 text-sm font-medium tracking-wide transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          This page is not publicly available.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;