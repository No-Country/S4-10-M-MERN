import React, { useState, useEffect } from "react";
import "./index.css";
import Keypad from "../Keypad";
import { keys } from "./keys";
import useWordle from "../../../hooks/useWordle";
import Grid from "../Grid";
import GameOverScreen from "../../GameOverScreen";
import PageTitle from "../../PageTitle/index.jsx";
import wordle from "../../../assets/images/wordle.svg";

export const Wordle = ({ solution }) => {


  const [turn, setTurn] = useState(0);
  const { currentGuess, guesses, isCorrect, usedKeys, handleKeyup } = useWordle(
    solution,
    turn,
    setTurn
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);
  {
    /*!isCorrect*/
  }

  return (
    <div className="radialBackground">
      <PageTitle text="Wordle" icon={wordle} />
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad keys={keys} usedKeys={usedKeys} />
      {(isCorrect || turn >= 6) && (
        <GameOverScreen isCorrect={isCorrect} solution={solution} />
      )}
    </div>
  );
};
