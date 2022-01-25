import React from 'react';

import { Col, Row, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { formattedDate  } from '../../Hooks/helpers'


const ProfileOutlet = () => {
    const { profile, loading, error } = useSelector(
        (state) => state.userRole
      );
      
    return (
        <Col md={12} className="d-flex justify-content-start section-dashboard p-5"> 
            <Row>
                <Col md={12} className="mb-5">
                    <div className="title text-start">
                        <h1>Profile</h1>
                    </div>
                    <div className="text-start mt-5">
                        <Button variant="warning" className="text-white">Edit Profile</Button>
                    </div>
                </Col>
                <Col md={12} className="d-flex justify-content-start">
                    <Row>
                        <Col md={6} className="text-start">
                            <p>Full Name: {profile.fullName}</p>
                            <p>Birth Date: {profile?.birthdate?.split('T')[0]}</p>
                            <p>Gender: {profile.gender}</p>
                            <p>Phone Number: {profile.phoneNumber}</p>
                            <p>Address: {profile.address}</p>
                        </Col>
                        <Col md={6}>
                            <div className="profile-image-wrapper">
                                <img src={profile.photoProfile}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    );
};

export default ProfileOutlet;