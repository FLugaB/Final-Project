import React from 'react';
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate()

    const backHome = () => {
        try {
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="not-found-container">
            <div id="background"></div>
            <div className="top">
                <h1>404</h1>
                <h3>page not found</h3>
            </div>
            <div className="container">
                <div className="ghost-copy">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                    <div className="four"></div>
                </div>
                <div className="ghost">
                    <div className="face">
                        <div className="eye"></div>
                        <div className="eye-right"></div>
                        <div className="mouth"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>
            <div className="bottom">
                <p>Boo, looks like a ghost stole this page!</p>  
                <div className="buttons text-center">
                    <button className="btn" onClick={backHome}>Home</button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;