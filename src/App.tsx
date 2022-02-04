import { lazy, Suspense } from 'react';
import { Helmet } from "react-helmet";
import { AuthProvider } from "./contexts/AuthContext";
import { DarkThemeProvider } from "./contexts/DarkModeContext";
import { Routes, Route } from "react-router-dom";
// import {TransitionGroup, CSSTransition } from "react-transition-group";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./containers/Home";
import NoMatch from "./containers/404";
import RequireAuth from "./components/RequireAuth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import LoginRedirect from "./utils/LoginRedirect";
import CircularLoading from './components/Loading';

const Category = lazy(() => import("./containers/blog/CategoriesContainer"))
const ArticleContainer = lazy(() => import("./containers/blog/ArticleContainer"))
const Dashboard = lazy(() => import("./containers/auth/Dashboard"))
const Login = lazy(() => import("./containers/auth/login"))
const SignUp = lazy(() => import("./containers/auth/Signup"))
const ForgotPassword = lazy(() => import("./containers/auth/ForgotPassword"))
const Portfolio = lazy(() => import("./containers/Portfolio"))


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

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={
              <Suspense fallback={<CircularLoading />}>
                <Category />
              </Suspense>
            } />
            <Route path="/post/:id" element={
              <Suspense fallback={<CircularLoading />}>
                <ArticleContainer />
              </Suspense>
            } />
            <Route path="/portfolio" element={
              <Suspense fallback={<CircularLoading />}>
                <Portfolio />
              </Suspense>
            } />
            <Route path="/auth/signup" element={
              <Suspense fallback={<CircularLoading />}>
                <SignUp />
              </Suspense>
            } />
            <Route path="/auth/login" element={
              <Suspense fallback={<CircularLoading />}>
                <Login />
              </Suspense>
            } />
            <Route path="/auth/forgot-password" element={
              <Suspense fallback={<CircularLoading />}>
                <ForgotPassword />
              </Suspense>
            } />
            <Route path="/connect/auth0/redirect" element={<LoginRedirect />} />
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

        </Box>
      </DarkThemeProvider>
    </AuthProvider>
  );
};
export default App;
