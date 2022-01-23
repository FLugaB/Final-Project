import React from "react";
import "./Hero.css";

const Hero = ({ imageSrc }) => {
  return (
    <div className="hero">
      <img src={imageSrc} alt="Consultation" className="hero__image" />
      <h1 className="hero__title">Enhance Your Quality of Life</h1>
    </div>
  );
};

export default Hero;