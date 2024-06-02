import CategoryCardComponent from "../components/CategoryCardComponent";
import { Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from "../redux/actions/categoryActions";
import { useEffect, useState } from "react";

const HomeScreen = () => {

  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])

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
