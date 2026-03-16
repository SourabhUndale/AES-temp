import React, { useRef, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Swiper styles
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const TrustedByHome = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // Array of your logos (Update paths as needed)
  const logos = [1, 2, 3, 4, 5, 6];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in the title and description
      gsap.from(titleRef.current, {
        y: 30,
        // opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="wpo-brand-partner-section-s2"
      style={{ marginTop: "2rem" }}
    >
      <div className="container">
       <div className="row justify-content-center" style={{marginTop:"4rem"}}>
          <div className="col-lg-8 col-12">
            <div className="wpo-section-title">
              <h6 style={{color:"#445793"}}>Trusted By</h6>

              <h2 className="poort-text poort-in-right">
                When Your Product Needs to Work, <br /> You Need a Partner Who Has Done It Before
              </h2>
              <p>
                Akshay Embedded Systems custom embedded solutions are trusted by some of India's most recognized OEMs and institutions - companies that came to us with complex, high-stakes requirements and left with products that perform.
              </p>
            </div>
          </div>
        </div>

        <div className="client-wrap">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="partner-slider "
          >
            {logos.map((id) => (
              <SwiperSlide key={id}>
                <div className="grid">
                  <img
                    src={`assets/images/brand-logo/${id}.jpg`}
                    alt={`Brand ${id}`}
                    style={{ transition: "0.3s" }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.filter = "grayscale(0%)";
                      e.currentTarget.style.opacity = 1;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.filter = "grayscale(100%)";
                      e.currentTarget.style.opacity = 0.7;
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TrustedByHome;
