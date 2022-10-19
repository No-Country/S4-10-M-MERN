import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
const GameCard = ({ children, gameDescription, to }) => {
  return (
    <div className="gameCardContainer">
      <h2>{children}</h2>
      <img
        src="https://res.cloudinary.com/richardiral/image/upload/v1665534064/yfe5x1tgowhj4tefbjzd.jpg"
        alt="imagen juego"
        width={300}
        height={"auto"}
      />
      <Link className="linkTo" to={to}>
        Ir al juego
      </Link>
    </div>
  );
};

const Welcome = () => {
  return (
    <div className="welcomeContainer">
      <div className="greenContainer">
        <p className="greet">Bienvenido USUARIOX</p>
      </div>
      <div className="gamesInfoContainer">
        <h1>Estos son los juegos disponibles</h1>
        <div className="gamesContainer">
          {/* titulo, foto, descripción y boton para ir a jugar */}
          <GameCard to={"/wordle-battle"} gameDescription={"No funciona aun"}>
            Wordle Battle
          </GameCard>
          <GameCard to={"/wordle"} gameDescription={"No funciona aun"}>
            Wordle
          </GameCard>
          <GameCard to={"/hangman"} gameDescription={"No funciona aun"}>
            Ahorcado
          </GameCard>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
