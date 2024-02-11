import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailsPage from "../pages/DetailsPage";
import Favorite from "../components/favorites/Favorite";
import Auth from "../components/auth/Auth";
import Login from "../components/auth/Login";
import AddPost from "../components/products/AddPost";
import PostReview from "../components/products/PostReview";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:id" element={<DetailsPage />} />
      {/* <Route path="/comment" element={<PostReview />} /> */}
      <Route path="/favorites" element={<Favorite />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addPost" element={<AddPost />} />
    </Routes>
  );
};

export default MainRoutes;
