import { NavLink } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

const Categories = () => {
  const theme = useTheme();
  const seed = useUIDSeed();
  const categoriesArray = ["Unraid", "Coding", "News", "Blog"];

  return (
    <Container>
      <Toolbar
        component="nav"
        variant="dense"
        aria-label="Categories of articles"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {categoriesArray.map(category => (
          <NavLink
            key={seed(category)}
            to={`/category/${category.toLowerCase()}`}
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: isActive ? "underline" : "none",
              textUnderlineOffset: "5px",
              color: theme.palette.text.primary,
            })}
          >
            {category}
          </NavLink>
        ))}
      </Toolbar>
    </Container>
  );
};

export default Categories;
