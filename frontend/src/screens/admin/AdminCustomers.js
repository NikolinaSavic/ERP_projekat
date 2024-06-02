import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchCustomers = async () => {
    const customers = await axios.get("/api/customers");
}


const AdminCustomers = () => {

    const [customers, setCustomers] = useState([]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            //ide ono dispatch
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

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
                        {customers.map((customer, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>
                                    {customer.isAdmin ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/edit-customer/${customer._id}`}>
                                        <Button className="btn-sm">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    {" / "}
                                    <Button className="btn-sm" onClick={() => deleteHandler(customer._id)}>
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
