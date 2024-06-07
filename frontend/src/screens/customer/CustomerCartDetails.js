import {
    Container,
    Row,
    Col,
    Form,
    ListGroup,
    Button,
} from "react-bootstrap";
import React, { useEffect } from 'react';
import CartItemComponent from "../../components/CartItemComponent";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import { createOrder } from "../../redux/actions/orderActions";
import { useNavigate } from "react-router-dom";

const CustomerCartDetails = () => {

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const [paymentMethod, setPaymentMethod] = useState('Stripe')
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const orderHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        dispatch(createOrder(cartItems, paymentMethod))
        navigate('/shipping')
    }

    const choosePayment = (e) => {
        setPaymentMethod(e.target.value);
    }

    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Create order</h1>
                <Col md={6}>
                    <br />
                    <Row>

                        <Col md={8}>
                            <h2>Payment method</h2>
                            <Form.Select onChange={choosePayment}>
                                <option value="Stripe">Stripe</option>
                                <option value="Cash on delivery">
                                    Cash on delivery
                                </option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <br />
                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {cartItems.map((item, idx) => (
                            <CartItemComponent item={item} key={idx} orderCreated={true} />
                        ))}
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Order review</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price without delivery included: <span className="fw-bold">{cartItems
                                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                                .toFixed(2)} $</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button size="lg" variant="primary" type="submit" className="w-100" onClick={(e) => { orderHandler(e) }}>
                                    Pay and finish
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default CustomerCartDetails
