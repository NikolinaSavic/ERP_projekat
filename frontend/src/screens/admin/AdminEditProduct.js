import { useState } from "react";
import {
    Row,
    Col,
    Container,
    Form,
    Button
} from "react-bootstrap";
import { Link } from "react-router-dom";


const AdminEditProduct = () => {
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
                    <Link to="/admin/products" className="btn btn-info ">
                        Go back
                    </Link>
                </Col>
                <Col md={8}>
                    <h1>Edit product</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control name="name" required type="text" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                required
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control name="count" required type="number" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Size</Form.Label>
                            <Form.Control name="price" required type="text" />
                        </Form.Group>
                        <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                            <Form.Label>Images</Form.Label>

                            <Form.Control
                                required
                                type="file"
                                multiple
                            />
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

export default AdminEditProduct
