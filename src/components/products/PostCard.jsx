import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { usePosts } from "../context/PostsContextProvider";
import { AddShoppingCart } from "@mui/icons-material";
import myIcon from "../../assets/myIcon.png";

const CustomCard = styled(Card)({
  width: 250,
  margin: "10px auto",
  background: "rgba(255, 255, 255, 0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const CustomCardContent = styled(CardContent)({
  padding: "16px",
  "&:last-child": {
    paddingBottom: "16px",
  },
});

const CustomCardActions = styled(CardActions)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 16px 16px",
});

export default function PostCard({ elem: post }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { addPostToFavorites, deletePostFromFavorites, deletePost } =
    usePosts();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite) {
      deletePostFromFavorites(post.id);
    } else {
      addPostToFavorites(post);
    }
    setIsFavorite(!isFavorite);
  };

  const isPostOwner = user && post.userId === user.uid;

  return (
    <CustomCard>
      <CardMedia
        component="img"
        height="140"
        image={post.picture || myIcon}
        alt={post.title}
        onClick={() => navigate(`/posts/${post.id}`)}
      />
      <CustomCardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color="textPrimary"
        >
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.year} 
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.category} 
        </Typography>
      </CustomCardContent>
      <CustomCardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
          <FavoriteIcon color={isFavorite ? "error" : "default"} />
        </IconButton>
        {/* <IconButton
          aria-label="add to cart"
          onClick={() =>
            console.log("Add to cart functionality to be implemented")
          }
        >
          <AddShoppingCart />
        </IconButton> */}
        {isPostOwner && (
          <Box>
            <Button
              size="small"
              onClick={() => navigate(`/editPost/${post.id}`)}
            >
              Edit
            </Button>
            <Button size="small" onClick={() => deletePost(post.id)}>
              Delete
            </Button>
          </Box>
        )}
      </CustomCardActions>
    </CustomCard>
  );
}
