import {
	styled,
	Paper,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	IconButton,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { usePosts } from "../context/PostsContextProvider"; 
  import myIcon from "../../assets/Icon-sort.png";
  
  const StyledPaper = styled(Paper)({
	position: "absolute",
	top: "calc(100% + 10px)", 
	left: "35%",
	transform: "translateX(-50%)",
	width: 300,
	padding: 20,
	outline: "none",
	borderRadius: 8,
	boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
	backgroundColor: "#212121", 
	color: "#ffffff", 
	zIndex: 1000,
  });
  
  const SideBar = () => {
	const { categories, getCategories, fetchByParams } = usePosts();
	const [isIconClicked, setIsIconClicked] = useState(false);
  
	useEffect(() => {
	  getCategories();
	}, []);
  
	const handleIconClick = () => {
	  setIsIconClicked(true);
	};
  
	const handlePaperClose = () => {
	  setIsIconClicked(false);
	};
  
	const handleCategorySelect = (category) => {
	  fetchByParams("category", category);
	  handlePaperClose();
	};
  
	return (
	  <>
		<IconButton
		  size="large"
		  edge="start"
		  color="inherit"
		  aria-label="open drawer"
		  onClick={handleIconClick}
		>
		  <img src={myIcon} alt="My Icon" style={{ width: "24px", height: "24px" }} />
		</IconButton>
		{isIconClicked && (
		  <StyledPaper elevation={5} onBlur={handlePaperClose}>
			<FormControl>
			  <FormLabel id="demo-radio-buttons-group-label">Categories</FormLabel>
			  <RadioGroup
				defaultValue="all"
				name="radio-buttons-group"
				aria-labelledby="demo-radio-buttons-group-label"
			  >
				<FormControlLabel
				  control={<Radio />}
				  value={"all"}
				  label={"ALL"}
				  onClick={() => handleCategorySelect("all")}
				/>
				{categories.map((elem) => (
				  <FormControlLabel
					key={elem.id}
					label={elem.name}
					control={<Radio />}
					value={elem.name}
					onClick={() => handleCategorySelect(elem.name)}
				  />
				))}
			  </RadioGroup>
			</FormControl>
		  </StyledPaper>
		)}
	  </>
	);
  };
  
  export default SideBar;
  