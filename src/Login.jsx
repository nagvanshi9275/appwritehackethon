import React, { useState, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Paper
} from "@mui/material";
import { account, ID } from './appwriteConfig'; // Import Appwrite account service with ID
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import AuthContext

export default function Login() {
  const { login } = useContext(AuthContext); // Access the login function from AuthContext
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log("Logged in:", response);

      // Update global auth state
      login(response); 

      // Navigate to the home route on successful login
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await account.create(ID.unique(), email, password, fullName);
      console.log("Signed up:", response);

      // Automatically log the user in after signup
      const session = await account.createEmailPasswordSession(email, password);
      console.log("Automatically logged in after sign up");

      // Update global auth state
      login(session); 

      // Navigate to the home route on successful signup
      navigate('/');
    } catch (error) {
      console.error("Sign up error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 12 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: "10px" }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" gutterBottom>
            {isLogin ? "Login" : "Sign Up"}
          </Typography>

          {/* Form Fields */}
          <Box component="form" sx={{ mt: 3 }} onSubmit={isLogin ? handleLogin : handleSignUp}>
            {!isLogin && (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus={isLogin}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isLogin && (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                padding: "12px",
                backgroundColor: "#ff4081",
                "&:hover": {
                  backgroundColor: "#ff6581",
                },
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={toggleForm}>
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
