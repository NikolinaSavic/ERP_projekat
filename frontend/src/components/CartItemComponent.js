import { ListGroup, Row, Col, } from "react-bootstrap"
import RemoveFromCartComponent from "./RemoveFromCartComponent";

const CartItemComponent = ({ item, removeFromCartHandler = false, orderCreated = false, }) => {
    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col md={2}>
                        <b>{item.productName}</b>
                    </Col>
                    <Col md={2}>
                        <b>{item.price}$</b>
                    </Col>
                    <Col md={3}>
                        <b>{item.quantity} items</b>
                    </Col>
                    <Col md={3}>
                        <RemoveFromCartComponent
                            productId={item.productId}
                            quantity={item.quantity}
                            price={item.price}
                            removeFromCartHandler={removeFromCartHandler}
                            orderCreated={orderCreated}
                        />
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    )
}


export default CartItemComponent