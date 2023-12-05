// pages/api/chat.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const database = client.db('chatbot');
      const questions = database.collection('questions');

      const response = await questions.findOne({ question: message.toLowerCase() });

      if (response) {
        res.status(200).json({ answer: response.answer });
      } else {
        res.status(200).json({ answer: "I don’t know that. Can you teach me?", learn: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).end();
  }
}
