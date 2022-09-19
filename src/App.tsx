import { Suspense, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { DarkThemeProvider } from "./contexts/DarkModeContext";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import CircularLoading from "components/Loading";
import Routing from "routes";

import { CommentsProvider, ConfigContext } from "contexts/CommentsProvider";
import { useAuthState } from "contexts/AuthContext";

import Header from "components/Header/Header";
import Footer from "components/Footer";

const STRAPI = "http://localhost:1338";

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper = (props: AppWrapperProps) => {
  const { user } = useAuthState();
  const { setUser } = useContext(ConfigContext);
  useEffect(() => {
    if (user) {
      setUser(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return <>{props.children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <DarkThemeProvider>
        <CssBaseline enableColorScheme /> {/* enable the theme in assets */}
        <CommentsProvider apiURL={STRAPI}>
          <AppWrapper>
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
                <Routing />
              </Suspense>
              <Footer />
            </Box>
          </AppWrapper>
        </CommentsProvider>
      </DarkThemeProvider>
    </AuthProvider>
  );
};
export default App;
