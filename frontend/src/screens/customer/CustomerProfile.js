import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import React, { useState } from 'react'


const CustomerProfile = () => {
    const [validated, setValidated] = useState(false);

    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const confirm = document.querySelector("input[name=confirmPassword]")
        if (confirm.value === password.value) {
            confirm.setCustomValidity("")
        } else {
            confirm.setCustomValidity("Passwords do not match")
        }
    }

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
            <Row className="mt-5 justify-content-md-center">
                <Col md={6}>
                    <h1>User profile</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue="Customer name"
                                name="firstName"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a name
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Your last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue="Customer last name"
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your last name
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                defaultValue=""
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your street name and house number"
                                defaultValue=""
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                required
                                type="password"
                                placeholder="Enter password"
                                onChange={onchange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        <Alert show={true} variant="warning">
                            User already exists
                        </Alert>
                        <Alert show={true} variant="info">
                            User updated
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CustomerProfile
