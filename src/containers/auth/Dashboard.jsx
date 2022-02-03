import { useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useInput } from "../../utils/hooks";
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

const AuthHeader = lazy(() => import("../../components/Auth/AuthHeader"));

const Dashboard = () => {
  const displayName = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.value !== confirmPassword.value) {
      return setError("Passwords don't match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (email.value !== currentUser.email) {
      // promises.push(updateEmail(email.value));
      console.log("should work!!");
    }
    if (password.value) {
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
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Profile - Hacktive</title>
        <meta
          name="description"
          content="Your Profile page for Hacktive Web Development. You can change your display name, email and password"
        />
        <link rel="canonical" href="https://steace.live/auth/signup" />
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthHeader title="Your Profile" />
      </Suspense>{" "}
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
              id="displayName"
              label="Display Name"
              placeholder={`Your current username is "${currentUser.username}"`}
              {...displayName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              placeholder={`Your current email is "${currentUser.email}"`}
              {...email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              type="password"
              id="password"
              placeholder="Leave blank to keep the same password"
              {...password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="Retype your new password..."
              {...confirmPassword}
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
          onClick={logout}
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
