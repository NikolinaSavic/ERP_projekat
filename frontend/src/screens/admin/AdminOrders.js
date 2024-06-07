import { Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getOrdersListForAdmin, deleteOrder } from "../../redux/actions/orderActions";
import moment from "moment"

const AdminOrders = () => {

    const ordersList = useSelector((state) => state.ordersList)
    const { loading, error, orders } = ordersList
    const orderDelete = useSelector((state) => state.orderDelete)
    const { success: successDelete } = orderDelete

    const dispatch = useDispatch();

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteOrder(id))
        }
    };

    useEffect(() => {
        dispatch(getOrdersListForAdmin())
    }, [dispatch, successDelete])


    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                {loading ? (
                    <h2>Loading orders...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : (
                    <>
                        <h1>Orders</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Delivered</th>
                                    <th>Payment method</th>
                                    <th>Order details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{order.customerId.firstName + " " + order.customerId.lastName}</td>
                                        <td>{moment(order.orderDate).utc().format('DD-MM-YYYY')}</td>
                                        <td>{order.totalPrice} $</td>
                                        <td>
                                            {order.status === "Delivered" ? (
                                                <i className="bi bi-check-lg text-success"></i>
                                            ) : (
                                                <i className="bi bi-x-lg text-danger"></i>
                                            )}
                                        </td>
                                        <td>{order.paymentMethod}</td>
                                        <td>
                                            <Link to={`/admin/order-details/${order._id}`}>Details</Link>
                                        </td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                className="btn-sm"
                                                onClick={() => deleteHandler(order._id)}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </Button>
                                        </td>

                                    </tr>
                                )
                                )}
                            </tbody>
                        </Table>
                    </>
                )}
            </Col>
        </Row >
    )
}

export default AdminOrders
