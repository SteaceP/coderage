import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useInput } from "../../utils/hooks";
import {
  Button,
  TextField,
  Alert,
  AlertTitle,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Container,
} from "@mui/material";

import AuthHeader from "../../components/Auth/AuthHeader";

const Login = () => {
  const email = useInput("");
  const password = useInput("");
  const { localLogin, authError, setAuthError } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await localLogin(email.value, password.value);
    setLoading(false);
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login - Hacktive</title>
        <meta
          name="description"
          content="Log In page for Code Rage."
        />
        <link rel="canonical" href="https://coderage.pro/login" />
      </Helmet>

        <AuthHeader title="Log In" />

      {authError && (
        <Alert
          sx={{ width: "100%" }}
          severity="error"
          onClose={() => {
            setAuthError("")
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {authError}
        </Alert>
      )}

      <form>
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            mt: 3,
          }}
        >
          Log In
        </Button>

        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleGoogleSubmit}
          sx={{
            mt: 3,
          }}
        >
          Log In With Google
        </Button>

        <Grid
          container
          sx={{
            mt: 2,
          }}
        >
          <Grid item xs>
            <Link
              component={RouterLink}
              to="/auth/forgot-password"
              variant="body2"
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/auth/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
