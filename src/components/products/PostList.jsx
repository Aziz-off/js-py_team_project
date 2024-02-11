import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import PaginationControlled from "./Pagination";
import { usePosts } from "../context/PostsContextProvider";

const PostList = () => {
  const { getPosts, posts } = usePosts();
  //!=====SEARCH============

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    getPosts();
  }, [searchParams]);
  //!=====PAGINATION=========
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const ITEMS_PER_PAGE = 5;
  const count = Math.ceil(posts.length / ITEMS_PER_PAGE);
  console.log(count);

  function currData() {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  }
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mt: "25px",

          fontFamily: "monaco",
        }}
      >
        {currData().map((item) => (
          <PostCard key={item.id} elem={item} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "15px",
        }}
      >
        <PaginationControlled
          handleChange={handleChange}
          page={page}
          count={count}
        />
      </Box>
    </div>
  );
};

export default PostList;