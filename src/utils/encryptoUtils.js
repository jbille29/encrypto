import fs from 'fs';

function generateMapping() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const shuffled = alphabet.slice().sort(() => 0.5 - Math.random());
    const mapping = {};
    alphabet.forEach((letter, index) => {
      mapping[letter] = shuffled[index];
    });
    return mapping;
  }
  
  function encryptString(input, mapping) {
    let encryptedString = '';
    const usedMappings = [];
  
    for (let char of input.toLowerCase()) {
      if (mapping[char]) {
        encryptedString += mapping[char];
        if (!usedMappings.some(([original,]) => original === char)) {
          usedMappings.push([char, mapping[char]]);
        }
      } else {
        encryptedString += char;
      }
    }
  
    return { encryptedString, usedMappings };
  }
  
  function encryptPhrases(phrases) {
    const results = [];
  
    for (let phrase of phrases) {
      const mapping = generateMapping(); // Generate a new mapping for each phrase to keep it unique
      const { encryptedString, usedMappings } = encryptString(phrase, mapping);
      results.push({
        original: phrase,
        encrypted: encryptedString,
        mappings: usedMappings
      });
    }
  
    return results;
  }
  
  // Example usage
  const phrases = ["hello world", "the quick brown fox", "jumps over the lazy dog"];
  const encryptedPhrases = encryptPhrases(phrases);
  
  console.log(encryptedPhrases);

  // Convert the results to a JSON string
const dataJSON = JSON.stringify(encryptedPhrases, null, 2); // Pretty-print the JSON

// Write the JSON string to a file
fs.writeFile('encryptedPhrases.json', dataJSON, 'utf8', (err) => {
  if (err) {
    console.log('An error occurred while writing JSON to file:', err);
  } else {
    console.log('JSON data has been saved to "encryptedPhrases.json".');
  }
});
  