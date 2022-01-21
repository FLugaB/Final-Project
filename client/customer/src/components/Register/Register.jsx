import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useFormFields = (state) => {
    const [fields, setFields] = useState(state);
    return [
      fields,
      (event) => {
        setFields({ ...fields, [event.target.id]: event.target.value });
      },
    ];
  };
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    fullName: "",
    birthdate: "",
    gender: "",
    address: "",
    photoProfile: "",
    phoneNumber: "",
  });
  const submit = () => {
    //dispatch to store here
  };
  return (
    <div>
      <h1>This is Register</h1>
      <label>email</label>
      <input type={"text"} id={"email"} onChange={handleFieldChange}></input>
      <label>password</label>
      <input
        type={"password"}
        id={"password"}
        onChange={handleFieldChange}
      ></input>
      <label>fullName</label>
      <input type={"text"} id={"fullName"} onChange={handleFieldChange}></input>
      <label>birthdate</label>
      <input
        type={"date"}
        id={"birthdate"}
        onChange={handleFieldChange}
      ></input>
      <label>gender</label> {/* nanti diganti select option */}
      <select id={"gender"} onChange={handleFieldChange}>
        <option value={"male"}>Male</option>
        <option value={"female"}>Female</option>
      </select>
      <label>address</label>
      <input
        type={"textarea"}
        id={"address"}
        onChange={handleFieldChange}
      ></input>
      <label>photoProfile</label>
      <input
        type={"file"}
        id={"photoProfile"}
        onChange={handleFieldChange}
      ></input>
      <label>phoneNumber</label> {/* nanti diganti select option */}
      <input
        type={"text"}
        id={"phoneNumber"}
        onChange={handleFieldChange}
      ></input>
      <button onClick={submit}>Register</button>
    </div>
  );
};
