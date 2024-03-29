import React from 'react'

const LetterHistogram = ({ encrypt }) => {
  const frequency = countLetterFrequency(encrypt);
  const sortedKeys = Object.keys(frequency).sort(); // Sort letters alphabetically

  return (
    <div className='histogram-container'>
      {sortedKeys.map(letter => (
        <div className='histogram-letter'>
          {letter} {Array(frequency[letter]).fill(0).map((_, i) => (
            <div key={i} className='histogram-tile'></div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default LetterHistogram

function countLetterFrequency(phrase) {
  const frequency = {};
  for (let char of phrase) {
    if (char.match(/[a-z]/i)) { // Only consider alphabetical characters
      const letter = char.toLowerCase();
      frequency[letter] = (frequency[letter] || 0) + 1;
    }
  }
  return frequency;
}