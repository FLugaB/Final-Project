import { FETCH_CUSTOMER_CART, CUSTOMER_LOGIN, CUSTOMER_REGISTER,CUSTOMER_IS_SUCCESS_REGISTER, CUSTOMER_IS_SUCCESS_LOGIN, CUSTOMER_IS_SUCCESS_LOGOUT } from "../actionType/customers";
import { isError, isSuccess, isLoading } from './status'

import axios from 'axios'

//Server EndPoint
const server=`http://localhost:3000`

export const login = (payload) => {

    return async (dispatch, getState) => {
        try {
            dispatch(isSuccess(false))
            dispatch(isLoading(true))
            dispatch(isError(null))
            console.log(payload);
            const response = await fetch(`${server}/login`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const output = await response.json()
            if (!response.ok) throw (output)
            localStorage.setItem('access_token', output.access_token)
            dispatch({ type: CUSTOMER_IS_SUCCESS_LOGIN, payload: true});
        } catch (error) {
            dispatch(isError(error));
        } finally { dispatch(isLoading(false)); }
    }
}
export const register = (payload) => {

    return async (dispatch, getState) => {
        try {
            dispatch(isSuccess(false))
            dispatch(isLoading(true))
            dispatch(isError(null))
            const response = await fetch(`${server}/register`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const output = await response.json()
            if (!response.ok) throw (output)
            dispatch({ type: CUSTOMER_IS_SUCCESS_REGISTER, payload: true});
        } catch (error) {
            dispatch(isError(error));
        } finally { dispatch(isLoading(false)); }
    }
}
export const logout=(payload)=>{
    return async (dispatch, getState) => {
        try {
            dispatch({ type: CUSTOMER_IS_SUCCESS_LOGOUT});
        } catch (error) {
            dispatch(isError(error));
        } finally { dispatch(isLoading(false)); }
    }
}

export const fetchCart = (payload) => {

    return async (dispatch, getState) => {
        try {
            dispatch(isSuccess(false))
            dispatch(isLoading(true))
            dispatch(isError(null))
            const access_token = localStorage.getItem(`access_token`)
            const response = await axios.get(`${server}/account/cart`, {headers: { access_token }});
      
            console.log( response.data, `<<<<<<<<<<<<<<<<`)
            dispatch({ type: FETCH_CUSTOMER_CART, payload: response.data});
        } catch (error) {
            console.log(error)
            dispatch(isError(error));
        } finally { dispatch(isLoading(false)); }
    }
}