import {Row, Col} from 'react-bootstrap';
import axios from 'axios';

const HomeScreen = () => {
    axios.get("/api/products").then((res) => console.log(res))
  return (
    <>
      <h1>Products</h1>
      <Row>
        
      </Row>
    </>
  )
}

export default HomeScreen
