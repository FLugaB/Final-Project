import React from "react";
import { useState } from "react";
import { LoginDoctor } from "../../components/Login/LoginDoctor";
import { Register } from "../../components/Register/Register";
import "../Homepage.css";

const UserPageDoctor = () => {
  return (
    <div className="homepage-container">
      <LoginDoctor />
    </div>
  );
};

export default UserPageDoctor;
