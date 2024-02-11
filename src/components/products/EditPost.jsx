import { Container } from "@mui/material";
import React, { useEffect } from "react";
import Form from "../form/Form";
import { usePosts } from "../context/PostsContextProvider";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { getOnePost } = usePosts();
  const { id } = useParams();

  useEffect(() => {
    getOnePost(id);
  }, [id, getOnePost]);

  return (
    <Container>
      <Form isEdit={true} />
    </Container>
  );
};

export default EditPost; 
