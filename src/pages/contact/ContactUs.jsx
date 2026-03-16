import React, { useEffect, useState } from "react";
// import {WOW} from "wowjs";


const ContactUs = () => {
  // useEffect(() => {
  //   new WOW({
  //     live: false,
  //   }).init();
  // }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log("Form Submitted:", formData);
    alert("Thank you for reaching out!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="contact-main-wrapper">
      {/* Breadcrumb Area */}
      <div className="breadcumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcumb-wrap">
                <h2>Contact</h2>
                <h4 className="text-white" style={{fontSize:"2rem"}}>Contact us</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Page Section */}
      <section className="contact-page section-padding">
        <div className="container">
          {/* Office Info Items */}
          <div className="office-info">
            <div className="row">
              <ContactInfoItem
                iconClass="bi bi-geo-alt-fill"
                title="Address Line"
                line1="S.No. 131/1B/3/2, Ram Indu Park Lane, Opp. Sapling School,Baner,Pune-411045 "
                // line2="NY 10013, USA"
              />
              <ContactInfoItem
                iconClass="bi bi-telephone"
                title="Phone Number"
                line1="+91 8669666421 "
                line2="+91 8669666422 "
              />
              <ContactInfoItem
                iconClass="bi bi-envelope-arrow-up"
                title="Email Address"
                line1="akshayembedded17@gmail.com"
                // line2="info@Electrician.com"
              />
            </div>
          </div>

          <div className="contact-wrap">
            <div className="row">
              {/* Left Side: Map */}
              <div className="col-lg-6 col-12">
                <div className="contact-left">
                  <h2>Get in touch</h2>
                  <p>
                    For any Queries and Requirements Contact Us
                  </p>
                  <div className="map">
                    <iframe
                      title="Google Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.207129732393!2d73.7802684!3d18.5646983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bed0de41b83d%3A0x43bc6ad41af6aa15!2sAkshay%20Embedded%20Systems!5e0!3m2!1sen!2sin!4v1773687505824!5m2!1sen!2sin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="col-lg-6 col-12">
                <div className="contact-right">
                  <div className="title">
                    <h2>Fill Up The Form</h2>
                    <p>
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                  </div>
                  <form
                    class="contact-form contact-validation-active"
                    id="contact-form"
                  >
                    <div class="input-item">
                      <input
                        id="name"
                        class="fild"
                        type="text"
                        placeholder="Your Name*"
                        required
                      />
                      <label>{/* <i class="flaticon-user"></i> */}</label>
                    </div>
                    <div class="input-item">
                      <input
                        id="email"
                        name="email"
                        class="fild"
                        type="email"
                        placeholder="Email Address*"
                        required
                      />
                      <label>{/* <i class="flaticon-email"></i> */}</label>
                    </div>
                    <div class="input-item">
                      <textarea
                        id="message"
                        class="fild textarea"
                        placeholder="Enter Your Message here"
                        required
                      ></textarea>
                      <label>{/* <i class="flaticon-edit"></i> */}</label>
                    </div>
                    <div class="input-item submitbtn">
                      <input class="fild" type="submit" value="Get In Touch" />
                    </div>
                    <div class="clearfix error-handling-messages">
                      <div id="success">Thank you</div>
                      <div id="error">
                        {" "}
                        Error occurred while sending email. Please try again
                        later.
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sub-component for the Info Cards to keep code DRY
const ContactInfoItem = ({ iconClass, title, line1, line2, active }) => (
  <div className="col col-lg-4 col-md-6 col-12">
    <div className={`office-info-item ${active ? "active" : ""}`}>
      <div className="office-info-icon">
        <div className="icon">
          <i className={iconClass}></i>
        </div>
      </div>
      <div className="office-info-text">
        <h2>{title}</h2>
        <p>
          {line1} <br /> {line2}
        </p>
      </div>
    </div>
  </div>
);

export default ContactUs;
