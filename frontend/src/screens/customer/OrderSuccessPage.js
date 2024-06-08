import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { CART_CLEAR_ITEMS } from '../../redux/constants/cartConstants';
import { updateOrder } from '../../redux/actions/orderActions';
import { useParams } from 'react-router-dom';

const OrderSuccessPage = () => {

    const { orderId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: CART_CLEAR_ITEMS })
        if (orderId) {
            dispatch(updateOrder(orderId));
        }
    }, [dispatch, orderId]);


    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6} className="text-center">
                    <h2 className="mt-4">Order successfully paid!</h2>
                    <p className="text-muted mt-3">Thank you for your order.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderSuccessPage;