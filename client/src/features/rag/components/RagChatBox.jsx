import { Bot, Send, User, X } from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useRag from "../hooks/useRag";

export default function RagChatBox({ onClose, messages, setMessages }) {
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { mutateAsync, isPending } = useRag();

  const handleSend = async (e) => {
    e.preventDefault();

    const question = input.trim();
    if (!question || isPending) return;

    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: question }]);

    try {
      const response = await mutateAsync({ question });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data?.answer || "I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("RAG Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again in a moment.",
        },
      ]);
    } finally {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex h-[min(520px,75vh)] w-[min(380px,calc(100vw-6rem))] flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950 shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10">
            <Bot className="h-6 w-6 text-cyan-400" />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Chirag's AI Assistant
            </h3>
            <p className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Online
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4 scrollbar-thin [scrollbar-color:#334155_transparent]">
        {/* Welcome message */}
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10">
              <Bot size={28} className="text-cyan-400" />
            </div>

            <h3 className="mb-2 text-lg font-semibold text-white">
              Hi, I'm Chirag's AI Assistant!
            </h3>

            <p className="text-sm leading-relaxed text-slate-400">
              Welcome to my portfolio. Feel free to ask me about my projects,
              technical skills, experience, or anything else you'd like to know.
            </p>

            <p className="mt-4 text-xs text-slate-500">
              How can I help you today?
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Your existing message rendering */}
            </div>
          ))
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                message.role === "user" ? "bg-cyan-500/10" : "bg-slate-800"
              }`}
            >
              {message.role === "user" ? (
                <User className="h-4 w-4 text-cyan-400" />
              ) : (
                <Bot className="h-4 w-4 text-cyan-400" />
              )}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "rounded-tr-sm bg-cyan-600 text-white"
                  : "max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-800 bg-slate-900 px-4 py-3.5 text-slate-200"
              }`}
            >
              <div
                className={`wrap-break-word text-sm leading-7 ${
                  message.role === "assistant"
                    ? "prose prose-invert prose-sm max-w-none prose-p:my-2 prose-headings:mb-2 prose-headings:mt-4 prose-headings:font-semibold prose-strong:text-cyan-300 prose-li:my-1 prose-ul:my-2 prose-ol:my-2 prose-a:text-cyan-400"
                    : "whitespace-pre-wrap"
                }`}
              >
                {message.role === "assistant" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isPending && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800">
              <Bot className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-slate-800 bg-slate-900 px-4 py-4">
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="border-t border-slate-800 bg-slate-900/70 p-3"
      >
        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 transition-colors focus-within:border-cyan-500/60">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isPending}
            className="min-w-0 flex-1 bg-transparent py-1 text-sm text-white outline-none placeholder:text-slate-500 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isPending}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-center text-[10px] text-slate-500">
          Powered by RAG · Chirag's Portfolio Assistant
        </p>
      </form>
    </div>
  );
}
