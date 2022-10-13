import React, { useState, useEffect } from "react";
import Keypad from "../Keypad";
import { keys } from "./keys";
import useWordle from "../../../hooks/useWordle";
import Grid from "../Grid";
import "./index.css";

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
    //console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);
  {
    /*!isCorrect*/
  }

  return !isCorrect ? (
    <div className="radialBackground">
      <div className="generalText">Solución - {solution}</div>
      <div className="generalText">Actual jugada - {currentGuess}</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad keys={keys} usedKeys={usedKeys} />
      {turn >= 6 ? (
        <h1 style={{ color: "red" }}>
          No te quedan turnos, la solución era{" "}
          <span style={{ color: "#f00", fontSize: 42 }}>{solution}</span>
        </h1>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div>Ganaste</div>
  );
};
