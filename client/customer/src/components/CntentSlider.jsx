import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { addTicketToCart } from '../store/actionCreator/customers'

const CntentSlider = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addTicket = async () => {
        try {

            await dispatch(addTicketToCart())

            navigate("/account/cart")
            
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <div className="untitled">
            <div className="untitled__slides">
                <div className="untitled__slide">
                    <div className="untitled__slideBg"></div>
                    <div className="untitled__slideContent">
                        <span>Therapy</span> 
                        <span>Injection</span>
                        <button className="button" onClick={addTicket}>Consultation</button>
                    </div>
                </div>
                <div className="untitled__slide">
                    <div className="untitled__slideBg"></div>
                    <div className="untitled__slideContent">
                        <span>Just</span> 
                        <span>Like Us</span>
                        <button className="button" onClick={addTicket}>Consultation</button>
                    </div>
                </div>
                <div className="untitled__slide">
                    <div className="untitled__slideBg"></div>
                    <div className="untitled__slideContent">
                        <span>Mesotherapy</span> 
                        <button className="button" onClick={addTicket}>Consultation</button>
                    </div>
                </div>
                <div className="untitled__slide">
                    <div className="untitled__slideBg"></div>
                    <div className="untitled__slideContent">
                        <span>Just</span> 
                        <span>Like Us</span>
                        <button className="button" onClick={addTicket}>Consultation</button>
                    </div>
                </div>
            </div>
            <div className="untitled__shutters"></div>
        </div>
    );
};

export default CntentSlider;