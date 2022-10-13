import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cliente } from "../SocketIo";

import "./index.css";


function WordleBattlePrepare() {
  const navigate = useNavigate();
  const [miId, setMiId] = useState(cliente.id);
  const [contrincante, setContrincante] = useState("");
  const [jugada, setJugada] = useState([
    "green",
    "green",
    "green",
    "green",
    "red",
  ]);
  const [estado, setEstado] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    const estadoAceptarPartida = () => {
      setEstado(`Te han invitado a jugar una prtida`);
    }

    const estadoComienzaPartida = (player) => {
      setContrincante(player);
      setEstado("Partida aceptada, abriendo el Juego");
      setTimeout(() => comienzaPartida(), 1000);
    }

    cliente.on("aceptarPartida", estadoAceptarPartida);
    cliente.on("comienza partida", estadoComienzaPartida);

    return () => {
      cliente.off("aceptarPartida", estadoAceptarPartida);
      cliente.off("comienza partida", estadoComienzaPartida);
    };
  });

  const guardarContrincante = (e) => {
    setContrincante(e.target.value);
  };

  const enviador = (e) => {
    e.preventDefault();
    if (contrincante === miId) {
      setEstado("No puedes introducir tu propio ID#");
    } else {
      cliente.emit(
        "preparar pratida",
        {
          emisor: miId,
          contrincante: contrincante,
        },
        (response) => {
          setEstado(`Esperando a que el contrincante acepte la partida`);
        }
      );
    }
  };

  const botonAceptar = () => {
    cliente.emit("partida aceptada", (respuesta) => {
      setEstado("Has aceptado la partida, abriendo el juego");
      setContrincante(respuesta.jugador);
      setTimeout(() => comienzaPartida(respuesta.jugador), 2000);
    });
  };

  const comienzaPartida = (contrincante2) => {
    navigate("/wordle-battle/game", {
      state: { id: miId, contrincante, contrincante2 },
    });
  };

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(miId);
    setCopiedId(true);
  };

  return (
    <div className="game-container">
      <div className="recuadro">
        <h4 className="generalText">MI ID#:</h4>
        <div className="space">
          <div className="idToClipboardText">{miId}</div>
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
        onClick={botonAceptar}
        className={
          estado === `Te han invitado a jugar una prtida`
            ? "botonAceptar"
            : "hidden"
        }
      >
        ACEPTAR PARTIDA
      </button>
      <div className="recuadro">
        <h4 className="generalText">ID# CONTRINCANTE:</h4>
        <div className="space">
          <form onSubmit={enviador}>
            <input
              id="idContrincante"
              className="inputIdContrincante"
              onChange={guardarContrincante}
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
      <p className="estado">{estado}</p>
    </div>
  );
}

export default WordleBattlePrepare;
