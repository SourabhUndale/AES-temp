import React from "react";
import "./clientSlider.css";

const images = [
  "assets/images/brand-logo/1.jpg",
  "assets/images/brand-logo/2.jpg",
  "assets/images/brand-logo/3.jpg",
  "assets/images/brand-logo/4.jpg",
  "assets/images/brand-logo/5.jpg",
  "assets/images/brand-logo/6.jpg",
];

const ClientSlider = () => {
  return (
    <div className="clients">
      {/* First Slider */}
      <div className="slider">
        <div className="slide-track">
          {images.concat(images).map((img, index) => (
            <div className="slide" key={index}>
              <img src={img} alt="client-logo" />
            </div>
          ))}
        </div>
      </div>

      {/* Second Slider */}
      {/* <div className="slider reverse">
        <div className="slide-track">
          {images.concat(images).map((img, index) => (
            <div className="slide" key={index}>
              <img src={img} alt="client-logo" />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ClientSlider;