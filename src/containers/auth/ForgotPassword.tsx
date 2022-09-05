import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  TextField,
  Alert,
  AlertTitle,
  Grid,
  Link,
  Container,
} from "@mui/material";

import { useAuthState } from "contexts/AuthContext";
import { useInput } from "utils/hooks";

import AuthHeader from "components/Auth/AuthHeader";

const ForgotPassword = () => {
  const email = useInput("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { loading } = useAuthState();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // TODO: A token is needed to be able to reset the password. An email need to be sent. Implement Sendgrid
  };

  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password - Code Rage</title>
        <meta
          name="description"
          content="Forgot Password page for Code Rage."
        />
        <link
          rel="canonical"
          href="https://coderage.pro/auth/forgot-password"
        />
      </Helmet>

      <AuthHeader title="Password Reset" />

      {error && (
        <Alert
          sx={{ width: "100%" }}
          severity="error"
          onClose={() => {
            setError("");
          }}
        >
          {error}
        </Alert>
      )}
      {message && (
        <Alert
          sx={{ width: "100%" }}
          severity="success"
          onClose={() => {
            setMessage("");
          }}
        >
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      )}
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          {...email}
        />
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Reset Password
        </Button>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs>
            <Link component={RouterLink} to="/auth/login" variant="body2">
              Back to login page?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/auth/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ForgotPassword;
