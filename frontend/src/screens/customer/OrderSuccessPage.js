import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { CART_CLEAR_ITEMS } from '../../redux/constants/cartConstants';

const OrderSuccessPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: CART_CLEAR_ITEMS })
    }, [dispatch]);


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