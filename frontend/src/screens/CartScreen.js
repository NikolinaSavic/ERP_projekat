import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import CartItemComponent from "../components/CartItemComponent"

const CartScreen = () => {
    return (
        <Container fluid>
            <Row className="mt-4">
                <Col md={8}>
                    <h2>Shopping cart</h2>
                    <ListGroup variant="flush">
                        {Array.from({ length: 3 }).map((item, idx) => (
                            <CartItemComponent key={idx} />
                        ))}
                    </ListGroup>
                    <Alert varinat="info">
                        Your cart is empty
                    </Alert>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Subtotal</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: <span className="fw-bold">rsd</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <LinkContainer to="/customer/my-orders">
                                <Button type="button">
                                    Proceed to checkout
                                </Button>
                            </LinkContainer>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default CartScreen
