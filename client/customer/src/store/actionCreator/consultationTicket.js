import { CUSTOMER_LOGIN, CUSTOMER_REGISTER,CUSTOMER_IS_SUCCESS_REGISTER, CUSTOMER_IS_SUCCESS_LOGIN, CUSTOMER_IS_SUCCESS_LOGOUT } from "../actionType/customers";
import { isError, isSuccess, isLoading } from './status'

//Server EndPoint
const server=`http://localhost:3000`

export const login = (payload) => {

    return async (dispatch, getState) => {
        // try {
        //     dispatch(isSuccess(false))
        //     dispatch(isLoading(true))
        //     dispatch(isError(null))
        //     console.log(payload);
        //     const response = await fetch(`${server}/login`, {
        //         method: "POST",
        //         body: JSON.stringify(payload),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     const output = await response.json()
        //     if (!response.ok) throw (output)
        //     localStorage.setItem('access_token', output.access_token)
        //     dispatch({ type: CUSTOMER_IS_SUCCESS_LOGIN, payload: true});
        // } catch (error) {
        //     dispatch(isError(error));
        // } finally { dispatch(isLoading(false)); }
    }
}