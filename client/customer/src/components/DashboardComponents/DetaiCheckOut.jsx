import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCheckout } from '../../store/actionCreator/customers'
import { Col, Row, Button, Card } from 'react-bootstrap'

const DetaiCheckOut = () => {

    const { customerCheckout } = useSelector((state) => state.customers)

    const dispatch = useDispatch();

    useEffect( () => {
        fetchDataCart()
    }, [])

    const fetchDataCart = async () => {
        try {
            await dispatch(fetchCheckout())
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col md={12} className="d-flex justify-content-start section-dashboard p-5"> 
            <Row>
                <Col md={12} className="mb-5">
                    <div className="title text-start">
                        <h1>Detail Checkout</h1>
                    </div>

                    { console.log(customerCheckout)}
                    {/* { customerCheckout.msg && 
                    <div>
                        <h3 className="capitalize">{customerCheckout.msg}</h3>
                    </div>
                    }
                    { customerCheckout && customerCheckout.orderDetail.product.map((e) => {
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
                    }) } */}
                    <div className="text-start mt-5">
                        <Button variant="success" className="text-white">Pay Now</Button>
                    </div>
                </Col>
    
            </Row>
        </Col>
    );
};

export default DetaiCheckOut;