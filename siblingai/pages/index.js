import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [learningMode, setLearningMode] = useState(false);
    const [questionToLearn, setQuestionToLearn] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const userMessage = input;
        setMessages(messages => [...messages, { text: userMessage, sender: 'user' }]);
        setInput('');

        if (learningMode) {
            await fetch('/api/chat/learn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: questionToLearn, answer: userMessage }),
            });
            setMessages(msgs => [...msgs, { text: "Thanks for teaching me!", sender: 'bot' }]);
            setLearningMode(false);
            setQuestionToLearn('');
        } else {
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: userMessage }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessages(msgs => [...msgs, { text: data.answer, sender: 'bot' }]);
                
                    if (data.learn) {
                        setLearningMode(true);
                        setQuestionToLearn(userMessage);
                    }
                }
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    return (
        <div className={styles.container} style={{ backgroundColor: '#5E67A5' }}>
            <Head>
                <title>SiblingAI ChatBot</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main} style={{ maxWidth: '800px', width: '100%' }}>
                <h1 className={styles.title} style={{ color: '#fff' }}>
                    Welcome to SiblingAI ChatBot!
                </h1>

                <div className="chat-container" style={{ backgroundColor: '#111', padding: '20px', borderRadius: '10px', width: '95%', height: '500px', overflowY: 'auto', maxWidth: '1000px' }}>
                    {messages.map((message, index) => (
                        <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
                            <p style={{ backgroundColor: message.sender === 'user' ? '#0070f3' : '#333', color: 'white', display: 'inline-block', padding: '10px', borderRadius: '10px', margin: '5px' }}>
                                {message.text}
                            </p>
                        </div>
                    ))}
                </div>

                <form onSubmit={sendMessage} style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ padding: '10px', width: 'calc(100% - 100px)', marginRight: '10px' }}
                    />
                    <button
                        type="submit"
                        style={{ padding: '10px', width: '90px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
                    >
                        Send
                    </button>
                </form>
            </main>

            <style jsx global>{`
                body {
                    background-color: #282c34;
                    color: #fff;
                }
            `}</style>
        </div>
    );
}
