import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    // Here you would integrate the logic to send the message to SiblingAI
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    // Simulate a response from SiblingAI
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { text: 'Hello! I am SiblingAI.', sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex justify-center items-center p-4">
      <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden w-full max-w-md">
        <div className="p-4 border-b border-gray-700 text-center">
          <h1 className="text-lg font-bold text-white">SiblingAI Chat</h1>
        </div>
        <div className="p-4 h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded px-4 py-2 my-2 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700">
          <form onSubmit={sendMessage} className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-300 border-gray-700 bg-gray-800"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="px-4 rounded-r-lg bg-blue-600 text-white font-bold p-2 uppercase border-blue-600 border-t border-b border-r"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
