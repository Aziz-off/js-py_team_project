import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { usePosts } from "../context/PostsContextProvider";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";

const PostReview = () => {
  const { user } = useAuthContext();
  const { addComment, getComments, comments } = usePosts();
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getComments(id);
  }, [id, getComments]);

  const handleAdd = async () => {
    if (!user) {
      alert("Please log in to add comments.");
      return;
    }

    await addComment(id, {
      text: newComment,
      username: user.displayName || user.email,
      createdAt: new Date().toISOString(),
    });
    setNewComment("");

    getComments(id);
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <Box sx={{ my: 2 }}>
        {comments?.map((comment, index) => (
          <Paper key={index} elevation={2} sx={{ p: 2, mb: 1 }}>
            <Typography variant="body2" color="textSecondary">
              {comment.username || "Anonymous"} -{" "}
              {new Date(comment.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">{comment.text}</Typography>
          </Paper>
        ))}
      </Box>

      {user && (
        <Box sx={{ mt: 4, mb: 4 }}>
          <TextField
            label="Add a comment"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAdd}>
            Post Comment
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PostReview;
