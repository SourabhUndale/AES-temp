import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/component/Navbar";
import Footer from "../pages/component/Footer";
import AzimuteFooter from "../pages/component/AzimuteFooter";

const UserView = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
      <AzimuteFooter />
    </>
  );
};

export default UserView;
