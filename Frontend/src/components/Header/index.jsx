import React from "react";
import "./index.css";
import { Link, NavLink } from "react-router-dom";

const CustomLink = ({children, to}) =>{
  return (
      <li>
      <Link to={to} className="nav-header__link">
        {children}
      </Link>
    </li>
  )
}

export const Header = () => {
  return (
    <header>
      <div className="header__container">
        <nav className="nav-header">
          <ul>

            <CustomLink to={"/loginSignUp"}>
              ATENTICARSE
            </CustomLink>

            <CustomLink to={"/wordle-battle"} >
              WORDLE battle
            </CustomLink>

            <CustomLink to={"/wordle"}>
              WORDLE
            </CustomLink>

            <CustomLink to={"/hangman"}>
             AHORCADO
            </CustomLink>

            <CustomLink to={"/soundgame"} >
              Game Sound 
            </CustomLink>

            <CustomLink to={"/"} >
              PUNTUACIONES
            </CustomLink>

          </ul>
        </nav>
      </div>
    </header>
  );
};
