import React, { useState } from 'react'
import "./index.css";
import useSound from 'use-sound';
import imgPlay from '../../assets/img/btnPlay.png'
import GameOverScreen from '../GameOverScreen';

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

    setMovieName("")
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
    
    return (
      <div className='btnplay-container' onClick={(event) => {
          //audio.loop = true;
          audio.play()}}
      ></div>  
    );
  }

  return (
    <div className='soundGameContainer'>       
      <Sound/>
      <form onSubmit={enviarPelicula} className="formSoundGame">
          <label className='labelMovieName'>
            Nombre de la pelicula 
          </label>
          <input type="text" name="movieName" onChange={handleImputChange} className="inputSound"  value={movieName} autoComplete="off"/>
          <button type="submit" value="Adivinar" className='btnAdivinarSound' >ADIVINAR</button>
      </form>


      <div className="wrong-words-container">
        {/** {wrongLetters.length > 0 && <p>Erradas</p>} */}  
          <p>Erradas</p>

          <div className='worngWordSound'>
              {history.map((wrongWord, i) => <span key={i}>{` ${wrongWord}`}</span>)}
          </div>       
      </div>
     
      <div className="wrong-container">
        <button className={buttonClue} onClick={changeStyle}>
          Pista
        </button>
        <div className={clue}>
          <img src={solution.solution.img} alt="" />
        </div>
      </div>

      {(isCorrect || turn >= 6) && <GameOverScreen isCorrect={isCorrect} solution={solution.solution.originalTitle}/>}

{/*      <h1 style={{color : "white"}}>
        {turn}
  </h1>*/}
    </div>
  )
}

