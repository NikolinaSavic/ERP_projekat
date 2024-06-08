import { useState } from "react";
import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Alert
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { createProduct } from "../../redux/actions/productActions";
import { deleteCategory, getCategories } from "../../redux/actions/categoryActions";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/productConstants";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "../../utils/utils"


const AdminCreateProduct = () => {
    const [validated, setValidated] = useState(false);
    const { error } = useSelector(state => state.productCreate);
    const { categories } = useSelector((state) => state.categories);
    const { error: errorCreate, success } = useSelector((state) => state.categoryCreate);
    const { success: successDelete } = useSelector((state) => state.categoryDelete);

    const [images, setImages] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        dispatch(getCategories())
    }, [dispatch, success, successDelete])


    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));


    const submitHandler = (e) => {
        e.preventDefault()
        const form = e.currentTarget.elements;
        const productName = form.name.value;
        const description = form.description.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const size = form.size.value;
        const categoryName = form.category.value;
        const id = ObjectId();
        if (e.currentTarget.checkValidity() === true) {
            dispatch(createProduct(id, productName, description, size, price, categoryName, quantity))
            if (!error) {
                console.log(id)
                setTimeout(function () {
                    dispatch(uploadImages(images, id))
                }, 500)
                setTimeout(function () {
                    navigate("/admin/products");
                }, 300)

            }
            setValidated(true);
        }
    };

    const deleteCategoryHandler = (e) => {
        let element = document.getElementById("cats");
        dispatch(deleteCategory(element.value));
        element.value = ""
    };

    const uploadHandler = (images) => {
        setImages(images);
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
                    <h1>Create a new product</h1>
                    <Form noValidate validated={validated} onSubmit={submitHandler}>
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
                        <Form.Group className="mb-3" controlId="formBasicSize">
                            <Form.Label>Size</Form.Label>
                            <Form.Control name="size" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" required type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>
                                Category
                                <CloseButton onClick={deleteCategoryHandler} />(
                                <small>Delete selected category</small>)
                            </Form.Label>
                            <Form.Select
                                id="cats"
                                name="category"
                                aria-label="Default select example"
                            >
                                <option value="">Choose category</option>
                                {categories.map((category, idx) => (
                                    <option key={idx} value={category.categoryName}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicQuantity">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control name="quantity" required type="number" />
                        </Form.Group>

                        <Alert show={errorCreate != null} variant="danger">
                            {errorCreate}
                        </Alert>

                        <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                            <Form.Label>Images</Form.Label>
                            <Form.Control
                                onChange={(e) => uploadHandler(e.target.files)}
                                type="file"
                                multiple
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminCreateProduct
