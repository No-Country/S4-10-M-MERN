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

const words = ['tiburon', 'matrix', 'scarface'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const BoopButton = () => {
  const [play] = useSound(boopSfx);
  return <button onClick={play}>Boop!</button>;
};

function Hangman() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {  
              setCorrectLetters(curr => [...curr, letter])
            } else {
              notificationPopup(setShowNotification)
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(curr => [...curr, letter])
            } else {
              notificationPopup(setShowNotification)
            }
          }
        }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [correctLetters, wrongLetters, playable])

  function playAgain() {
    setPlayable(true);
    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>

      <div className="game-container">
        <div className='game-container-div'>
        {<h5>solución: {selectedWord}</h5>}
          <div className='div-hangman-wrongLetters'>
            <Figure wrongLetters={wrongLetters} />
            <WrongLetters wrongLetters={wrongLetters} />
          </div>
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default Hangman;