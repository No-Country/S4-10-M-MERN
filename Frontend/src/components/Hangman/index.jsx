import React, { useState, useEffect } from 'react'
import './index.css';
import Figure from './Figure';
import Notification from './Notification';
import Popup from './Popup';
import Word from './Word';
import WrongLetters from './WrongLetters';
import { notificationPopup } from '../../helpers/HelpersHangman'
import useSound from 'use-sound';
import boopSfx from '../../assets/audio/monedaAcierto.mp3'
import wrongSound from '../../assets/audio/error.mp3'
import Loading from '../Loading/Loading';
import PageTitle from '../PageTitle/index.jsx';
import hangman from "../../assets/images/hangman.svg";

const wordsDos = [
  {id:1, name:'intensamente', img:"assets/intensamente.png"},
  {id:2, name:'malefica',img:"assets/malefica.png"},
  {id:3, name:'zootopia', img:"assets/zootopia.png"},
  {id:4, name:'ratatouille', img:"assets/ratatouille.png"},
  {id:5, name:'enredados', img:"assets/enredados.png"}
];

let selectedWord = wordsDos[Math.floor(Math.random() * wordsDos.length)];

const Hangman = () =>{

  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    },1500);
  },[])

  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])// array de letras 
  const [wrongLetters, setWrongLetters] = useState([])//array de letras incorrectas
  const [showNotification, setShowNotification] = useState(false)//
  const [correctSound] = useSound(boopSfx);
  const [errorSound] = useSound(wrongSound);
  
  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        
        if (selectedWord.name.includes(letter)) {
          
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
    
  },[correctLetters, wrongLetters, playable, correctSound, errorSound])

  const playAgain = () => {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setButtonClues("buttonClue2")
    setClues("clueNone");
    const random = Math.floor(Math.random() * wordsDos.length);
    selectedWord = wordsDos[random];
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
  
  return (
    <>
      <PageTitle text="Ahorcado" icon={hangman} />
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
                <img src={selectedWord.img} alt="" />
              </div>
            </div>

            <Word selectedWord={selectedWord} correctLetters={correctLetters} />
          </div>
        </div>

        <Popup
          correctLetters={correctLetters}
          wrongLetters={wrongLetters}
          selectedWord={selectedWord}
          setPlayable={setPlayable}
          playAgain={playAgain}
        />

        <Notification showNotification={showNotification} />
      </div>
    </>
  ); 
}

export default Hangman;