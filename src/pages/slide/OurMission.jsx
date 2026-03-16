import React from 'react'
import "./Ourmission.css"
import { motion } from "framer-motion";

const OurMission = () => {

const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

  return (
    <>
    <section className="mental-section py-5">
      <div className="container">

        {/* Stats Row */}
        <motion.div
          className="row text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeft}
        >
          <div className="col-6 col-md-3 mb-4">
            <h2 className="stat-number">29+</h2>
            <p className="stat-text">Years Engineering Custom Embedded Solutions</p>
          </div>

          <div className="col-6 col-md-3 mb-4">
            <h2 className="stat-number">100+</h2>
            <p className="stat-text">Embedded Products Successfully Delivered</p>
          </div>

          <div className="col-6 col-md-3 mb-4">
            <h2 className="stat-number">20+</h2>
            <p className="stat-text">OEM Partners Across India</p>
          </div>

          <div className="col-6 col-md-3 mb-4">
            <h2 className="stat-number">2</h2>
            <p className="stat-text">Patents Granted & Filed in Medical Electronics</p>
          </div>
        </motion.div>

        {/* Content Row */}
        <div className="row align-items-start">

          {/* Left Side */}
          <motion.div
            className="col-lg-6 mb-4"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="main-heading">
              We Are the <br /> Engineering Team <br /> Behind Your Product.
            </h4>
            <img style={{ height: "198px", width: "500px" }} src="./assets/images/aboutPage/hero_img.png" alt="Our Mission" />
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="col-lg-6"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            <div className="mb-4">
              <h6>Most OEMs reach a point where off-the-shelf electronics stop working for them.</h6>
              <p className="description">
                The standard modules don't fit the application. The PLCs are overkill - expensive, bulky, and built for someone else's problem. The timelines stretch. The costs compound.
                <br /> That's exactly the problem Akshay Embedded Systems was built to solve.
              </p>
            </div>

            <hr />

            <div className="mt-4">
              <h6>We don't adapt existing solutions to your product. We build the solution your product actually needs</h6>
              <p className="description">
                From hardware architecture and firmware development to PCB assembly, rigorous testing, and production-scale manufacturing - we handle the entire embedded development cycle
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
    </>
  )
}

export default OurMission