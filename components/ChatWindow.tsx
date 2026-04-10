"use client";

import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import InputArea from "./InputArea";

type MessageType = {
  id: number;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string) => {
    const userMessage: MessageType = {
      id: Date.now(),
      content: text,
      role: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const botMessage: MessageType = {
        id: Date.now() + 1,
        content: data.reply,
        role: "assistant",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);

      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});
    } catch {
      const errorMessage: MessageType = {
        id: Date.now() + 2,
        content: "Something went wrong. Please try again.",
        role: "assistant",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen flex flex-col items-center px-2 sm:px-4`}>

      {/* TOP BAR */}
      <div className="w-full flex justify-between items-center px-3 sm:px-6 py-4 max-w-5xl">
        <h1 className="text-lg sm:text-xl font-semibold">Metawurks AI</h1>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => setMessages([])}
            className="text-xs sm:text-sm text-gray-500 hover:text-black"
          >
            Clear
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-2 sm:px-3 py-1 rounded-md bg-black text-white text-xs sm:text-sm"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* HEADER */}
      {messages.length === 0 && (
        <h2 className="text-2xl sm:text-3xl font-medium text-gray-500 mb-4 sm:mb-6 text-center">
          Ready when you are.
        </h2>
      )}

      {/* CHAT */}
      <div className="w-full flex justify-center">
        <div
          className={`${darkMode ? "bg-gray-800" : "bg-white"} 
          w-full max-w-3xl rounded-2xl shadow-sm 
          h-[75vh] sm:h-[70vh] flex flex-col`}
        >
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-3">
            {messages.map((msg) => (
              <Message key={msg.id} {...msg} darkMode={darkMode} />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-gray-200 flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* STICKY INPUT */}
          <div className="p-2 sm:p-4 border-t sticky bottom-0 bg-inherit">
            <InputArea onSend={sendMessage} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}