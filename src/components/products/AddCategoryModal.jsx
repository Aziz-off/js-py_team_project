import { Button, Box, Modal, TextField, Typography } from "@mui/material";
import { usePosts } from "../context/PostsContextProvider";
import { useState } from "react";
import { styled } from "@mui/system";

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledBox = styled(Box)({
  backgroundColor: 'white',
  border: '2px solid #000',
  borderRadius: '8px',
  boxShadow: 24,
  padding: '16px',
  minWidth: '300px',
  textAlign: 'center',
});

const AddCategoryModal = ({ handleClose }) => { 
  const { createPostCategories } = usePosts(); 
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    const newCategory = { name: category };
    createPostCategories(newCategory);
    handleClose(); 
  };

  return (
    <StyledModal sx={{ backgroundSize: "cover", paddingTop: "1px"}} open aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <StyledBox>
        <Typography variant="h6">Add new post category</Typography> // Обновлен текст
        <TextField
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          variant="outlined"
          label="Category Name"
          required
          margin="normal"
        />
        <Button variant="contained" onClick={handleAdd} sx={{ marginRight: 2 }}>
          Add
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </StyledBox>
    </StyledModal>
  );
};

export default AddCategoryModal;
