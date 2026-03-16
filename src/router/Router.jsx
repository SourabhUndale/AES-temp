import { createBrowserRouter, Router } from "react-router-dom";
import UserView from "../layout/UserView";
import MainHome from "../pages/home/MainHome";
import ContactUs from "../pages/contact/ContactUs";
import OurProduct from "../pages/product/OurProduct";
import MainService from "../pages/service/MainService";
import AboutUs from "../pages/about/AboutUs";
import HealthcarePage from "../pages/sector/HealthcarePage";
import MedicalDevices from "../pages/sector/MedicalDevices";
import CompressorIndustry from "../pages/sector/CompressorIndustry";
import PackagingMachines from "../pages/sector/PackagingMachines";
import CommercialElectronics from "../pages/sector/CommercialElectronics";
import CertificationsPage from "../pages/about/CertificationsPage";
import BlogPage from "../pages/blog/BlogPage";
import IndustrialAutomation from "../pages/sector/IndustrialAutomation";
import OurTeam from "../pages/about/OurTeam";


const router = createBrowserRouter([
  {
    path: "/",
    element: <UserView />,
    children: [
      {
        path: "/",
        element: <MainHome />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/product",
        element: <OurProduct />,
      },
      {
        path: "/service",
        element: <MainService />,
      },
       {
        path: "/profile",
        element: <AboutUs />,
      },
      {
        path: "/healthcaresector",
        element: <HealthcarePage />,
      },
      {
        path: "/Medical-Devices",
        element: <MedicalDevices />,
      },
      {
        path: "/Compressor-Industry",
        element: <CompressorIndustry />,
      },
      {
        path: "/Hydraulic-Machines",
        element: <PackagingMachines />,
      },
      {
        path: "/Commercial-Electronics",
        element: <CommercialElectronics />,
      },
      {
        path: "/Certifications",
        element: <CertificationsPage />,
      },
      {
        path: "/Industrial-Automation",
        element: <IndustrialAutomation />,
      },
       {
        path: "/Blog",
        element: <BlogPage />,
      },
      {
        path: "/Our-Team",
        element: <OurTeam />,
      },
    ],
  },
]);

export default router;
