import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../store/actionCreator/customers";
import { formatCurrency } from "../../Hooks/helpers";
import { Col, Row, Button, Card } from "react-bootstrap";
import { BiPlus, BiMinus } from "react-icons/bi";
import {
  addTicketToCart,
  deleteTicketToCart,
} from "../../store/actionCreator/customers";

import "./CartOutlet.css";

const CartOutlet = () => {
  const { customerCart } = useSelector((state) => state.customers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataCart();
  }, []);

  useEffect(() => {
    if (customerCart.length > 0) {
      setCounter(customerCart.length);
    }
  }, [customerCart]);

  const [counter, setCounter] = useState(customerCart.length);
  const incrementCounter = () => {
    dispatch(addTicketToCart());
    setCounter(counter + 1);
  };

  let decrementCounter = async (id) => {
    await dispatch(deleteTicketToCart(id));
    setCounter(counter - 1);
  };
  if (counter <= 0) {
    decrementCounter = () => setCounter(1);
  }

  const fetchDataCart = async () => {
    try {
      await dispatch(fetchCart());
      console.log(customerCart);
      setCounter(customerCart.length);
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckOut = () => {
    try {
      navigate("/account/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col md={12} className="d-flex justify-content-start section-dashboard p-5">
      <Row>
        <Col md={12} className="mb-5">
          <div className="title text-start">
            <h1>Cart</h1>
          </div>
          {customerCart.msg && (
            <div className="mt-5">
              <h3 className="text-capitalize font-hard">{customerCart.msg}</h3>
            </div>
          )}
          <Row className="mt-5">
            {!customerCart.msg && customerCart.length >= 1 && (
              <div className="container-fluid">
                <div className="row align-items-start">
                  <div className="col-12 col-sm-6 items">
                    <div className="cartItem row align-items-start">
                      <div className="col-3 mb-2">
                        <img
                          style={{ width: 2 }}
                          className="w-100"
                          src="https://ik.imagekit.io/h8finalproject/Remote-consultation-icon_oA81_GliE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643214899445"
                          alt=""
                        />
                      </div>
                      <div className="col-5 mb-2">
                        <h6 className="">
                          {customerCart[0].DetailProduct.name}
                        </h6>
                      </div>
                      <div className="d-flex flex-row cart-wrappers">

                        <div 
                        onClick={(e) => {
                            e.preventDefault();
                            decrementCounter(customerCart[0].id);
                        }}
                        className="wrapper-cart-button">
                            <BiMinus />
                        </div>

                      <di className="">
                        <p className="mx-3 mb-0 mt-2 text-center">
                          {counter}
                        </p>

                      </di>
                        <div 
                        onClick={incrementCounter}
                        className="wrapper-cart-button">
                            <BiPlus />
                        </div>
                      </div>
                      <div className="col-2 mt-5">
                        <p id="cartItem1Price">
                          {formatCurrency(customerCart[0].DetailProduct.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 p-3 proceed form">
                    <div className="row m-0">
                      <div className="col-sm-8 p-0">
                        <h6>Subtotal</h6>
                      </div>
                      <div className="col-sm-4 p-0">
                        <p id="subtotal">
                          {formatCurrency(
                            customerCart[0].DetailProduct.price * counter
                          )}
                        </p>
                      </div>
                    </div>
                    {/* <div className="row m-0">
                      <div className="col-sm-8 p-0 ">
                        <h6>Tax</h6>
                      </div>
                      <div className="col-sm-4 p-0">
                        <p id="tax">0%</p>
                      </div>
                    </div> */}

                    <div className="row mx-0 mb-2">
                      <div className="col-sm-8 p-0 d-inline">
                        <h5>Total</h5>
                      </div>
                      <div className="col-sm-4 p-0">
                        <p id="total">
                          {formatCurrency(
                            customerCart[0].DetailProduct.price * counter
                          )}
                        </p>
                      </div>
                    </div>
                    {!customerCart.msg && (
                      <div className="text-end mt-5 ms-4">
                        <Button
                          variant="success"
                          onClick={onCheckOut}
                          className="text-white"
                        >
                          Checkout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Row>
          {/* {!customerCart.msg && (
            <div className="text-start mt-5">
              <Button
                variant="success"
                onClick={onCheckOut}
                className="text-white"
              >
                Checkout
              </Button>
            </div>
          )} */}
        </Col>
      </Row>
    </Col>
  );
};

export default CartOutlet;
