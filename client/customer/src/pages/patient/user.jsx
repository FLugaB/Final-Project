import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../components/Login/Login";
import { Register } from "../../components/Register/Register";
import { FormButton } from "../../style/formElement";
import "../Homepage.css";

const UserPage = () => {
  const [page, setPage] = useState("login");
  const switchComponent = (page) => {
    setPage(page);
  };
  const navigate=useNavigate()
  if (page === "login") {
    return (
      <div className="homepage-container">
        <Login />
        <FormButton onClick={()=>switchComponent("register")}>Register</FormButton>
        <FormButton onClick={()=>navigate("/doctor")}>Login as Doctor</FormButton>
      </div>
    );
  } else {
    return (
      <div>
        <Register />
        <FormButton onClick={()=>switchComponent("login")}>Login</FormButton>
      </div>
    );
  }
};

export default UserPage;
