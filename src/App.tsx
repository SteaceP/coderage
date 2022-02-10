import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { AuthProvider } from "./contexts/AuthContext";
import { DarkThemeProvider } from "./contexts/DarkModeContext";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import CircularLoading from "./components/Loading";

const Home = lazy(() => import("containers/Home"));
const Header = lazy(() => import("components/Header/Header"));
const Category = lazy(() => import("./containers/blog/CategoriesContainer"));
const Login = lazy(() => import("containers/auth/Login"));
const SignUp = lazy(() => import("containers/auth/Signup"));
const ForgotPassword = lazy(() => import("containers/auth/ForgotPassword"));
const Portfolio = lazy(() => import("containers/Portfolio"));
const RequireAuth = lazy(() => import("components/Auth/RequireAuth"));
const Dashboard = lazy(() => import("containers/auth/Dashboard"));
const Footer = lazy(() => import("components/Footer"));
const LoginRedirect = lazy(() => import("utils/LoginRedirect"));
const NoMatch = lazy(() => import("containers/404"));
const ArticleContainer = lazy(
  () => import("./containers/blog/ArticleContainer")
);

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
          <Suspense fallback={<CircularLoading />}>
            <Header />
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

            <Footer />
          </Suspense>
        </Box>
      </DarkThemeProvider>
    </AuthProvider>
  );
};
export default App;
