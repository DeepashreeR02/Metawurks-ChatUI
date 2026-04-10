"use client";

import { useState } from "react";

export default function InputArea({
  onSend,
  darkMode,
}: {
  onSend: (msg: string) => void;
  darkMode?: boolean;
}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <div
        className={`w-full max-w-3xl flex items-center border rounded-full px-3 sm:px-4 py-2 sm:py-3 shadow-md transition
        ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        <input
          className={`flex-1 outline-none text-sm px-1 sm:px-2 bg-transparent ${
            darkMode
              ? "text-white placeholder-gray-400"
              : "text-black"
          }`}
          placeholder="Ask anything"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-black text-white px-3 sm:px-5 py-2 rounded-full ml-2 text-sm sm:text-base disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}