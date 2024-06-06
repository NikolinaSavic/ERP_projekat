import { useState, useEffect } from "react";
import {
    Row,
    Col,
    Container,
    Form,
    Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from "../../redux/actions/productActions";
import { getCategories, deleteCategory } from "../../redux/actions/categoryActions";


const AdminEditProduct = () => {
    const [validated, setValidated] = useState(false);
    const { id } = useParams();
    const { loading, error, product } = useSelector(state => state.product);
    const { categories } = useSelector((state) => state.categories);
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch();
    const productUpdate = useSelector((state) => state.productUpdate)
    const { success } = productUpdate

    useEffect(() => {
        dispatch(getCategories())
        setDeleted(false)
    }, [dispatch, id, deleted, success])


    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget.elements;
        const productName = form.name.value;
        const description = form.description.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const size = form.size.value;
        const categoryName = form.category.value;
        if (e.currentTarget.checkValidity() === true) {
            dispatch(updateProduct(id, productName, description, size, price, categoryName, quantity))
        }

        setValidated(true);
    };

    const deleteCategoryHandler = (e) => {
        let element = document.getElementById("cats");
        dispatch(deleteCategory(element.value));
        element.value = ""
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
                            <Form.Control name="name" required type="text" defaultValue={product.productName} />
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
                                defaultValue={product.description}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSize">
                            <Form.Label>Size</Form.Label>
                            <Form.Control name="size" required type="text" defaultValue={product.size} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" required type="text" defaultValue={product.price} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>
                                Category
                            </Form.Label>
                            <Form.Select
                                name="category"
                                aria-label="Default select example"
                            >
                                <option value="">Choose category</option>
                                {categories.map((category, idx) => {
                                    return product.categoryId === category._id ? (
                                        <option selected key={idx} value={category.categoryName}>
                                            {category.categoryName}
                                        </option>
                                    ) : (
                                        <option key={idx} value={category.categoryName}>
                                            {category.categoryName}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicQuantity">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control name="quantity" required type="number" defaultValue={product.quantity} />
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

