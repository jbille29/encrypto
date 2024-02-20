import React, {useEffect, useState} from 'react'

const PhraseInput = ({ selectedInput, setSelectedInput, secretPhrase, phraseInput }) => {
  
  const secretPhraseArray = secretPhrase.split(' ')
  let overallCharIndex = 0;

  return (
    <div
      className='phrase-input-container'
      onClick={()=>setSelectedInput('phrase')}>
    
      {secretPhraseArray.map((word, index) => (
        <div 
          className='phrase-input-word'
          key={index}>
          {word.split('').map((char, charIndex) => {
            const displayIndex = overallCharIndex; // Capture the current count before incrementing
            overallCharIndex++; // Increment the counter for each character
            return (
              <div key={displayIndex} className={`phrase-input-blocks box ${selectedInput === 'phrase' && phraseInput[displayIndex] ? 'animate' : 'no-animate'}`}>
                <p>{phraseInput[displayIndex]}</p>
              </div>
            )
          })}
        </div>
      ))}        
    </div>
  )
}

export default PhraseInput

// I'm going to have to render it in chunks <div>word</div> <div>space</div> so that flex wrap doesn't split up words
 