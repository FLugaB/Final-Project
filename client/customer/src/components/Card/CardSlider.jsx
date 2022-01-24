import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardSlider.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctors } from "../../store/actionCreator/doctors";
import { useNavigate } from "react-router-dom";
import { BsFillChatDotsFill, BsFillFilePersonFill } from "react-icons/bs";

function CardSlider() {
  const { doctors, loadingDoctors, errorDoctors } = useSelector(
    (state) => state.doctors
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handlerChatButton = (payload) => {
    const str = payload.replace(/\s+/g, '');
    console.log(str, "payload");
    navigate(`/video/${str}`);
  };

  console.log(doctors, "fetch Card.jsx");
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);



  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  return (
    <div className="containerSlider">
      <div className="container">
        <Slider {...settings}>
          {doctors.map((el) => {
            return (
              <div className="card-wrapper">
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
                        <BsFillChatDotsFill onClick={() => handlerChatButton(el.Profile.fullName)} />
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
                      <span className="job-title">{el.Profile.address}{" "}</span>
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
