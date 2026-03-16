import React from "react";
import "./TechOpportunity.css";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const TechOpportunity = () => {
  return (
    <section className="tech-section py-5 mt-5">

      <div className="container">

        {/* Heading */}

        <motion.div
          className="text-center mb-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h1 className="tech-title">
            Profile
          </h1>

          <p className="tech-subtitle">
            Our mission is to bridge the gap between complexity and efficiency,
            ensuring every organization can thrive in a digital-first world.
          </p>
        </motion.div>


        {/* Grid Layout */}

        <div className="row g-4">

          {/* Left Big Image */}

          <div className="col-lg-4">
            <motion.div
              className="card-box"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1766436243480-f548bc9383a5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="img-fluid"
              />
            </motion.div>
          </div>


          {/* Middle Column */}

          <div className="col-lg-4 d-flex flex-column gap-4">

            <motion.div
              className="stat-card orange-card"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-white">90%</h2>
              <p className="text-white">Faster Response Times</p>
            </motion.div>

            <motion.div
              className="card-box"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://images.unsplash.com/photo-1769148023257-02df7ec903be?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="img-fluid"
              />
            </motion.div>

          </div>


          {/* Right Column */}

          <div className="col-lg-4 d-flex flex-column gap-4">

            <motion.div
              className="card-box"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://images.unsplash.com/photo-1717444308695-cacce29f6991?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="img-fluid"
              />
            </motion.div>

            <motion.div
              className="stat-card black-card"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-white">50%</h2>
              <p className="text-white">Faster Response Times</p>
            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default TechOpportunity;