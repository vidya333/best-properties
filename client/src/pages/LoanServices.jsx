import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Banks from "../components/Banks";
import EnquiryModal from "../components/EnquiryModal";
import LocationSection from "../components/LocationSection";

const LoanServices = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-[#fdfbf7] text-dark min-vh-100" >
      
      {/* Top Banner Image Section */}
      <div className="position-relative w-100 mb-5" style={{ height: "450px", overflow: "hidden" }}>
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80" 
          alt="Loan Assistance Banner" 
          className="w-100 h-100 object-fit-cover"
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white text-center px-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}>
          <span className="text-uppercase fw-bold mb-2 tracking-widest" style={{ color: "#c5a059", letterSpacing: "3px", fontSize: "13px" }}>
            Financial Solutions
          </span>
          <h1 className="fw-bold font-serif display-5 mb-2">Loan Assistance Services</h1>
          <p className="text-light small mb-0" style={{ maxWidth: "600px" }}>
            Seamless property financing and expert advisory tailored to your dreams.
          </p>
        </div>
      </div>

      <div className="container px-4 pb-5">
        
        {/* Header Section */}
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="fw-bold mb-3 font-serif" style={{ color: "#222" }}>
              BEST Properties <span className="fw-semibold" style={{ color: "#c5a059", display: "block", fontSize: "1.3rem", marginTop: "5px" }}>Your Trusted Partner</span>
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "800px", lineHeight: "1.7" }}>
              At BEST Properties, we are committed to making property ownership and
              financial planning seamless for our clients. To support your dreams,
              we have proudly partnered with <strong style={{ color: "#c5a059" }}>28 leading banks across India</strong>,
              ensuring that you always get the best loan options with trusted guidance.
            </p>
          </Col>
        </Row>

        {/* Core Loan Services */}
        <Row className="mb-5">
          <Col xs={12}>
            <h3 className="fw-bold mb-4 text-center font-serif" style={{ color: "#222", borderBottom: "2px solid #eae5d9", paddingBottom: "12px" }}>
              Our Core Loan Services
            </h3>
          </Col>

          {[
            {
              title: "Home Loans",
              text: "Fulfill your dream of owning a home with our wide range of home loan options. Whether it’s your first apartment, a villa, or an investment property, we help you secure the most competitive rates and flexible repayment tenures.",
            },
            {
              title: "Personal Loans",
              text: "Tailored for urgent personal needs like interiors, relocation, or unexpected expenses. With our bank tie-ups, you get faster approvals and easy EMIs.",
            },
            {
              title: "Mortgage Loans",
              text: "Finance your needs by mortgaging your property. Our strong banking network ensures quick disbursal and transparent terms.",
            },
            {
              title: "Loans Against Property (LAP)",
              text: "Unlock the hidden value of your residential or commercial property. Continue to own your asset while accessing funds for business expansion, education, or personal requirements, at attractive interest rates.",
            },
          ].map((service, idx) => (
            <Col md={6} lg={3} className="mb-4" key={idx}>
              <Card className="h-100 bg-white border rounded-4 shadow-sm transition-all" style={{ borderColor: "#eae5d9" }}>
                <Card.Body className="p-4 d-flex flex-column justify-between">
                  <div>
                    <Card.Title className="fw-bold mb-3 font-serif" style={{ color: "#222", fontSize: "1.1rem" }}>
                      {service.title}
                    </Card.Title>
                    <Card.Text className="text-muted small" style={{ lineHeight: "1.6" }}>
                      {service.text}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Additional Loan Options */}
        <Row className="mb-5 mx-auto">
          <Col xs={12}>
            <h3 className="fw-bold mb-4 text-center font-serif" style={{ color: "#222", borderBottom: "2px solid #eae5d9", paddingBottom: "12px" }}>
              Additional Real Estate-Linked Loan Options
            </h3>
          </Col>
          {[
            {
              title: "Top-Up Loans",
              text: "Need extra funds after taking a home loan? Get additional finance on your existing loan for renovations, upgrades, or extensions.",
            },
            {
              title: "Balance Transfer Facility",
              text: "Already have a loan? We help you transfer it to another bank with lower interest rates, reducing your EMI burden.",
            },
          ].map((service, idx) => (
            <Col md={6} key={idx} className="mb-4">
              <Card className="h-100 bg-white border rounded-4 shadow-sm" style={{ borderColor: "#eae5d9" }}>
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-3 font-serif" style={{ color: "#222", fontSize: "1.1rem" }}>
                    {service.title}
                  </Card.Title>
                  <Card.Text className="text-muted small" style={{ lineHeight: "1.6" }}>
                    {service.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Why Choose Section */}
        <Row className="mb-5">
          <Col md={{ span: 10, offset: 1 }}>
            <Card className="p-4 p-md-5 shadow-sm rounded-4 bg-white border" style={{ borderColor: "#eae5d9" }}>
              <h3 className="fw-bold mb-4 text-center font-serif" style={{ color: "#c5a059" }}>
                Why Choose BEST Properties?
              </h3>
              <ul className="mt-3 list-unstyled text-secondary" style={{ lineHeight: "2.2" }}>
                <li className="d-flex align-items-center gap-3"><span style={{ color: "#c5a059", fontWeight: "bold" }}>•</span> Tie-up with 28 reputed banks for wide choice</li>
                <li className="d-flex align-items-center gap-3"><span style={{ color: "#c5a059", fontWeight: "bold" }}>•</span> Lowest interest rates through our partnerships</li>
                <li className="d-flex align-items-center gap-3"><span style={{ color: "#c5a059", fontWeight: "bold" }}>•</span> Quick approvals with minimal documentation</li>
                <li className="d-flex align-items-center gap-3"><span style={{ color: "#c5a059", fontWeight: "bold" }}>•</span> Expert guidance at every step</li>
                <li className="d-flex align-items-center gap-3"><span style={{ color: "#c5a059", fontWeight: "bold" }}>•</span> 100% transparency with no hidden costs</li>
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Our Promise */}
        <Row className="mb-5 text-center">
          <Col md={{ span: 8, offset: 2 }}>
            <h3 className="fw-bold mb-3 font-serif" style={{ color: "#222" }}>Our Promise</h3>
            <p className="text-muted" style={{ lineHeight: "1.7" }}>
              With BEST Properties, loans are not just financial products – they are
              bridges to your dreams. Whether it’s buying your dream home, upgrading
              property, or accessing funds through mortgage and LAP, we ensure a
              smooth, trusted, and prosperous journey for every client.
            </p>
          </Col>
        </Row>

        {/* Contact Information & Details Section */}
        {/* <Row className="mb-5 justify-content-center">
          <Col md={8}>
            <Card className="p-4 shadow-sm rounded-4 bg-white border text-center" style={{ borderColor: "#eae5d9" }}>
              <h4 className="fw-bold font-serif mb-3" style={{ color: "#222" }}>Visit Us or Get in Touch</h4>
              <p className="text-muted small mb-2">
                <strong>Address:</strong> Shop No. G-97, Destination Centre-1, Opposite to D-Mart, Nanded City Pune - 411041
              </p>
              <p className="text-muted small mb-2">
                <strong>Contact Number:</strong> <span style={{ color: "#c5a059", fontWeight: "bold" }}>+91 96239 35935</span> / <span style={{ color: "#c5a059", fontWeight: "bold" }}>+91 9112456000</span>
              </p>
              <p className="text-muted small mb-3">
                <strong>Email:</strong> madhukarmangnale89@gmail.com
              </p>
              <div>
                <button 
                  className="btn px-5 py-2 fw-bold text-white rounded-pill shadow-sm" 
                  style={{ backgroundColor: "#c5a059", border: "none" }}
                  onClick={() => setShowModal(true)}
                >
                  Contact Now
                </button>
              </div>
            </Card>
          </Col>
        </Row> */}

        {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}

        {/* Banks & OurPromise Components */}
        <div className="mt-5 pt-4">
          <Banks />
        </div>
        <div className="mt-4">
          <LocationSection/>
        </div>

      </div>
    </div>
  );
};

export default LoanServices;