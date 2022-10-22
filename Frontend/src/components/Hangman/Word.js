import React from 'react'

const Word = ({ solution, correctLetters }) => {

    return (
        <div className="word" >
            {solution.split('').map((letter, index) => {
                if(letter !== " "){
                    return (
                        <span className="letter" key={index}>
                            {correctLetters.includes(letter) ? letter : ''}
                        </span>
                    )
                }else{
                    return <span className='noLetter' ></span>
                }
            })}
        </div>
    )
}

export default Word
