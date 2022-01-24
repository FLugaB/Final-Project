import React from "react";
import "./CardTicket.css"
import { Col, Row, Button } from 'react-bootstrap'

const CardTicket = () => {
  return (
  <Col md={12} className="d-flex justify-content-start"> 
    <Row>
        <Col md={12} className="mb-5"><div className="title text-start"><h1>Ticket Consultation</h1></div></Col>
        <Col md={12} className="d-flex justify-content-start">
          <div className="containerTicket">
            <div className="ticket">
              <div className="stub">
                <div className="top">
                  <span className="admit">Admit</span>
                </div>
                <div className="number">1</div>
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
                    <div>31415926</div>
                  </div>
                  <div className=" ms-4">
                    <div className="title">Button</div>
                    <div><Button variant="outline-primary">Primary</Button>{' '}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
    </Row>
</Col>
  );
};

export default CardTicket;
