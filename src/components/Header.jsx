import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/movie-site-logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <div className="logo--img--header">
            <img src={logo} alt="Company Logo" className="logo--img" />
            JMovies
          </div>
        </Link>
        <button className="burger" onClick={toggleMenu}>
          &#9776;
        </button>
        <nav className={isOpen ? "nav-open" : "nav-closed"}>
          {isOpen && (
            <button className="close-menu" onClick={closeMenu}>
              &times;
            </button>
          )}
          <ul>
            <li>
              <Link to="#" onClick={closeMenu}>About</Link>
            </li>
            <li>
              <Link to="#" onClick={closeMenu}>Services</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
