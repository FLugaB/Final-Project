import { Navigate } from "react-router-dom"

const RoutesGuard = ({children}) => {

    const accessToken = localStorage.getItem(`access_token`)

    if (!accessToken) return <Navigate to="/login" />;

    return children
};

const LogGuard = ({children}) => {

    const accessToken = localStorage.getItem(`access_token`)

    if (accessToken) return <Navigate to="/" />;

    return children
};

export {
    RoutesGuard,
    LogGuard
};