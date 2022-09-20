import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookie from "utils/cookie";
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
import { isEmailValid } from "../../utils/validators";
import { useAuthDispatch, useAuthState } from "contexts/AuthContext";

import AuthHeader from "components/Auth/AuthHeader";

const Login = () => {
  const userEmail = useInput("");
  const userPassword = useInput("");
  const [loginError, setLoginError] = useState("");
  const dispatch = useAuthDispatch();
  const [login] = useMutation(AUTH_LOGIN_MUTATION);
  const navigate = useNavigate();
  const { isLoading } = useAuthState();

  const handleEmailLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!isEmailValid(userEmail.value))
      setLoginError("Please enter a valid email address");

    await login({
      variables: {
        email: userEmail.value,
        password: userPassword.value,
      },
      onCompleted: ({ login }) => {
        if (process.env.NODE_ENV !== "development") {
          Cookie.set("token", login.jwt, {
            secure: true,
            signed: true,
            domain: "coderage.pro",
            sameSite: "Lax",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          });
        } else {
          Cookie.set("token", login.jwt, {
            secure: true,
            signed: true,
            domain: "localhost",
            sameSite: "Lax",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
          });
        }
        dispatch({
          type: "login",
          payload: {
            username: login.user.username,
            email: login.user.email,
            id: login.user.id,
            token: login.jwt,
          },
        });
        dispatch({ type: "setLoading", payload: false });
        navigate("/");
      },
      onError: (error) => {
        setLoginError(error.message);
      },
    });
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
          disabled={isLoading}
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
