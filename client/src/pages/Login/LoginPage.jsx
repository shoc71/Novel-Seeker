import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { Button, Form, Alert, Container } from 'react-bootstrap';

function LoginPage() {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginUser(emailOrUsername, password);
      if (res.success && res.token) {
        localStorage.setItem('token', res.token);
        navigate('/logged');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError(`Login failed. Please check your credentials. ${err}`);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group controlId="emailOrUsername">
          <Form.Label>Email or Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter email or username" 
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
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
        <Button variant="primary" className="mt-3" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
