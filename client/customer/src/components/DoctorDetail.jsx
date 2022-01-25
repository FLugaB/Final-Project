import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {fetchDoctorDetail} from "../store/actionCreator/doctors"

const DoctorDetail = () => {

    const dispatch = useDispatch();
    const doctorDetail = useSelector(state => state.doctors.doctorDetail)
    const {id} = useParams()
    console.log(id, "ini id ");
    
    // const [localLoad, setLocalLoad] = useState(true)
    // const { } = useSelector( (state) => state.doctor)
    

    useEffect(() => {
        dispatch(fetchDoctorDetail(id))
    },[id]);
    // useEffect(() => pageLoaded(), [beforeUpdateProduct.id])

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{doctorDetail.Profile.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
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