import { Suspense, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthProvider } from "contexts/AuthContext";
import { DarkThemeProvider } from "contexts/DarkModeContext";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import logo from "assets/images/logo.svg";

import CircularLoading from "components/Loading";
import Routing from "routes";

import { CommentsProvider, ConfigContext } from "contexts/CommentsProvider";
import { useAuthState } from "contexts/AuthContext";

import Header from "components/Header/Header";
import Footer from "components/Footer";

const STRAPI = process.env.REACT_APP_BACKEND_URL!;

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
              <title>Code Rage - Home</title>
              <link
                data-rh="true"
                rel="canonical"
                href="https://coderage.pro"
              />
              <meta
                name="description"
                property="og:description"
                content="Blog about Web Development, computers and electronics. I'm not trying to reinvent the wheel, I'm just trying to make it better by adding some rage to it!"
              />
              <meta
                name="keywords"
                content="Code Rage, Web Development, computers, electronics, coding, functional programming, guide, auth, authentication, develop, developer, fullstack, tutorials, snippets, blog, javascript, typescript, strapi, unraid, linux, react, nextjs, gatsby, material-ui, MUI, tailwindcss, nodejs, express, koa, graphql, apollo, jest, babel, docker, kubernetes, nginx, apache, letsencrypt, certbot, cloudflare, aws, azure, google cloud, gcp, digital ocean, heroku, netlify, vercel, github, gitlab, bitbucket, vscode, vim, tmux, bash, zsh, linux, ubuntu, debian, cent, strapi, render, react.js, react native, react router, wrangler, create react app, cra, android, ios, chrome, firefox, joy ui, styled, prettier, eslint"
              />
              <meta name="robots" content="index, follow" />
              <meta name="language" content="English" />
              <meta property="og:title" content="Code Rage - Home" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://coderage.pro" />
              <meta property="og:image" content={logo} />
              <meta property="og:site_name" content="Code Rage" />
            </Helmet>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Box component="header">
                <Header />
              </Box>
              <Suspense fallback={<CircularLoading />}>
                <Box component="main">
                  <Routing />
                </Box>
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
