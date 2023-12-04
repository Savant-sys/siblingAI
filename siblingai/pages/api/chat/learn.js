// pages/api/chat/learn.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { question, answer } = req.body;
    const filePath = path.join(process.cwd(), 'data', 'brain.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const brain = JSON.parse(jsonData);

    const existingQuestionIndex = brain.questions.findIndex(q => q.question === question);
    if (existingQuestionIndex !== -1) {
      brain.questions[existingQuestionIndex].answer = answer;
    } else {
      brain.questions.push({ question, answer });
    }

    fs.writeFileSync(filePath, JSON.stringify(brain, null, 2));
    res.status(200).json({ message: 'Learning successful' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
