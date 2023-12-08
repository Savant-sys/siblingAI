// pages/api/chat.js
import fs from 'fs';
import path from 'path';
import stringSimilarity from 'string-similarity'; // Import the library

const brainFilePath = path.join(process.cwd(), 'data', 'brain.json');

const loadBrain = () => {
  try {
    const data = fs.readFileSync(brainFilePath, 'utf8');
    const parsedData = JSON.parse(data);

    // Check if parsedData has the 'questions' property and it's an array
    if (parsedData && Array.isArray(parsedData.questions)) {
      return parsedData.questions;
    } else {
      // If not, initialize with an empty questions array
      saveBrain([]);
      return [];
    }
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      // File not found or JSON parsing error, initialize with an empty questions array
      saveBrain([]);
      return [];
    } else {
      // Other errors, rethrow
      throw error;
    }
  }
};

const saveBrain = (brain) => {
  fs.writeFileSync(brainFilePath, JSON.stringify({ questions: brain }, null, 2), 'utf8');
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    const questions = loadBrain();

    let bestMatch = { bestMatch: { rating: 0 } };

    if (questions.length > 0) {
      // Find the best match for the user's message
      bestMatch = stringSimilarity.findBestMatch(message.toLowerCase(), questions.map(q => q.question.toLowerCase()));
    }

    if (bestMatch.bestMatch.rating > 0.6) { // You can adjust this threshold
      // If a similar question is found
      const response = questions[bestMatch.bestMatchIndex];
      res.status(200).json({ answer: response.answer });
    } else {
      // If no similar question is found
      res.status(200).json({ answer: "I don’t know that. Can you teach me?", learn: true });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
