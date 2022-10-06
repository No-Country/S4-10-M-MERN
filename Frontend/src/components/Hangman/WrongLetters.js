import React from 'react'

const WrongLetters = ({ wrongLetters }) => {
    return (
        <div className='div-wrong-letters-container'>
            <div className="wrong-letters-container">
                
             {/** {wrongLetters.length > 0 && <p>Erradas</p>} */}  
                <p>Erradas</p>

                <div className='div-wrong-letters'>
                    {wrongLetters.map((letter, i) => <span key={i}>{` ${letter}`}</span>)}
                </div>       
            </div>
        </div>
    )
}

export default WrongLetters