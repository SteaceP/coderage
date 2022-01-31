import { NavLink } from "react-router-dom";
import { useUIDSeed } from "react-uid";
import { useTheme } from "@mui/material/styles";
import { Toolbar, Button } from "@mui/material";

import Query from "../Query";
import CATEGORIES_QUERY from "../../graphql/queries/query.categories";

const Categories = () => {
  let theme = useTheme();
  let seed = useUIDSeed();

  return (
    <Query query={CATEGORIES_QUERY}>
      {({ data: categories }) => {
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
            {categories.categories.data.map((category) => {
              return (
                <Button
                  key={seed(category)}
                  component={NavLink}
                  to={`/category/${category.attributes.slug}`}
                  style={({ isActive }) => ({
                    color:
                      isActive && theme.palette.mode === "light"
                        ? "blue"
                        : !isActive
                        ? "#9e9e9e"
                        : "white",
                  })}
                >
                  {category.attributes.Name}
                </Button>
              );
            })}
          </Toolbar>
        );
      }}
    </Query>
  );
};

export default Categories;
