// pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // 👈 useNavigate hook

  const handleLogin = () => {
    if (credentials.username === 'Admin' && credentials.password === '123456') {
      setError(false);
      if (onLogin) onLogin();        // update auth state
      navigate('/welcome');          
    } else {
      setError(true);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">Invalid credentials</Alert>}
      <Box mt={2}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
