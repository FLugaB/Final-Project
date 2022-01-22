import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRole } from "../store/actionCreator/userRole";

import DashboardSidebar from '../components/DashboardSidebar'
import { Container, Row, Col } from 'react-bootstrap'

const Dashboard = () => {
  const dispatch=useDispatch()
  const { role, loading, error } = useSelector(
    (state) => state.userRole
  );
  // const [role, setRole]=useState('')
  useEffect(() => {
    dispatch(userRole())
  }, [role]);

    return (
        <div className="dashboard">
            <Container>
                <Row>
                    <Col md={4}> <DashboardSidebar /> </Col>
                    <Col md={8}>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
