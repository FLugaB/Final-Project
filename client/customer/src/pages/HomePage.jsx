import { useState, useEffect } from "react";
import bg_flower from "../assets/bg-flower.jpg";
import bg_flowerClean from "../assets/bg-flower-clean.jpg";
import bg_flowerForsythia from "../assets/bg-forsythia.png";
import "./Homepage.css"

import Hero from "../components/Hero/Hero";
import Slider from "../components/Slider/Slider";
import Card from "../components/Card/Card";
import CntentSlider from '../components/CntentSlider'

import axios from 'axios'

const HomePage = () => {

  const midtransService = async () => {
    try {
      const server = "http://localhost:3000/account/payment"
      let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJvaUBtYWlsLmNvbSIsImlhdCI6MTY0MjY4MzU2M30.NFI7h-DdNfXDpr8qme4CLv1BbmbvL3HOEJGKfwUtyR0"
      const response = await axios.post(server, {}, { headers: { access_token}})
      
      window.snap.pay(response.data.snap_token.token)
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className="homepage-container">
      <div className="section-container">
        <Hero imageSrc={bg_flower} />
      </div>
      <div className="section-container">
        <div className="section-wrapper w-100vw bg-cover soft-background-images">
          <Slider
            imageSrc="https://www.drmanalyoussef.com.au/wp-content/uploads/brizy/38/assets/images/iW=5000&iH=any/f9fc8d65c576afbe222b43ec99822d05.jpg"
            // imageSrc={bg_flowerForsythia}
            title={"PRODUCT FROM FORSYTHIA"}
            subtitle={
              "A professional skin consultation should be the first step you take when you're considering starting treatments or skincare"
            }
          />
        </div>
        <div className="section-wrapper w-100vw bg-cover bg-soft ">
          <Slider
            // imageSrc={bg_flowerClean}
            imageSrc="https://www.drmanalyoussef.com.au/wp-content/uploads/brizy/36/assets/images/iW=5000&iH=any/b2fa36305709632245add4e5c041aa9d.jpg"
            title={"SERVICE TREATMENT ONSITE"}
            subtitle={
              "Does your skin have fine lines? Age spots? Acne scars or other issues you’d like to clear up? Cosmetic treatments may help improve the look and feel of your skin"
            }
            flipped={true}
          />
        </div>
        <div className="section-wrapper">
          <div className="slider-outer-wrapper">
            <CntentSlider />
          </div>
        </div>
        <div className="section-wrapper w-100vw bg-hard">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
