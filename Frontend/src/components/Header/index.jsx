import React from "react";
import "./index.css";
import { Link, NavLink } from "react-router-dom";
export const Header = () => {
  return (
    <header>
      <div className="header__container">
        <nav className="nav-header">
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
              <Link to={"/wordle-battle"} className="nav-header__link">
                WORDLE Battle
              </Link>
            </li>
            <li>
              <Link to={"/wordle"} className="nav-header__link">
                WORDLE
              </Link>
            </li>
            <li>
              <Link to={"/hangman"} className="nav-header__link">
                AHORCADO
              </Link>
            </li>
            <li>
              <Link to={"/"} className="nav-header__link">
                PUNTUACIONES
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
