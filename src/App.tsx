import { Helmet } from "react-helmet";
import { AuthProvider } from "./contexts/AuthContext";
import { DarkThemeProvider } from "./contexts/DarkModeContext";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./containers/Home";
import NoMatch from "./containers/404";
import Login from "./containers/auth/login";
import SignUp from "./containers/auth/Signup";
import Dashboard from "./containers/auth/Dashboard";
import RequireAuth from "./components/RequireAuth";
import ForgotPassword from "./containers/auth/ForgotPassword";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Portfolio from "./containers/Portfolio";
import Category from "./containers/blog/CategoriesContainer";
import ArticleContainer from "./containers/blog/ArticleContainer";
import LoginRedirect from "./utils/LoginRedirect";

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
            <Route path="/category/:id" element={<Category />} />
            <Route path="/post/:id" element={<ArticleContainer />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
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
