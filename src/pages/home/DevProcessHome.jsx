import React from "react";
import { motion } from "framer-motion";

const DevProcessHome = () => {
  const features = [
    { icon: "/assets/images/feature/graph.png", title: "Custom Embedded Hardware Design", p: "Precision circuit design, signal conditioning, sensor interfacing, power electronics, and microcontroller architecture - tailored to your exact application." },
    { icon: "/assets/images/feature/office-worker.png", title: "Firmware & Embedded Software", p: "Real-time firmware, control algorithms, communication stacks, and HMI logic - written from scratch for your product's specific performance requirements." },
    { icon: "/assets/images/feature/customer-service.png", title: "PCB Design & In-House Assembly", p: "Multi-layer PCB layout, in-house SMT and through-hole assembly, and DFM review for consistent, production-quality boards." },
    { icon: "/assets/images/feature/people.png", title: "Testing & Compliance Validation", p: "IEC standard testing, EMI/EMC pre-compliance, ESD, EFT, surge, functional validation, and stress testing — so your product passes certification the first time." },
    { icon: "/assets/images/feature/like.png", title: "Prototyping to Full-Scale Production", p: "From first prototype to small-batch and high-volume production runs - with the same quality discipline at every stage." },
    { icon: "/assets/images/feature/briefcase (2).png", title: "Post-Rollout Support", p: "Firmware updates, field support, component lifecycle management, and design revisions as your product evolves." }
  ];

  // Duplicate for seamless infinite loop
  const duplicatedFeatures = [...features, ...features];

  return (
    <section className="wpo-feature-section section-padding">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-8 col-12">
            <div className="wpo-section-title">
                <h2 className="poort-text poort-in-right">
                  From Concept to Production-Ready. We Do It All.
                </h2>
                <p>
                   Akshay Embedded Systems in-house capabilities cover the full lifecycle of embedded product development:
                </p>
              </div>
          </div>
        </div>

        {/* Replaced Swiper with a Framer Motion Container */}
        <div className="feature-max" style={{ overflow: "hidden" }}>
          <motion.div
            className="feature-wrap"
            style={{ display: "flex", width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 43, // Adjust this for speed
              repeat: Infinity,
            }}
            // Added Pause on Hover functionality
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedFeatures.map((item, index) => (
              <div
                key={index}
                className="feature-items wow animate__animated animate__fadeInUp"
                style={{ 
                  flexShrink: 0, 
                  width: "400px", // Maintains slide width
                  marginRight: "25px",
                  whiteSpace: "normal" // Keeps text wrapping inside cards
                }}
              >
                <div className="icon">
                  <img src={item.icon} alt="icon" />
                  {/* <i className="bi bi-briefcase"></i> */}
                </div>
                <div className="text">
                  <h3>
                    <a href="service-single.html" className="text-white">{item.title}</a>
                  </h3>
                  <p className="">{item.p}</p>

                </div>
                <div className="arrow-icon">
                  <a href="service-single.html">
                    <img src="/assets/images/arrow-top.png" className="icon-hover" alt="icon" />
                    <img src="/assets/images/arrow-top-hover.png" className="icon-active" alt="icon" />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DevProcessHome;