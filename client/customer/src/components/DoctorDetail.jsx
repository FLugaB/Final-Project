import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {fetchDoctorDetail} from "../store/actionCreator/doctors"
import { Col, Row, Button, Card, handleShow, Modal } from 'react-bootstrap'

const DoctorDetail = () => {

    const [isload, setIsLoad] = useState(true)  
    const dispatch = useDispatch();
    const doctorDetail = useSelector(state => state.doctors.doctorDetail)
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(fetchDoctorDetail(id))
    },[id]);

    useEffect(() => {
        if(doctorDetail) {
            setIsLoad(false)
            console.log(doctorDetail);
        }
    }, [doctorDetail])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    


    return (
        <>
        <Button variant="primary" onClick={handleShow}>
        </Button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
    {!isload && doctorDetail && ( 
        <>
        <Modal.Header closeButton>
        <Modal.Title>{doctorDetail.Profile.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{doctorDetail.email}</Modal.Body>
        <Modal.Body>{doctorDetail.Profile.gender}</Modal.Body>
        <Modal.Body>{doctorDetail.Profile.birthdate.split('T')[0]}</Modal.Body>
        <Modal.Body>{doctorDetail.Profile.phoneNumber}</Modal.Body>
        <Modal.Body>{doctorDetail.Profile.address}</Modal.Body>
        </>
    )}
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default DoctorDetail;