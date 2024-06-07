import { ListGroup, Row, Col, Image, Button, Form } from "react-bootstrap"

const CartItemComponent = ({ item }) => {
    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col md={2}>
                        {item.productName}
                    </Col>
                    <Col md={2}>
                        <b>{item.price}$</b>
                    </Col>
                    <Col md={3}>
                        <b>{item.quantity} items</b>
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    )
}


export default CartItemComponent