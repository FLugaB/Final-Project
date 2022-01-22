import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { login } from '../store/actionCreator/customers'

import { Form } from "react-bootstrap"

import { timerAlert, errorAlert } from '../Hooks/alert'
import { localLoad } from '../Hooks/load'


const FormLogin = (props) => {

    const [clickLoad, setClickLoad] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [newemail, setNewEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const { errorCustomers, isSuccessLogin } = useSelector((state) => state.customers)
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
  
    const onLogin = (e) => {
        e.preventDefault();
        setClickLoad(true)

        const tryLog = {
            email: email,
            password: password
        }

        dispatch(login(tryLog))
    }

    const logError = (errorCustomers) => {
        if (errorCustomers) {
            setClickLoad(false)
            errorAlert(errorCustomers)
        }
    }

    const logSuccess = (isSuccessLogin) => {
        if (isSuccessLogin) {
            setClickLoad(false)
            navigate('/')
            const text = "Hi, Welcomeback <fullName> !"
            timerAlert(text)
        }
    }

    useEffect(() => logError(errorCustomers), [errorCustomers]);
    useEffect(() => logSuccess(isSuccessLogin), [isSuccessLogin]);

    if (clickLoad) return localLoad()
    
    return (
    
        <Form onSubmit={onLogin}>
            <div className="form-block__input-wrapper mb-5">
                <div className="form-group form-group--login">
                    <Form.Control 
                        className="form-group__input"
                        disabled={props.mode === 'signup'}
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email" required />
                    
                    <Form.Control 
                        className="form-group__input"
                        disabled={props.mode === 'signup'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        minLength="5"
                        maxLength="12"
                        type="password" required />
                </div>

                <div className="form-group form-group--signup">
                    <Form.Control 
                        className="form-group__input"
                        disabled={props.mode === 'login'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        type="text" required />

                    <Form.Control 
                        className="form-group__input"
                        disabled={props.mode === 'login'}
                        value={newemail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Email"
                        type="email" required />

                    <Form.Control 
                        className="form-group__input"
                        disabled={props.mode === 'login'}
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Password"
                        type="password" required />

                    <Form.Control 
                        className="form-group__input"
                        disabled={props.mode === 'login'}
                        value={phonenumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        type="text" required />

                    <Form.Control 
                        className="form-group__input"
                        disabled={props.mode === 'login'}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        type="text" required />
                </div>
            </div>
            <button className="button button--primary full-width" type="submit">{props.mode === 'login' ? 'Log In' : 'Sign Up'}</button>
        </Form>

    );
};

export default FormLogin;