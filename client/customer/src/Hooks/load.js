import { Spinner } from "react-bootstrap"
import logo from '../assets/logo.png';

const localLoad = () => {
    return (
        <div className="overlay-load">
            <div>
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" />
            </div>
        </div>
    )
}

const pageLoad = () => {
    return (
        <div className="loader-wrapper">
            <div className='loading'>
                <div className='logo'></div>
                <div className='dots animate'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                </div>
            </div>
        </div>
    )
}

export { 
    localLoad,
    pageLoad
}