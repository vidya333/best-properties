import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import api from '../api';
import NewProjectsSection from '../components/NewProjectsSection';
import ActionStrip from '../components/ActionStrip';

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
  {
    _id: '7',
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
    _id: '8',
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
    _id: '9',
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
    _id: '10',
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
    _id: '11',
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
    _id: '12',
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

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [rentRange, setRentRange] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bhk, setBhk] = useState('');
  const propertiesPerPage = 8;

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* actions strip */}
        <ActionStrip/>
        
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-6">
          <div>
            <div className="text-[11px] font-semibold tracking-[4px] uppercase text-[#B8975A] my-2">Explore Properties</div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0D0D0D]">All Available Properties</h1>
          </div>
          <p className="text-[#6B6B6B] text-sm">{filteredProperties.length} properties listed</p>
        </div>

        {/* Filter Bar */}
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

        {/* Property Grid */}
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

        {/* Pagination Controls */}
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

        {/* Explicitly Visible Toggle Option (Always shown if results exceed items per page) */}
        {filteredProperties.length > propertiesPerPage && (
          <div className="text-center mt-6">
            <button
              onClick={() => { setShowAll(!showAll); setCurrentPage(1); }}
              className="border-2 border-[#B8975A] text-[#B8975A] hover:bg-[#B8975A] hover:text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300"
            >
              {showAll ? 'Show Paginated View' : 'View All Properties at Once'}
            </button>
          </div>
        )}

        {/* new projects */}
        <NewProjectsSection/>

      </div>
    </div>
  );
};

export default AllPropertiesPage;