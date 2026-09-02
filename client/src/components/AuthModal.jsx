import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../api';

const AuthModal = ({ show, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tab === 'register') {
        if (form.password !== form.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        await api.post('/auth/register', {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        alert('Registered successfully! Please log in.');
        setTab('login');
        setForm({ ...form, password: '', confirmPassword: '' });
      } else {
        const { data } = await api.post('/auth/login', {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLoginSuccess?.(data.user);
        onClose();
      }
    } catch (err) {
      alert(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{tab === 'login' ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tab === 'register' && (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={onChange} required />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={onChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={onChange} required />
          </Form.Group>
          {tab === 'register' && (
            <Form.Group className="mb-1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} required />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer className="w-100 d-flex justify-content-between">
          <Button variant="link" type="button" onClick={() => setTab(tab === 'login' ? 'register' : 'login')}>
            {tab === 'login' ? 'New user? Register' : 'Have an account? Login'}
          </Button>
          <div>
            <Button variant="secondary" onClick={onClose} className="me-2">Cancel</Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Please wait…' : tab === 'login' ? 'Login' : 'Register'}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AuthModal;
