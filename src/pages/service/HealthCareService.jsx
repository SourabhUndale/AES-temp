import React, { useEffect } from 'react'
// import WOW from "wowjs";
const HealthCareService = () => {
    // useEffect(() => {
    //     new WOW.WOW({
    //       live: false,
    //     }).init();
    //   }, []);
  return (
    <>
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Content */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold mb-4">
              Services to Support <br />
              Cultivation Activities
            </h1>

            <p className="text-muted mb-4">
              We present innovative solutions to increase the efficiency of
              agricultural businesses with services that support the
              development of farmers' cultivation technology.
            </p>

            <div className="d-flex gap-3">
              <button className="btn btn-success px-4 py-2 d-flex align-items-center">
                Join Now
                <span className="ms-2">➜</span>
              </button>

              <button className="btn btn-outline-dark px-4 py-2">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1500595046743-cd271d694d30"
              alt="Agriculture"
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>

        </div>
      </div>
    </section>
    {/* second section */}
    <section className="py-5">
      <div className="container">

        {/* Heading Row */}
        <div className="row mb-5">
          <div className="col-lg-7">
            <h2 className="display-5 fw-bold">
              Why Should You Partner?
            </h2>
          </div>
          <div className="col-lg-5">
            <p className="text-muted">
              Gain a deeper understanding of the features offered by partner
              services according to your job role, so we can provide assistance
              tailored to your needs.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="row g-4">

          {/* Card 1 */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 p-4">
              <div className="mb-3 icon-circle">
                <i className="bi bi-flower1"></i>
              </div>
              <h5 className="fw-bold">Monitor Cultivation</h5>
              <p className="text-muted mb-0">
                Helps you digitally monitor the cultivation process according to SOP
                (Standard Operating Procedure) to easily maintain standard quality
                of production results.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 p-4">
              <div className="mb-3 icon-circle">
                <i className="bi bi-box-seam"></i>
              </div>
              <h5 className="fw-bold">Stock Supply Guarantee</h5>
              <p className="text-muted mb-0">
                Ensure that the availability of guaranteed supply stocks has been
                prepared to provide optimal support for your offakers, farmers,
                breeders, fish farmers and cultivators.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 p-4">
              <div className="mb-3 icon-circle">
                <i className="bi bi-cash-stack"></i>
              </div>
              <h5 className="fw-bold">Capital Assistance</h5>
              <p className="text-muted mb-0">
                We provide support in your capital process by compiling and
                recording detailed Financial Reports and ensuring the accuracy
                of your financial data.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100 p-4">
              <div className="mb-3 icon-circle">
                <i className="bi bi-person-workspace"></i>
              </div>
              <h5 className="fw-bold">Field Assistant</h5>
              <p className="text-muted mb-0">
                We deploy field assistants in each region who support operational
                tasks and direct field activities.
              </p>
            </div>
          </div>

        </div>
      </div>
      </section>

      {/* third section */}
      <section className="py-5">
      <div className="container">

        {/* Top Label */}
        <div className="mb-3">
          <span className="badge bg-light text-success px-3 py-2 rounded-pill">
            Our Services
          </span>
        </div>

        {/* Heading Row */}
        <div className="row mb-5 align-items-start">
          <div className="col-lg-7">
            <h2 className="display-5 fw-bold">
              Various Products Available at <br />
              Agriswara Partner Services
            </h2>
          </div>
          <div className="col-lg-5">
            <p className="text-muted">
              Learn more about the products available in the Agree Partner
              service for farmers, fishermen, livestock breeders and fish
              farmers.
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="row g-4">

          {/* Card 1 */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100 p-3 product-card">

              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                alt="Dashboard"
                className="img-fluid rounded mb-4"
              />

              <h5 className="fw-bold">Company Dashboard</h5>
              <p className="text-muted">
                Data visualization that provides key information about business
                performance to facilitate decision making and strategic planning.
              </p>

              <button className="btn btn-outline-dark rounded-pill px-4">
                Learn More <i className="bi bi-arrow-right ms-1"></i>
              </button>

            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100 p-3 product-card">

              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="Field Assistant"
                className="img-fluid rounded mb-4"
              />

              <h5 className="fw-bold">Agree Field Assistant</h5>
              <p className="text-muted">
                We provide an application that Field Assistants can use to
                support cultivators and agribusiness companies in carrying out
                cultivation.
              </p>

              <button className="btn btn-outline-dark rounded-pill px-4">
                Learn More <i className="bi bi-arrow-right ms-1"></i>
              </button>

            </div>
          </div>

        </div>

      </div>
</section>
{/* Fourth section */}
  <section className="py-5 register-section">
      <div className="container">
        <div className="row">

          {/* LEFT SIDE */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h2 className="fw-bold mb-4 section-title">
              How to Register for Agree Partner Services
            </h2>

            <ul className="list-unstyled register-tabs">
              <li className="active-tab">//Agribusiness Company</li>
              <li>//Cultivation Actors</li>
              <li>//Field Assistant</li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-8">
            <div className="accordion custom-accordion" id="registerAccordion">

              {/* Item 1 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                  >
                    <span className="step-number">01</span>
                    Prepare Company Information
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#registerAccordion"
                >
                  <div className="accordion-body">
                    Prepare company information documents such as Company
                    Establishment Deed, KTP and NPWP.
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                  >
                    <span className="step-number">02</span>
                    Contact Us via WhatsApp
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#registerAccordion"
                >
                  <div className="accordion-body">
                    Reach out to our team via WhatsApp to start the registration
                    and verification process.
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                  >
                    <span className="step-number">03</span>
                    Access Company Dashboard
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#registerAccordion"
                >
                  <div className="accordion-body">
                    After approval, access your company dashboard and manage
                    your agricultural operations easily.
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
</section>
    </>
  )
}

export default HealthCareService