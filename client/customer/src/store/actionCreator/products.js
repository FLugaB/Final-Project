import { FETCH_PRODUCTS } from "../actionType/products";
import { isError, isSuccess, isLoading } from "./status";

//Server EndPoint
const server = `http://localhost:3000`;
export const fetchProducts = (payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${server}/products`, {
        headers: {
          access_token: localStorage.access_token,
          // 'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const products = await response.json();
      console.log(products);
      if (!response.ok) {
        throw products;
      }
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products,
      });
    } catch (error) {
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
