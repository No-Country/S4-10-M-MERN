import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import hangman from "../../assets/images/hangman.svg";
import wordle from "../../assets/images/wordle.svg";
import soundGame from "../../assets/images/soundGame.svg";
import fullColorHearth from "../../assets/images/fullColorHearth.svg";
import { userState } from "../../state";
import { useRecoilValue } from "recoil";

const GameButton = ({ children, to, imgURL }) => {
  const mayor = "> ";
  return (
    <Link to={to} className="linkTo">
      {mayor + children} <img src={imgURL} alt="Game Image" height={64} />
    </Link>
  );
};

const Welcome = () => {
  const userData = useRecoilValue(userState);
  const {username} = userData;
  return (
    <div className="welcomeContainer">
      <div className="greenContainer">
        <p className="greet">Bienvenido {username || "USUARIOX"}</p>
      </div>
      <div className="gamesInfoContainer">
        <h1>
          Retrogames <img src={fullColorHearth} alt="Hearth" />
        </h1>
        <div className="gamesContainer">
          <GameButton to={"/wordle-battle"} imgURL={wordle}>
            Wordle Battle
          </GameButton>
          <GameButton to={"/wordle"} imgURL={wordle}>
            Wordle
          </GameButton>
          <GameButton to={"/hangman"} imgURL={hangman}>
            Ahorcado
          </GameButton>
          <GameButton to={""} imgURL={soundGame}>
            Adivina la musica
          </GameButton>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
