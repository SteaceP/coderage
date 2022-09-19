import { NavLink } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import { useTheme } from "@mui/material/styles";
import { Toolbar, Button } from "@mui/material";

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
      {categoriesArray.map((category) => {
        return (
          <Button
            tabIndex={categoriesArray.indexOf(category)}
            key={seed(category)}
            component={NavLink}
            to={`/category/${
              category.charAt(0).toLowerCase() + category.slice(1)
            }`}
            sx={{ color: theme.palette.mode === "light" ? "blue" : "white" }}
          >
            {category}
          </Button>
        );
      })}
    </Toolbar>
  );
};

export default Categories;
