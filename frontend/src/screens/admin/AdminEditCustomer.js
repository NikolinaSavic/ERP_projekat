import {
    Row,
    Col,
    Container,
    Form,
    Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";


const AdminEditCustomer = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        if (form.chechValidity === false) {
            event.preventDefault();
            event.setPropagation();
        }

        setValidated(true);
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={2}>
                    <Link to="/admin/users/" className="btn btn-info my-3">
                        Go back
                    </Link>
                </Col>
                <Col md={8}>
                    <h1>Edit customer</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control disabled name="name" required type="text" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicLastName"
                        >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                disabled
                                name="lastName"
                                required
                                type="text"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check name="isAdmin" type="checkbox" label="Admin" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminEditCustomer
