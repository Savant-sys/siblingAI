// pages/api/chatbot.js
import fs from 'fs';
import path from 'path';

const brainFilePath = path.join(process.cwd(), 'data', 'brain.json');

const loadBrain = () => {
  try {
    const data = fs.readFileSync(brainFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      saveBrain({ questions: [] });
      return { questions: [] };
    } else {
      throw error;
    }
  }
};

const saveBrain = (brain) => {
  fs.writeFileSync(brainFilePath, JSON.stringify(brain, null, 2), 'utf8');
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { message, learn, question } = req.body;
    const brain = loadBrain();

    if (learn && question) {
      brain.questions.push({ question, answer: message });
      saveBrain(brain);
      return res.status(200).json({ message: 'Learning successful.' });
    }

    const response = brain.questions.find(q => q.question.toLowerCase() === message.toLowerCase());
    if (response) {
      res.status(200).json({ answer: response.answer });
    } else {
      res.status(200).json({ answer: 'I don’t know that. Can you teach me?', learn: true });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
