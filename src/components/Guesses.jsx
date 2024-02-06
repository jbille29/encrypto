import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const Guesses = ({ guesses }) => {
  return (
    <div className='guess-container'>

      {guesses.map((guess, index)=> {
        if(guess.phrase === null) {
          return (
            <div 
              key={index}
              className={guess.isCorrect? "correct-guess guess":"incorrect-guess guess"}>
              <p>{guess.swap[0]}</p>
              <FaArrowRight className='guess-arrow-icon'/>
              <p>{guess.swap[1]}</p>
            </div>
          )
        } else {
          return (
            <div 
              key={index}
              className={guess.isCorrect? "correct-guess guess phrase":"incorrect-guess guess phrase"}>
              {guess.phrase.map(letter => (
                <p>{letter}</p>
              ))}
            </div>
          )
        }
      })}
    </div>
  )
}

export default Guesses