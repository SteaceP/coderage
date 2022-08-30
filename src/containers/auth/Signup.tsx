import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Cookie from "js-cookie";
import {
  Button,
  TextField,
  Alert,
  AlertTitle,
  Grid,
  Link,
  Container,
} from "@mui/material";

import AUTH_REGISTER_MUTATION from "graphql/mutation/mutation.auth.register";
import { useAuthDispatch, useAuthState } from "contexts/AuthContext";
import { useInput } from "utils/hooks";
import AuthHeader from "components/Auth/AuthHeader";

//TODO: Username is unique, make a graphQL request or just an error message(Alert)?...
//TODO: This will be both, I need to make a graphQL request to check if the email is unique.

const SignUp = () => {
  const username = useInput("");
  const userEmail = useInput("");
  const userPassword = useInput("");
  const userConfirmPassword = useInput("");

  const [register] = useMutation(AUTH_REGISTER_MUTATION);
  const [signUpError, setSignUpError] = useState("");
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const { loading } = useAuthState();

  const handleEmailSignUp = async () => {
    if (userPassword.value !== userConfirmPassword.value) {
      setSignUpError("Password don't match");
    }

    await register({
      variables: {
        username: username.value,
        email: userEmail.value,
        password: userPassword.value,
      },
      onCompleted: ({ register }) => {
        const payload = {
          username: register.user.username,
          email: register.user.email,
          id: register.user.id,
          confirmed: register.user.confirmed,
        };

        if (process.env.NODE_ENV !== "development") {
          Cookie.set("token", register.jwt, {
            secure: true,
            domain: "coderage.pro",
            sameSite: "strict",
            expires: 7,
          });
        } else {
          Cookie.set("token", register.jwt, {
            secure: true,
            expires: 3,
          });
        }
        dispatch({
          type: "REGISTER",
          payload: payload,
        })
        dispatch({ type: "STOP_LOADING" });
        navigate("/");
      },
      onError: (error) => {
        setSignUpError(error.message);
      },
    });
  };

  const handleGoogleSignupPopup = async () => {
    //TODO: Add google signup;
  }

  //TODO: Error handling as MUI helperText for what is "ok" to do, else, keep the MUI Alert

  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signup - Code Rage</title>
        <meta name="description" content="Sign Up page for Code Rage." />
        <link rel="canonical" href="https://coderage.pro/signup" />
      </Helmet>

      <AuthHeader title="Sign Up" />

      {signUpError && (
        <Alert
          sx={{ width: "100%" }}
          severity="error"
          onClose={() => {
            setSignUpError("");
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {signUpError}
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
              required
              fullWidth
              id="username"
              label="Choose a username"
              {...username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Enter your email"
              {...userEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="userPassword"
              label="Choose a password"
              type="password"
              {...userPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Confirm your chosen password"
              type="password"
              id="userConfirmPassword"
              {...userConfirmPassword}
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
            onClick={handleEmailSignUp}
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
        <Grid
          container
          justifyContent="flex-end"
          sx={{
            mt: 2,
          }}
        >
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
