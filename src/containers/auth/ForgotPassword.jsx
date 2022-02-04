import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
// import { useAuth } from "../../Contexts/AuthContext";
import { useInput } from "../../utils/hooks";
import {
  Button,
  TextField,
  Alert,
  AlertTitle,
  Grid,
  Link,
  Container,
} from "@mui/material";

import AuthHeader from "../../components/Auth/AuthHeader";

const ForgotPassword = () => {
  const email = useInput("");
  // const auth = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password - Hacktive</title>
        <meta
          name="description"
          content="Forgot Password page for Hacktive Web Development."
        />
        <link rel="canonical" href="https://steace.live/auth/forgot-password" />
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
