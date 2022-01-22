import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormButton, FormGroup, FormTitle, Label, Input } from "../../style/formElement";

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
    <FormGroup>
      <FormTitle>This is Register</FormTitle>
      <Label>email</Label>
      <Input type={"text"} id={"email"} onChange={handleFieldChange}></Input>
      <Label>password</Label>
      <Input
        type={"password"}
        id={"password"}
        onChange={handleFieldChange}
      ></Input>
      <Label>fullName</Label>
      <Input type={"text"} id={"fullName"} onChange={handleFieldChange}></Input>
      <Label>birthdate</Label>
      <Input
        type={"date"}
        id={"birthdate"}
        onChange={handleFieldChange}
      ></Input>
      <Label>gender</Label> {/* nanti diganti select option */}
      <select id={"gender"} onChange={handleFieldChange}>
        <option value={"male"}>Male</option>
        <option value={"female"}>Female</option>
      </select>
      <Label>address</Label>
      <Input
        type={"textarea"}
        id={"address"}
        onChange={handleFieldChange}
      ></Input>
      <Label>photoProfile</Label>
      <Input
        type={"file"}
        id={"photoProfile"}
        onChange={handleFieldChange}
      ></Input>
      <Label>phoneNumber</Label> {/* nanti diganti select option */}
      <Input
        type={"text"}
        id={"phoneNumber"}
        onChange={handleFieldChange}
      ></Input>
      <FormButton onClick={submit}>Register</FormButton>
    </FormGroup>
  );
};
