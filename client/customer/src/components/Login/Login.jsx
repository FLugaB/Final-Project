import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginPost } from "../../store/actionCreator/customers";
import {
  FormButton,
  FormGroup,
  FormTitle,
  Input,
  Label,
} from "../../style/formElement";
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.id]: event.target.value });
  };
  const submit = () => {
    //dispatch to store here
    console.log(fields);
    dispatch(loginPost(fields.email,fields.password));
  };
  return (
    <FormGroup>
      <FormTitle>This is Login</FormTitle>
      <Label>email</Label>
      <Input type={"text"} id={"email"} onChange={handleFieldChange}></Input>
      <Label>password</Label>
      <Input
        type={"password"}
        id={"password"}
        onChange={handleFieldChange}
      ></Input>
      <FormButton onClick={submit}>Log In</FormButton>
    </FormGroup>
  );
};
