import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT_DETAIL,
  SET_LOADING,
  SET_ERROR,
} from "../actionType/products.js";

export const fetchProducts = () => {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true})
    setTimeout(() => {
      fetch(`http://localhost:3000/products`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          access_token: localStorage.access_token
        }
      })
      .then((res) => {
        if (!res.ok) throw new Error ("throwed Error from Fetch Products")
        return res.json();
      })
      .then((data) => {
        console.log(data, `data FETCH PRODUCTS on actionCreator/index`);
        dispatch({ type: FETCH_PRODUCTS, payload: data})
      })
      .catch((err) => {
        console.log(err, `error FETCH PRODUCTS on actionCreator/index`);
        dispatch({ type: SET_ERROR, payload: err})
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: false})
      })
    }, 1200);
  }
}

// id 1 Chat consultation, 2 Booking consultation, 3 Skincare products
// id 3 return obj yg ada arr detailProducts di 1 field nya
export const fetchProductDetail = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true})
    setTimeout(() => {
      fetch(`http://localhost:3000/products/${id}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          access_token: localStorage.access_token
        }
      })
      .then((res) => {
        if (!res.ok) throw new Error ("throwed Error from Fetch Products")
        return res.json();
      })
      .then((data) => {
        console.log(data, `data FETCH PRODUCT DETAIL on actionCreator/index`);
        dispatch({ type: FETCH_PRODUCT_DETAIL, payload: data})
      })
      .catch((err) => {
        console.log(err, `error FETCH PRODUCT DETAIL on actionCreator/index`);
        dispatch({ type: SET_ERROR, payload: err})
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: false})
      })
    }, 1200);
  }
}

