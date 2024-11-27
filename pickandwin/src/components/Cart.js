import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Row, Col } from 'react-bootstrap';

function Cart() {
  // State to hold cart items from localStorage
  const [cartItems, setCartItems] = useState([]);

  // Fetch items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {/* Check if there are any items in the cart */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Row>
          {cartItems.map((item) => (
            <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={item.image_url} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>
                  <Card.Text>
                    <strong>Price: ${item.price}</strong>
                  </Card.Text>
                  <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                    Remove from Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Cart;
