import { Suspense, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthProvider } from "contexts/AuthContext";
import { DarkThemeProvider } from "contexts/DarkModeContext";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import CircularLoading from "components/Loading";
import Routing from "routes";

import { CommentsProvider, ConfigContext } from "contexts/CommentsProvider";
import { useAuthState } from "contexts/AuthContext";

import Header from "components/Header/Header";
import Footer from "components/Footer";

const STRAPI = process.env.REACT_APP_BACKEND_URL;

const AppWrapper = (props: { children: React.ReactNode }) => {
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
              <link rel="canonical" href="https://coderage.pro" />
              <meta
                name="description"
                content="Blog about Web Development, computers and electronics."
              />
              <meta
                name="keywords"
                content="Web Development, computers, electronics, blog, javascript, typescript, strapi, unraid, linux, react, nextjs, gatsby, material-ui, tailwindcss, nodejs, express, graphql, apollo, docker, kubernetes, nginx, apache, letsencrypt, certbot, cloudflare, aws, azure, google cloud, digital ocean, heroku, netlify, vercel, github, gitlab, bitbucket, vscode, vim, tmux, bash, zsh, linux, ubuntu, debian, cent"
              />
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
