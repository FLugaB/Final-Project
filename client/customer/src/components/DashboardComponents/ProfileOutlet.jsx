import React from "react";

import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfileOutlet = () => {
  const { profile, loading, error } = useSelector((state) => state.userRole);

  return (
    <Col md={12} className="d-flex justify-content-start">
      <Row>
        <Col md={12} className="mb-5">
          <div className="title text-start">
            <h1>Profile</h1>
          </div>
        </Col>
        <Col md={12} className="d-flex justify-content-start">
          <Col md={6}>
            <p>{profile.fullName}</p>
            <p>{profile.birthdate}</p>
            <p>{profile.gender}</p>
            <p>{profile.address}</p>
            <p>{profile.phoneNumber}</p>
          </Col>
          <img
          
            className="img-fluid img-thumbnail mx-auto"
            src={profile.photoProfile}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default ProfileOutlet;
