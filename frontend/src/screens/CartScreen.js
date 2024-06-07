import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import CartItemComponent from "../components/CartItemComponent"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/actions/cartActions'

const CartScreen = () => {

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const changeCount = (id, quantity) => {
        dispatch(addToCart(id, quantity));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <Container fluid>

            <h2>Shopping cart</h2>
            {cartItems.length === 0 ? (
                <Alert variant="info">Cart is empty</Alert>
            ) : (
                <Row className="mt-4">
                    <Col md={8}>
                        <ListGroup variant="flush">
                            {cartItems.map((item, idx) => (
                                <CartItemComponent key={idx} item={item} changeCount={changeCount} removeFromCartHandler={removeFromCartHandler} />
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>Subtotal</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: <span className="fw-bold">{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
                                    .toFixed(2)} $</span>
                            </ListGroup.Item>
                            {userInfo == null ? (<>
                                <ListGroup.Item>
                                    <LinkContainer to="/login">
                                        <Button type="button">Log in</Button>
                                    </LinkContainer>
                                </ListGroup.Item></>) : (<>
                                    <ListGroup.Item>
                                        <LinkContainer to="/user/cart-details">
                                            <Button type="button">Proceed to checkout</Button>
                                        </LinkContainer>
                                    </ListGroup.Item></>)}
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default CartScreen
