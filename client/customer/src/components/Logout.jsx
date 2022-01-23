import { useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import HomePage from "../pages/HomePage"
import { logout } from "../store/actionCreator/customers"

export const LogoutComponent=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(logout())
        navigate('/')
    },[])
    const toHome=()=>{

    }
    return(
        <HomePage/>
    )
}