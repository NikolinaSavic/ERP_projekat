import CategoryCardComponent from "../components/CategoryCardComponent";
import { Row, Container, Card, Button } from "react-bootstrap";

const HomeScreen = () => {

  const categories = [
    "Train at home",
    "Outlet",
    "Special equipment"
  ]

  return (
    <>
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {categories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>

      </Container>
    </>
  )
}

export default HomeScreen
