import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginScreen = () => {
    return (
        <Container>
            <Row className="mt-5 justify-content-md-center">
                <Col md={6}>
                    <h1>Login</h1>
                    <Form noValidate>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                name="email"
                                required
                                type="email"
                                placeholder="Enter email"

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
                        <Row className="pb-2">
                            <Col>
                                Don't you have an account?
                                <Link to={"/register"}> Register </Link>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Alert>
                            Wrong credentials
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen
