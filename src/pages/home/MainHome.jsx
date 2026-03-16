import React, { useEffect } from 'react'
import Slider from './Slider'
import WOW from "wowjs/dist/wow";
import "animate.css";
import AboutHome from './AboutHome';
import WhatWeBuild from './WhatWeBuild';
import OurSolutionHome from './OurSolutionHome';
import WhyWeAre from './WhyWeAre';
import DevProcessHome from './DevProcessHome';
import TrustedByHome from './TrustedByHome';
import Timeline from './Timeline';
import OurProduct from '../product/OurProduct';
import ClientSlider from '../slide/ClientSlider';
import OurMission from '../slide/OurMission';

const MainHome = () => {
  
  useEffect(() => {
  import("wowjs").then((module) => {
    const WOW = module.WOW;
    new WOW().init();
  });
}, []);

  return (
    <>
    <Slider />
    {/* <ClientSlider /> */}
    <OurMission />
    <TrustedByHome />
    {/* <AboutHome /> */}
    <WhatWeBuild />
    <OurSolutionHome />
    <OurProduct />
    {/* <Timeline /> */}
    {/* <WhyWeAre /> */}
    <DevProcessHome />

    </>
  )
}

export default MainHome