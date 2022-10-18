import React, { useState } from 'react'
import "./index.css";
import useSound from 'use-sound';

export const SoundG = (solution) => {
  const [guessMovie, setGuessMovie] = useState("");
  const [movieName, setMovieName] = useState("")
  const [turn, setTurn] = useState(0);
  const [movieSound] = useSound(solution?.audio);

  const [history, setHistory] = useState([]); // cada intento en un historial
  const [isCorrect, setIsCorrect] = useState(false);


  
  const handleImputChange = (event) => {
    setMovieName(event.target.value)
  }

  const enviarPelicula = (event) => {
    event.preventDefault()

    let guessMovie = movieName.toUpperCase()
    console.log(guessMovie);

    if (guessMovie === solution.solution.originalTitle) {
      setIsCorrect(true);
    }else{

    }

    setHistory((prevHistory) => {
      return [...prevHistory, guessMovie];
    });

    console.log(history);
    console.log(isCorrect);

    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
      
  }


  const [clue, setClues] = useState("clueNone");
  const [buttonClue, setButtonClues] = useState("buttonClueSound");

  const changeStyle = () => {
    console.log("you just clicked");
    setClues("clueSound");
    setButtonClues("buttonClueSound2")
  };

  const Sound =() => {
    const audio = new Audio(solution?.solution.audio);
    audio.loop = true;
  
    return (
      <div>
        <button
          onClick={(event) => {
            event.preventDefault()
            audio.loop = true;
            audio.play();
          }}
        >
          Play
        </button>
        
        <button onClick={() => (audio.loop = false)}>Pause</button>
      </div>
    );
  }

  return (
    <div className='soundGameContainer'>       
      <Sound/>
      <form onSubmit={enviarPelicula} className="formSoundGame">
          <label className='labelMovieName'>
            Nombre de la pelicula 
          </label>
          <input type="text" name="movieName" onChange={handleImputChange}  value={movieName}/>
          <button type="submit" value="Adivinar" className='btnAdivinarSound' >ADIVINAR</button>
      </form>

      <h1 style={{color : "white"}}>{history}{turn}</h1>
     
      <div className="wrong-container">
        <button className={buttonClue} onClick={changeStyle}>
          Pista
        </button>
        <div className={clue}>
          <img src={solution.solution.img} alt="" />
        </div>
      </div>
    </div>
  )
}

