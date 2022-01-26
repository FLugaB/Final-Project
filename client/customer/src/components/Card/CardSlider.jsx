import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardSlider.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctors } from "../../store/actionCreator/doctors";
import { useNavigate } from "react-router-dom";
import { BsFillChatDotsFill, BsFillFilePersonFill } from "react-icons/bs";
import { chooseClientDoctor } from "../../store/actionCreator/customers.js";

function CardSlider() {
  const { doctors, loadingDoctors, errorDoctors } = useSelector(
    (state) => state.doctors
  );
  const { customerChooseDoctor } = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localLoad, setLocalLoad] = useState(false)

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);
  console.log(doctors, "fetch Card.jsx");

  const handlerChatButton = async (payloadId, payloadName) => {
    try {
      setLocalLoad(true)
      const str = payloadName.replace(".", "").replace(/\s+/g, "");
      console.log(payloadId, str, "payload");
      const result = await dispatch(chooseClientDoctor(payloadId));
      setLocalLoad(false)
      console.log(customerChooseDoctor, "result status");
      if (!localLoad) {
        navigate(`/video/${str}`);
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
    ]
  };
  return (
    <div className="containerSlider">
      <div className="container">
        <Slider {...settings}>
          {doctors.map((el) => {
            return (
              <div key={el.Profile.id} className="card-wrapper">
                <div className="card">
                  <div className="card-image">
                    <img
                      src={el.Profile.photoProfile}
                      className="card__image"
                      alt=""
                    />
                  </div>
                  <ul className="social-icons">
                    <li>
                      <a className="ButtonBox">
                        <BsFillChatDotsFill
                          onClick={() =>
                            handlerChatButton(
                              el.Profile.id,
                              el.Profile.fullName
                            )
                          }
                        />
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <BsFillFilePersonFill></BsFillFilePersonFill>
                      </a>
                    </li>
                  </ul>
                  <div className="details">
                    <h2>
                      {el.Profile.fullName}{" "}
                      <span className="job-title">{el.Profile.address} </span>
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default CardSlider;
