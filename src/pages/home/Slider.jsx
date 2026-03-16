// import React, { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-fade";
// const Slider = () => {
//   const textRef = useRef(null);


//   const titles = [
//     "Advanced Medical Equipment",
//     "Expert Healthcare Professionals",
//   ];

//   const [index, setIndex] = useState(0);


//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % titles.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <section className="wpo-hero-section">
//         <div className="container-fluid">
//           <div className="hero-wapper">
//             <div className="hero-content slide-from-left">
//               <div className="hero-title animate__animated animate__fadeInUp">
//                 <span className="text-white">
//                   Trusted, Fast & Affordable Service at Your Doorstep.
//                 </span>
//               </div>

//               <div className="hero-sub-title">
//                 <h4 className="text-white animate__animated animate__fadeInUp">
//                   Powering healthcare by <br />
//                   <span
//                     ref={textRef}
//                     style={{ display: "inline-block", minHeight: "24px" }}
//                   >
//                     {titles[index]}
//                   </span>
//                 </h4>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* 
//     <section class="wpo-about-section">
//             <div class="container">
//                 <div class="row">
//                     <div class="col-lg-3 col-md-12 col-12">
//                         <div class="about-title-left wow fadeInLeftSlow" data-wow-duration="1200ms">
//                             <span><i><img src="assets/images/title-icon-2.png" alt="icon" /></i>about us</span>
//                             <span>about us</span> 
//                         </div>
//                     </div>
//                     <div class="col-lg-9 col-md-12 col-12">
//                         <div class="about-title-right">
//                             <h2 class="poort-text poort-in-right">At <span>electriany,</span>we’re not just electricians
//                                 we’re <span>problem solvers</span>, safety experts &
//                                 service professionals. With over 10 of hands-
//                                 <span>on experience</span>,
//                             </h2>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="about-max">
//                     <div class="about-wrap">
//                         <div class="about-items">
//                             <div class="icon">
//                                 <img src="assets/images/about/icon-1.svg" alt="icon" />
//                             </div>
//                             <div class="about-text">
//                                 <h3>expertise area</h3>
//                                 <ul>
//                                     <li><span> Trusted & Vetted Electricity</span></li>
//                                     <li><span>Customizable Electricity Plans</span></li>
//                                     <li><span>Affordable & Transparent Pricing</span></li>
//                                     <li><span>Satisfaction Guarantee</span></li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="about-items">
//                             <div class="icon">
//                                 <img src="assets/images/about/icon-2.svg" alt="icon" />
//                             </div>
//                             <div class="about-text">
//                                 <h3>Our Mission</h3>
//                                 <ul>
//                                     <li><span> Trusted & Vetted Electricity</span></li>
//                                     <li class="active"><span>Customizable Electricity Plans</span></li>
//                                     <li><span>Affordable & Transparent Pricing</span></li>
//                                     <li><span>Satisfaction Guarantee</span></li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div class="about-items">
//                             <div class="items-image">
//                                 <img src="assets/images/about/1.jpg" alt="image" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section> */}
//     </>
//   );
// };

// export default Slider;


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";


const Slider = () => {
  
  const titles = [
    "Built for Your Product. ",
    "Built by Akshay Embedded Systems.",
    
  ];

  const textRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(textRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          setIndex((prev) => (prev + 1) % titles.length);
          gsap.fromTo(
            textRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4 },
          );
        },
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="wpo-hero-section">
        <video className="hero-bg-video" autoPlay muted loop playsInline>
          <source
            src="/assets/images/data/video/Akshay_banner.mp4"
            type="video/mp4"
          />
        </video>
        <div className="container-fluid">
          <div className="hero-wapper">
            {/* Left Side */}
            {/* <div className="hero-side-left">
              <div className="hero-side-left-items">
                <ul>
                  <li>
                    <a href="mailto:hello@klaas.com">
                      <i className="flaticon-email"></i>hello@klaas.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+887869587496">
                      <i className="flaticon-phone"></i>887869587496
                    </a>
                  </li>
                  <li>
                    <a href="appoinment.html">
                      <i className="flaticon-bag"></i>Book online
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}

            {/* Content */}
            <div className="hero-content slide-from-left">
              <div
                className="hero-title  animate__animated animate__fadeInUp"
                data-wow-delay="0.5s"
              >
                <span className="text-white">
                  Custom-engineered embedded systems designed, built, and delivered to spec.
                </span>
              </div>

              <div
                className="hero-sub-title wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <h3 className="text-white">
                  Custom Embedded Systems. <br />
                  <span
                    ref={textRef}
                    style={{ display: "inline-block", minHeight: "24px" }}
                  >
                    {titles[index]}
                  </span>
                </h3>
              </div>

              {/* <div className="hero-btns wow fadeInUp" data-wow-delay="0.7s">
                <a href="appoinment.html" className="theme-btn-s2">
                  Contact
                </a>
              </div> */}
            </div>

            {/* Shape 2 */}
            {/* <div className="shape-2">
              <img src="assets/images/hero/shape-2.png" alt="shape" />
            </div> */}
            {/* "wowjs": "^1.1.3" */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Slider;