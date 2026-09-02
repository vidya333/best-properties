import React from 'react';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';

const NEW_PROJECTS = [
  {
    id: 1,
    title: "YOO Pristine",
    developer: "Pristine Properties",
    location: "Pimpri Chinchwad, Pune",
    type: "2, 3, 4 BHK Flats",
    price: "₹ 1.19 Cr onwards",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    link: "/property/1"
  },
  {
    id: 2,
    title: "Mindspace Residency",
    developer: "Anand Mindspace LLP",
    location: "Lohegaon, Pune",
    type: "3 BHK Flats",
    price: "₹ 1.55 Cr onwards",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    link: "/property/2"
  },
  {
    id: 3,
    title: "Binawat Trimurti Sphere",
    developer: "Binawat Realty",
    location: "Erandwane, Pune",
    type: "3, 4 BHK Flats",
    price: "₹ 3.18 Cr onwards",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    link: "/property/3"
  },
  {
    id: 4,
    title: "Sigma Centuria Phase II",
    developer: "Sigma Buildzone",
    location: "Hadapsar, Pune",
    type: "2 BHK Flats",
    price: "₹ 65 Lac onwards",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
    link: "/property/4"
  },
  {
    id: 5,
    title: "Ravi Adara",
    developer: "Tingre Bizcorp",
    location: "Kondhwa, Pune",
    type: "2, 3 BHK Flats",
    price: "₹ 86.1 Lac onwards",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    link: "/property/5"
  },
  {
    id: 6,
    title: "Splendour Greens",
    developer: "Raviraj Sheth Developers",
    location: "Kondhwa, Pune",
    type: "1, 2 BHK Flats",
    price: "₹ 48 Lac onwards",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    link: "/property/6"
  }
];

const NewProjectsSection = () => {
  return (
    <section className="w-full py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                New Project Gallery
              </h2>
              <span className="bg-[#B8975A]/10 text-[#B8975A] text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded border border-[#B8975A]/30">
                Featured
              </span>
            </div>
            <div className="w-12 h-1 bg-[#B8975A] mt-2 rounded-full" />
          </div>

          <a 
            href="/properties/type/all" 
            className="text-xs sm:text-sm font-semibold text-[#B8975A] hover:text-[#9A7A42] flex items-center gap-2 transition-colors group"
          >
            See all Projects 
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 2-Column or 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEW_PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.link}
              className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#B8975A]/50 transition-all duration-300 flex overflow-hidden min-h-[160px] h-auto"
            >
              {/* Left Thumbnail Image */}
              <div className="w-2/5 relative overflow-hidden bg-gray-900 shrink-0 self-stretch">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                />
              </div>

              {/* Right Content */}
              <div className="w-3/5 p-3.5 sm:p-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-[#B8975A] text-sm sm:text-base leading-snug line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-1">
                    {project.developer}
                  </p>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1 line-clamp-1">
                    <FaMapMarkerAlt className="text-[#B8975A] shrink-0 text-[10px]" />
                    {project.location}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 mt-2">
                  <span className="block text-[11px] text-gray-600 font-medium">
                    {project.type}
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-[#B8975A] mt-0.5">
                    {project.price}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewProjectsSection;