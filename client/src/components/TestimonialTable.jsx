import React, { useEffect, useState } from 'react';
import api from '../api';

const TestimonialTable = ({ onEdit }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      alert('Failed to delete testimonial');
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-muted">Loading testimonials...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0 text-dark">Manage Testimonials</h4>
        <span className="badge bg-secondary">Total: {testimonials.length}</span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Sr.</th>
              <th>Client Info</th>
              <th>Role / Company</th>
              <th>Rating</th>
              <th>Message</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No testimonials found. Add your first client review above!
                </td>
              </tr>
            ) : (
              testimonials.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="fw-bold text-dark">{item.clientName}</div>
                  </td>
                  <td>
                    <div className="small text-muted">{item.role || '—'}</div>
                    <div className="small text-secondary">{item.company || '—'}</div>
                  </td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      ★ {item.rating} / 5
                    </span>
                  </td>
                  <td style={{ maxWidth: '250px' }}>
                    <p className="text-muted small mb-0 text-truncate" title={item.message}>
                      "{item.message}"
                    </p>
                  </td>
                  <td className="text-end">
                    <button
                      onClick={() => onEdit(item)}
                      className="btn btn-sm btn-outline-primary me-2"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-outline-danger"
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestimonialTable;