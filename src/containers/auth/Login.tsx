import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
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

import AUTH_LOGIN_MUTATION from "graphql/mutation/mutation.auth.login";
import { useInput } from "utils/hooks";
import { useAuthDispatch, useAuthState } from "contexts/AuthContext";

import AuthHeader from "components/Auth/AuthHeader";

const Login = () => {
  const userEmail = useInput("");
  const userPassword = useInput("");
  const [loginError, setLoginError] = useState("");
  const dispatch = useAuthDispatch();
  const [login] = useMutation(AUTH_LOGIN_MUTATION);
  const navigate = useNavigate();
  const { loading } = useAuthState();

  const handleEmailLogin = async () => {

    await login({
      variables: {
        email: userEmail.value,
        password: userPassword.value,
      },
      onCompleted: ({ login }) => {
        if (process.env.NODE_ENV !== "development") {
          Cookie.set("token", login.jwt, {
            secure: true,
            domain: "coderage.pro",
            sameSite: "strict",
            expires: 7,
          });
        } else {
          Cookie.set("token", login.jwt, {
            secure: true,
            expires: 3,
          });
        }
        dispatch({
          type: "LOGIN",
          payload: {
            username: login.user.username,
            email: login.user.email,
            id: login.user.id,
            confirmed: login.user.confirmed,
          },
        });
        dispatch({ type: "STOP_LOADING" });
        navigate("/");
      },
      onError: (error) => {
        setLoginError(error.message);
      },
    });
  };

  const handleGoogleLogin = async () => {
    //TODO: Google login
  };

  return (
    <Container maxWidth="sm">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login - Code Rage</title>
        <meta name="description" content="Login page for Code Rage." />
        <link rel="canonical" href="https://coderage.pro/login" />
      </Helmet>

      <AuthHeader title="Log In" />

      {loginError && (
        <Alert
          sx={{ width: "100%" }}
          severity="error"
          onClose={() => {
            setLoginError("");
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {loginError}
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
          {...userEmail}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="userPassword"
          autoComplete="current-password"
          {...userPassword}
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
          onClick={handleEmailLogin}
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
          onClick={handleGoogleLogin}
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
