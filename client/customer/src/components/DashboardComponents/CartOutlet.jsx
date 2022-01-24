import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCart } from '../../store/actionCreator/customers'
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
                    { !customerCart.msg && customerCart.map((e) => {
                        return (
                            <Card key={e.id} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={e.DetailProduct.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{e.DetailProduct.name}</Card.Title>
                                    <Card.Text>
                                    {e.DetailProduct.description}
                                    </Card.Text>
                                    <Card.Text>
                                    {e.DetailProduct.price}
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        )
                    }) }
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