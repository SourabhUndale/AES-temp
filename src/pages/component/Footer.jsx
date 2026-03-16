import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer-common footer-section-s1">
        <div className="footer-wrap" style={{backgroundImage: "url()", backgroundRepeat: "no-repeat", backgroundPosition: "center center"}}>
          {/* Top Bar */}
          {/* <div className="footer-topbar moving-cursor-wrap">
          <div className="container">
            <div className="wraper">
              <div className="marquee_container">
                <div>
                  <h2 className="marquee-s2">
                    <small>
                      Schedule a Free Electrical System Evaluation. Plan Your Free Energy
                      Efficiency Consultation
                    </small>
                  </h2>
                </div>
              </div>
              <div className="booking-btn moving-cursor">
                <a className="btn-wrapper btn-move" href="/appoinment">
                  <small>Get Schedule Now</small>
                </a>
              </div>
            </div>
          </div>
        </div> */}

          {/* Main Footer */}
          <div className="container">
            <div className="footer">
              {/* Newsletter */}
              <div
                className="item widget-newsletter fade_bottom wow"
                data-wow-duration="1000ms"
              >
                <h2>Akshay Embedded System</h2>
                {/* <div className="newsletter">
                <form className="form-fild">
                  <div className="input-items">
                    <input className="fild" type="email" placeholder="Email Address" required />
                  </div>
                  <div className="input-btn">
                    <button type="submit" className="theme-btn-s2">
                      Sign Up
                    </button>
                  </div>
                </form>
                <p>
                  By subscribing, you’re accept{" "}
                  <a href="/contact">Privacy Policy</a>
                </p>
              </div> */}

                <div className="fade_bottom wow" data-wow-duration="1000ms">
                  <ul>
                    <li>
                      {" "}
                      Phone:{" "}
                      <a
                        className="text-decoration-none text-white"
                        href="tel:+919825632017"
                      >
                        +91 98256 32017
                      </a>
                      <br />
                    </li>
                    <li>
                      {" "}
                      Email:{" "}
                      <a
                        className="text-decoration-none text-white"
                        href="mailto:akshayembedded17@gmail.com"
                      >
                        akshayembedded17@gmail.com
                      </a>
                    </li>
                    <li className="gap-4">
                     <a href="#" class="social-circle insta">
  <i class="bi bi-instagram"></i>
</a>
                      <a href="#" class="social-circle fb">
                        <i class="bi bi-facebook"></i>
                      </a>

                      <a href="#" class="social-circle linkedin">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Our Division */}
              <div className="item fade_bottom wow" data-wow-duration="1000ms">
                <h2 className="title">Pages</h2>
                <ul>
                  <li>
                    <a href="/about">Home</a>
                  </li>
                  <li>
                    <a href="/service-single">Our Products</a>
                  </li>
                  <li>
                    <a href="/team-single">Contact</a>
                  </li>
                  <li>
                    <a href="/service-single">Blog</a>
                  </li>
                </ul>
              </div>

              {/* Quick Link */}
              <div className="item fade_bottom wow" data-wow-duration="1000ms">
                <h2 className="title">About Us</h2>
                <ul>
                  <li>
                    <a href="/contact">Profile</a>
                  </li>
                  <li>
                    <a href="/appoinment">Quality Policy</a>
                  </li>
                  <li>
                    <a href="/project-single">Our Team</a>
                  </li>
                  <li>
                    <a href="/shop">Client Testimonials</a>
                  </li>
                  <li>
                    <a href="/blog-single">Certifications</a>
                  </li>
                </ul>
              </div>

              {/* Our Service */}
              <div className="item fade_bottom wow" data-wow-duration="1000ms">
                <h2 className="title">Our Products</h2>
                <ul>
                  <li>
                    <a href="/service-single">adult-ventilator</a>
                  </li>
                  <li>
                    <a href="/service-single">neonatal-ventilator</a>
                  </li>
                  <li>
                    <a href="/service-single">HFOV SYSTEM</a>
                  </li>
                  <li>
                    <a href="/service-single">BARC</a>
                  </li>
                  <li>
                    <a href="/service-single">Scanner Card With Keyboard</a>
                  </li>
                  <li>
                    <a href="/service-single">HONEYWELL – Air Handling Unit</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-lower">
            <div className="container">
              <div className="lower-footer-wrap">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-12">
                    <p className="copyright">
                      Made by &copy;2026 <a href="/">Thrum.</a> All rights
                      reserved.
                    </p>
                  </div>
                  <div className="col-lg-6 col-12">
                    <ul className="widget-social">
                      <li>
                        <a href="/contact">Contact</a>
                      </li>
                      <li>
                        <a href="/service">Services</a>
                      </li>
                      <li>
                        <a href="/blog">Blog</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
