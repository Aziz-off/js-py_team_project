import React, { useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
  Link
} from "@mui/material";
import { useAuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { authWithGoogle, register } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await register(email, password);
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          width: '450px', 
        }}
      >
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }} 
          >
            Sign Up
          </Button>
        </form>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mb: 2, color: 'primary.main', borderColor: 'primary.main' }} 
          onClick={() => authWithGoogle()}
        >
          Continue with Google
        </Button>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          {"Уже есть аккаунт? "}
          <Link component="button" variant="body2" onClick={() => navigate('/login')} sx={{ textDecoration: 'none', color: 'primary.main' }}>
            Войти
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Auth;
