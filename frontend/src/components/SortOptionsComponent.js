import { Form } from "react-bootstrap";

const SortOptionsComponent = ({ setSortOption }) => {
    return (
        <Form.Select onChange={(e) => setSortOption(e.target.value)} aria-label="Default select example">
            <option>Sort by</option>
            <option value="price 1">Price: Low to high</option>
            <option value="price -1">Price: High to low</option>
            <option value="rating -1">Rating</option>
            <option value="productName 1">Name A-Z</option>
            <option value="productName -1">Name Z-A</option>
        </Form.Select>
    );
};

export default SortOptionsComponent;