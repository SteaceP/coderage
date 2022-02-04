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

const SignUp = () => {
  const displayName = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  const { localSignup, authError, setAuthError } = useAuth();
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLocalSignup = async (e) => {
    e.preventDefault();

    if (password.value !== confirmPassword.value) {
      return setAuthError("Passwords don't match");
    }

    //TODO: If user try to signup and already have an account, sign in instead

    try {
      setAuthError("");
      setLoading(true);
      localSignup(displayName.value, email.value, password.value);
    } catch (error) {
      setAuthError(error);
    }
    setLoading(false);
  };

  const handleGoogleSignupPopup = async (e) => {
    e.preventDefault();

    //TODO: If user try to signup and already have an account, ask to sign in or ask to link account if an email already exist
    //TODO NEW: Make one page for sign in and sign up, use a ternary to chose between login opr signup in authContext
  };

  //TODO: Error handling as helperText for what is "ok" to do, else, keep the Alert

  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signup - Hacktive</title>
        <meta
          name="description"
          content="Sign Up page for Hacktive Web Development."
        />
        <link rel="canonical" href="https://coderage.pro/signup" />
      </Helmet>

        <AuthHeader title="Sign Up" />

      {authError && (
        <Alert
          sx={{ width: "100%" }}
          severity="error"
          onClose={() => {
            setAuthError("");
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {authError}
        </Alert>
      )}
      <form>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 0.7,
          }}
        >
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="displayName"
              label="Your Name"
              {...displayName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              {...password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              {...confirmPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLocalSignup}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleGoogleSignupPopup}
          >
            Sign Up With Google
          </Button>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/auth/login" variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
