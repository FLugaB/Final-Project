import { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCheckout, requestSnap } from '../../store/actionCreator/customers'
import { formatCurrency } from '../../Hooks/helpers'
import { Col, Row, Button, Card } from 'react-bootstrap'

import { localLoad } from '../../Hooks/load'

const DetaiCheckOut = () => {

    const [onLoad, setLocalLoad] = useState(true)
    const { customerCheckout, errorCustomers } = useSelector((state) => state.customers)

    const dispatch = useDispatch();

    useEffect( async () => {
        await fetchDataCheckout()
        setLocalLoad(false)
    }, [localLoad])

    const fetchDataCheckout = async () => {
        try {
            await dispatch(fetchCheckout())


            //UDAH DAPET KAGA NGERTI ABIS ITU WKWKKWKWKKWKWKWK
            let counts = {};

            for (let i = 0; i < customerCheckout.orderDetail.product.length; i++) {
              let num = customerCheckout.orderDetail.product[i].DetailProduct.name;
              counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            customerCheckout.orderDetail.product.map(e => {
                if (e.DetailProduct.name == counts[e.DetailProduct.name]) {
                    
                }
            })

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

    if (onLoad) return localLoad()

    return (
        <Col md={12} className="checkout section-dashboard p-5"> 
            <Row>
                <Col md={12} className="mb-5 overflow-wrapper">
                    <div className="title text-start">
                        <h1>Detail Checkout</h1>
                    </div>

                    { errorCustomers && 
                        <div>
                            <h3 className="capitalize">{errorCustomers.message}</h3>
                        </div>
                    }

                    <Row className="mt-5">
                        { customerCheckout.orderDetail && customerCheckout.orderDetail.product.map((e) => {
                            return (
                                <Col md={12} key={e.id} className="bg-soft px-0 mb-3">
                                    <Row className="d-flex justify-content-between align-items-center">
                                        <Col md={4}>
                                            <div className="checkout-image-wrapper">
                                                <img src={e.DetailProduct.imageUrl} alt="" />
                                            </div>
                                        </Col>
                                        <Col md={5}>
                                            <h6>{e.DetailProduct.name}</h6>
                                        </Col>
                                        <Col md={3}>
                                            <h6>{formatCurrency(e.DetailProduct.price)}</h6>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        }) }
                    </Row>

                    <div className="title text-start">
                        <h4>Order ID: {customerCheckout.orderDetail.order_id}</h4>
                        <h4>Total Price: {formatCurrency(customerCheckout.orderDetail.totalPrice)}</h4>
                    </div>
                
                    <div className="text-start mt-5">
                        <Button variant="success" onClick={sendMidtrans} className="text-white">Pay Now</Button>
                    </div>
                </Col>
    
            </Row>
        </Col>
    );
};

export default DetaiCheckOut;