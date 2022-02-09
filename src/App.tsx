import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { AuthProvider } from "./contexts/AuthContext";
import { DarkThemeProvider } from "./contexts/DarkModeContext";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./containers/Home";
import NoMatch from "./containers/404";
// import RequireAuth from "./components/Auth/RequireAuth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import LoginRedirect from "./utils/LoginRedirect";
import CircularLoading from "./components/Loading";

const Category = lazy(() => import("./containers/blog/CategoriesContainer"));
const ArticleContainer = lazy(
  () => import("./containers/blog/ArticleContainer")
);
const Dashboard = lazy(() => import("containers/auth/Dashboard"));
const Login = lazy(() => import("containers/auth/Login"));
const SignUp = lazy(() => import("containers/auth/Signup"));
const ForgotPassword = lazy(() => import("containers/auth/ForgotPassword"));
const Portfolio = lazy(() => import("containers/Portfolio"));
const RequireAuth = lazy(() => import("components/Auth/RequireAuth"));

const App = () => {
  return (
    <AuthProvider>
      <DarkThemeProvider>
        <CssBaseline enableColorScheme /> {/* enable the theme in assets */}
        <Helmet>
          <meta charSet="utf-8" />
          <title>Code Rage</title>
          <meta
            name="description"
            content="Blog about Web Development, computers and electronics."
          />
          <link rel="canonical" href="https://coderage.pro" />
        </Helmet>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <Suspense fallback={<CircularLoading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/post/:id" element={<ArticleContainer />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/login" element={<Login />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/connect/auth0/redirect"
                element={<LoginRedirect />}
              />
              <Route
                path="/auth/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Suspense>

          <Footer />
        </Box>
      </DarkThemeProvider>
    </AuthProvider>
  );
};
export default App;
