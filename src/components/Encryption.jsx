import React from 'react'

const Encryption = ({ encrypt, encryptIndex }) => {

  // encryption should contain curnent encryption
  // it then make an array of swaps from the encryption
  // 

  return (
    <div className='encryption-container'>
      {encrypt.split('').map((char, index)=> (
        <h4
          key={index}
          style={{
            width: char===" "? ".75rem":null,
            color: encryptIndex[index] ? 'blue' : 'white',
          }}
        >
          {char.toLowerCase()}
        </h4>
      ))}
    </div>
  )
}

export default Encryption