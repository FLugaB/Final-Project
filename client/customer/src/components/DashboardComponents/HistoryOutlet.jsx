import React from 'react';

import { Col, Row, Button } from 'react-bootstrap'

const HistoryOutlet = () => {
    return (
        <Col md={12} className="d-flex justify-content-start section-dashboard p-5"> 
            <Row>
                <Col md={12} className="mb-5">
                    <div className="title text-start">
                        <h1>History Order</h1>
                    </div>
                </Col>
     
            </Row>
        </Col>
    );
};

export default HistoryOutlet;