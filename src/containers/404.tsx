import { Link as RouterLink, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";

const NoMatch = () => {
  const location = useLocation();

  return (
    <>
      <h1>
        Hmmm... can't seem to find the page <code>{location.pathname}</code>
      </h1>
      <Link component={RouterLink} to="/">
        Take me home
      </Link>
    </>
  );
};

export default NoMatch;
