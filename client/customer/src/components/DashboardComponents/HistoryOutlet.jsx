import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { fetchHistoryOrder } from '../../store/actionCreator/customers'
import { Table } from 'react-bootstrap';
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
                        
                        <Table striped bordered hover>
                        <thead>
                            <tr style={{textAlign: "center"}}>
                            <th>id</th>
                            <th>order_id</th>
                            <th>UserId</th>
                            <th>status</th>
                            <th>ammount</th>
                            <th>createdAt</th>
                            </tr>
                        </thead>
                        <tbody>
                        {customerOrder.map(el => {
                            return (
                            <>
                            <tr key={el.id} style={{textAlign: "center"}}>
                                <td>{el.id}</td>
                                <td>{el.order_id}</td>
                                <td>{el.UserId}</td>
                                <td>{el.status}</td>
                                <td>{el.ammount}</td>
                                <td>{el.createdAt}</td>
                            </tr>
                            </>
                            )
                        })
                        }
                        </tbody>
                        </Table>
                            
                    </div>
                </Col>
     
            </Row>
        </Col>
    );
};

export default HistoryOutlet;