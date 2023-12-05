// pages/api/import.js
import { MongoClient } from 'mongodb';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).json({ message: 'Error parsing form data' });
                return;
            }

            // Read the uploaded file
            const filePath = files.file.filepath;
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            const uri = process.env.MONGODB_URI;
            const client = new MongoClient(uri);

            try {
                await client.connect();
                const database = client.db('chatbot');
                const questions = database.collection('questions');

                // Insert data into MongoDB
                await questions.insertMany(jsonData);
                res.status(200).json({ message: 'Data imported successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            } finally {
                await client.close();
            }
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
