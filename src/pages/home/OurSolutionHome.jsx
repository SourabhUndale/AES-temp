import React, { useEffect } from 'react'
import "animate.css/animate.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import gsap from "gsap";
const OurSolutionHome = () => {
      

      useEffect(() => {
        const cards = document.querySelectorAll(".service-items");
    
        cards.forEach((card) => {
          card.addEventListener("click", () => {
            cards.forEach((c) => {
              if (c !== card) {
                c.classList.remove("active");
                gsap.to(c, { flex: 1, duration: 0.1 });
              }
            });
    
            const isActive = card.classList.contains("active");
            if (!isActive) {
              card.classList.add("active");
              gsap.to(card, { flex: 3, duration: 0.1 });
            }
          });
        });
    
        return () => {
          cards.forEach((card) => {
            card.replaceWith(card.cloneNode(true)); // cleanup events
          });
        };
      }, []);
    
  return (
    <>
    <section class="wpo-service-section mb-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-12">
                        <div class="wpo-section-title">
                            {/* <span>Embedded Solutions Across Critical Industries</span> */}
                            <h2 className="poort-text poort-in-right">
                  Embedded Expertise Across Industries <br /> That Cannot Afford to Get It Wrong.
                </h2>
                            <p>Our custom embedded solutions are deployed in some of India's most demanding environments, where reliability isn't optional.</p>
                        </div>
                    </div>
                </div>
                <div class="service-wrap">
                    <div class="service-items wow fadeInUp" data-wow-duration="1000ms">
                        <div class="service-default">
                            <div class="service-bg">
                                <img src="./assets/images/service/icon-1.svg" alt="image" />
                                <h3>Medical Devices & Biomedical</h3>
                            </div>
                        </div>
                        <div class="service-expanded">
                            <img class="service-image" src="https://plus.unsplash.com/premium_photo-1764687902308-52f2f22d5f2d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Medical Devices & Biomedical" />
                            <div class="service-content">
                                <h4><a href="service-single.html">Medical Devices & Biomedical</a></h4>
                                <p>Ventilators, patient monitors, diagnostic equipment, baby warmers, Xray Controllers, Human Milk Pasteuriser Controllers.</p>

                                <a class="arrow" href="service-single.html"><i class="ti-arrow-top-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="service-items wow fadeInUp" data-wow-duration="1200ms">
                        <div class="service-default">
                            <div class="service-bg">
                                <img src="./assets/images/service/icon-2.svg" alt="image" />
                                <h3>Industrial process Automation</h3>
                            </div>
                        </div>
                        <div class="service-expanded">
                            <img class="service-image" src="./assets/images/service/s1.jpeg" alt="Industrial process Automation & Manufacturing" />
                            <div class="service-content">
                                <h4><a href="service-single.html">Industrial process Automation & Manufacturing</a></h4>
                                <p>Custom controllers, machine automation, real-time monitoring</p>
                            </div>
                        </div>
                    </div>
                    <div class="service-items active wow fadeInUp" data-wow-duration="1400ms">
                        <div class="service-default">
                            <div class="service-bg">
                                <img src="./assets/images/service/icon-1.svg" alt="image" />
                                <h3>Compressor Industry</h3>
                            </div>
                        </div>
                        <div class="service-expanded">
                            <img class="service-image" src="./assets/images/service/s3.jfif" alt="Compressor Industry" />
                            <div class="service-content">
                                <h4><a href="service-single.html">Compressor Industry</a></h4>
                                <p>Intelligent control and monitoring systems for industrial compressors</p>
                            </div>
                        </div>
                    </div>
                    <div class="service-items wow fadeInUp" data-wow-duration="1600ms">
                        <div class="service-default">
                            <div class="service-bg">
                                <img src="./assets/images/service/icon-3.svg" alt="image" />
                                <h3>Pneumatic operating machines</h3>
                            </div>
                        </div>
                        <div class="service-expanded">
                            <img class="service-image" src="./assets/images/service/s2.jpeg" alt="Pneumatic operating machines" />
                            <div class="service-content">
                                <h4><a href="service-single.html">Pneumatic operating machines</a></h4>
                                <p>High-speed machine automation and sequencing controllers</p>
                            </div>
                        </div>
                    </div>
                    <div class="service-items wow fadeInUp" data-wow-duration="1800ms">
                        <div class="service-default">
                            <div class="service-bg">
                                <img src="./assets/images/service/icon-4.svg" alt="image" />
                                <h3>Hydraulic operating machines</h3>
                            </div>
                        </div>
                        <div class="service-expanded">
                            <img class="service-image" src="./assets/images/service/s4.jpeg" alt="Hydraulic operating machines" />
                            <h3>Hydraulic operating machines</h3>
                            <div class="service-content">
                                <h4><a href="service-single.html">Hydraulic operating machines</a></h4>
                                <p>High-pressure machine automation and sequencing controllers</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shape">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 0 C0.95492315 -0.00226556 1.90984629 -0.00453111 2.8937065 -0.00686532 C6.06608773 -0.01315201 9.23842565 -0.01237941 12.41081238 -0.0115509 C14.69658462 -0.0145457 16.98235636 -0.01794897 19.26812744 -0.02172852 C25.45829608 -0.03053948 31.64845089 -0.03290539 37.83862519 -0.0335443 C41.71060151 -0.03425638 45.58257434 -0.03639369 49.45454979 -0.03904152 C62.27859919 -0.0478085 75.10263746 -0.05246243 87.92668942 -0.05171105 C88.61657695 -0.05167109 89.30646448 -0.05163113 90.01725769 -0.05158997 C91.0533659 -0.05152864 91.0533659 -0.05152864 92.11040559 -0.05146609 C103.30102578 -0.05105976 114.4916123 -0.06062867 125.68222276 -0.07472833 C137.19856219 -0.08912286 148.71488088 -0.09581408 160.23122996 -0.09513456 C166.68640349 -0.09488015 173.14153888 -0.09769977 179.59670448 -0.10831261 C185.66982179 -0.11802541 191.74286473 -0.11805097 197.81598473 -0.11079597 C200.03747542 -0.10975413 202.25897083 -0.1120891 204.48045349 -0.11815643 C225.32569193 -0.17137614 242.7304994 0.45405382 259.00138855 15.13371277 C268.36797554 25.735957 272.67994512 36.90841451 273.37638855 50.88371277 C274.30775193 65.5329537 279.77131193 77.98893253 290.4662323 88.09465027 C303.07175297 98.23345118 318.77397042 99.5431656 334.37638855 99.82121277 C335.70975249 99.85451438 337.04308703 99.88901496 338.37638855 99.92472839 C341.58463668 100.00609701 344.79264961 100.07559973 348.00138855 100.13371277 C348.00138855 103.43371277 348.00138855 106.73371277 348.00138855 110.13371277 C189.27138855 110.13371277 30.54138855 110.13371277 -132.99861145 110.13371277 C-132.99861145 106.83371277 -132.99861145 103.53371277 -132.99861145 100.13371277 C-131.83627991 100.11183899 -131.83627991 100.11183899 -130.65046692 100.08952332 C-99.35072643 99.80488703 -99.35072643 99.80488703 -72.99861145 84.32511902 C-69.60803976 80.61005902 -67.21163838 76.63421096 -64.99861145 72.13371277 C-64.60802551 71.34867371 -64.21743958 70.56363464 -63.8150177 69.75480652 C-61.20940495 63.65595469 -60.54579085 57.73394856 -59.99861145 51.19621277 C-58.74060685 36.26412527 -54.19292424 23.17165318 -42.9322052 12.68840027 C-29.95390178 2.25331994 -16.15744064 -0.02867834 0 0 Z "
                            fill="#fff" transform="translate(132.9986114501953,10.866287231445313)" />
                    </svg>
                </div>
                <div class="service-btn">
                    <a href="appoinment.html" class="theme-btn-s2">Contact Us</a>
                </div>
                {/* <div class="box"></div> */}
                {/* {/* <div class="box-2"></div> */} 
            </div>
    </section>
    </>
  )
}

export default OurSolutionHome