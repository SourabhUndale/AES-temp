import React from "react";
import "./azimute.css";

const AzimuteFooter = () => {
  return (
    <div className=" pt-5">

      {/* CTA SECTION */}

      <div className=" cta-section-nft text-center mb-4">
        <h3 className="cta-title-nft text-white">
          Your Product Idea. Our Engineering. Let's Make It Real.
        </h3>

        <p className="cta-text-nft text-white container">
          If you're an OEM looking for an embedded partner who will treat your product with the same<br /> seriousness you do -  you're in the right place. Tell us what you're building.<br /> We'll tell you exactly how we can help.
        </p>
        <button className="cta-btn-nft">
          Contact Us
        </button>
      </div>


      {/* FOOTER */}

      <div className="footer-box-nft">

        <div className="row gy-4">

          {/* Logo */}

          <div className="col-lg-3 col-md-6">
            <div className="footer-logo-nft mb-3">
              Akshay Embedded Systems
            </div>

            <p className="footer-desc-nft">
             <div className="contact-item-nft"><i class="fa-regular fa-envelope"></i> akshayembedded17@gmail.com</div>
            <div className="contact-item-nft"><i class="fa-solid fa-phone"></i> +91 98256 32017</div>
            <div className="contact-item-nft"><i class="fa-solid fa-location-dot"></i> S.No. 131/1B/3/2, Ram Indu Park Lane, Opp. Sapling School,Baner,Pune-411045 </div>
             {/* <div className="social-icons-nft mt-3">
              <a href="/">LinkedIn</a>
              <a href="/">Instagram</a>
              <a href="/">Facebook</a>
              <a href="/">YouTube</a>
            </div> */}
            </p>
          </div>


          {/* Empresa */}

          <div className="col-lg-3 col-md-6">

            <div className="footer-title-nft">Pages</div>

            <ul className="footer-links-nft">
              <li><a href="/">Home</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/Blog">Blog</a></li>
            </ul>

          </div>
<div className="col-lg-3 col-md-6">

            <div className="footer-title-nft">About Us</div>

            <ul className="footer-links-nft">
              <li><a href="/">Profile</a></li>
              {/* <li><a href="/">Quality Policy</a></li> */}
              <li><a href="/">Our Team</a></li>
              {/* <li><a href="/">Client Testimonials</a></li> */}
              <li><a href="/">Certifications</a></li>
            </ul>

          </div>

          {/* Navegação */}

          <div className="col-lg-3 col-md-6">

            <div className="footer-title-nft">Sector</div>

            <ul className="footer-links-nft">
              <li><a href="/healthcaresector">Healthcare</a></li>
              <li><a href="/Compressor-Industry">Compressor Industry</a></li>
              <li><a href="/Hydraulic-Machines">Hydraulic Machine</a></li>
              <li><a href="/Commercial-Electronics">Commercial Electronic</a></li>
              <li><a href="/Industrial-Automation">Industrial Automation</a></li>
            </ul>

          </div>


          {/* Contact */}

          {/* <div className="col-lg-3 col-md-6">

            <div className="footer-title-nft">Contacto</div>

            <div className="contact-item-nft">📧 akshayembedded17@gmail.com</div>
            <div className="contact-item-nft">📞 +91 98256 32017</div>
            <div className="contact-item-nft">📍 Lisboa, Portugal</div>

            <div className="social-icons-nft mt-3">
              <a href="/">LinkedIn</a>
              <a href="/">Instagram</a>
              <a href="/">Facebook</a>
              <a href="/">YouTube</a>
            </div>

          </div> */}

        </div>


        {/* Footer Bottom */}

        <div className="footer-bottom-nft d-flex flex-column flex-md-row justify-content-center align-items-center">

          <div>
           Made by ©2026 <a href="https://thrum.co.in" target="_blank" rel="noopener noreferrer">Thrum</a>. All rights reserved.
          </div>

          {/* <div className="footer-policy-nft">
            <a href="/">Termos e Condições</a>
            <a href="/">Política de Privacidade</a>
            <a href="/">Cookies</a>
          </div> */}

        </div>

      </div>

    </div>
  );
};

export default AzimuteFooter;