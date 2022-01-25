import React from 'react';
import { useDispatch } from 'react-redux'
import { Col, Row, Button } from 'react-bootstrap'
import { fetchHistoryOrder } from '../../store/actionCreator/customers'

const HistoryOutlet = () => {
    const dispatch = useDispatch()

    const fetchOrder = () => {
        dispatch(fetchHistoryOrder())
    }
    return (
        <Col md={12} className="d-flex justify-content-start section-dashboard p-5"> 
            <Row>
                <Col md={12} className="mb-5">
                    <div className="title text-start">
                        <h1>History Order</h1>
                    </div>
                    <Button onClick={fetchOrder}></Button>
                </Col>
     
            </Row>
        </Col>
    );
};

export default HistoryOutlet;