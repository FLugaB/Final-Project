import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../store/actionCreator/customers";

import { Form } from "react-bootstrap";

import { timerAlert, errorAlert } from "../Hooks/alert";
import { localLoad } from "../Hooks/load";

const FormLogin = (props) => {
  const [clickLoad, setClickLoad] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newemail, setNewEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [photoProfile, setPhotoProfile] = useState("");

  const { errorCustomers, isSuccessLogin, isSuccessRegister } = useSelector(
    (state) => state.customers
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    setClickLoad(true);
    // console.log(props.mode);
    if (props.mode === "login") {
      const tryLog = {
        email: email,
        password: password,
      };

      dispatch(login(tryLog));
    } else {
      const tryReg = {
        email: newemail,
        password: newpassword,
        fullName: fullName,
        birthdate: birthDate,
        gender: gender,
        address: address,
        photoProfile: photoProfile,
        phoneNumber: phoneNumber,
      };
      //dispatch
      console.log(tryReg);
      dispatch(register(tryReg))
    }
  };

  const logError = (errorCustomers) => {
    if (errorCustomers) {
      setClickLoad(false);
      errorAlert(errorCustomers);
    }
  };

  const logSuccess = (isSuccessLogin) => {
    if (isSuccessLogin) {
      setClickLoad(false);
      navigate("/");
      const text = "Hi, Welcomeback <fullName> !";
      timerAlert(text);
    }
  };
  const regSuccess = (isSuccessRegister) => {
    if (isSuccessRegister) {
      setClickLoad(false);
      navigate("/");
      const text = "Hi, <fullName> Register Success !";
      timerAlert(text);
    }
  };

  useEffect(() => logError(errorCustomers), [errorCustomers]);
  useEffect(() => logSuccess(isSuccessLogin), [isSuccessLogin]);
  useEffect(() => regSuccess(isSuccessRegister), [isSuccessRegister]);

  if (clickLoad) return localLoad();

  return (
    <Form onSubmit={onLogin}>
      <div className="form-block__input-wrapper mb-5">
        <div className="form-group form-group--login">
          <Form.Control
            className="form-group__input"
            disabled={props.mode === "signup"}
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />

          <Form.Control
            className="form-group__input"
            disabled={props.mode === "signup"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            minLength="5"
            maxLength="255"
            type="password"
            required
          />
        </div>

        <div className="form-group form-group--signup">
          <div style={{display:"inline-flex"}}>
            <Form.Control
              className="form-group__input"
              disabled={props.mode === "login"}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Full Name"
              type="text"
              required
            />
            <Form.Control
              className="form-group__input"
              disabled={props.mode === "login"}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="Birthdate"
              type="date"
              required
            />

            <Form.Control
              className="form-group__input"
              disabled={props.mode === "login"}
              value={newemail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />

            <Form.Control
              className="form-group__input"
              disabled={props.mode === "login"}
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <div>
            <Form.Control
              className="form-group__input"
              disabled={props.mode === "login"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              type="text"
              required
            />

            <Form.Control
              className="form-group__input"
              disabled={props.mode === "login"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="PhoneNumber"
              type="tel"
              required
            />

            <Form.Select
              disabled={props.mode === "login"}
              aria-label="Default select example"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>

            <Form.Control
              className="form-group__input"
              disabled={props.mode === "login"}
              value={photoProfile}
              onChange={(e) => setPhotoProfile(e.target.value)}
              placeholder="Photo Profile"
              type="file"
              required
            />
          </div>
        </div>
      </div>
      <button className="button button--primary full-width" type="submit">
        {props.mode === "login" ? "Log In" : "Sign Up"}
      </button>
    </Form>
  );
};

export default FormLogin;
