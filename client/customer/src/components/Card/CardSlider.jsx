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
import { Col, Row, Button, Card, handleShow, Modal, Badge } from 'react-bootstrap'


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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [doctor, setDoctor] = useState(null)
  const handleShow = (payload) =>{
    console.log(payload,">>>>>>>>ini payload");
    setShow(true)
    setDoctor(payload)
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
                      <a>
                        <BsFillFilePersonFill onClick={() => handleShow(el)} ></BsFillFilePersonFill>

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
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{doctor?.Profile?.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Row>
            <Col md={12}>
              <div className="modal-image-wrapper">
                <img src={doctor?.Profile?.photoProfile } alt="" />
              </div>
            </Col>
            <Col md={12} className="mt-3">
              <Badge bg="info ms-0 ls-15 mb-3">{doctor?.Profile?.gender}</Badge>
              <h3>Clinic Location:</h3>
              <h3 className="fw-bold">{doctor?.Profile?.address}</h3>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      </div>
    </div>
  );
}

export default CardSlider;
