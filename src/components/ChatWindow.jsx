import { useState } from "react";
import axios from "axios";
import Message from "./Message";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State für Chat-Container

  const handleSend = async () => {
    if (!input.trim()) return;

    const systemMessage = {
      role: "system",
      content:
        "You are a professional geologist assistant with expertise in geotechnical engineering. Provide answers in a friendly, knowledgeable manner.",
    };

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const message = [
        systemMessage,
        ...messages
          .map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text?.trim() || "",
          }))
          .filter((msg) => msg.content),
        { role: "user", content: input.trim() },
      ];

      const response = await axios.post(
        "https://aiapp-v7jq.onrender.com/api/v1/chat/completions",
        {
          // model: 'gpt-3.5-turbo',
          model: "gpt-4o",
          messages: message,
        },
        {
          headers: {
            provider: "open-ai",
            mode: "production",
          },
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.message?.content || "No response from the bot.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.error || error.message);
    } finally {
      setTyping(false);
    }
  };

  // Funktion zum Öffnen/Schließen des Chats
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat-Button */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Chat with GEO-ASSISTANT
        </button>
      </div>

      {/* Chat-Container */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-96">
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            {/* Header */}
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">GEO-ASSISTANT 🧑🏻‍💻</p>
              <button
                onClick={toggleChat}
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Chatbox */}
            <div className="p-4 h-80 overflow-y-auto">
              {messages.map((msg, index) => (
                <Message key={index} sender={msg.sender} text={msg.text} />
              ))}
              {typing && (
                <div className="flex justify-start mb-2">
                  <div className="bg-gray-200 text-gray-700 p-3 rounded-lg">
                    <ThreeDots
                      visible={true}
                      height="24"
                      width="24"
                      color="#71717A"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t flex">
              <input
                id="chatInput"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Type your message..."
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
