import { Container, Row, Col, Form, Alert, ListGroup, Button, } from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getOrderDetails } from "../../redux/actions/orderActions";
import { markOrderAsDelivered } from "../../utils/utils";

const AdminOrderDetails = () => {

    const orderDetails = useSelector((state) => state.orderDetails)
    const { loading, error, order } = orderDetails
    const { status } = order
    const [orderButtonMessage, setOrderButtonMessage] = useState(status == "Delivered" ? "Order delivered" : "Mark as delivered");
    const [isDelivered, setIsDelivered] = useState(status);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [dispatch, id, isDelivered])

    const markAsDelivered = async (id) => {
        setTimeout(function () {
            dispatch(markOrderAsDelivered(id))
            setIsDelivered(true)
            setOrderButtonMessage("Order delivered")
        }, 500)
    };


    return (
        <Container fluid>
            {loading ? (
                <h2>Loading order details...</h2>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <>
                    <Row className="mt-4">
                        <h1>Order details</h1>
                        <Col md={8}>
                            <br />
                            <Row>
                                <Col md={6}>
                                    <h2>Shipping details</h2>
                                    <b>Name</b>: {order.customerId.firstName + " " + order.customerId.lastName} <br />
                                    <b>Address</b>: {order.customerId.address} <br />
                                    <b>Phone number</b>: {order.customerId.phone}
                                </Col>
                                <Col>
                                    <Alert className="mt-3" variant={order.isPaid ? "success" : "danger"}>
                                        {order.isPaid ? <> Paid </> : <> Not paid </>}
                                        {console.log(order.isPaid)}
                                    </Alert>
                                </Col>
                                <Row>
                                    <Col>
                                        <Alert
                                            className="mt-3"
                                            variant={order.status == "Delivered" ? "success" : "danger"}
                                        >
                                            {order.status == "Delivered" ? (
                                                <>Order delivered</>
                                            ) : (
                                                <>Order not delivered yet</>
                                            )}
                                        </Alert>
                                    </Col>

                                </Row>
                            </Row>
                            <br />
                            <h2>Order items</h2>
                            <ListGroup variant="flush">
                                {order.orderItems.map((item, idx) => (
                                    <CartItemComponent key={idx} item={item} orderCreated={true} />
                                ))}
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h3>Order summary</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Shipping: <span className="fw-vold">Free shipping</span>
                                </ListGroup.Item>
                                <div className="d-grid gap-2">
                                    <Button size="lg" variant="warning" type="button" disabled={status == "Delivered"} onClick={() =>
                                        markAsDelivered(order._id)}>
                                        {orderButtonMessage}
                                    </Button>
                                </div>
                            </ListGroup>
                            {console.log(order.isPaid)}
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}

export default AdminOrderDetails
