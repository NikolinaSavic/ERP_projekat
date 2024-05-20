import { Container, Row, Col, Form, Alert, ListGroup, Button, } from "react-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

const CustomerOrderDetails = () => {
    return (
        <Container fluid>
            <Row className="mt-4">
                <h1>Order details</h1>
                <Col md={8}>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h2>Shipping</h2>
                            <b>Name</b>: Nina Savic <br />
                            <b>Address</b>: NS <br />
                            <b>Phone number</b>: 222
                        </Col>
                        <Col md={6}>
                            <h2>Payment method</h2>
                            <Form.Select disabled={true}>
                                <option value="pp">Paypal</option>
                                <option value="cod">Cash on delivery</option>
                            </Form.Select>
                        </Col>
                        <Row>
                            <Col>
                                <Alert className="mt-3" variant="danger">
                                    Not delivered
                                </Alert>
                            </Col>
                            <Col>
                                <Alert className="mt-3" variant="success">
                                    Paid on 2023
                                </Alert>
                            </Col>
                        </Row>
                    </Row>
                    <br />
                    <h2>Order items</h2>
                    <ListGroup variant="flush">
                        {Array.from({ length: 3 }).map((item, idx) => (
                            <CartItemComponent key={idx} item={item} />
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Order summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Shipping: <span className="fw-vold">included</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Total price: <span className="fw-vold">400 $</span>
                        </ListGroup.Item>
                        <div className="d-grid gap-2">
                            <Button size="lg" variant="warning" type="button">
                                Wait for your order.
                            </Button>
                        </div>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default CustomerOrderDetails
