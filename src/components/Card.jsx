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
  const imageUrl = process.env.REACT_APP_BACKEND_URL + postByCategory.attributes.image.data.attributes.url;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="C sa!" height="200" image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {postByCategory.attributes.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {postByCategory.attributes.synopsis}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button
          size="small"
          component={Link}
          to={`/post/${postByCategory.attributes.slug}`}
        >
          Read post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
