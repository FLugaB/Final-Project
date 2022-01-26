import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Table } from 'react-bootstrap'
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
                        {customerOrder.map((el, index) => {
                            return (
                                <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>No</th>
                                    <th>Order Id</th>
                                    <th>Status</th>
                                    <th>Ammount</th>
                                    <th>Transaction Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{el.order_id}</td>
                                    <td>{el.status}</td>
                                    <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(el.ammount)}</td>
                                    <td>{el.createdAt.slice(0,10).split('-').reverse().join('/')}</td>
                                    </tr>
                                </tbody>
                                </Table>
                            )
                        }) }
                    </div>
                </Col>
     
            </Row>
        </Col>
    );
};

export default HistoryOutlet;