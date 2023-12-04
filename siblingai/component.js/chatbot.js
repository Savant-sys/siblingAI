// components/Chatbot.js
import { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [learningMode, setLearningMode] = useState(false);
  const [questionToLearn, setQuestionToLearn] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) return;

    setMessages(msgs => [...msgs, { text: input, sender: 'user' }]);
    const learn = learningMode;
    const question = questionToLearn;

    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, learn, question }),
    });

    const data = await response.json();

    setMessages(msgs => [...msgs, { text: data.answer, sender: 'bot' }]);
    setInput('');
    setLearningMode(data.learn || false);
    if (data.learn) setQuestionToLearn(input);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>{msg.text}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
