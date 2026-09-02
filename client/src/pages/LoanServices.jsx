import React, { useState } from "react";
import {  Row, Col, Card } from "react-bootstrap";
import Banks from "../components/Banks";
import EnquiryModal from "../components/EnquiryModal";
import OurPromise from "../components/OurPromise";

const LoanServices = () => {
      const [showModal, setShowModal] = useState(false);
    
  return (
    <section className="pt-5 container-fluid px-5">
      {/* Header Section */}
      <Row className="mb-4 text-center">
        <Col>
          <h2 className="fw-bold text-dark mt-5">VM Prosperity Group <br />
          <h5 className="my-3 text-secondary">Loan Assistance Services</h5>
           </h2>
          <p className="lead text-muted">
            At VM Prosperity Group, we are committed to making property ownership and
            financial planning seamless for our clients. To support your dreams,
            we have proudly partnered with <strong>28 leading banks across India</strong>,
            ensuring that you always get the best loan options with trusted guidance.
          </p>
        </Col>
      </Row>

      {/* Core Loan Services */}
      <Row className="mb-5 ">
        <h3 className="fw-semibold mb-4 text-center"> Our Core Loan Services</h3>

       
        {[
          {
            title: "Home Loans ",
            text: "Fulfill your dream of owning a home with our wide range of home loan options. Whether it’s your first apartment, a villa, or an investment property, we help you secure the most competitive rates and flexible repayment tenures.",
          },
          {
            title: "Personal Loans ",
            text: "Tailored for urgent personal needs like interiors, relocation, or unexpected expenses. With our bank tie-ups, you get faster approvals and easy EMIs.",
          },
          {
            title: "Mortgage Loans ",
            text: "Finance your needs by mortgaging your property. Our strong banking network ensures quick disbursal and transparent terms.",
          },
          {
            title: "Loans Against Property (LAP) ",
            text: "Unlock the hidden value of your residential or commercial property. Continue to own your asset while accessing funds for business expansion, education, or personal requirements, at attractive interest rates.",
          },
        ].map((service, idx) => (
          <Col md={6} lg={3} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm border-0 rounded-3">
              <Card.Body>
                <Card.Title className="fw-bold text-dark">{service.title}</Card.Title>
                <Card.Text className="text-muted">{service.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Loan Options */}
      <Row className="mb-5 mx-auto ">
          <h3 className="fw-semibold mb-4 text-center"> Additional Real Estate-Linked Loan Options</h3>
        {[
          {
            title: "Top-Up Loans ",
            text: "Need extra funds after taking a home loan? Get additional finance on your existing loan for renovations, upgrades, or extensions.",
          },
          {
            title: "Balance Transfer Facility ",
            text: "Already have a loan? We help you transfer it to another bank with lower interest rates, reducing your EMI burden.",
          },
        ].map((service, idx) => (
          <Col md={6} key={idx}>
            <Card className="h-100 shadow-sm border-0 rounded-3 mb-4">
              <Card.Body>
                <Card.Title className="fw-bold text-dark">{service.title}</Card.Title>
                <Card.Text className="text-muted">{service.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Why Choose Section */}
      <Row className="mb-5">
        <Col md={{ span: 10, offset: 1 }}>
          <Card className="p-4 shadow-sm border-0 rounded-3 bg-light">
            <h3 className="fw-semibold mb-3"> Why Choose VM Prosperity Group?</h3>
            <ul className="mt-4 fs-5">
              <li> Tie-up with 28 reputed banks for wide choice</li>
              <li> Lowest interest rates through our partnerships</li>
              <li> Quick approvals with minimal documentation</li>
              <li> Expert guidance at every step</li>
              <li> 100% transparency with no hidden costs</li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Our Promise */}
      <Row className="mb-5 text-center">
        <Col>
          <h3 className="fw-semibold"> Our Promise</h3>
          <p className="lead text-muted">
            With VM Prosperity Group, loans are not just financial products – they are
            bridges to your dreams. Whether it’s buying your dream home, upgrading
            property, or accessing funds through mortgage and LAP, we ensure a
            smooth, trusted, and prosperous journey for every client.
          </p>
        </Col>
      </Row>

      {/* Contact Section */}
      <Row className="text-center">
        <Col>
          <h4 className="fw-bold"> For Loan Assistance, Contact Us:</h4>
          <p className="fs-5 text-dark my-2">+91 9112456000 /+91 9657096000</p>
        </Col>
      </Row>

      <button className="banner-button mx-auto d-block my-2" onClick={() => setShowModal(true)}>
            Contact Now
      </button>
      {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}


      {/* Banks */}
      <Banks/>
      <OurPromise/>
    </section>
  );
};

export default LoanServices;
