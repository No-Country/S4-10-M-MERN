import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../SocketIo/index.js";

import "./index.css";

function WordleBattlePrepare() {
  const navigate = useNavigate();
  const [myId, setMyId] = useState("");
  const [opponent, setOpponent] = useState("");
  const [state, setState] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    const stateAcceptGame = () => {
      setState(`Te han invitado a jugar una prtida`);
    };

    const stateStartGame = (player) => {
      setOpponent(player);
      setState("Partida aceptada, abriendo el Juego");
      setTimeout(() => startGame(), 1000);
    };

    if (Boolean(client.id)) {
      setMyId(client.id);
    } else{
      client.connect();
      client.on("connect", () => {
        console.log("conectado!");
        setMyId(client.id);
      });
    }
    client.on("acceptGame", stateAcceptGame);
    client.on("startGame", stateStartGame);

    return () => {
      client.off("acceptGame", stateAcceptGame);
      client.off("startGame", stateStartGame);
    };
  }, []);

  const saveOpponentId = (e) => {
    setOpponent(e.target.value);
  };

  const sendId = (e) => {
    e.preventDefault();
    if (opponent === myId) {
      setState("No puedes introducir tu propio ID#");
    } else {
      client.emit(
        "prepareGame",
        {
          transmitter: myId,
          opponent: opponent,
        },
        (response) => {
          setState(`Esperando a que el contrincante acepte la partida`);
        }
      );
    }
  };

  const acceptGame = () => {
    client.emit("gameAccepted", (res) => {
      setState("Has aceptado la partida, abriendo el juego");
      setOpponent(res.player);
      setTimeout(() => startGame(res.player), 1000);
    });
  };

  const startGame = (opponent2) => {
    navigate("/wordle-battle/game", {
      state: { id: myId, opponent, opponent2 },
    });
  };

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(myId);
    setCopiedId(true);
  };

  return (
    <div className="game-container">
      <div className="recuadro">
        <h4 className="generalText">MI ID#:</h4>
        <div className="space">
          <div className="idToClipboardText">{myId}</div>
          <div
            className={
              copiedId ? "idToClipboardIconVisited" : "idToClipboardIcon"
            }
            onClick={copyIdToClipboard}
          >
            <img
              src={require("./copy-icon.png")}
              className="copy-icon"
              alt="Copy to clipboard"
            />
          </div>
        </div>
      </div>
      <button
        onClick={acceptGame}
        className={
          state === `Te han invitado a jugar una prtida`
            ? "botonAceptar"
            : "hidden"
        }
      >
        ACEPTAR PARTIDA
      </button>
      <div className="recuadro">
        <h4 className="generalText">ID# CONTRINCANTE:</h4>
        <div className="space">
          <form onSubmit={sendId}>
            <input
              id="idContrincante"
              className="inputIdContrincante"
              onChange={saveOpponentId}
              type="text"
            />
            <input
              type="submit"
              className="buttonIdContrincante"
              id="enviador"
              value="INVITAR"
            />
          </form>
        </div>
      </div>
      <p className="generalText">Estado: </p>
      <p className="estado">{state}</p>
    </div>
  );
}

export default WordleBattlePrepare;
