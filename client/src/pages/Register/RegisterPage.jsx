import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';
import { Button, Form, Alert, Container } from 'react-bootstrap';

function RegisterPage() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await registerUser(firstname, lastname, username, email, password);
      if (res.success) {
        setSuccess('Registration successful! You can now log in.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(res.message || 'Registration failed: Unknown error');
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(`Registration failed. Error: ${err}`);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form>
        <Form.Group controlId="firstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter first name" 
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter last name" 
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="mt-3" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
