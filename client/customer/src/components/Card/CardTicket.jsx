import React, { useEffect, useState } from "react";
import "./CardTicket.css";
import { Col, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchConsultationTickets } from "../../store/actionCreator/consultationTickets";
import { useNavigate } from "react-router-dom";
import { formattedDate  } from '../../Hooks/helpers'
const CardTicket = () => {
  const [isLoading, setIsLoad] = useState(true)
  const [dateFormat, setDateFormat] = useState('')
  const {
    consultationTickets,
    loadingConsultationTickets,
    errorConsultationTickets,
  } = useSelector((state) => state.consultationTickets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( () => {
    findTickets()
  }, [isLoading]);

  const findTickets = async () => {
    try {
      await dispatch(fetchConsultationTickets());
      setIsLoad(false)
      if (consultationTickets[0].createdAt) {
        const test = consultationTickets[0].createdAt
        const splited = test.split('T')[0].split('-')
        setDateFormat(splited)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleUseButton = () => {
    navigate(`/doctors`);
  };

  

  if (isLoading) {
    return (
      <div>
        <h2>LAODING</h2>
      </div>
    );
  }

  // console.log(lengthTicket);

  // if (errorConsultationTickets) {
  //   setLengthTicket = 0
  // } else {
  //   setLengthTicket = consultationTickets.length
  // }

  return (
    <Col md={12} className="d-flex justify-content-start">
      <Row>
        <Col md={12} className="mb-5">
          <div className="title text-start">
            <h1>Ticket Consultation</h1>
          </div>
        </Col>
        <Col md={12} className="d-flex justify-content-start">
          {consultationTickets.msg ? (
            <div>
              <h2 className="text-capitalize">{consultationTickets.msg}</h2>
            </div> ) : 
            (
            <div className="containerTicket">
              <a href="#" onClick={() => handleUseButton()}>
                <div className="ticket shadow-lg">
                  <div className="stub">
                    <div className="top">
                      <span className="text-start">Total Ticket</span>
                    </div>
                    <div className="number">{consultationTickets.length}</div>
                  </div>
                  <div className="check">
                    <div className="big">Consultation Ticket</div>
                    <div className="number">#{consultationTickets.length}</div>
                    <div className="info">
                      <div>
                        <div className="title">Date</div>
                        <div>{consultationTickets[0].createdAt && (`${dateFormat[2]}/${dateFormat[1]}/${dateFormat[0]}`)}</div>
                      </div>
                      <div className=" ms-4">
                        <div className="title">Status</div>
                        <div>useable</div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )
         
          }
        </Col>
      </Row>
    </Col>
  );
};

export default CardTicket;
