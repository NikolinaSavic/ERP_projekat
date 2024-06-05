import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
import { getUsers } from "../../redux/actions/customerActions";
import { useDispatch, useSelector } from 'react-redux'


const AdminCustomers = () => {

    const usersList = useSelector((state) => state.users)
    const { loading, error, users } = usersList
    const dispatch = useDispatch();

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            //ide ono dispatch
        }
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                {loading ? (
                    <h2>Loading customers...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : (
                    <>
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
                                {users.map((customer, idx) => (
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
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </Col>
        </Row >
    )
}

export default AdminCustomers
