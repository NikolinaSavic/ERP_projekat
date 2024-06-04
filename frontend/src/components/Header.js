import { Navbar, Nav, Container, NavDropdown, Badge, Form, Button, InputGroup } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/actions/customerActions';

const Header = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    console.log("Search Query on Submit:", searchQuery);
    if (searchQuery.trim()) {
      window.location.assign(`/product-list/search/${searchQuery}`);
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              <img src={logo} alt='SportsShop' />
              Sports store
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <InputGroup>
                <Form.Control style={{ width: 300, padding: 5 }}
                  onKeyUp={submitHandler}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Search for product..." />
                <Button onClick={submitHandler} variant="warning">
                  <i className="bi bi-search text-dark"></i>
                </Button>
              </InputGroup>
            </Nav>
            <Nav>
              <LinkContainer to="/admin/orders">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Customer" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/customer/my-orders">My orders</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/customer">My profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => logoutHandler()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <Badge pill bg="warning">
                    2
                  </Badge> <i className="bi bi-cart-dash"></i>Cart
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
