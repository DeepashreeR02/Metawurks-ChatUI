import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  darkMode?: boolean;
};

export default function Message({ content, role, timestamp, darkMode }: Props) {
  const isUser = role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}>
      <div
        className={`px-4 py-3 rounded-2xl max-w-[70%] break-words shadow-sm ${
          isUser
            ? "bg-black text-white"
            : darkMode
            ? "bg-gray-700 text-white"
            : "bg-white border text-black"
        }`}
      >
        {/* ✅ FIXED */}
        <div className="text-sm leading-relaxed">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>

        <span className="text-[10px] text-gray-400 mt-1 block">
          {timestamp}
        </span>

        <button
          onClick={() => navigator.clipboard.writeText(content)}
          className="text-[10px] text-gray-400 hover:text-black mt-1"
        >
          Copy
        </button>
      </div>
    </div>
  );
}