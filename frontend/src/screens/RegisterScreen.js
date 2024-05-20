import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const RegisterScreen = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const confirm = document.querySelector("input[name=confirmPassword]")
        if (confirm.value === password.value) {
            confirm.setCustomValidity("")
        } else {
            confirm.setCustomValidity("Passwords do not match")
        }
    }

    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6}>
                    <h1>Register</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your first name"
                                name="name"

                            />
                            <Form.Control.Feedback type="invalid">
                                First name is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last  name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your first name"
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">
                                Last name is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your phone number"
                                name="phoneNumber"
                            />
                            <Form.Control.Feedback type="invalid">
                                Phone number is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                required
                                type="email"
                                placeholder="Enter your email address"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                required
                                type="password"
                                placeholder="Enter your password"
                                onChange={onChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                PLease enter a valid password
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control
                                name="confirmPassword"
                                required
                                type="password"
                                placeholder="Enter your password again"
                                onChange={onChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Both password should match
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row className="pb-2">
                            <Col>
                                Already have an account?
                                <Link to={"/login"}> Login </Link>
                            </Col>
                        </Row>

                        <Button type="submit">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Submit
                        </Button>
                        <Alert variant="danger">
                            User with that email already exists!
                        </Alert>
                        <Alert variant="info">
                            Profile successfully created!
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterScreen
