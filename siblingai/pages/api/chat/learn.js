// pages/api/chat/learn.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, answer } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const database = client.db('chatbot');
      const questions = database.collection('questions');

      // Check if the question already exists
      const existingQuestion = await questions.findOne({ question: question.toLowerCase() });
      if (existingQuestion) {
        // Update the answer if the question already exists
        await questions.updateOne(
          { _id: existingQuestion._id },
          { $set: { answer } }
        );
      } else {
        // Add a new question-answer pair if it doesn't exist
        await questions.insertOne({ question: question.toLowerCase(), answer });
      }

      res.status(200).json({ message: 'Learning successful.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
