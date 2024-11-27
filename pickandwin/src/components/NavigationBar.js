import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import LoginModal from './Login';

function NavScrollExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    // Toggle the visibility of the search input
    if (searchVisible && searchTerm.trim() === '') {
      setSearchVisible(false); // Hide the search bar if it's empty
    } else {
      setSearchVisible(!searchVisible);
    }
  };

  return (
    <Navbar expand="lg" className="bg-black" style={{ zIndex: 100 }}>
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: '#FF0000', fontWeight: "bolder" }}>
          PICK & WIN
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="Complete" style={{ color: '#fff' }}>Completed Events</Nav.Link>
            <Nav.Link href="Upcoming" style={{ color: '#fff' }}>Upcoming Events</Nav.Link>
            <Nav.Link href="Purchase" style={{ color: '#fff' }}>My Purchase</Nav.Link>
          </Nav>
          <Form className="d-flex">
            {searchVisible && (
              <Form.Control
                type="search"
                placeholder="Enter Event Name"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
            )}
            <Button variant="outline-light" style={{ marginRight: "10px" }}>
              <FaSearch />
            </Button>
            <LoginModal/>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
