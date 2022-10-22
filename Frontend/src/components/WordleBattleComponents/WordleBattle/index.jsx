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
  const [turn, setTurn] = useState(0);
  const [remotePlay, setRemotePlay] = useState([...Array(6)]);
  const [gameOver, setGameOver] = useState(false);
  const [solution, setSolution] = useState("")
  const { currentGuess, guesses, isCorrect, usedKeys, handleKeyup } = useWordle(
    solution,
    turn,
    setTurn
  );

  useEffect(() =>{
    client.emit("giveMeAWord", (res) => {
      setSolution(res.word.toLowerCase())
    });
  },[])

  useEffect(() => {
    client.on("newPlay", (play) => {
      setRemotePlay(play);
    });
    client.on("gameEnded", () => {
      setGameOver(true);
    });

    return () => {
      client.off("newPlay", (play) => {
        setRemotePlay(play);
      });
      client.off("gameEnded", () => {
        setGameOver(true);
      });
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    client.emit("newPlay", location.state.opponent, guesses, (res) => {
      console.log(res.status);
    });
    if (isCorrect) {
      client.emit("gameEnded", (res) => {
        console.log(res.status);
      });
    }
  }, [guesses]);

  return (
    <div className="radialBackground">
      {/* <div className="generalText">Solución - {solution}</div>
      <div className="generalText">Actual jugada - {currentGuess}</div> */}
      <div className="container-gral">
        <div className="local-grid">
          <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
        </div>
        <div className="remote-grid">
          <RemoteGrid guesses={remotePlay} />
        </div>
      </div>

      <Keypad keys={keys} usedKeys={usedKeys} />
      {(isCorrect || turn >= 6 || gameOver) && (
        <GameOverScreen isCorrect={isCorrect} solution={solution} redirect="/wordle-battle" />
      )}
    </div>
  );
}

export default WordleBattle;
