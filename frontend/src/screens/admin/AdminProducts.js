import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProductsListForAdmin, deleteProduct } from "../../redux/actions/productActions";
import { PRODUCT_DETAILS_RESET } from "../../redux/constants/productConstants";



const AdminProducts = () => {


    const productsList = useSelector((state) => state.productListForAdmin)
    const { loading, error, products } = productsList
    const productDelete = useSelector((state) => state.productDelete)
    const { success: successDelete } = productDelete

    const dispatch = useDispatch();

    const deleteHandler = async (productName) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteProduct(productName))
        }
    };

    useEffect(() => {
        dispatch(getProductsListForAdmin())
        dispatch({ type: PRODUCT_DETAILS_RESET })
    }, [dispatch, successDelete])


    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinksComponent />
            </Col>
            <Col md={10}>
                {loading ? (
                    <h2>Loading products...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : (
                    <>
                        <h1>
                            Product list {" "}
                            <LinkContainer to="/admin/create-product">
                                <Button variant="primary" size="lg">
                                    Create new
                                </Button>
                            </LinkContainer>

                        </h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product name</th>
                                    <th>Price</th>
                                    <th>Size</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.price}</td>
                                        <td>{product.size}</td>
                                        <td>
                                            <LinkContainer to={`/admin/edit-product/${product._id}`}>
                                                <Button className="btn-sm">
                                                    <i className="bi bi-pencil-square"></i>
                                                </Button>
                                            </LinkContainer>
                                            {" | "}
                                            <Button className="btn-sm" onClick={() => deleteHandler(product.productName)}>
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

export default AdminProducts
