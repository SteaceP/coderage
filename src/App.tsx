import { Suspense } from "react";
import { Helmet } from "react-helmet";
import { AuthProvider } from "./contexts/AuthContext";
import { DarkThemeProvider } from "./contexts/DarkModeContext";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import CircularLoading from "components/Loading";
import Routing from "routes";

import Header from "components/Header/Header";
import Footer from "components/Footer";

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
            <Routing />
          </Suspense>
          <Footer />
        </Box>
      </DarkThemeProvider>
    </AuthProvider>
  );
};
export default App;
