import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCheckout, requestSnap } from '../../store/actionCreator/customers'
import { formatCurrency } from '../../Hooks/helpers'
import { Col, Row, Button, Card } from 'react-bootstrap'

import { localLoad } from '../../Hooks/load'

const DetaiCheckOut = () => {

    const [onLoad, setLocalLoad] = useState(true)
    const { customerCheckout, errorCustomers } = useSelector((state) => state.customers)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( async () => {
        await fetchDataCheckout()
        setLocalLoad(false)
    }, [localLoad])

    const fetchDataCheckout = async () => {
        try {
            await dispatch(fetchCheckout())


            //UDAH DAPET KAGA NGERTI ABIS ITU WKWKKWKWKKWKWKWK
           if (customerCheckout.orderDetail) {
               console.log(customerCheckout, `==================================`)
            let counts = {};

            for (let i = 0; i < customerCheckout.orderDetail.product.length; i++) {
              let num = customerCheckout.orderDetail.product[i].DetailProduct.name;
              counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            customerCheckout.orderDetail.product.map(e => {
                if (e.DetailProduct.name == counts[e.DetailProduct.name]) {
                    
                }
            })
           }

        } catch (error) {
            console.log(error, `ini error effect`)
        }
    }

    useEffect(() => {
        const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = "SB-Mid-client-a4h5p1uZna2ekBBq";
    
        const script = document.createElement("script");
        script.src = snapSrcUrl;
        script.setAttribute("data-client-key", myMidtransClientKey);
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);

    const sendMidtrans = async () => {
        try {
            dispatch(requestSnap())
        } catch (error) {
            console.log(error, `<========errr`)
        }
    }

    const backToDetails = () => {
        try {
            navigate('/account/cart')
        } catch (error) {
            console.log(error)
        }
    }

    if (onLoad) return localLoad()

    return (
        <Col md={12} className="checkout section-dashboard p-5"> 
            <Row>
                <Col md={12} className="mb-5 overflow-wrapper">
                    <div className="title text-start">
                        <h1>Detail Checkout</h1>
                        <a className="no-style" href="" onClick={backToDetails}> {`< Back to cart`} </a>
                    </div>

                    { errorCustomers && 
                        <div>
                            <h3 className="capitalize">{errorCustomers.message}</h3>
                        </div>
                    }

                    <Row className="mt-5">
                        { customerCheckout.orderDetail && 
                            (
                                <Col md={12} key={customerCheckout.orderDetail.product[0].id} className="px-0 mb-3">
                                    <Row className="d-flex justify-content-between align-items-center">
                                        <Col md={1}>
                                            <div className="checkout-image-wrapper">
                                                <img src={customerCheckout.orderDetail.product[0].DetailProduct.imageUrl} alt="" />
                                            </div>
                                        </Col>
                                        <Col md={3} className="ms-0 me-0">
                                            <h6 className="fw-bold">{customerCheckout.orderDetail.product[0].DetailProduct.name}</h6>
                                        </Col>
                                        <Col md={3} className="ms-0 me-auto">
                                            <h6 className="fw-bold">x {customerCheckout.orderDetail.product.length}</h6>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        }
                    </Row>

                    { customerCheckout.orderDetail &&  
                    (
                        <div>
                            <div className="title text-start mt-5">
                                <h4 className="fw-bold">Order ID: {customerCheckout.orderDetail.order_id}</h4>
                                <h4 className="fw-bold">Total Price: {formatCurrency(customerCheckout.orderDetail.totalPrice)}</h4>
                            </div>
                        
                            <div className="text-start mt-5">
                                <Button variant="success" onClick={sendMidtrans} className="text-white">Pay Now</Button>
                            </div>
                        </div>
                    )}

                </Col>
    
            </Row>
        </Col>
    );
};

export default DetaiCheckOut;