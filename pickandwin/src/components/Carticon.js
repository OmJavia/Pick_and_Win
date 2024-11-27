import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cart from './Cart';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cart
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Order</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
       <Cart/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;