import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import SortOptionsComponent from "../components/SortOptionsComponent"

const ProductListScreen = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <ListGroup>
                            <ListGroup.Item>{<SortOptionsComponent />}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={6}>
                        <>
                            <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
                                <Row>
                                    <Col lg={5}>
                                        <Card.Img variant="top" src="/images/train-at-home.jpg" />
                                    </Col>
                                    <Col lg={7}>
                                        <Card.Body>
                                            <Card.Title>Name</Card.Title>
                                            <Card.Text>
                                                Description
                                            </Card.Text>
                                            <Card.Text className="h3">
                                                Price: {" "}RSD{" "}
                                                <LinkContainer to="/product-details">
                                                    <Button variant="warning">Details</Button>
                                                </LinkContainer>
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductListScreen
