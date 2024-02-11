import React, { createContext, useContext, useReducer } from "react";
import { ACTION_POSTS, API_CATEGORIES, API_POSTS } from "../../helpers/const";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";

const postContext = createContext();

export const usePosts = () => useContext(postContext);

const INIT_STATE = {
  posts: [],
  onePost: null,
  comments: [],
  categories: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_POSTS.GET_POSTS:
      return { ...state, posts: action.payload.data };
      break;
    case ACTION_POSTS.GET_ONE_POSTS:
      return { ...state, onePost: action.payload };
      break;
    case ACTION_POSTS.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

const PostsContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getPosts() {
    try {
      let res = await axios(`${API_POSTS}/${window.location.search}`);
      dispatch({
        type: ACTION_POSTS.GET_POSTS,
        payload: res,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function getOnePost(id) {
    try {
      let { data } = await axios(`${API_POSTS}/${id}`);
      // console.log("getOnePost Data:", data);
      dispatch({
        type: ACTION_POSTS.GET_ONE_POSTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function createPost(newPost) {
    if (!auth.currentUser) {
      console.error("No authenticated user found.");
      return;
    }
    const user = auth.currentUser;
    const postWithUser = {
      ...newPost,
      userId: user.uid,
    };

    try {
      await axios.post(API_POSTS, postWithUser);
    } catch (error) {
      console.log(error);
    }
  }

  async function editPost(newPost) {
    try {
      await axios.patch(`${API_POSTS}/${newPost.id}`, newPost);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    try {
      await axios.delete(`${API_POSTS}/${id}`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  //! GET_CATEGORIES
  const getCategories = async () => {
    const result = await axios(API_CATEGORIES);
    dispatch({ type: ACTION_POSTS.GET_CATEGORIES, payload: result.data });
  };
  //! CREATE_CATEGORIES
  const createCategories = async (newCategory) => {
    await axios.post(API_CATEGORIES, newCategory);
  };
  //!GET_COMMENTS
  const getComments = async (id) => {
    try {
      const { data } = await axios.get(`${API_POSTS}/${id}`);
      // console.log(data)
      dispatch({
        type: ACTION_POSTS.GET_COMMENTS,
        payload: { id, comments: data.comments || [] },
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      dispatch({
        type: ACTION_POSTS.GET_COMMENTS,
        payload: { id, comments: [] },
      });
    }
  };

  //!ADD_COMMENTS

  async function addComment(postId, commentText, username) {
    if (!auth.currentUser) {
      console.error("No authenticated user found.");
      return;
    }

    const newComment = {
      id: Date.now(), 
      text: commentText, 
      username: username || auth.currentUser.email,
      createdAt: new Date().toISOString(), 
    };

    try {
  
      const { data: post } = await axios.get(`${API_POSTS}/${postId}`);
    
      const updatedComments = [...post.comments, newComment];
     
      await axios.patch(`${API_POSTS}/${postId}`, {
        comments: updatedComments,
      });
     
      await getComments(postId);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  //!==========================SEARCH && FILTER===========================
  const fetchByParams = (query, value) => {
    const search = new URLSearchParams(window.location.search);

    if (value === "all") {
      search.delete(query);
    } else {
      search.set(query, value);
    }

    const url = `${window.location.pathname}?${search.toString()}`;
    console.log("Generated URL:", url);
    navigate(url);
    getPosts();
  };

  const values = {
    createPost,
    getPosts,
    posts: state.posts,
    onePost: state.onePost,
    getOnePost,
    getCategories,
    createCategories,
    categories: state.categories,
    editPost,
    deletePost,
    fetchByParams,
    addComment,
    comments: state.comments,
    getComments,
  };

  return <postContext.Provider value={values}>{children}</postContext.Provider>;
};

export default PostsContextProvider;
