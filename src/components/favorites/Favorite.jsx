import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
  } from "@mui/material";
//   import { useCart } from "../context/CartContextProvider";
  import React, { useEffect } from "react";
//   import { useFavorites } from "../context/FavoriteContextProvider";
  
  const Favorite = () => {
	const { favorites, getFavorites, deleteProductFromFavorites } =
	//   useFavorites();
  
	useEffect(() => {
	  console.log("Fetching favorites...");
  
	  const fetchData = async () => {
		try {
		  await getFavorites();
		} catch (error) {
		  console.error("Error fetching favorites:", error);
		}
	  };
  
	  fetchData();
	}, []);
  
	useEffect(() => {
	  console.log("Favorites:", favorites.products);
	}, [favorites]);
  
	return (
	  <TableContainer>
		<Table sx={{ minWidth: 650 }} aria-label="simple table">
		  <TableHead>
			<TableRow>
			  <TableCell style={{ color: "white", fontWeight: "bold" }}>
				Picture
			  </TableCell>
			  <TableCell style={{ color: "white", fontWeight: "bold" }}>
				Title
			  </TableCell>
			  <TableCell style={{ color: "white", fontWeight: "bold" }}>
				Category
			  </TableCell>
			  {/* <TableCell style={{ color: "white", fontWeight: "bold" }}>
				Price
			  </TableCell>
			  <TableCell style={{ color: "white", fontWeight: "bold" }}>
				SubPrice
			  </TableCell> */}
			  <TableCell style={{ color: "white", fontWeight: "bold" }}>
				-
			  </TableCell>
			</TableRow>
		  </TableHead>
		  <TableBody>
			{favorites.products.map((elem) => (
			  <TableRow key={elem.item.id}>
				<TableCell component="th" scope="row">
				  <img width={"70"} src={elem.item.picture} alt="" />
				</TableCell>
				<TableCell align="right" style={{ color: "white" }}>
				  {elem.item.title}
				</TableCell>
				<TableCell align="right" style={{ color: "white" }}>
				  {elem.item.category}
				</TableCell>
				{/* <TableCell align="right" style={{ color: "white" }}>
				  {elem.item.price}
				</TableCell>
				<TableCell align="right" style={{ color: "white" }}>
				  {elem.subPrice}
				</TableCell> */}
				<TableCell align="right">
				  <Button
					onClick={() => deleteProductFromFavorites(elem.item.id)}
					style={{ color: "white", backgroundColor: "red" }}
				  >
					DELETE
				  </Button>
				</TableCell>
			  </TableRow>
			))}
		  </TableBody>
		</Table>
		<div style={{ textAlign: "center", marginTop: "10px" }}></div>
	  </TableContainer>
	);
  };
  
  export default Favorite;
  