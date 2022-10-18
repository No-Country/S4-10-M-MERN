import React from 'react'

const Word = ({ selectedWord, correctLetters }) => {
    return (
        <div className="word" id="word">
            {selectedWord.split('').map((letter, index) => {
                return (
                    <span className="letter" key={index}>
                        {correctLetters.includes(letter) ? letter : ''}
                    </span>
                )
            })}
        </div>
    )
}

export default Word
