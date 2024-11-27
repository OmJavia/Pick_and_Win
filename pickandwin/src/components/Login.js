import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function LoginModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State for name (signup only)
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Login and SignUp
  const [errorMessage, setErrorMessage] = useState(''); // For showing error messages

  const handleClose = () => {
    setShow(false);
    setErrorMessage('');
    setName('');
    setEmail('');
    setPassword('');
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isSignUp
      ? 'http://localhost:3000/signup' // Signup API
      : 'http://localhost:3000/login'; // Login API

    const requestBody = isSignUp
      ? { name, email, password } // Include name for signup
      : { email, password }; // Only email and password for login

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        alert(isSignUp ? 'Sign-up successful!' : 'Login successful!');
        console.log('Response:', data);
        handleClose(); // Close modal on success
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle between Login and Sign Up
    setName('');
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <>
      <Button variant="outline-light" onClick={handleShow}>
        {isSignUp ? 'Login' : 'Login'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isSignUp ? 'Create an Account' : 'Login to Continue'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <Form onSubmit={handleSubmit}>
            {isSignUp && (
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required/>
              </Form.Group>
            )}
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
            </Form.Group>

            <Button variant="outline-success" type="submit" className="mt-3">
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" className="mt-3" onClick={toggleForm}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
