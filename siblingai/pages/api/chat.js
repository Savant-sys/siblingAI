// pages/api/chat.js
import fs from 'fs';
import path from 'path';
import findBestMatch from '../../utils/findBestMatch';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'data', 'brain.json');
    let brain;

    // Read brain.json file at the beginning
    if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        brain = JSON.parse(jsonData);
    } else {
        // Initialize with a default structure if file does not exist
        brain = { questions: [] };
    }

    if (req.method === 'POST') {
        const userMessage = req.body.message;

        // Ensure userMessage is a string
        if (typeof userMessage !== 'string') {
            res.status(400).json({ error: "Invalid user message" });
            return;
        }

        const userMessageLower = userMessage.toLowerCase();

        // Extract questions and answers separately
        const questionsArray = brain.questions.map(brainItem => brainItem.question.toLowerCase());
        const answersArray = brain.questions.map(brainItem => brainItem.answer);

        const bestMatchQuestion = findBestMatch(userMessageLower, questionsArray);

        // Debugging logs
        console.log("User message (lowercase):", userMessageLower);
        console.log("Best match question:", bestMatchQuestion);
        console.log("All questions in brain:", questionsArray);

        // Retrieve the answer for the best match
        const bestMatchIndex = questionsArray.indexOf(bestMatchQuestion.target);
        const response = bestMatchIndex !== -1 ? answersArray[bestMatchIndex] : null;
        console.log("Response found:", response);

        if (response) {
            res.status(200).json({ answer: response });
        } else {
            res.status(200).json({ answer: "I'm not sure how to answer that. Can you teach me?", learn: true });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
