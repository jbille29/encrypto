// api/getDailyPhrase.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Adjust the path to match the new location of encryptedPhrases.json
  const filePath = path.join(process.cwd(), 'data', 'encryptedPhrases.json');
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const phrases = JSON.parse(data);
    
    //const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const dayOfYear = 0
    const index = dayOfYear % phrases.length;
    
    
    res.status(200).json(phrases[index]);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to load the phrases', error: error.toString() });
  }
}
