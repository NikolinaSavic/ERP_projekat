import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import React, { useState, useEffect } from 'react'
import { updateUserProfile, getUserDetails } from '../../redux/actions/customerActions'
import { useDispatch, useSelector } from 'react-redux'


const CustomerProfile = () => {

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const [passwordsMatchState, setPasswordsMatchState] = useState(true);

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile
    const [userUpdated, setUserUpdated] = useState(false);
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (!user || !user.firstName)
            dispatch(getUserDetails())
        setUserUpdated(false)


    }, [dispatch, userInfo, user, userUpdated])

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

        const form = event.currentTarget.elements;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const password = form.password.value;
        const phone = form.phoneNumber.value;
        const address = form.street.address;
        if (
            event.currentTarget.checkValidity() === true &&
            password &&
            firstName &&
            lastName &&
            form.password.value === form.confirmPassword.value
        ) {
            dispatch(updateUserProfile(user._id, firstName, lastName, password, phone, address))
            setUserUpdated(true)
        }


        setValidated(true);
    };

    return (
        <Container>
            {loading ? (
                <h2>Loading profile...</h2>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <>
                    <Row className="mt-5 justify-content-md-center">
                        <Col md={6}>
                            <h1>User profile</h1>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>Your name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        defaultValue={user.firstName}
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
                                        defaultValue={user.lastName}
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
                                        defaultValue={user.phone}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your street name and house number"
                                        defaultValue={user.address}
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
                                        isInvalid={!passwordsMatchState}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control
                                        name="confirmPassword"
                                        required
                                        type="password"
                                        placeholder="Confirm password"
                                        onChange={onChange}
                                        isInvalid={!passwordsMatchState}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Passwords do not match!
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Button variant="primary" type="submit">Update</Button>
                                <Alert show={error != null} variant="danger">
                                    {error}
                                </Alert>
                                <Alert show={success === true} variant="info">
                                    User updated!
                                </Alert>
                            </Form>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}

export default CustomerProfile
