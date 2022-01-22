import React from 'react';

const CntentSlider = () => {
    return (
        <div className="untitled">
            <div className="untitled__slides">
                <div className="untitled__slide">
                    <div className="untitled__slideBg"></div>
                    <div className="untitled__slideContent">
                        <span>Therapy</span> 
                        <span>Injection</span>
                        <a className="button" href="#">Book Shedule</a>
                    </div>
                </div>
                <div className="untitled__slide">
                    <div className="untitled__slideBg"></div>
                    <div className="untitled__slideContent">
                        <span>Just</span> 
                        <span>Like Us</span>
                        <a className="button" href="#">Consultation</a>
                    </div>
                </div>
                <div className="untitled__slide">
                    <div className="untitled__slideBg"></div>
                    <div className="untitled__slideContent">
                        <span>Mesotherapy</span> 
                        <a className="button" href="#">Book Shedule</a>
                    </div>
                </div>
                <div className="untitled__slide">
                    <div className="untitled__slideBg"></div>
                    <div className="untitled__slideContent">
                        <span>Just</span> 
                        <span>Like Us</span>
                        <a className="button" href="#">Consultation</a>
                    </div>
                </div>
            </div>
            <div className="untitled__shutters"></div>
        </div>
    );
};

export default CntentSlider;