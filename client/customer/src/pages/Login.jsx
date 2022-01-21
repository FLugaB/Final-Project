import React, { useState } from 'react';
import FormLogin from "../components/FormLogin";

const Login = (props) => {

    const [mode, setState] = useState(props.mode);
  
    function toggleMode() {
        let newMode = mode === 'login' ? 'signup' : 'login';
        setState(newMode);
    }

    return (
            <div className={`app app--is-${mode}`}>
                <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
                <section className={`form-block form-block--is-${mode}`}>
                    <header className="form-block__header">
                        <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up ?'}</h1>
                        <div className="form-block__toggle-block">
                            <span className="w-100">{mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                            <input id="form-toggler" type="checkbox" onClick={toggleMode.bind(props.mode)} />
                            <label htmlFor="form-toggler"></label>
                        </div>
                    </header>
                    <FormLogin mode={mode} />
                </section>
            </div>
    );
};

export default Login;