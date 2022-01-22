import { USER_ROLE } from "../actionType/userRole";
import { IS_LOADING, IS_ERROR, IS_SUCCESS } from "../actionType/index";
import { isError, isLoading } from "./status";
//Server EndPoint
const server=`http://localhost:3000`
export const userRole = (payload) => {
  return async (dispatch, getState) => {
    try {
        const response= await fetch(`${server}/account`,{
            headers: {
                'access_token':localStorage.access_token
                // 'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
        })
        const output= await response.json()
        if(!response.ok){
            throw (output)
        }
        console.log(output);
        dispatch({type:USER_ROLE, payload:output.findUser.role})
    } catch (error) {
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
