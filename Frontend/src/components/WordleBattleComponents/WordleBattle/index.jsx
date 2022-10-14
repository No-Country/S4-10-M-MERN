import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { client } from "../SocketIo/index.js";
import Keypad from "../../WordleComponents/Keypad";
import { keys } from "../../WordleComponents/Wordle/keys.js";
import useWordle from "../../../hooks/useWordle.js";
import Grid from "../../WordleComponents/Grid";
import RemoteGrid from "../RemoteGrid/index.jsx";
import GameOverScreen from "../../GameOverScreen/index.jsx";

import "./index.css";


function WordleBattle() {
  const location = useLocation();
  const solution = "pater"
  const [turn, setTurn] = useState(0);
  const [remotePlay, setRemotePlay] = useState([...Array(6)]);
  const { currentGuess, guesses, isCorrect, usedKeys, handleKeyup } = useWordle(
    solution,
    turn,
    setTurn
  );


  useEffect(()=>{
    client.on("newPlay", (play) => {
      setRemotePlay(play)
    });
    return () => {
      client.on("newPlay", (play) => {
        setRemotePlay(play)
      });
    };
  }, [])

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
      client.emit(
        "newPlay",location.state.opponent, guesses,
        (res) => {
          console.log(res.status + " ok");
        }
      );
  }, [guesses]);

  //Envia una jugada al contrincantre

  return (
    <div className="radialBackground">
      <div className="generalText">Solución - {solution}</div>
      <div className="generalText">Actual jugada - {currentGuess}</div>
      <div className="container">
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <RemoteGrid guesses={remotePlay}/>
      </div>

      <Keypad keys={keys} usedKeys={usedKeys} />
      {(isCorrect || turn >= 6) && <GameOverScreen isCorrect={isCorrect} solution={solution}/>}

    </div>
      )
};

export default WordleBattle;
