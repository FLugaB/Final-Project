import { IS_LOADING, IS_ERROR, IS_SUCCESS } from "../actionType/index";
import { CUSTOMER_IS_SUCCESS_LOGIN } from "../actionType/customers";

export const statusLog = (payload) => {
    return async (dispatch, getState) => {
        try {
            dispatch(isSuccess(false))
            dispatch(isLoading(true))
            dispatch(isError(null))
            dispatch({ type: CUSTOMER_IS_SUCCESS_LOGIN, payload: false});
        } catch (error) {
            dispatch(isError(error));
        } finally { dispatch(isLoading(false)); }
    }
}

export const isSuccess = (payload) => { return { type: IS_SUCCESS, payload, } }
export const isLoading = (payload) => { return { type: IS_LOADING, payload, } }
export const isError = (payload) => { return { type: IS_ERROR, payload, } }