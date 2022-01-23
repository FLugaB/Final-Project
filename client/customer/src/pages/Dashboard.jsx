import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRole } from "../store/actionCreator/userRole";
import { Outlet } from "react-router-dom";

import DashboardSidebar from '../components/DashboardSidebar'
import ProfileOutlet from '../components/DashboardComponents/ProfileOutlet'
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
        <div className="dashboard section-container bg-contain img-background-images">
            <Container>
                <Row>
                    <Col md={4}> 
                      <DashboardSidebar /> 
                    </Col>
                    <Col md={8}> 
                      <Row>
                          <Outlet />
                      </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
