import {
    Row, Col, Container, Image, ListGroup, Form,
    Button, Alert,
    ListGroupItem,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";


const ProductDetailsScreen = () => {

    const { id } = useParams();
    const [quantity_, setQuantity] = useState(1);
    const userLogin = useSelector((state) => state.userLogin);
    const [showCartMessage, setShowCartMessage] = useState(false);
    const { loadingUserInfo, erroruserInfo, userInfo } = userLogin;

    const { loading, error, product } = useSelector(state => state.product);
    //const { reviews } = useSelector(state => state.reviews);
    //const { errorReviews } = useSelector(state => state.createReview);
    //const [productReviewed, setProductReviewed] = useState(false);

    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addToCart(id, quantity_));
        setShowCartMessage(true);
    };


    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])


    const submitHandler = (e) => {
        e.preventDefault()
        const form = e.currentTarget.elements;
        //const comment = form.comment.value;
        //const rating = form.rating.value;
    }


    return (
        <Container>
            <Alert
                show={showCartMessage}
                variant="success"
                onClose={() => setShowCartMessage(false)}
                dismissible
            >
                <Alert.Heading>Product added to cart!</Alert.Heading>
            </Alert>
            <Row className="mt-5">
                {loading ? (
                    <h2>Product details loading...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : (
                    <>
                        <Col md={4}>
                            <Image variant="top" src={'/images/' + String(product.productName).replace(/\s+/g, '').toLowerCase() + '.jpg'}
                                style={{ width: '250px', height: '220px' }} />
                        </Col>
                        <Col md={8}>
                            <Row>
                                <Col md={8}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h1>{product.productName}</h1>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating readonly size={20} initialValue={product.rating} /> ({product.reviewsNumber})
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <span className="fw-bold">Price {product.price}$ </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={4}>
                                    <ListGroup>
                                        <ListGroup.Item>Status: {product.quantity > 0 ? 'In stock' : 'Unavailable'}</ListGroup.Item>
                                        <ListGroup.Item>
                                            Total: <span className="fw-bold">${product.price * quantity_}</span>
                                        </ListGroup.Item>

                                        {product.quantity > 0 && (
                                            <ListGroup.Item>
                                                Quanity:
                                                <Form.Select
                                                    value={quantity_}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    size="lg"
                                                    aria-label="Default select example"
                                                >
                                                    {[...Array(product.quantity).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button onClick={addToCartHandler} variant="warning" disabled={product.quantity === 0}>
                                                Add to cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-5">
                                    <h4>Reviews</h4>
                                    <ListGroupItem variant="flush">
                                        {Array.from({ length: 3 }).map((item, idx) => (
                                            <ListGroupItem key={idx}>
                                                Customer name <br />
                                                <Rating readonly size={20} /> <br />
                                                Description of review
                                            </ListGroupItem>
                                        ))}
                                    </ListGroupItem>
                                </Col>
                            </Row>
                            <hr />
                            send review form
                            <Alert variant="warning">
                                Login first to write a review
                            </Alert>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Write a review</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Form.Select aria-label="Default select example">
                                    <option>Your rating</option>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </Form.Select>
                                <Button type="submit" className="mb-3 mt-3" variant="primary">
                                    Rate
                                </Button>
                            </Form>
                        </Col>
                    </>
                )}
            </Row>
        </Container>
    )
}

export default ProductDetailsScreen
