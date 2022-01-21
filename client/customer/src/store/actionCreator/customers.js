import { CUSTOMER_LOGIN, CUSTOMER_REGISTER } from "../actionType/customers";
import { isError, isSuccess, isLoading } from './status'

//Server EndPoint
const server=`http://localhost:3000`

export const login = (payload) => {

    return async (dispatch, getState) => {
        try {
            dispatch(isSuccess(false))
            dispatch(isLoading(true))
            dispatch(isError(null))
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
            dispatch({ type: IS_SUCCESS_LOGIN, payload: true});
        } catch (error) {
            dispatch(isError(error));
        } finally { dispatch(isLoading(false)); }
    }
}
  