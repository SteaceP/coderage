import { NavLink } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import { useTheme } from "@mui/material/styles";
import { Toolbar, Button } from "@mui/material";

const Categories = () => {
  const theme = useTheme();
  const seed = useUIDSeed();

  const categoriesArray = ["Unraid", "Coding", "News", "Tutorials"];

  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{
        "@media screen and (max-width: 600px)": {
          fontSize: "718px",
        },
        justifyContent: "space-around",
        overflow: "visible",
      }}
    >
      {categoriesArray.map((category) => {
        return (
          <Button
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
