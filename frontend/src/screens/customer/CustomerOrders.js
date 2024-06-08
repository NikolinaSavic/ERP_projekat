import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { getMyOrders } from "../../redux/actions/orderActions";
import moment from "moment";

const CustomerOrders = () => {

    const myOrders = useSelector((state) => state.myOrders);
    const { loading, error, orders } = myOrders;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyOrders())
    }, [dispatch])


    return (
        <Row className="m-5">
            {loading ? (
                <h2>Loading orders...</h2>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <>
                    <Col md={12}>
                        <h1>My orders</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Is paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{order.status}</td>
                                        <td>{moment(order.orderDate).format('YYYY-MM-DD')}</td>
                                        <td>
                                            {order.isPaid ? (
                                                <i className="bi bi-check-lg text-success"></i>
                                            ) : (
                                                <i className="bi bi-x-lg text-danger"></i>
                                            )}
                                        </td>
                                    </tr>
                                )
                                )}

                            </tbody>
                        </Table>
                    </Col>
                </>
            )}
        </Row >
    )
}

export default CustomerOrders
