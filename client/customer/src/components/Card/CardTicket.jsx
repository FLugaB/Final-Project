import React, { useEffect, useState } from "react";
import "./CardTicket.css";
import { Col, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchConsultationTickets } from "../../store/actionCreator/consultationTickets";
import { useNavigate } from "react-router-dom";
const CardTicket = () => {
  // let [lengthTicket, setLengthTicket] = useState(0)
  const {
    consultationTickets,
    loadingConsultationTickets,
    errorConsultationTickets,
  } = useSelector((state) => state.consultationTickets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( async () => {
    await dispatch(fetchConsultationTickets());
    console.log(consultationTickets.length);
  }, []);

  const handleUseButton = () => {
    navigate(`/doctors`);
  };

  

  if (loadingConsultationTickets) {
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
          {consultationTickets.length < 1 ? (
            <div>
              <h2>You have no Ticket</h2>
            </div>
          ) : (
            <div className="containerTicket">
              <div className="ticket">
                <div className="stub">
                  <div className="top">
                    <span className="admit">Total Ticket</span>
                  </div>
                  <div className="number">{consultationTickets.length}</div>
                </div>
                <div className="check">
                  <div className="big">Consultation Ticket</div>
                  <div className="number">#1</div>
                  <div className="info">
                    <div>
                      <div className="title">Date</div>
                      <div>4/27/2016</div>
                    </div>
                    <div className=" ms-4">
                      <div className="title">Status</div>
                      <div>useable</div>
                    </div>
                    <div className=" ms-4">
                      <div className="title">Button</div>
                      <div>
                        <Button
                          variant="outline-primary"
                          onClick={() => handleUseButton()}
                        >
                          Use
                        </Button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default CardTicket;
