import { motion } from "framer-motion";
// import WOW from "wowjs";
import "./Product.css";
import { useEffect } from "react";

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

const OurProduct = () => {
  //   useEffect(() => {
  //   new WOW.WOW({
  //     live: false,
  //   }).init();
  // }, []);
  return (
    <>
    <section className="wpo-service-section-s2" style={{marginTop:"7rem"}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <div className="wpo-section-title" style={{marginBottom:"10px"}}>
            <h6 style={{color:"#445793"}}> INNOVATION & RECOGNITION</h6>
              <h2 className="poort-text poort-in-right">
                We Don't Just Build Products. <br /> We Advance What's Possible.
              </h2>
              <p>
                Akshay Embedded Systems is a DPIIT-recognized Startup India company - acknowledged by the Government of India for our innovation in ventilator technology. Our work isn't just contract manufacturing it pushes the boundaries of what custom embedded electronics can achieve.
              </p>
            </div>
          </div>
        </div>

      {/* Section 1 */}
      <section className="tech-section mt-5">
        <div className="tech-container">

          <motion.div
            className="tech-image"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}   // 👈 no once: true
  transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="./assets/images/aboutPage/p1.jpeg"
              alt="AI"
            />
          </motion.div>

          <motion.div
            className="tech-content"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}   // 👈 no once: true
  transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="tech-label">Patent No. 542763</span>
            <h2 className="tech-title">
               Patent for our  <span>(HFOV) apparatus</span> 
            </h2>
            <p className="tech-description">
              Granted patent for our High Frequency Oscillatory Ventilation (HFOV) apparatus - Patent No. 542763
            </p>
            {/* <button className="tech-btn">
              Discover our AI solutions →
            </button> */}
          </motion.div>

        </div>
      </section>

      {/* Section 2 (Reverse Layout) */}
      <section className="tech-section mt-5">
        <div className="tech-container">

          <motion.div
            className="tech-content"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}   // 👈 no once: true
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="tech-label">PATENT NO. 573255</span>
            <h2 className="tech-title">
              Patent for our <span>BUBBLE CPAP MACHINE</span> With Adjustable Amplitude
            </h2>
            <p className="tech-description">
              Granted patent for our BUBBLE CPAP MACHINE WITH ADJUSTABLE AMPLITUDE- PATENT NO. 573255  
            </p>
           
          </motion.div>

          <motion.div
            className="tech-image"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}   // 👈 no once: true
  transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="https://images.unsplash.com/photo-1642229407420-a659dac2f029?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="AI"
            />
          </motion.div>

        </div>
      </section>

      {/* Section 3 */}
      <section className="tech-section mt-5">
        <div className="tech-container">

          <motion.div
            className="tech-image"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}   // 👈 no once: true
  transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="./assets/images/aboutPage/p2.jpeg"
              alt="AI"
            />
          </motion.div>

          <motion.div
            className="tech-content"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}   // 👈 no once: true
  transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="tech-label">CRITICAL PROJECT</span>
            <h2 className="tech-title">
              Critical Project developed  <span>for BARC</span> 
            </h2>
            <p className="tech-description">
              We’ve invested more in AI technology than any other real estate
              company unlocking the potential of buildings and people.
            </p>
          </motion.div>

        </div>
      </section>
      </div>
      </section>
    </>
  );
};

export default OurProduct;