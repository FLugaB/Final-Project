import React from "react";
import "./Slider.css";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useInView } from "react-intersection-observer";
import { addTicketToCart } from '../../store/actionCreator/customers'

const Slider = ({ imageSrc, title, subtitle, flipped }) => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addTicket = async () => {
      try {
          await dispatch(addTicketToCart())

          navigate("/account/cart")
          
      } catch (error) {
          console.log(error)
      }
  }

  const renderContent = () => {
    if (!flipped) {
      return (
        <>
          <img src={imageSrc} alt="Product" className="slider__image" />
          <div className="slider__content">
            <h1 className="slider__title">{title}</h1>
            <p>{subtitle}</p>
            <div className="slider-outer-wrapper no-slide">
              <button className="button" onClick={addTicket}>Consultation</button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="slider__content">
            <h1 className="slider__title">{title}</h1>
            <p>{subtitle}</p>
            <div className="slider-outer-wrapper no-slide">
              <button className="button" onClick={addTicket}>Consultation</button>
            </div>
          </div>
          <img src={imageSrc} alt="Travel" className="slider__image" />
        </>
      );
    }
  };

  return (
    <div className={inView ? "slider slider--zoom" : "slider"} ref={ref}>
      {renderContent()}
    </div>
  );
};

export default Slider;
