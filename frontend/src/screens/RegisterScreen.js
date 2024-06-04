import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/customerActions';

const RegisterScreen = () => {
    const [validated, setValidated] = useState(false);

    const userRegister = useSelector((state) => state.userRegister)
    const { success, loading, error, userInfo } = userRegister
    const dispatch = useDispatch()

    const [passwordsMatchState, setPasswordsMatchState] = useState(true);

    useEffect(() => {
        if (userInfo) {
            window.location.assign('/')
        }
    }, [userInfo])


    const onChange = () => {
        const password = document.querySelector("input[name=password]")
        const confirm = document.querySelector("input[name=confirmPassword]")
        if (confirm.value === password.value) {
            setPasswordsMatchState(true);
        } else {
            setPasswordsMatchState(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const email = form.email.value;
        const firstName = form.name.value;
        const lastName = form.lastName.value;
        const password = form.password.value;
        const phone = form.phoneNumber.value;
        const address = form.address.value;
        if (
            event.currentTarget.checkValidity() === true &&
            email &&
            password &&
            firstName &&
            lastName &&
            form.password.value === form.confirmPassword.value
        ) {
            dispatch(register(firstName, lastName, email, password, phone, address))
        }
        setValidated(true);
    };


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
                                isInvalid={!passwordsMatchState}
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
                                isInvalid={!passwordsMatchState}
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
                            {loading === true ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                ""
                            )}
                            Submit
                        </Button>
                        <Alert variant="danger" show={error != null}>
                            {error}
                        </Alert>
                        <Alert show={success === true} variant="info">
                            Profile successfully created!
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterScreen
