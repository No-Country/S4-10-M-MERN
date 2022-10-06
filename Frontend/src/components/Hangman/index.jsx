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
import clueImg from '../../assets/img/intensamente.png'
import Loading from '../Loading/Loading';
//import Loading from '../Loading/Loading';

const words = ['intensamente','malefica', 'zootopia', 'ratatouille','enredados'];

const wordsDos = [
  {id:1, name:'intensamente', img:"assets/intensamente.png"},
  {id:2, name:'malefica',img:"assets/malefica.png"},
  {id:3, name:'zootopia', img:"assets/zootopia.png"},
  {id:4, name:'ratatouille', img:"assets/ratatouille.png"},
  {id:5, name:'enredados', img:"assets/enredados.png"}
];

let selectedWord = wordsDos[Math.floor(Math.random() * words.length)];




const Hangman = () =>{
  const [loading, setLoading] = useState(true);

  console.log(selectedWord);
  //const selectedNameWord = selectedWord[1]
  
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [correctSound] = useSound(boopSfx);
  const [errorSound] = useSound(wrongSound);
  

  
  useEffect(() => {
    setLoading(true)
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
    
    //console.log(wrongLetters);
    
    setTimeout(()=>{
      
      setLoading(false)
    },1500);

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
  
  const changeStyle = () => {
    console.log("you just clicked");
    setClues("clue");
    setButtonClues("buttonClue2")
  };

  return  loading ? (
    <div className='divLoader'>
     <Loading />
    </div>)
    : 
    <div className='bigHangman'>
    <div className="game-container">
      <div className='game-container-div'>
        <div className='div-hangman-wrongLetters'>
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <button className={buttonClue} onClick={changeStyle}>
            Pista   
          </button>
          <div className={clue}> 
            <img src={selectedWord.img} alt=""/>
          </div>
        </div>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <button className="btnPlayAgain" onClick={playAgain}>Volver a Jugar</button>


        <div className='divSolutionDev'>
          <p>*Solo para el desarrollo<br/>
          La solución es: <span>  {selectedWord.name.toUpperCase()}</span>
          </p>
        </div>
      </div>     
    </div>
    <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
    <Notification showNotification={showNotification} />
  </div> 
}

export default Hangman;