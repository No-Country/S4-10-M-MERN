import React, { useState, useEffect } from 'react'
import '../../components/Hangman/index.css';
import Figure from '../../components/Hangman/Figure';
import Notification from '../../components/Hangman/Notification';
import Popup from '../../components/Hangman/Popup';
import Word from '../../components/Hangman/Word';
import WrongLetters from '../../components/Hangman/WrongLetters';
import { notificationPopup } from '../../helpers/HelpersHangman'
import useSound from 'use-sound';
import boopSfx from '../../assets/audio/monedaAcierto.mp3'
import wrongSound from '../../assets/audio/error.mp3'
import Loading from '../../components/Loading/Loading';


const Hangman = () =>{
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])// array de letras 
  const [wrongLetters, setWrongLetters] = useState([])//array de letras incorrectas
  const [showNotification, setShowNotification] = useState(false)//
  const [correctSound] = useSound(boopSfx);
  const [errorSound] = useSound(wrongSound);
  
  useEffect(() => {
    setLoading(true)
    fetch("https://s4-10-m-mern-production.up.railway.app/api/v1/movie/hangedman")
      .then((res) => res.json())
      .then((json) => {
        // random int between 0 & 
        setSolution(json);
        setLoading(false);
        console.log(json);
      });
      
    }, [playable]);
    


  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toUpperCase();
        console.log(solution.originalTitle);
        console.log(solution.originalTitle.split(" ").join(""));
        console.log(letter);

        if (solution.originalTitle.includes(letter)) {
          console.log("entra");
          if (!correctLetters.includes(letter)) {  
            correctSound()
            console.log("");
            setCorrectLetters([...correctLetters, letter]);
          } else {
            notificationPopup(setShowNotification)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters([...wrongLetters, letter])
            //errorSound()
          } else {
            notificationPopup(setShowNotification)
          }
        }
      }
    }    

    if(wrongLetters.length === 3){
      console.log("sale botón");
      setButtonClues("buttonClue")
    }
    
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown)
    
  },[correctLetters, wrongLetters, solution, playable, correctSound, errorSound])

  const playAgain = () => {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setButtonClues("buttonClue2")
    setClues("clueNone");
  }
  
  const [clue, setClues] = useState("clueNone");
  const [buttonClue, setButtonClues] = useState("buttonClue2");
  
  const score = (10 - wrongLetters.length) * 10 
  
  const changeStyle = () => {
    console.log("you just clicked");
    setClues("clue");
    setButtonClues("buttonClue2")
  };

  if(loading){
    return <Loading/>
  }

  const solucionAlterada = solution.originalTitle.split(" ");
  
        console.log(solution.originalTitle + "solucion-word", correctLetters);
  return (
    <div className="bigHangman">
      <div className="game-container">
        <div className="game-container-div">
          <div className="div-hangman-wrongLetters">
            <Figure wrongLetters={wrongLetters} />
            <WrongLetters wrongLetters={wrongLetters} />
            <button className={buttonClue} onClick={changeStyle}>
              Pista
            </button>
            <div className={clue}>
              <img src={solution.img} alt="" />
            </div>
          </div>

          {solucionAlterada && (
            <div className='divWords'>
              {solucionAlterada.map((palabra) => (
                <Word solution={palabra} correctLetters={correctLetters} />
              ))}
            </div>
          )}
          {/*<Word solution={solution.originalTitle} correctLetters={correctLetters} />*/}

          <button className="btnPlayAgain" onClick={playAgain}>
            Volver a Jugar
          </button>

          <div className="divSolutionDev">
            <p>
              *Solo para el desarrollo
              <br />
              La solución es: <span>{solution.originalTitle}</span>
            </p>
            <p style={{ color: "white" }}>Puntos :{score}</p>
          </div>
        </div>
      </div>

      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        solution={solution.originalTitle.split(" ").join("")}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />

      <Notification showNotification={showNotification} />
    </div>
  ); 
}

export default Hangman;