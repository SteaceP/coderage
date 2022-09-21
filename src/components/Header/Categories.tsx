import { NavLink } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

const Categories = () => {
  const theme = useTheme();
  const seed = useUIDSeed();
  const categoriesArray = ["Unraid", "Coding", "News", "Blog"];

  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{
        justifyContent: "space-around",
        overflow: "visible",
      }}
    >
      {categoriesArray.map((category) => (
        <NavLink
          key={seed(category)}
          to={`/category/${category.toLowerCase()}`}
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "underline" : "none",
            textUnderlineOffset: "1vh",
            color: theme.palette.text.primary,
          })}
        >
          {category}
        </NavLink>
      ))}
    </Toolbar>
  );
};

export default Categories;
