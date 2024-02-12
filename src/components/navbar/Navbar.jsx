import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/MyLogo.png";
import heart from "../../assets/icons8-сердце-48.png";
import { useAuthContext } from "../context/AuthContextProvider";
import { usePosts } from "../context/PostsContextProvider";

function Navbar() {
  const navigate = useNavigate();
  // const [search, setSearch] = useState("");

  //! SEARCH
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const { getPosts } = usePosts();
  const { user, logOut } = useAuthContext();
 
  useEffect(()=>{
    setSearchParams({
      q: search,
    });
  }, [search]);

  useEffect(()=>{
    getPosts();
  }, [searchParams]);

  return (
    <div className="header">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
        </div>
        <Link to="/notes">Notes</Link>
        <ul className="nav-list">
          <li className="search-item">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Я ищу..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </li>
          <li onClick={() => navigate("/favorites")}>
            <img src={heart} alt="Favorites" />
          </li>
          <li onClick={() => navigate("/addPost")}>
            <i className="fas fa-plus"></i>
          </li>
          {user ? (
            <>
              <li>{user.email || user.displayName}</li>
              <li>
                <button className="logout-btn" onClick={() => logOut()}>
                  Выйти
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className="login-btn"
                  onClick={() => navigate("/login")}
                >
                  Войти
                </button>
              </li>
              <li>
                <button
                  className="register-btn"
                  onClick={() => navigate("/auth")}
                >
                  Регистрация
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
