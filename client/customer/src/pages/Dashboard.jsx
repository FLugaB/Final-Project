import React from "react";
import bg_flower from "../assets/bg-flower.jpg";
import bg_flowerClean from "../assets/bg-flower-clean.jpg";
import bg_flowerForsythia from "../assets/bg-forsythia.png";
import "./Dashboard.css"

import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero";
import Slider from "../components/Slider/Slider";
import Card from "../components/Card/Card";

const Dashboard = () => {
  const navbarLinks = [
    { url: "#", title: "Home" },
    { url: "#", title: "About" },
    { url: "#", title: "Contact" },
    { url: "#", title: "Service" },
    { url: "#", title: "Products" },
    { url: "#", title: "Consultation" },
  ];

  return (
    <div>
      <Navbar navbarLinks={navbarLinks} />
      <Hero imageSrc={bg_flower} />
      <Slider
        imageSrc={bg_flowerClean}
        title={"PRODUCT FROM FORSYTHIA"}
        subtitle={
          "A professional skin consultation should be the first step you take when you're considering starting treatments or skincare"
        }
      />
      <Slider
        imageSrc={bg_flowerForsythia}
        title={"SERVICE TREATMENT ONSITE"}
        subtitle={
          "Does your skin have fine lines? Age spots? Acne scars or other issues you’d like to clear up? Cosmetic treatments may help improve the look and feel of your skin"
        }
        flipped={true}
      />
      <Card />
    </div>
  );
};

export default Dashboard;
