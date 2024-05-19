import { ListGroup, Row, Col, Image, Button, Form } from "react-bootstrap"

const CartItemComponent = () => {
    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col md={2}>
                        <Image crossOrigin="anonymous" src="/images/bag.jpg" fluid />
                    </Col>
                    <Col md={2}>
                        product name
                    </Col>
                    <Col md={2}>
                        <b>price sum</b>
                    </Col>
                    <Col md={3}>
                        <Form.Select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Button type="button" variant="secondary" onClick={() => window.confirm("Are you sure?")}>
                            <i className="bi bi-trash">
                            </i></Button>
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    )
}


export default CartItemComponent