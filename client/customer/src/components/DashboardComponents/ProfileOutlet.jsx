import React from "react";
import "./profileOutlet.css";
import { Col, Row, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { formattedDate  } from '../../Hooks/helpers'
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
const ProfileOutlet = () => {
    const { profile, loading, error } = useSelector(
        (state) => state.userRole
    );
      
    return (
        <>
            <section class="section-dashboard p-5 mx-sm-auto" id="about">
                <div class="container">
                    <div class="row align-items-center justify-content-start flex-row-reverse">
                        
                        <div class="col-lg-6">
                            <div class="d-flex justify-content-end">
                             
                                <img src={profile.photoProfile} class="profile-image-wrapper rounded" alt="" />
                           
                            </div>
                            <div class="about-text text-right">
                                <h3 class="dark-color">{profile.fullName}</h3>
                                <h4 class="theme-color">{profile.gender}</h4>
                                    <div class="">
                                        <p class="">Birth Date: {profile?.birthdate?.split('T')[0]}</p>
                                        <p class="">Phone Number: <br/>{profile.phoneNumber}</p>
                                        <p>Address: {profile.address}</p>
                                    </div>
                                
                                <div className="navbar flex justify-content-end">
                                <Link to="#" class="menu-bars"  >
                                    <AiIcons.AiFillCaretLeft />
                                    Menu
                                </Link>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfileOutlet;
