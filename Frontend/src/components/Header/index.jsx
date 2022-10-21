import React from "react";
import "./index.css";
<<<<<<< HEAD
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
=======
import { Link } from "react-router-dom";
import whiteHearth from "../../assets/images/whiteHearth.svg";
import { useRecoilValue } from "recoil";
import { userState } from "../../state";

const Authentication = () => {
  const userData = useRecoilValue(userState);
  const { token, username } = userData;
  return (
    <>
      {!Boolean(token) ? (
        <>
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
        </>
      ) : (
        <li>
          <p to={"/signup"} className="nav-header__link usernameShadow">
            {username.toUpperCase()}
          </p>
        </li>
      )}
    </>
  );
};
>>>>>>> 8de38f0b744fa503679dca1e20170ff2d1b9c1c4

export const Header = () => {
  return (
    <header>
      <div className="header__container">
        <nav className="nav-header">
          <Link to="/" className="logo__container">
            <h1 className="logo">
              RETR
              <img src={whiteHearth} alt="Retro logo" />
            </h1>
          </Link>
          <ul>
<<<<<<< HEAD

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

=======
            <li>
              <Link to={"/"} className="nav-header__link">
                HOME
              </Link>
            </li>
            <Authentication />
>>>>>>> 8de38f0b744fa503679dca1e20170ff2d1b9c1c4
          </ul>
        </nav>
      </div>
    </header>
  );
};
