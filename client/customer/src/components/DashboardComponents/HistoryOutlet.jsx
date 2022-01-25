import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { fetchHistoryOrder } from '../../store/actionCreator/customers'

const HistoryOutlet = () => {

    const { customerOrder } = useSelector(state => state.customers)
    
    const dispatch = useDispatch()

    useEffect( () => {
        fetchOrder()
    }, [])

    const fetchOrder = async () => {
        try {
            await dispatch(fetchHistoryOrder())
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col md={12} className="d-flex justify-content-start section-dashboard p-5"> 
            <Row>
                
                <Col md={12} className="mb-5">
                    <div className="title text-start">
                        {/* <h3>{ JSON.stringify(customerOrder) }</h3> */}
                        {customerOrder.map(el => {
                            return (
                                <h1>{ JSON.stringify(el) }</h1>
                            )
                        }) }
                    </div>
                </Col>
     
            </Row>
        </Col>
    );
};

export default HistoryOutlet;