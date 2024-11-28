import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Import axios

function LoginModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State for name (signup only)
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Login and SignUp
  const [errorMessage, setErrorMessage] = useState(''); // For showing error messages
  const [user, setUser] = useState(null); // State for logged-in user

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
      ? 'http://localhost:4000/signup' // Signup API
      : 'http://localhost:4000/login'; // Login API

    const requestBody = isSignUp
      ? { name, email, password } // Include name for signup
      : { email, password }; // Only email and password for login

    try {
      // Axios POST request
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const userData = response.data.data[0]; // Assuming `data[0]` contains user info
        alert(isSignUp ? `Sign-up successful!, ${userData.name}, Let's Log you In` : `Login successful! Welcome, ${userData.name}`);
        console.log('Response:', response.data);
        setUser(userData); // Save user info after login
        handleClose(); // Close modal on success
      }
    } catch (error) {
      // Error handling
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
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
      {/* Conditionally render the login button or dropdown */}
      {user ? (
        <div className="dropdown">
          <button
            type="button"
            id="dropdown-user"
            aria-expanded="false"
            className="dropdown-toggle btn btn-outline-light"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 496 512"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
            </svg>
            {user.name} {/* Display user's name here */}
          </button>
        </div>
      ) : (
        <Button variant="outline-light" onClick={handleShow}>
          {isSignUp ? 'Sign Up' : 'Login'} {/* Button text based on form state */}
        </Button>
      )}

      {/* Modal for login/signup */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isSignUp ? 'Create an Account' : 'Login to Continue'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <Form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <br />
              </>
            )}
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
