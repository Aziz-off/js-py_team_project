import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PostContextProvider from "./components/context/PostsContextProvider";
import AuthContextProvider from "./components/context/AuthContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PostContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </PostContextProvider>
  </BrowserRouter>
);
