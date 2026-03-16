import React, { useEffect } from "react";
// import WOW from "wowjs";
import "animate.css";

const WhatWeBuild = () => {
   

  const services = [
    {
      title: "Built for Your Application, Not Adapted to It",
      description: "Every embedded system we design starts from your specific requirements - your sensors, your environment, your I/O, your control logic. Nothing is copy-pasted from a previous project. The result is a performs exactly as designed.",
      image: "https://plus.unsplash.com/premium_photo-1683288662050-a0c17370365d?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "1000ms",
      active: false,
    },
    {
      title: "End-to-End Under One Roof",
      description: "Hardware design, firmware development, PCB layout and assembly, testing, and production manufacturing - all done in-house, by the same team. No hand-offs to third parties. No quality gaps between vendors. One partner, one point of accountability.",
      image: "https://plus.unsplash.com/premium_photo-1683288662258-b02a355149e8?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "1200ms",
      active: true, // This one has the 'active' class
    },
    {
      title: "Designed to Survive Real Conditions",
      description: "Industrial and medical environments are unforgiving. Our embedded systems are designed for rugged, real-world operation - tested for EMI/EMC, ESD, surge, and extreme environmental conditions, so your product doesn't fail in the field.",
      image: "https://plus.unsplash.com/premium_photo-1693842703177-6edeba1f2eb3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "1400ms",
      active: false,
    },
     {
      title: "Cost That Makes Sense at Scale",
      description: "Unlike PLCs that carry unnecessary features your application will never use, a custom embedded solution from AESPL is lean by design. Once developed, the unit cost drops significantly at medium and high volumes - giving your product a genuine cost advantage in the market.",
      image: "https://plus.unsplash.com/premium_photo-1693842703177-6edeba1f2eb3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "1400ms",
      active: false,
    },
     {
      title: "Compliance Built In, Not Bolted On",
      description: "We design with regulatory compliance in mind from day one. Our products are tested to IEC 60601-1-2, IEC 61000-4-2, and other relevant standards - so your OEM product is ready for market submission without last-minute surprises.",
      image: "https://plus.unsplash.com/premium_photo-1693842703177-6edeba1f2eb3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "1400ms",
      active: false,
    },
     {
      title: "A Partnership, Not a Transaction",
      description: "We stay with you through production, post-rollout firmware updates, design revisions, and lifecycle management. Many of our OEM clients have been with us for over a decade - because when a partner truly understands your product, you don't walk away.",
      image: "https://plus.unsplash.com/premium_photo-1693842703177-6edeba1f2eb3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "1400ms",
      active: false,
    },

    
    
  ];

  return (
    <section className="wpo-service-section-s2 section-padding">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-8 col-12">
            <div className="wpo-section-title">
              <h6 style={{color:"#445793"}}>Why OEMs Choose AESPL</h6>
                <h2 className="poort-text poort-in-right">
                Why Do India's Leading OEMs <br /> Come to AESPL — and Stay?
                </h2>
                <p>
                   Because we understand what it costs when your embedded partner gets it wrong. Delayed timelines, failed compliance tests, components that can't survive field conditions - we've spent decades eliminating exactly these risks for the companies we work with.
                </p>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-lg-4 col-md-6 col-12 mt-2" key={index}>
              <div
                className={`service-wrap ${service.active ? "active" : ""} wow fadeInUp`}
                data-wow-duration={service.duration}
              >
                <div className="service-item">
                  <h3>
                    <a href="service-single.html">{service.title}</a>
                  </h3>
                  <p>{service.description}</p>
                </div>
                {/* <div className="image">
                  <img src={service.image} alt="image" />
                </div> */}
                <div className="icon">
                  <a href="service-single.html">
                    <img src="assets/images/service/arrow-2.svg" alt="icon" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;
