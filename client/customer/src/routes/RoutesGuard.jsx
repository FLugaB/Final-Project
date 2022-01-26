import { Navigate } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchConsultationTickets } from "../store/actionCreator/consultationTickets";
const RoutesGuard = ({children}) => {

    const accessToken = localStorage.getItem(`access_token`)

    if (!accessToken) return <Navigate to="/login" />;

    return children
};
const ClientVideoGuard = ({children}) => {
    // const [status, setStatus] = useState('')
    const dispatch = useDispatch();
    // const dummyState = true

    useEffect(() => dispatch(fetchConsultationTickets()), []);
    const ClientId = localStorage.getItem(`ClientId`)
    console.log("%c ⚱️: ClientVideoGuard -> ClientId ", "font-size:16px;background-color:#56b220;color:white;", ClientId)
    
    // const status = localStorage.getItem(`status`)


    if (ClientId===3) return <Navigate to="/login" />;
    // if (status === 'usable' || !status) return <Navigate to="/login" />;

    return children
};
const DoctorVideoGuard = ({children}) => {
//     const dummyState = false

//     if (!dummyState) return <Navigate to="/login" />;

    // return children
};

const LogGuard = ({children}) => {

    const accessToken = localStorage.getItem(`access_token`)

    if (accessToken) return <Navigate to="/" />;

    return children
};

export {
    RoutesGuard,
    LogGuard,
    ClientVideoGuard,
    DoctorVideoGuard
};