import React, { useState, useEffect } from "react";
import "./index.css";
import Keypad from "../Keypad";
import { keys } from "./keys";
import useWordle from "../../../hooks/useWordle";
import Grid from "../Grid";
import GameOverScreen from "../../GameOverScreen";
export const Wordle = ({ solution }) => {
  const [encendido, setEncendido] = useState(false);
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
    console.log(turn ,"log "  ,guesses, turn, isCorrect);
    if (turn === 2){
      console.log('llegaste al 2do Turno');
    }
  }, [guesses, turn, isCorrect]);
  {
    /*!isCorrect*/
  }

  return (
    <div className="radialBackground">
      <div className="generalText">Solucion - {solution}</div>
      <div className="generalText">Actual jugada - {currentGuess}</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad keys={keys} usedKeys={usedKeys} />
      {(isCorrect || turn >= 6) && <GameOverScreen isCorrect={isCorrect} solution={solution}/>}
    </div>
  ); 
};
