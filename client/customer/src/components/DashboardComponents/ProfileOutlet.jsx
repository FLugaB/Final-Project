import React from 'react';

import { Col, Row } from 'react-bootstrap'

const ProfileOutlet = () => {
    return (
        <Col md={12} className="d-flex justify-content-start"> 
            <Row>
                <Col md={12} className="mb-5"><div className="title text-start"><h1>Profile</h1></div></Col>
                <Col md={12} className="d-flex justify-content-start">
                    <p>Email: </p>
                </Col>
            </Row>
        </Col>
    );
};

export default ProfileOutlet;