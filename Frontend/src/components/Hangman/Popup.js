import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkWin } from '../../helpers/HelpersHangman'

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
    const navigate = useNavigate() 

    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;
    
    if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
        finalMessage = 'Congratulations! You won! ';
        playable = false;
    } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
        finalMessage = 'GAME OVER';
        finalMessageRevealWord = `PALABRA: ${selectedWord}`;
        playable = false;
    }

    useEffect(() => setPlayable(playable));

    const NotPlayAgain = () =>{
        navigate("/")
    }

    return (
        <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
            <div className="popup">
                <h1>{finalMessage}</h1>
                <p>{finalMessageRevealWord}</p>

                <div>
                    <p>SCORE</p>
                    <p>8050</p>
                </div>
                
                <div>
                    <p>YOUR_MAX_SCORE</p>
                    <p>9430</p>
                </div>

                <div>
                    <p>HIGN_SCORE<span>9430</span></p>
                    <p>9850</p>
                </div>
                
                <br></br>

                <h2>Play Again?</h2>
                
                <div className='divPlayAgain'>
                    <h3 onClick={playAgain}>Yes</h3>
                    <h3 onClick={NotPlayAgain}>No</h3>
                </div>
            </div>
        </div>
    )
}

export default Popup
