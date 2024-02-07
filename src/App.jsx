import { useState, useEffect, useCallback } from 'react'


import LetterHistogram from './components/LetterHistogram'
import Encryption from './components/Encryption'
import Swap from './components/Swap'
import PhraseInput from './components/PhraseInput'
import Guesses from './components/Guesses'
import Navbar from './components/Navbar'
import Modal from './components/Modal'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [phraseData, setPhraseData] = useState(null)
  const [secretPhrase, setSecretPhrase] = useState('')
  const [correctSwaps, setCorrectSwaps ] = useState([[]])
  const [encrypt, setEncrypt] = useState('')

  const [encryptNoSpaces, setEncryptNoSpaces] = useState("")
  const [encryptIndex, setEncryptIndex ] = useState([])
  const [secretPhraseNoSpaces, setSecretPhraseNoSpaces] = useState([])
  
  
  const [selectedInput, setSelectedInput] = useState('swap')
  const [phraseInput, setPhraseInput] = useState([])
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [swapInput, setSwapInput] = useState(["",""])
  const [swapIndex, setSwapIndex] = useState(0)
  const [guesses, setGuesses] = useState([]) 
  const [gameState, setGameState] = useState({
    gameOver: false,
    guessedPhrase: false,
  });
  const [playsRemaining, setPlaysRemaining] = useState(8)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/getDailyPhrase');
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await res.json();
        setPhraseData(data);
        setEncrypt(data.encrypted)
        setSecretPhrase(data.original)
        setCorrectSwaps(data.mappings)

        setEncryptNoSpaces(data.encrypted.split('').filter((item) => item !== " "))
        setEncryptIndex(new Array(data.encrypted.length).fill(null))
        const noSpaces = data.original.split('').filter((item) => item !== " ")
        setSecretPhraseNoSpaces(noSpaces)
        setPhraseInput(new Array(noSpaces.length).fill(''))
        
      } catch (error) {
        console.error('Error fetching daily phrase:', error);
      }
    }
    
    fetchData();
  }, []);

  const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback(
    (event) => {
      //ffdif (gameOver.gameOver) return;
      if (event.key === "Enter") {
        if(selectedInput === 'swap') { 
          onEnterSwap()
        } else { 
          onEnterPhrase()
        }
      } else if (event.key === "Backspace") {
        if(selectedInput === 'swap') { 
          onBackspaceSwap()
        } else {
          onBackspacePhrase()
        }
      } else {
        keys.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            if(selectedInput === 'swap') { 
              onSelectLetterSwap(key) 
            } else {
              onSelectLetterPhrase(key)
            }
          }
        });
      }
    }, [phraseIndex, swapIndex, selectedInput, playsRemaining]
  );

  const onEnterPhrase = () => {
    let isCorrect = true

    // Normalize arrays by converting all strings to lowercase
    const lowerCaseArr1 = phraseInput.map(element => element.toLowerCase());
    const lowerCaseArr2 = secretPhraseNoSpaces.map(element => element.toLowerCase());

    // Check if phraseInput is not filled out
    if(lowerCaseArr1.some(element => element === "")) {
      alert('phrase not long enough')
      return
    }

    // Compare arrays element by element
    for (let i = 0; i < lowerCaseArr1.length; i++) {
      // wrong
      if (lowerCaseArr1[i] !== lowerCaseArr2[i]) {
        isCorrect = false
      }
    }
    // update encryption

    // update guesses
    const newGuess = [...guesses, {
      phrase: phraseInput,
      swap: null,
      isCorrect
    }]
    setGuesses(newGuess)

    // increment turn
    if (playsRemaining <= 1) {
      setGameState((prevGameState) => ({
        ...prevGameState,
        gameOver: true
      }))
    }
    setPlaysRemaining(playsRemaining - 1)

    setPhraseIndex(0)
    setPhraseInput(new Array(secretPhraseNoSpaces.length).fill(''))
  }

  const onEnterSwap = () => {
    // check if pair has already been guessed

    // check if letter is in encryption and if it's been swapped
    let swappableIndexes = []
    for(let i=0; i<encrypt.length; i++) {
      // check if letter is in encryption
      if(swapInput[0].toLowerCase() === encrypt[i].toLowerCase()) {
        // check if index has already been swapped
        if(encryptIndex[i] === null) {
          swappableIndexes.push(i)
        }
      }
    }
    // check if any swaps are possible
    if (swappableIndexes.length === 0) {
      alert("invalid swap")
      setSwapInput(["",""])
      setSwapIndex(0)
      return
    }

    // check if pair is correct
    let isCorrect = false; // Flag to indicate if a match is found

    // Iterate through each pair in the multidimensional array
    for (const pair of correctSwaps) {
      // Check if the pair matches the letters
      if (pair[0].toLowerCase() === swapInput[0].toLowerCase() && pair[1].toLowerCase() === swapInput[1].toLowerCase()) {
        isCorrect = true;
        break; // Stop the loop if a match is found
      }
    }
    
     // update encrypt phrase
    if (isCorrect) swapLetters(swapInput[0], swapInput[1], swappableIndexes)
   
  
    // store swap
    const newGuess = [...guesses, {
      phrase: null,
      swap: swapInput,
      isCorrect
    }]
    setGuesses(newGuess)

    // increment turn
    if (playsRemaining <= 1) {
      setGameState((prevGameState) => ({
        ...prevGameState,
        gameOver: true
      }))
    }
    setPlaysRemaining(playsRemaining - 1)
    setSwapInput(["",""])
    setSwapIndex(0)
  }

  const swapLetters = (originalLetter, newLetter, swappableIndexes) => {
    const uppercaseEncrypt = encrypt.toUpperCase();
    const uppercaseOriginalLetter = originalLetter.toUpperCase();
    const encryptArray = encrypt.split('');
    
    const indexes = [];

    for (let i = 0; i < encryptArray.length; i++) {
      if (uppercaseEncrypt[i] === uppercaseOriginalLetter && swappableIndexes.includes(i)) {
        encryptArray[i] = newLetter;
        indexes.push(i);
      }
    }

    setEncrypt(encryptArray.join(''));

    // Update the corresponding indexes to true when a correct letter is guessed
    const updatedEncryptIndex = [...encryptIndex];
    for (const index of indexes) {
      updatedEncryptIndex[index] = true;
    }
    setEncryptIndex(updatedEncryptIndex);
  }

  const onBackspacePhrase = () => {
    if(phraseIndex < 1) return
    const newPhrase = [...phraseInput]
    newPhrase[phraseIndex - 1] = ""
    setPhraseInput(newPhrase)
    setPhraseIndex(phraseIndex - 1)
  }

  const onBackspaceSwap = () => {
    if(swapIndex < 1) return
    const newSwap = [...swapInput]
    newSwap[swapIndex - 1] = ""
    setSwapInput(newSwap)
    setSwapIndex(swapIndex - 1)
  }

  const onSelectLetterPhrase = (key) => {
    if(phraseIndex > encryptNoSpaces.length-1) return
    const newPhrase = [...phraseInput]
    newPhrase[phraseIndex] = key
    setPhraseInput(newPhrase)
    setPhraseIndex(phraseIndex + 1)
  }

  const onSelectLetterSwap = (key) => {
    // check if both letters are full
    if(swapIndex > 1) return
    const newSwap = [...swapInput]
    newSwap[swapIndex] = key
    setSwapInput(newSwap)
    setSwapIndex(swapIndex + 1)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className='App'>
      
      <Navbar />
      {phraseData ? (
        <div className="game">
          <div className='game-row-1'>
          <Encryption
              encrypt={encrypt}
              encryptIndex={encryptIndex}
          />
          </div>
          <div className="game-row-2">
            <div className="game-column-1">
              
              <Swap 
                selectedInput={selectedInput}
                setSelectedInput={setSelectedInput}
                swapInput={swapInput}
              />
              <PhraseInput 
                selectedInput={selectedInput}
                setSelectedInput={setSelectedInput}
                secretPhrase={secretPhrase} 
                phraseInput={phraseInput}  
              />
              
            </div>
            <div className="game-column-2">
              <Guesses 
                guesses={guesses}
              />
            </div>   
          </div>
          <div className="game-row-3">
            <LetterHistogram 
              encrypt={encrypt}
            /> 
            <div className='plays-remaining-container'>
              <p>Plays Remaining:</p>
              <h2>{playsRemaining}</h2>
            </div>
          </div>
          
          
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div>
        <button onClick={toggleModal}>Open Modal</button>
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} />
      </div>
      

      {gameState.gameOver && (
        <div className='game-over'>
          GAME OVER
        </div>
      )}
      
      
    </div>
  )
}

export default App
