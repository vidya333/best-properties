import React from 'react';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaWhatsapp, 
  FaShieldAlt, 
  FaChartLine, 
} from 'react-icons/fa';
import OurPromise from '../components/OurPromise';

const teamMembers = [
  {
    name: 'Jagruti',
    role: 'Founder & Principal Advisor',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    phone: '+919112456000',
    email: 'vidya.nk07@gmail.com',
  },
  {
    name: 'Rajesh Sharma',
    role: 'Head of Sales & Acquisitions',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    phone: '+919657096000',
    email: 'vidya.nk07@gmail.com',
  },
  {
    name: 'Priya Kulkarni',
    role: 'Legal & Documentation Lead',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    phone: '+919112456000',
    email: 'vidya.nk07@gmail.com',
  },
  {
    name: 'Amit Deshmukh',
    role: 'Commercial Investments Specialist',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
    phone: '+919657096000',
    email: 'vidya.nk07@gmail.com',
  },
  {
    name: 'Neha Patil',
    role: 'Client Relations & Leasing Lead',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&q=80',
    phone: '+919112456000',
    email: 'vidya.nk07@gmail.com',
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-white">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[420px] sm:h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="Luxury Architecture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-[#0D0D0D]/60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-[4px] uppercase text-[#B8975A] mb-3 bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm border border-[#B8975A]/30">
            About BEST Properties
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Building Trust, One Property at a Time
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Nanded City's premier real estate consultancy - grounded in deep local roots, driven by complete operational transparency, and dedicated to matching families with their ideal homes.
          </p>
        </div>
      </section>

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
                    <FaShieldAlt className="text-base" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#0D0D0D]">100% Verified Deals</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1">Clear legal checks & transparent title documentation.</p>
                </div>

                <div className="bg-white p-4 border border-gray-100 shadow-sm rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-[#B8975A]/10 text-[#B8975A] flex items-center justify-center mb-2">
                    <FaChartLine className="text-base" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#0D0D0D]">Market Valuation</h4>
                  <p className="text-xs text-[#6B6B6B] mt-1">Accurate, data-driven pricing for buying & selling.</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="btn-gold px-8 py-3.5 text-xs tracking-wider uppercase font-semibold inline-flex items-center gap-2"
                >
                  Get In Touch
                
                </a>
              </div>
            </div>

            {/* Right Column: Visual Showcase & Stats */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Nanded City Real Estate"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -top-6 -left-4 sm:-left-6 bg-white p-5 shadow-xl border-l-4 border-[#B8975A] rounded-sm max-w-[180px]">
                <div className="text-3xl font-serif font-bold text-[#0D0D0D]">12+</div>
                <p className="text-[11px] font-medium text-[#6B6B6B] uppercase tracking-wider mt-0.5">
                  Years Market Leadership
                </p>
              </div>

              {/* Floating Stat Card 2 */}
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

      {/* 2. Editorial Narrative Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="text-[10px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-2">
              Who We Are
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D0D0D]">
              Redefining Real Estate Experience in Pune
            </h2>
          </div>

          <div className="space-y-6 text-[#4A4A4A] text-sm sm:text-base leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#B8975A] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              Founded over twelve years ago, BEST Properties emerged with a fundamental standard: to remove ambiguity, unnecessary middle layers, and opacity from property dealings in Nanded City. What started as a modest advisory firm has steadily grown into one of Sinhagad Road's most respected real estate consultancies, handling residential purchases, commercial investments, and premium rentals.
            </p>
            <p>
              Navigating the real estate landscape can often feel overwhelming due to legal complexities, shifting micro-market rates, and unreliable listings. At BEST Properties, we eliminate this uncertainty. We personally evaluate every property listing, verify ownership documentation, analyze true valuation trends, and provide straight-forward advice. Whether you are looking for your first home in developments like Bageshree, Asawari, and Pancham, or managing a portfolio of commercial real estate, our dedicated guidance remains constant.
            </p>
            <p>
              Our operating philosophy is simple — client interests come first. We do not focus merely on closing transactions; we focus on building relationships that last long after the key handover. From initial search to mortgage assistance, negotiation, legal vetting, and final registration, our team walks alongside you at every step of the journey.
            </p>
          </div>

          {/* Key Metric Counters Banner */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#FAF9F5] p-8 rounded-lg border border-gray-200/80">
            <div className="text-center sm:text-left">
              <div className="font-serif text-3xl font-bold text-[#0D0D0D]">12+ Years</div>
              <p className="text-xs text-[#6B6B6B] mt-1 uppercase tracking-wider font-medium">Nanded City Experience</p>
            </div>
            <div className="text-center sm:text-left border-y sm:border-y-0 sm:border-x border-gray-200 py-4 sm:py-0 sm:px-6">
              <div className="font-serif text-3xl font-bold text-[#0D0D0D]">1,000+</div>
              <p className="text-xs text-[#6B6B6B] mt-1 uppercase tracking-wider font-medium">Families Assisted</p>
            </div>
            <div className="text-center sm:text-left sm:pl-4">
              <div className="font-serif text-3xl font-bold text-[#0D0D0D]">100%</div>
              <p className="text-xs text-[#6B6B6B] mt-1 uppercase tracking-wider font-medium">Legal Document Clarity</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. The Journey */}
      <section className="py-20 px-6 bg-[#FAF9F5] border-y border-gray-200/60">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="text-[10px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-2">
              Our Growth
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D0D0D]">
              The Journey of BEST Properties
            </h2>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l-2 border-[#B8975A]/30 ml-4 sm:ml-32 space-y-12">
            
            {/* Step 1 */}
            <div className="relative pl-6 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#B8975A] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-serif text-xl font-bold text-[#B8975A]">
                2012
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200/80 shadow-sm">
                <span className="sm:hidden text-xs font-bold text-[#B8975A] uppercase tracking-wider mb-1 block">Year 2012</span>
                <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-3">Foundations in Nanded City</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  BEST Properties was launched with a single focus: providing reliable property advisory to families moving into the newly expanding township of Nanded City. We established our office at Destination Centre, laying the groundwork for genuine client-first service.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-6 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#B8975A] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-serif text-xl font-bold text-[#B8975A]">
                2017
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200/80 shadow-sm">
                <span className="sm:hidden text-xs font-bold text-[#B8975A] uppercase tracking-wider mb-1 block">Year 2017</span>
                <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-3">Expanding into Commercial & Advisory</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  As the local market matured, we expanded our services to commercial leasing, retail spaces, and high-yield property investments. Our team grew to offer specialized legal documentation support, home loan processing, and end-to-end property management.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-6 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#B8975A] border-4 border-white shadow-sm" />
              <div className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-serif text-xl font-bold text-[#B8975A]">
                Present
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200/80 shadow-sm">
                <span className="sm:hidden text-xs font-bold text-[#B8975A] uppercase tracking-wider mb-1 block">Present Day</span>
                <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-3">A Trusted Landmark Name</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  Today, BEST Properties stands as one of the most recognizable real estate agencies in Nanded City, Sinhagad Road. With over 1,000 satisfied property transactions completed, we continue to prioritize integrity, speed, and personalized client support.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Guided Workflow Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="text-[10px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-2">
                Our Method
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#0D0D0D] mb-4">
                How We Guide You to Your Next Property
              </h2>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">
                Instead of automated list dumps, we offer a tailored search experience. We walk you through every critical phase so you buy or rent with 100% peace of mind.
              </p>
              <a
                href="#contact"
                className="inline-block bg-[#0D0D0D] hover:bg-[#B8975A] text-white py-2.5 px-6 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Schedule A Visit
              </a>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                { step: '01', title: 'Need Analysis & Selection', text: 'We understand your exact spatial requirements, preferred neighborhood, budget parameters, and timeline.' },
                { step: '02', title: 'Physical Property Tours', text: 'We accompany you on curated site visits to handpicked, verified properties that match your specifications.' },
                { step: '03', title: 'Legal & Pricing Negotiations', text: 'We assist with price negotiation, title verification, loan approvals, and drafting clear agreement contracts.' },
                { step: '04', title: 'Smooth Handover', text: 'From registry completion to final key collection, we oversee every detail until you move in.' },
              ].map(({ step, title, text }) => (
                <div key={step} className="flex gap-4 p-5 bg-[#FAF9F5] rounded border border-gray-100">
                  <div className="font-serif text-xl font-bold text-[#B8975A]">{step}</div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#0D0D0D] mb-1">{title}</h4>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Team Members Grid */}
<section className="py-20 px-6 bg-[#FAF9F5] border-t border-gray-200/60">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Title / Intro Box */}
      <div className="p-8 flex flex-col justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-2">
          Expert Advisors
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D] mb-4">
          Our Property Specialists
        </h2>
        <p className="text-[#6B6B6B] text-xs sm:text-sm leading-relaxed mb-6">
          Meet the experienced professionals driving transparency, market analysis, and client success across Nanded City.
        </p>
        <div>
          <a
            href="#contact"
            className="inline-block bg-[#B8975A] hover:bg-[#9A7A42] text-white px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Team Member Photo Cards (Always Visible Info) */}
      {teamMembers.map((member) => (
        <div
          key={member.name}
          className="group relative h-[360px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-900 cursor-pointer"
        >
          {/* Base Member Photo */}
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Bottom Gradient Protection */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Main Info Card Overlay (Always Visible) */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-center items-center">
            
            {/* Name & Role */}
            <h3 className="font-serif text-xl font-bold text-white mb-1 drop-shadow-sm">
              {member.name}
            </h3>
            <p className="text-xs text-[#B8975A] font-medium tracking-wide mb-3">
              {member.role}
            </p>

            {/* Accent Line */}
            <div className="w-10 h-[2px] bg-[#B8975A]/60 mb-4" />

            {/* Always Visible Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <a
                href={`tel:${member.phone}`}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-[#B8975A] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 shrink-0"
                aria-label="Call Advisor"
              >
                <FaPhoneAlt className="w-3.5 h-3.5 text-white fill-current shrink-0" />
              </a>

              <a
                href={`mailto:${member.email}`}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-[#B8975A] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 shrink-0"
                aria-label="Send Email"
              >
                <FaEnvelope className="w-3.5 h-3.5 text-white fill-current shrink-0" />
              </a>

              <a
                href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-[#25D366] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 shrink-0"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4 text-white fill-current shrink-0" />
              </a>
            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
</section>
      {/* Contact Section Component */}
      <OurPromise />

      {/* 6. Call to Action Banner */}
      <section className="bg-[#0D0D0D] py-16 px-6 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-[10px] font-semibold tracking-[3px] uppercase text-[#B8975A] mb-2">
            Get Started
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
            Ready to Find Your Space in Nanded City?
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
            Get in touch with our advisory team today for transparent advice and curated property choices.
          </p>
          <a
            href="#contact"
            className="inline-block bg-[#B8975A] hover:bg-[#9A7A42] text-white py-2.5 px-6 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Contact Our Team
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;