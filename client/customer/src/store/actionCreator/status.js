import { IS_LOADING, IS_ERROR, IS_SUCCESS } from "../actionType/index";

export const isSuccess = (payload) => { return { type: IS_SUCCESS, payload, } }
export const isLoading = (payload) => { return { type: IS_LOADING, payload, } }
export const isError = (payload) => { return { type: IS_ERROR, payload, } }