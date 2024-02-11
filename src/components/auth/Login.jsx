import React, { useState } from "react";
import {
  Alert,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

const Login = () => {
  const { logIn } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)', 
      }}
    >
      <Paper
        elevation={10}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          width: '450px',
        }}
      >
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
          Sign In
        </Typography>
        <form onSubmit={handleLoginSubmit} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            label="Email Address"
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            Sign In
          </Button>
        </form>
        <Typography sx={{ color: "black", mt: 2 }}>
          Don't have an account?
          <Link onClick={() => navigate("/auth")} sx={{ ml: 1, cursor: 'pointer', color: '#4169E1' }}>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
