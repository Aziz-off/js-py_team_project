import React, { useEffect, useState } from "react";
import { usePosts } from "../components/context/PostsContextProvider";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Container,
  IconButton,
  Modal,
  Rating,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";
import PostReview from "../components/products/PostReview";


const DetailsPage = () => {
  const { getOnePost, onePost, getComments } = usePosts(); 
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  useEffect(() => {
    getOnePost(id);
    getComments(id);
    console.log(onePost); 
  }, [id, getOnePost, getComments]);
  

  const handleGoBack = () => {
    navigate("/");
  };

  const handleOpenTrailerModal = () => {
    setIsTrailerModalOpen(true);
  };

  const handleCloseTrailerModal = () => {
    setIsTrailerModalOpen(false);
  };

  return (
    <div>
      {onePost ? ( 
        <Container sx={{ marginTop: 8 }}>
          <Card
            sx={{
              position: "relative",
              maxWidth: "100%",
              mb: 10,
              background: "transparent",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardActionArea sx={{ height: 600, display: "flex", p: 2 }}>
              <CardMedia
                sx={{ width: 600, objectFit: "contain" }}
                component="img"
                height="540"
                image={onePost.picture}
                alt="post"
              />
              <CardContent>
                <Typography
                  variant="h3"
                  component="div"
                  color={"white"}
                  fontFamily={"fantasy"}
                >
                  {onePost.title}
                </Typography>
                <br />
                <Typography
                  variant="h6"
                  component="div"
                  color={"white"}
                  fontFamily={"fantasy"}
                >
                  {onePost.description} 
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          
          <Modal
            open={isTrailerModalOpen}
            onClose={handleCloseTrailerModal}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80vw",
                height: "80vh",
                overflow: "auto",
                bgcolor: "#000",
                color: "#fff",
                border: "2px solid #fff",
                boxShadow: 24,
                p: 4,
                position: "relative",
              }}
            >
              <IconButton
                sx={{ color: "white", position: "absolute", top: 0, right: 0 }}
                onClick={handleCloseTrailerModal}
              >
                <CloseIcon />
              </IconButton>
              <ReactPlayer
                url={onePost.videoPath} 
                width="100%"
                height="100%"
                controls={true}
              />
            </Box>
          </Modal>
          <PostReview />
        </Container>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default DetailsPage;
