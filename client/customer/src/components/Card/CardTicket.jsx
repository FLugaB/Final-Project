import React, { useEffect, useState } from "react";
import "./CardTicket.css";
import { Col, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchConsultationTickets } from "../../store/actionCreator/consultationTickets";
import { useNavigate } from "react-router-dom";
import { addTicketToCart } from '../../store/actionCreator/customers'

const CardTicket = () => {

  const [isLoading, setIsLoad] = useState(true)
  const [dateFormat, setDateFormat] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => dispatch(fetchConsultationTickets()), []);

  const {
    consultationTickets,
    loadingConsultationTickets,
    errorConsultationTickets,
  } = useSelector((state) => state.consultationTickets);

  useEffect(() => {
    if (consultationTickets.length > 1) {
      setIsLoad(false)
    } else {
      setIsLoad(false)
    }
  }, [consultationTickets.length])

  console.log(errorConsultationTickets)

  const handleUseButton = () => {
    navigate(`/doctors`);
  };

  const addTicket = async () => {
    try {

        await dispatch(addTicketToCart())
        navigate("/account/cart")
        
    } catch (error) {
        console.log(error)
    }
  }

  if (isLoading) {
    return (
      <div>
        <h2>LAODING</h2>
      </div>
    );
  }

  return (
    <Col md={12} className="d-flex justify-content-start section-dashboard p-5">
      <Row>
        <Col md={12} className="mb-5">
          <div className="title text-start">
            <h1>Ticket Consultation</h1>
          </div>
        </Col>
        <Col md={12} className="d-flex justify-content-start">
          {
            !isLoading && consultationTickets.length < 1 &&
            
            (
              <div>
                <h2>You don't have a counsultation ticket yet...</h2>
                <div className="slider-outer-wrapper no-slide">
                  <button className="button bg-soft" onClick={addTicket}>Consultation</button>
                </div>
              </div>
            )
            }

            { !isLoading && consultationTickets.length > 1 && (
              // <div>Eroorr</div>
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
                            {/* <div>{consultationTickets[0].createdAt && (`${dateFormat[2]}/${dateFormat[1]}/${dateFormat[0]}`)}</div> */}
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
              )}
        </Col>
      </Row>
    </Col>
  );
};

export default CardTicket;
