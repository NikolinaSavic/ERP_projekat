import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

const AdminOrders = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <h1>Orders</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Delivered</th>
                            <th>Payment method</th>
                            <th>Order details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>Nina</td>
                                <td>11.2.2023.</td>
                                <td>120rsd</td>
                                <td>
                                    <i className={item}></i>
                                </td>
                                <td>
                                    PayPal
                                </td>
                                <td>
                                    <Link to="/admin/order-details">Go to order</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Col>
        </Row >
    )
}

export default AdminOrders
