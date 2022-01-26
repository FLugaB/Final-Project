import { Navigate } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchConsultationTickets } from "../store/actionCreator/consultationTickets";
import { userRole } from "../store/actionCreator/userRole";
const RoutesGuard = ({children}) => {

    const accessToken = localStorage.getItem(`access_token`)

    if (!accessToken) return <Navigate to="/login" />;

    return children
};
const ClientVideoGuard = ({children}) => {
    const { profile, loading, error } = useSelector(
        (state) => state.userRole
    );
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(userRole())
    }, []);

    useEffect(() => dispatch(
        fetchConsultationTickets()
    ), []);

    const ClientId = localStorage.getItem(`ClientId`)
    const status = localStorage.getItem(`status`)
    
    if ( +ClientId !== +profile.UserId || status !== 'useable' || !status ) {
        console.log("FAIL VALIDASI GO TO TICKET");
        return <Navigate to="/login" />;
    }

    return children
};

const LogGuard = ({children}) => {

    const { profile, loading, error } = useSelector(
        (state) => state.userRole
    );
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(userRole())
    }, []);

    useEffect(() => dispatch(
        fetchConsultationTickets()
    ), []);

    const ClientId = localStorage.getItem(`ClientId`)
    const status = localStorage.getItem(`status`)

    return children
};

export {
    RoutesGuard,
    LogGuard,
    ClientVideoGuard
};