import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Banner from '../components/Banner';
import api from '../api';
import BusinessPartners from '../components/BusinessPartners';
import TestimonialCarousel from '../components/TestimonialCarousel';
import OurPromise from '../components/OurPromise';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import LocationSection from '../components/LocationSection';
import NewProjectsSection from '../components/NewProjectsSection';
import ActionStrip from '../components/ActionStrip';
import GoogleBusinessLive from '../components/GoogleBusinessLive';
import FloatingActions from '../components/FloatingActions';
import ClientStoriesWidget from '../components/ClientStoriesWidget';

// Fallback Mock Properties matching public/images folder
const FALLBACK_PROPERTIES = [
  {
    _id: '1',
    title: 'Luxury 3BHK Apartment in Nanded City',
    location: 'Asawari, Nanded City, Pune',
    price: 8500000,
    rent: 28000,
    flatType: '3BHK',
    images: ['/images/builder1.jpg', '/images/builder2.jpg'],
    type: 'Residential',
    status: 'For Sale',
  },
  {
    _id: '2',
    title: 'Spacious 2BHK Premium Residency',
    location: 'Bageshree, Nanded City, Pune',
    price: 6200000,
    rent: 20000,
    flatType: '2BHK',
    images: ['/images/builder3.jpg', '/images/builder4.jpg'],
    type: 'Residential',
    status: 'For Sale',
  },
  {
    _id: '3',
    title: 'Modern Independent Villa with Garden',
    location: 'Sargam, Nanded City, Pune',
    price: 18000000,
    rent: 55000,
    flatType: '4BHK',
    images: ['/images/builder5.jpg', '/images/builder6.jpg'],
    type: 'Villa',
    status: 'For Sale',
  },
  {
    _id: '4',
    title: 'Compact 1BHK Studio Apartment',
    location: 'Pancham, Nanded City, Pune',
    price: 3800000,
    rent: 14000,
    flatType: '1BHK',
    images: ['/images/builder7.jpg', '/images/builder8.jpg'],
    type: 'Residential',
    status: 'For Rent',
  },
  {
    _id: '5',
    title: 'High-Footfall Commercial Office Space',
    location: 'Destination Center, Nanded City, Pune',
    price: 12000000,
    rent: 45000,
    flatType: 'Commercial',
    images: ['/images/builder9.jpg', '/images/builder10.jpg'],
    type: 'Commercial',
    status: 'For Sale',
  },
  {
    _id: '6',
    title: '5BHK Exclusive Penthouse',
    location: 'Mangal Bhairav, Nanded City, Pune',
    price: 25000000,
    rent: 75000,
    flatType: '5BHK+',
    images: ['/images/builder11.jpg', '/images/builder12.jpg'],
    type: 'Residential',
    status: 'For Sale',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [rentRange, setRentRange] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bhk, setBhk] = useState('');

  const propertiesPerPage = 4;
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  useEffect(() => {
    api.get('/properties')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setProperties(res.data);
          setFilteredProperties(res.data);
        } else {
          setProperties(FALLBACK_PROPERTIES);
          setFilteredProperties(FALLBACK_PROPERTIES);
        }
      })
      .catch(err => {
        console.warn('Backend server disconnected. Displaying fallback properties:', err);
        setProperties(FALLBACK_PROPERTIES);
        setFilteredProperties(FALLBACK_PROPERTIES);
      });
  }, []);

  useEffect(() => {
    const filtered = properties.filter(property => {
      const matchesSearch =
        property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchQuery.toLowerCase());

      let withinPriceRange = true;
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        withinPriceRange = property.price >= min && property.price <= max;
      }

      let withinRentRange = true;
      if (rentRange && property.rent !== undefined) {
        const [min, max] = rentRange.split('-').map(Number);
        withinRentRange = property.rent >= min && property.rent <= max;
      }

      let matchesBhk = true;
      if (bhk) {
        if (bhk === '5BHK+') {
          const bhkNum = parseInt(property.flatType);
          matchesBhk = bhkNum >= 5;
        } else {
          matchesBhk = property.flatType === bhk;
        }
      }

      return matchesSearch && withinPriceRange && withinRentRange && matchesBhk;
    });

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [searchQuery, priceRange, rentRange, bhk, properties]);

  return (
    <div>
      {/* Hero Banner */}
      <Banner />

      {/* Action strip */}
      <ActionStrip/>

     {/* About Section - Split Layout */}
    <section className="bg-[#FAF9F5] py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content & Features */}
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-semibold tracking-[4px] uppercase text-[#B8975A] mb-3">
                About BEST Properties
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0D0D0D] leading-tight">
                Nanded City's Most Trusted <br className="hidden sm:inline" />
                <span className="text-[#B8975A]">Property Experts</span>
              </h2>
            </div>

            <p className="text-[#6B6B6B] text-base leading-relaxed">
              BEST Properties is built on a foundation of unyielding trust, absolute transparency, and unrivaled local expertise. With over 12 years deep-rooted in the Nanded City real estate market, we bridge the gap between dream spaces and seamless ownership.
            </p>

            {/* Highlight Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 border border-gray-100 shadow-sm rounded-sm">
                <div className="w-8 h-8 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center mb-2">
                  <i className="bi bi-shield-check text-base"></i>
                </div>
                <h4 className="font-semibold text-sm text-[#0D0D0D]">100% Verified Deals</h4>
                <p className="text-xs text-[#6B6B6B] mt-1">Clear legal checks & transparent title documentation.</p>
              </div>

              <div className="bg-white p-4 border border-gray-100 shadow-sm rounded-sm">
                <div className="w-8 h-8 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center mb-2">
                  <i className="bi bi-graph-up-arrow text-base"></i>
                </div>
                <h4 className="font-semibold text-sm text-[#0D0D0D]">Market Valuation</h4>
                <p className="text-xs text-[#6B6B6B] mt-1">Accurate, data-driven pricing for buying & selling.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/about-us')}
                className="btn-gold px-8 py-3.5 text-xs tracking-wider uppercase font-semibold inline-flex items-center gap-2"
              >
                Know More About Us
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Stats */}
          <div className="relative">
            {/* Main Image Banner */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/builder2.jpg"
                alt="Nanded City Real Estate"
                className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/builder1.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating Stat Card 1 - Experience Badge */}
            <div className="absolute -top-6 -left-4 sm:-left-6 bg-white p-5 shadow-xl border-l-4 border-[#B8975A] rounded-sm max-w-[180px]">
              <div className="text-3xl font-serif font-bold text-[#0D0D0D]">20+</div>
              <p className="text-[11px] font-medium text-[#6B6B6B] uppercase tracking-wider mt-0.5">
                Years Market Leadership
              </p>
            </div>

            {/* Floating Stat Card 2 - Clients Served */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#1A1A1A] text-white p-5 shadow-2xl rounded-sm max-w-[200px]">
              <div className="text-3xl font-serif font-bold text-[#B8975A]">500+</div>
              <p className="text-[11px] font-medium text-gray-300 uppercase tracking-wider mt-0.5">
                Happy Families & Investors
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>


      {/* Properties listing */}
      <section className="bg-white py-20 px-6" id="properties">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[11px] font-semibold tracking-[4px] uppercase text-[#B8975A] mb-2">Listings</div>
              <h2 className="font-serif text-3xl font-bold text-[#0D0D0D]">Available Properties</h2>
            </div>
            <p className="text-[#6B6B6B] text-sm">{filteredProperties.length} properties found</p>
          </div>

          {/* Filter bar */}
          <div className="bg-[#F8F5F0] border border-gray-100 p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#B8975A] transition-colors col-span-1 sm:col-span-2 lg:col-span-1 font-sans"
            />
            {[
              {
                value: bhk,
                onChange: e => setBhk(e.target.value),
                options: [
                  ['', 'Any BHK'],
                  ['1BHK', '1 BHK'],
                  ['2BHK', '2 BHK'],
                  ['3BHK', '3 BHK'],
                  ['4BHK', '4 BHK'],
                  ['5BHK+', '5 BHK+'],
                ],
              },
              {
                value: rentRange,
                onChange: e => setRentRange(e.target.value),
                options: [
                  ['', 'Any Rent'],
                  ['0-10000', 'Below ₹10K'],
                  ['10000-20000', '₹10K – ₹20K'],
                  ['20000-50000', '₹20K – ₹50K'],
                  ['50000-100000', 'Above ₹50K'],
                ],
              },
              {
                value: priceRange,
                onChange: e => setPriceRange(e.target.value),
                options: [
                  ['', 'Any Price'],
                  ['0-5000000', 'Below ₹50L'],
                  ['5000000-10000000', '₹50L – ₹1Cr'],
                  ['10000000-20000000', '₹1Cr – ₹2Cr'],
                  ['20000000-100000000', 'Above ₹2Cr'],
                ],
              },
            ].map((sel, i) => (
              <select
                key={i}
                value={sel.value}
                onChange={sel.onChange}
                className="border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#B8975A] transition-colors bg-white font-sans"
              >
                {sel.options.map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            ))}
            <button
              onClick={() => { setSearchQuery(''); setRentRange(''); setPriceRange(''); setBhk(''); }}
              className="border border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-white text-sm font-medium py-2.5 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(showAll ? filteredProperties : currentProperties).map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-20 text-[#6B6B6B]">
              <i className="bi bi-search text-4xl text-[#B8975A]/40 block mb-3"></i>
              No properties found matching your filters.
            </div>
          )}

          {/* Pagination */}
          {filteredProperties.length > propertiesPerPage && !showAll && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                className="border border-gray-200 hover:border-[#B8975A] text-sm px-4 py-2 disabled:opacity-30 transition-colors"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                ← Prev
              </button>
              <span className="text-sm text-[#6B6B6B]">Page {currentPage} of {totalPages}</span>
              <button
                className="border border-gray-200 hover:border-[#B8975A] text-sm px-4 py-2 disabled:opacity-30 transition-colors"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next →
              </button>
            </div>
          )}

          {filteredProperties.length > propertiesPerPage && (
            <div className="text-center mt-6">
              <button
                className="btn-outline-gold"
                onClick={() => { setShowAll(!showAll); setCurrentPage(1); }}
              >
                {showAll ? 'Show Less' : 'View All Properties'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-[#F8F5F0] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold tracking-[4px] uppercase text-[#B8975A] text-center mb-3">New Launches</div>
          <h2 className="font-serif text-3xl font-bold text-center text-[#0D0D0D] mb-10">Featured Projects</h2>
          <ProjectCard />
        </div>
      </section>

      {/* New Projects */}
      <NewProjectsSection/>

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Client Stories */}
      <ClientStoriesWidget/>

      {/* Location Map */}
      <LocationSection/>

      {/* Contact / Promise */}
      <OurPromise />

      {/* Partners */}
      <BusinessPartners />

      {/* Google Reviews + Ratings */}
      <GoogleBusinessLive/>

      {/* Floating Call + Whatsapp Button */}
      <FloatingActions/>
    </div>
  );
};

export default Home;