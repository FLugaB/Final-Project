import React from 'react';

import { Col, Row, Button } from 'react-bootstrap'

const CartOutlet = () => {
    return (
        <Col md={12} className="d-flex justify-content-start section-dashboard p-5"> 
            <Row>
                <Col md={12} className="mb-5">
                    <div className="title text-start">
                        <h1>Cart</h1>
                    </div>
                    <div className="text-start mt-5">
                        <Button variant="warning" className="text-white">Edit Profile</Button>
                    </div>
                </Col>
     
            </Row>
        </Col>
    );
};

export default CartOutlet;