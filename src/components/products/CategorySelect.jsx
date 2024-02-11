import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { usePosts } from "../context/PostsContextProvider";

const CategorySelect = ({ handleInput }) => {
  const { categories, getCategories } = usePosts(); 
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Choose category</InputLabel>
        <Select
          label="Category"
          defaultValue=""
          name="category"
          id="category-select"
          labelId="category-select-label"
          onChange={handleInput}
          sx={{ backgroundColor: "grey", borderRadius: "10px", opacity: "0.6" }}
        >
          {categories.map((category) => (
            <MenuItem value={category.name} key={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelect;
