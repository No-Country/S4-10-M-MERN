import { useState } from "react";

const useWordle = (solution, turn, setTurn) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // cada intento es un array
  const [history, setHistory] = useState([]); // cada intento en un historial
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'grey', b: 'green', c: 'yellow'} etc

  // letter = l
  //formatear una conjetura en una matriz de objetos de letras
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    console.log("formatting the guess - ", currentGuess);
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    // encuentra letras verdes
    formattedGuess.forEach((letter, i) => {
      if (solution[i] === letter.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // encuentra letras amarillas
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // agrega un nuevo intento  al estado de intentos
  // actualiza el estado isCorrect si el intento es correcto
  // cambia el estado del turno (que n° de intento es)
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((letter) => {
        const currentColor = prevUsedKeys[letter.key];

        if (letter.color === "green") {
          prevUsedKeys[letter.key] = "green";
          return;
        }

        if (letter.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[letter.key] = "yellow";
          return;
        }

        if (letter.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[letter.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });
    // Reset de casillas
    setCurrentGuess("");
  };

  // analizar
  // maneja el evento keyup y rastrea la conjetura actual
  // si el usuario presiona enter, agrega la nueva suposición/intento
  // Agregar un if que chequee el turno, si es superior a 5 que no ejecute nada
  const handleKeyup = ({ key }) => {
    if (turn < 6 && !isCorrect) {
      console.log("key pressed - ", key);
      if (key === "Enter") {
        // only add guess if turn is less than 5
        if (turn > 6) {
          console.log("you used all your guesses!");
          return;
        }
        // do not allow duplicate words
        if (history.includes(currentGuess)) {
          alert("you already tried that word.");
          return;
        }
        // check word is 5 chars
        if (currentGuess.length !== 5) {
          console.log("word must be 5 chars.");
          return;
        }

        const formatted = formatGuess();
        addNewGuess(formatted);
        console.log(formatted);
      }

      if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }
      if (/^[A-Za-z]$/.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + key);
        }
      }
    }
  };

  return { currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
