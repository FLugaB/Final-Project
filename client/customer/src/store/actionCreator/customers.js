import { CUSTOMER_LOGIN, CUSTOMER_REGISTER, SET_ERROR, SET_LOADING } from "../actionType/customers";
//server endpoint(supaya tidak redundant)
const server=`http://localhost:3000`
export const loginPost = (email,password) => {
    return (dispatch, getState) => {
      dispatch({ type: SET_LOADING, payload: true})
      setTimeout(() => {
        fetch(`${server}/login`,{
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify( {email, password} ),
        })
        .then((res) => {
          if (!res.ok) throw new Error ("throwed Error from Login")
          return res.json();
        })
        .then((data) => {
          console.log(data, `data Login on actionCreator/index`);
          localStorage.setItem("access_token", data.access_token);
          dispatch({ type: CUSTOMER_LOGIN, payload: data})
        })
        .catch((err) => {
          console.log(err, `error Login on actionCreator/index`);
          dispatch({ type: SET_ERROR, payload: err})
        })
        .finally(() => {
          dispatch({ type: SET_LOADING, payload: true})
        })
      }, 1200);
    }
  }
  