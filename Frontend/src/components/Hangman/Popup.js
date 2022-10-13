import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkWin } from '../../helpers/HelpersHangman'
import gameOverSound from '../../assets/audio/gameOver.mp3'
import useSound from 'use-sound';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain , score}) => {
    const navigate = useNavigate() 
    const [gOverSound] = useSound(gameOverSound);

    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;
    
    if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
        finalMessage = 'Congratulations! You won! ';
        playable = false;
    } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
        finalMessage = 'GAME OVER';
        finalMessageRevealWord = `Palabra: ${selectedWord.name.toUpperCase()}`;
        playable = false;
    //    gOverSound()
    }

    useEffect(() => setPlayable(playable));

    const NotPlayAgain = () =>{
        navigate("/")
    }

    return (
        <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
            <div className="popup">
                <h1>{finalMessage}</h1>
                <h4 className='messengerGameOver'>{finalMessageRevealWord}</h4>

                <div>
                    <p>Tu_Puntaje</p>
                    <p>3300</p>
                </div>

                <div>
                    <p>Tu_Maximo_Puntaje</p>
                    <p>9600</p>
                </div>

                <div>
                    <p>Max_puntaje_gral</p>
                    <p>9850</p>
                </div>
                
                <br></br>

                <h2>Volver a Jugar?</h2>
                
                <div className='divPlayAgain'>
                    <h3 onClick={playAgain}>SI</h3>
                    <h3 onClick={NotPlayAgain}>NO</h3>
                </div>
            </div>
        </div>
    )
}

export default Popup
