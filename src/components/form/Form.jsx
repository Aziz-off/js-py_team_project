import { Button, FormControl, TextField, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategorySelect from "../products/CategorySelect";
import { usePosts } from "../context/PostsContextProvider";

const initialState = {
  title: "",
  description: "",
  category: "",
  // price: "",
  picture: "",
  videoPath: "",
  year: "",
};

const Form = ({ isEdit }) => {
  const { createPost, editPost, onePost } = usePosts();
  const [post, setPost] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && onePost) {
      setPost(onePost);
    }
  }, [isEdit, onePost]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSaveChanges = () => {
    if (
      Object.values(post).some((value) => value === "" && value !== "videoPath")
    ) {
      alert("Please fill out all fields.");
      return;
    }
    editPost(post);
    setPost(initialState);
    navigate("/");
  };

  const handleSubmit = () => {
    createPost(post);
    setPost(initialState);
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        boxShadow: "0px 0px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h4" textAlign="center" color="primary" mb={2}>
        {isEdit ? "Edit Post" : "Create Post"}
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        name="title"
        fullWidth
        value={post.title}
        onChange={handleInput}
      />
      <TextField
        label="Release Year"
        variant="outlined"
        name="year"
        fullWidth
        value={post.year}
        onChange={handleInput}
      />
      <TextField
        label="Description"
        variant="outlined"
        name="description"
        multiline
        rows={4}
        fullWidth
        value={post.description}
        onChange={handleInput}
      />
      <CategorySelect
        handleInput={(e) =>
          handleInput({ target: { name: "category", value: e.target.value } })
        }
        selectedCategory={post.category}
      />
      {/* <TextField
        label="Price"
        variant="outlined"
        name="price"
        type="number"
        fullWidth
        value={post.price}
        onChange={handleInput}
      /> */}
      <TextField
        label="Image URL"
        variant="outlined"
        name="picture"
        fullWidth
        value={post.picture}
        onChange={handleInput}
      />
      <TextField
        label="Video URL (optional)"
        variant="outlined"
        name="videoPath"
        fullWidth
        value={post.videoPath}
        onChange={handleInput}
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={isEdit ? handleSaveChanges : handleSubmit}
        sx={{ mt: 2 }}
      >
        {isEdit ? "Save Changes" : "Create Post"}
      </Button>
    </Box>
  );
};

export default Form;
