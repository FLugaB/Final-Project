import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRole } from "../store/actionCreator/userRole";

const Dashboard = () => {
  const dispatch=useDispatch()
  const { role, loading, error } = useSelector(
    (state) => state.userRole
  );
  // const [role, setRole]=useState('')
  useEffect(() => {
    dispatch(userRole())
  }, [role]);
  if (role === "Doctor") {
    return <div><h1>doctor Dashboard</h1></div>;
    return
  } else {
    return <div><h1>patient Dashboard</h1></div>;
  }
};

export default Dashboard;
