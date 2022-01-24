import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCart } from '../../store/actionCreator/customers'
import { formatCurrency } from '../../Hooks/helpers'
import { Col, Row, Button, Card } from 'react-bootstrap'

const CartOutlet = () => {

    const { customerCart } = useSelector((state) => state.customers)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        fetchDataCart()
    }, [])

    const fetchDataCart = async () => {
        try {
            await dispatch(fetchCart())
            console.log(customerCart)
        } catch (error) {
            console.log(error)
        }
    }

    const onCheckOut = () => {
        try {
            navigate('/account/checkout')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col md={12} className="d-flex justify-content-start section-dashboard p-5"> 
            <Row>
                <Col md={12} className="mb-5">
                    <div className="title text-start">
                        <h1>Cart</h1>
                    </div>
                    { customerCart.msg && 
                     <div className="mt-5">
                         <h3 className="text-capitalize font-hard">{customerCart.msg}</h3>
                     </div>
                    }
                    <Row className="mt-5">
                        { !customerCart.msg && customerCart.map((e) => {
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
                    {
                        !customerCart.msg && 
                        <div className="text-start mt-5">
                            <Button variant="success" onClick={onCheckOut} className="text-white">Checkout</Button>
                        </div>
                    }
                </Col>
     
            </Row>
        </Col>
    );
};

export default CartOutlet;