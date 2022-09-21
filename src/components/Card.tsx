import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const CategoryCard = ({ data }) => {
  const query = data.attributes;
  const imageUrl = query.image.data.attributes.url;

  return (
    <Card sx={{ width: 365, maxHeight: 450 }}>
      <CardMedia component="img" alt="C sa!" height="200" image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {query.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {query.synopsis}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button disabled size="small">
          Share
        </Button>
        <Button size="small" component={Link} to={`/post/${query.slug}`}>
          Read post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
