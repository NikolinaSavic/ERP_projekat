import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import SortOptionsComponent from "../components/SortOptionsComponent";
import { listProducts, listProductsBySearchQuery } from '../redux/actions/productActions';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from "react-simple-star-rating";
import Pagination from 'react-js-pagination';

const ProductListScreen = () => {

    const { searchQuery } = useParams();
    const [pageNum, setCurrentPage] = useState(1);
    const [price, setPrice] = useState(5000);
    const [sortOption, setSortOption] = useState("");
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, totalProducts } = productList;

    useEffect(() => {
        if (searchQuery) {
            dispatch(listProductsBySearchQuery(searchQuery));
        } else {
            dispatch(listProducts(price, pageNum, sortOption));
        }
    }, [dispatch, price, pageNum, sortOption, searchQuery]);

    useEffect(() => {
        // Resetujemo pageNum na 1 i ostale parametre na početne vrednosti kada se promeni searchQuery
        setCurrentPage(1);
        setPrice(5000);
        setSortOption(""); // Resetujemo sort opciju
    }, [searchQuery]);

    const setCurrentPageNum = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <SortOptionsComponent setSortOption={setSortOption} />
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={9}>
                        {loading ? (
                            <h2>Loading product details...</h2>
                        ) : error ? (
                            <h2>Products not found!</h2>
                        ) : (
                            <>
                                {products && products.length > 0 ? (
                                    products.map((product, idx) => (
                                        <Card key={idx} style={{ marginTop: "30px", marginBottom: "50px" }}>
                                            <Row>
                                                <Col lg={5}>
                                                    <Card.Img variant="top" src={'/images/' + product.productName.replace(/\s+/g, '').toLowerCase() + '.jpg'}
                                                        style={{ width: '250px', height: '220px' }} />
                                                </Col>
                                                <Col lg={7}>
                                                    <Card.Body>
                                                        <Card.Title>{product.productName}</Card.Title>
                                                        <Card.Text>
                                                            {product.description}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            <Rating readonly size={20} initialValue={product.rating} /> ({product.reviewsNumber})
                                                        </Card.Text>
                                                        <Card.Text className="h3">
                                                            {product.price} ${" "}
                                                            <LinkContainer to={`/product-details/${product._id}`}>
                                                                <Button variant="warning">Details</Button>
                                                            </LinkContainer>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                        </Card>
                                    ))
                                ) : (
                                    <h2>No products found!</h2>
                                )}
                                <Pagination
                                    activePage={pageNum}
                                    itemsCountPerPage={2}
                                    totalItemsCount={totalProducts}
                                    onChange={setCurrentPageNum}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProductListScreen;
