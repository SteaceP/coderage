import { useRoutes } from "react-router-dom";

import Home from "pages/Home"
import Category from "pages/blog/CategoriesContainer";
import ArticleContainer from "pages/blog/ArticleContainer";

import Login from "pages/auth/Login.tsx";
import SignUp from "pages/auth/Signup";
import ForgotPassword from "pages/auth/ForgotPassword";
import Portfolio from "pages/Portfolio";
import RequireAuth from "components/Auth/RequireAuth";
import Dashboard from "pages/auth/Dashboard";
import NoMatch from "pages/404";

const Routing = () => {
  let elements = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/category/:id",
      element: <Category />,
    },
    {
      path: "/post/:id",
      element: <ArticleContainer />,
    },
    {
      path: "/portfolio",
      element: <Portfolio />,
    },
    {
      path: "/auth/signup",
      element: <SignUp />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/auth/dashboard",
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ]);
  return elements;
};

export default Routing;
