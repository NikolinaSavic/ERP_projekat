import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";


const deleteHandler = () => {
    if (window.confirm("Are you sure?")) alert("Product deleted")
}

const AdminCustomers = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                <h1>Customers</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Is admin</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>Nina</td>
                                <td>Savic</td>
                                <td>nina@gmail.com</td>
                                <td>
                                    <i className={item}></i>
                                </td>
                                <td>
                                    <LinkContainer to="/admin/edit-customer">
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button className="btn-sm" onClick={deleteHandler}>
                                        <i className="bi bi-x-circle"></i>
                                    </Button>
                                </td>
                                <td>
                                    <Link to="/admin/edit-customer">Customer details</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Col>
        </Row >
    )
}

export default AdminCustomers
