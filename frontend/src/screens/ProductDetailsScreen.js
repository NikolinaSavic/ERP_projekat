import {
    Row, Col, Container, Image, ListGroup, Form,
    Button, Alert,
    ListGroupItem,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const ProductDetailsScreen = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col md={4}>
                    <Image fluid src="/images/bag.jpg" />
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h1>name</h1>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span> rating </span> <br />
                                    <Rating readonly size={20} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span className="fw-bold">Price </span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    description
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <ListGroup>
                                <ListGroup.Item>Status: in stock</ListGroup.Item>
                                <ListGroup.Item>
                                    <span>Price:</span>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Quantity:
                                    <Form.Select size="lg" aria-label="Default select example">
                                        <option>1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                    </Form.Select>
                                </ListGroup.Item>


                                <ListGroup.Item>
                                    <Button variant="warning">
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
            </Row>
        </Container>
    )
}

export default ProductDetailsScreen
