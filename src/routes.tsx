import { lazy } from "react";
import { useSentryRoutes } from "lib/sentry";

import Home from "containers/Home";
import Category from "containers/blog/CategoriesContainer";
import ArticleContainer from "containers/blog/ArticleContainer";

const Login = lazy(() => import("containers/auth/Login"));
const SignUp = lazy(() => import("containers/auth/Signup"));
const ForgotPassword = lazy(() => import("containers/auth/ForgotPassword"));
const Portfolio = lazy(() => import("containers/Portfolio"));
const RequireAuth = lazy(() => import("components/Auth/RequireAuth"));
const Dashboard = lazy(() => import("containers/auth/Dashboard"));
const NoMatch = lazy(() => import("containers/404"));

const Routing = () => {
  let elements = useSentryRoutes([
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
