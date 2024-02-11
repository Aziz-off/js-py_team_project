export const API_POSTS = "http://localhost:8000/posts";
export const API_CATEGORIES = "http://localhost:8000/categories";
export const ACTION_POSTS = {
  GET_POSTS: "GET_POSTS",
  GET_ONE_POSTS: "GET_ONE_POSTS",
  GET_CATEGORIES: "GET_CATEGORIES",
  GET_CART: "CET_CART",
  GET_FAVORITES: "GET_FAVORITES",
  GET_COMMENTS: "GET_COMMENTS",
};

export const ACTION_USER = {
  CHECK_USER: "CHECK_USER",
};

export const ADMIN_USERS = [
  {
    email: "admin@admin.com",
    password: 12345678,
  },
];
