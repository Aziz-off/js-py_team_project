import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/MyLogo.png";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="footer-content">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
        </div>
        <div className="footer-nav">
          <button onClick={() => navigate("/about")}>О нас</button>
          <button onClick={() => navigate("/contact")}>Контакты</button>
          <button onClick={() => navigate("/privacy")}>Политика конфиденциальности</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NomadNotes. Все права защищены.</span>
      </div>
    </div>
  );
}

export default Footer;
