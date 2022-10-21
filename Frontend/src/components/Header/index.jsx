import React from "react";
import "./index.css";
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
            <li>
              <Link to={"/"} className="nav-header__link">
                HOME
              </Link>
            </li>
            <Authentication />
          </ul>
        </nav>
      </div>
    </header>
  );
};
