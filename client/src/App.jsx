import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import PropertyTypePage from './pages/PropertyTypePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AllPropertiesPage from './pages/AllPropertiesPage'; 
import AboutUsPage from './pages/AboutUsPage';
import GalleryPage from './pages/GalleryPage';
import LoanServices from './pages/LoanServices';
import AddProperty from './components/AddProperty';
import AddProject from './components/AddProject';
import AdminLogin from './pages/AdminLogin';
import ContactPage from './pages/ContactPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<AllPropertiesPage />} /> 
        <Route path="/properties/type/:typeSlug" element={<PropertyTypePage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/loan" element={<LoanServices />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path ="/contact" element={<ContactPage/>} />
        <Route
          path="/add-property"
          element={
            <ProtectedRoute requireAdmin>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-project"
          element={
            <ProtectedRoute requireAdmin>
              <AddProject />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;