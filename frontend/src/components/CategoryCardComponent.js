import { Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CategoryCardComponent = ({ category, idx }) => {
    return (
        <Card>
            <Card.Img variant="top" src={'/images/' + category.categoryName.replace(/\s+/g, '').toLowerCase() + '.jpg'} />
            <Card.Body>
                <Card.Title>{category.categoryName}</Card.Title>
                <Card.Text>
                    {category.description}
                </Card.Text>
                <LinkContainer to={`/product-list/${category.categoryName}`}>
                    <Button variant="primary">Go to the category</Button>
                </LinkContainer>
            </Card.Body>
        </Card>
    )
}

export default CategoryCardComponent