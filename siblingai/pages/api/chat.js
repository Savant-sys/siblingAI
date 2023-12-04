// pages/api/chat.js
import fs from 'fs';
import path from 'path';

const brainFilePath = path.join(process.cwd(), 'data', 'brain.json');

const loadBrain = () => {
  try {
    const data = fs.readFileSync(brainFilePath, 'utf8');
    return JSON.parse(data).questions;
  } catch (error) {
    if (error.code === 'ENOENT') {
      saveBrain({ questions: [] });
      return [];
    } else {
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

    const response = questions.find(q => q.question.toLowerCase() === message.toLowerCase());
    if (response) {
      res.status(200).json({ answer: response.answer });
    } else {
      res.status(200).json({ answer: "I don’t know that. Can you teach me?", learn: true });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
