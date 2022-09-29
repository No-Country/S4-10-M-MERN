import { useState } from "react";

// letter = l
//formatear una conjetura en una matriz de objetos de letras
// e.g. [{key: 'a', color: 'yellow'}]

// Retorna los colores que deben tener los divs con palabras despues de hacer submit
const setLettersColorsForWord = (solution, currentGuess) => {
  console.log("formatting the guess - ", currentGuess);
  // letras grises (no existen en la palabra)
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

//
// agrega un nuevo intento  al estado de intentos
// actualiza el estado isCorrect si el intento es correcto
// cambia el estado del turno (que n° de intento es)

const addNewGuess2 = (
  formattedGuess,
  turn,
  setIsCorrect,
  guesses,
  setGuesses,
  currentGuess,
  setCurrentGuess,
  solution,
  setHistory,
  history,
  setTurn,
  setUsedKeys
) => {
  if (currentGuess === solution) {
    setIsCorrect(true);
  }

  /* Esto lo que hace es agregar nuevas jugadas (todo el texto spliteado al Array de jugadas). Ejemplo:
   [
    0: {  key: 'd', color: 'grey' }, { key: 'a', color: 'green' }, etc (es un array de 5),
    1: {  key: 'd', color: 'grey' }, { key: 'j', color: 'green' }, etc (es un array de 5),
    2: {  key: 'c', color: 'grey' }, { key: 'z', color: 'green' }, etc (es un array de 5),
    3: undefined,
    4: undefined,
    5: undefined,
  ]*/

  setGuesses((prevGuesses) => {
    let newGuesses = [...prevGuesses];
    newGuesses[turn] = formattedGuess;
    return newGuesses;
  });

  // agregar la jugada
  setHistory([...history, currentGuess]);

  // aumentar el turno
  setTurn(turn + 1);

  // setear los coloresde las letras :3.... para el teclado
  setUsedKeys((prevUsedKeys) => {
    formattedGuess.forEach((letter) => {
      const currentColor = prevUsedKeys[letter.key];

      // Anteriormente existian 3 ifs, pero el amarillo no correspondía en los colores de las teclas
      if (letter.color === "green" || letter.color === "yellow") {
        prevUsedKeys[letter.key] = "green";
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
//
//

// const handleKeyup2 = ({ key }, currentGuess, history) => {
//   if (turn < 6 && !isCorrect) {
//     console.log("key pressed - ", key);
//     if (key === "Enter") {
//       // only add guess if turn is less than 5
//       if (turn > 6) {
//         console.log("you used all your guesses!");
//         return;
//       }
//       // do not allow duplicate words
//       if (history.includes(currentGuess)) {
//         alert("you already tried that word.");
//         return;
//       }
//       // check word is 5 chars
//       if (currentGuess.length !== 5) {
//         console.log("word must be 5 chars.");
//         return;
//       }

//       const formatted = setLettersColorsForWord(solution, currentGuess);
//       addNewGuess(formatted);
//       console.log(formatted);
//     }

//     if (key === "Backspace") {
//       setCurrentGuess((prev) => prev.slice(0, -1));
//       return;
//     }
//     if (/^[A-Za-z]$/.test(key)) {
//       if (currentGuess.length < 5) {
//         setCurrentGuess((prev) => prev + key);
//       }
//     }
//   }
// };

const useWordle = (solution, turn, setTurn) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // cada intento es un array
  const [history, setHistory] = useState([]); // cada intento en un historial
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'grey', b: 'green', c: 'yellow'} etc

  // Maneja el evento keyup y rastrea la conjetura actual
  // Si el usuario presiona enter, agrega la nueva suposición/intento
  // Al presionar Backspace este borra la última letra tipeada
  // Al presionar letras de rango A-Z este la agrega a las letras tipeadas (máximo son 5.)
  const handleKeyup = ({ key }) => {
    if (turn < 6 && !isCorrect) {
      console.log("key pressed - ", key);

      // Acción de escribir
      if (/^[A-Za-z]$/.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + key);
        }
      }

      // Acción de Borrar una letra
      if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      // Acción de submit en el Wordle
      if (key === "Enter") {
        // only add guess if turn is less than 5
        if (turn > 6) {
          // Se utilizaron todas las oportunidades
          console.log("you used all your guesses!");
          return;
        }
        // do not allow duplicate words
        // No esta permitido repetir jugadas
        if (history.includes(currentGuess)) {
          alert("you already tried that word.");
          return;
        }
        // check word is 5 chars
        // Necesito 5 caracteres
        if (currentGuess.length !== 5) {
          console.log("word must be 5 chars.");
          return;
        }

        // Setea los colores para los divs con palabras... y los retorna tmb entonces retorna un array de 5 posiciones, 1 para cada letra ingresada
        const currentWordPlayedWithColors = setLettersColorsForWord(
          solution,
          currentGuess
        );
        console.log(
          currentWordPlayedWithColors,
          "Palabra jugada + colores. Formato: Array[..loAnterior, { key: 'l', color: 'grey' }]"
        );

        //usa la información de los colores para setear cosas en el teclado y tmb chequear si el usuario gano, agregar jugadas spliteadas, agregar jugadas al historial, y aumentar el turno en +1
        addNewGuess2(
          currentWordPlayedWithColors,
          turn,
          setIsCorrect,
          guesses,
          setGuesses,
          currentGuess,
          setCurrentGuess,
          solution,
          setHistory,
          history,
          setTurn,
          setUsedKeys
        );
      }
    }
  };

  return { currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
