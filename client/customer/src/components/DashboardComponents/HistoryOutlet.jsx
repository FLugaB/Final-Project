<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Table } from 'react-bootstrap'
import { fetchHistoryOrder } from '../../store/actionCreator/customers'
=======
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../Hooks/helpers";
import { fetchHistoryOrder } from "../../store/actionCreator/customers";
>>>>>>> 49936d2f686f6adcc97f21bf91dc3f1859387041

const HistoryOutlet = () => {
  const { customerOrder } = useSelector((state) => state.customers);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrder();
  }, [dispatch]);

  useEffect(() => {
    if (customerOrder.length >= 1) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchOrder = async () => {
    try {
      await dispatch(fetchHistoryOrder());
    } catch (error) {
      console.log(error);
    }
  };

  console.log(customerOrder);

  return (
    <div>
      {!isLoading && customerOrder.length < 1 && (
        <div className="titleStyle">
          <h2>You don't have a History Order yet...</h2>
        </div>
      )}

<<<<<<< HEAD
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
=======
      {!isLoading && customerOrder.length >= 1 && (
        <table className="containerTable1">
          <thead>
            <tr>
              <th>
                <h1>#ID</h1>
              </th>
              <th>
                <h1>Order ID</h1>
              </th>
              <th>
                <h1>Status</h1>
              </th>
              <th>
                <h1>Date</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {customerOrder.map((el) => {
              return (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.order_id}</td>
                  <td>{el.status}</td>
                  <td>{formatDate(el.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
>>>>>>> 49936d2f686f6adcc97f21bf91dc3f1859387041
};

export default HistoryOutlet;
