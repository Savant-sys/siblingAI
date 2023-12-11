// pages/api/chat/learn.js

// learn.js is for importing data into brain.json when the question doesnt exist from the user's response
import fs from 'fs';
import path from 'path';

const brainFilePath = path.join(process.cwd(), 'data', 'brain.json');

const loadBrain = () =>
{
  const data = fs.readFileSync(brainFilePath, 'utf8');
  return JSON.parse(data).questions;
};

const saveBrain = (brain) =>
{
  fs.writeFileSync(brainFilePath, JSON.stringify({ questions: brain }, null, 2), 'utf8');
};

export default function handler(req, res)
{
  const { question, answer } = req.body;
  const questions = loadBrain();

  questions.push({ question, answer });
  saveBrain(questions);
  res.status(200).json({ message: 'Thanks for teaching me.' });
}
