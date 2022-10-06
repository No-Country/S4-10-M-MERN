import React from 'react'

const Word = ({ selectedWord, correctLetters }) => {
    console.log(selectedWord, "PALABRA LOCA");

    return (
        <div className="word" id="word">
            {selectedWord.name.split('').map((letter, index) => {
                //console.log(index);

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
