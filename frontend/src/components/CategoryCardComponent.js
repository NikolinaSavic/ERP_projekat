import { Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CategoryCardComponent = ({ category, idx }) => {
    const images = [
        "/images/train-at-home.jpg",
        "/images/outlet.jpeg",
        "/images/professional-equipment.jpg"
    ]
    return (
        <Card>
            <Card.Img variant="top" src={images[idx]} />
            <Card.Body>
                <Card.Title>{category}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <LinkContainer to="/product-list">
                    <Button variant="primary">Go to the category</Button>
                </LinkContainer>
            </Card.Body>
        </Card>
    )
}

export default CategoryCardComponent