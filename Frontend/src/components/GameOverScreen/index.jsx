import React from 'react';
import "./index.css";
import { useNavigate } from "react-router-dom";
export default function GameOverScreen ({ isCorrect, solution, redirect }) {
    const navigate = useNavigate();
    const finalMessage = isCorrect ? "Ganaste" : "Perdiste";
    const finalMessageRevealWord = "La palabra era: " + solution;
    // info hardcodeada pre conexión al backend:
    const scoreData = { score: 5, yourMaxScore: 10, highScore: 200 };
    function notPlayAgain() {
      navigate("/");
    }
    
    // Al volver a jugar reiniciar los datos. Evitar recargar la página.
    //Esta función debería de formatear datos, etc etc. Cambiar luego
    function playAgain() {
        redirect ? navigate(redirect) : window.location.reload();
    }

    return (
        <div className="popup-container" style={{display:'flex'}}>
            <div className="popup">
                <h1>{finalMessage}</h1>
                <p>{finalMessageRevealWord}</p>

                <div>
                    <p>SCORE</p>
                    <p>{scoreData.score}</p>
                </div>
                
                <div>
                    <p>YOUR_MAX_SCORE</p>
                    <p>{scoreData.yourMaxScore}</p>
                </div>

                <div>
                    <p>HIGH_SCORE</p>
                    <p>{scoreData.highScore}</p>
                </div>
                
                <br></br>

                <h2>Jugar de nuevo?</h2>
                
                <div className='divPlayAgain'>
                    <h3 onClick={playAgain}>Sí</h3>
                    <h3 onClick={notPlayAgain}>No</h3>
                </div>
            </div>
        </div>
    )
}