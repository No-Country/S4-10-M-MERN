import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import whiteHearth from "../../assets/images/whiteHearth.svg"

export const Header = () => {
  return (
    <header>
      <div className="header__container">
        <nav className="nav-header">
          <Link to="/" className="logo__container">
            <h1 className="logo">RETR<img src={whiteHearth} alt="Retro logo" /></h1>
          </Link>
          <ul>
            <li>
              <Link to={"/login"} className="nav-header__link">
                LOGIN
              </Link>
            </li>
            <li>
              <Link to={"/signup"} className="nav-header__link">
                SIGNUP
              </Link>
            </li>
            <li>
              <Link to={"/"} className="nav-header__link">
                HOME
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
