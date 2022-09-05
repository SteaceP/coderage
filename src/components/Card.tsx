import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const CategoryCard = ({ data: postByCategory }) => {
  const query = postByCategory.attributes;
  const imageUrl = `${process.env.REACT_APP_BACKEND_URL}${query.image.data.attributes.url}`;

  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Button size="small">Share</Button>
        <Button size="small" component={Link} to={`/post/${query.slug}`}>
          Read post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
