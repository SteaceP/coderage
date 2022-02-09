import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Alert,
  Grid,
  Link,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { useAuthDispatch, useAuthState } from "contexts/AuthContext";
import { useInput } from "utils/hooks";

import AuthHeader from "components/Auth/AuthHeader";

const Dashboard = () => {
  const usernameInput = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const confirmPasswordInput = useInput("");
  const { user, loading } = useAuthState();
  const dispatch = useAuthDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (passwordInput.value !== confirmPasswordInput.value) {
      return setError("Passwords don't match");
    }

    const promises = [];
    // setLoading(true);
    setError("");

    if (emailInput.value !== user.email) {
      // promises.push(updateEmail(emailInput.value));
      console.log("should work!!");
    }
    if (passwordInput.value) {
      // promises.push(currentUser.updatePassword(password.value));
      console.log("Should work too!");
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Profile - Hacktive</title>
        <meta
          name="description"
          content="Your Profile page for Code Rage. You can change your display name, email and password"
        />
        <link rel="canonical" href="https://coderage.pro/auth/signup" />
      </Helmet>

      <AuthHeader title="Your Profile" />

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
      <form noValidate>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="usernameInput"
              label="Display Name"
              placeholder={`Your current username is "${user.username}"`}
              {...usernameInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="emailInput"
              label="Email Address"
              placeholder={`Your current email is "${user.email}"`}
              {...emailInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              type="password"
              id="passwordInput"
              placeholder="Leave blank to keep the same password"
              {...passwordInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmPasswordInput"
              placeholder="Retype your new password..."
              {...confirmPasswordInput}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2, mb: 2 }}
        >
          Update
        </Button>
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleLogout}
          sx={{ mt: 2, mb: 2 }}
        >
          LogOut
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/" variant="body2">
              Cancel
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Dashboard;
