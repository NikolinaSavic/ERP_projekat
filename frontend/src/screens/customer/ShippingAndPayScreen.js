import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../redux/actions/cartActions';
import { getUserDetails } from '../../redux/actions/customerActions';
import axios from 'axios'


const ShippingAndPayScreen = ({ history }) => {

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;
    const createOrder = useSelector((state) => state.createOrder);
    const { order } = createOrder;
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    const [address, setAddress] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user || !user.firstName) {
            dispatch(getUserDetails())
        }
    }, [dispatch, user]);

    const handleCheckout = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address }));
        axios
            .post(`/api/stripe/create-checkout-session`, {
                cartItems,
                userId: user._id,
                order_id: order._id
            })
            .then((response) => {
                if (response.data.url) {
                    window.location.assign(response.data.url)
                }
            })
            .catch((err) => console.log(err.message));
    };


    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6}>
                    <h2>Shipping details</h2>
                    <Form >
                        <Form.Group controlId="address">
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                required
                                value={user.address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mb-3"
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="w-100" onClick={(e) => { handleCheckout(e) }}>
                            Pay
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container >
    );
};

export default ShippingAndPayScreen;