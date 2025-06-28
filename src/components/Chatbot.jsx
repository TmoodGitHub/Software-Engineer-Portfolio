import { BotMessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const GREETINGS = [
  "Hola!",
  "Bonjour!",
  "Howdy!",
  "Hiya!",
  "Hi!",
  "Ciao",
  "AI Mode Activated!",
  "Beep Beep Bwoop!",
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    if (!isOpen) {
      const msg = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      setGreeting(msg);
      setMessages([
        {
          role: "TmoodBot",
          content:
            msg +
            " I'm TmoodBot! Nice to meetcha!" +
            " Ask me anything you wish to know about Tamer Mahmoud, my creator!",
        },
      ]);
    }
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "TmoodBot", content: data.reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "TmoodBot",
          content: "Something went wrong. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 px-4 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95"
      >
        <BotMessageSquare />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-100 h-[420px] bg-background border rounded-2xl shadow-xl flex flex-col overflow-hidden z-50">
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col space-y-1 ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="text-xs text-muted-foreground font-semibold px-2">
                  {msg.role === "user" ? "You" : msg.role}
                </div>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] animate-[fade-in_0.7s_ease-out_forwards] ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-xs italic text-muted-foreground mt-2">
                Thinking...
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

          {/* Input Box */}
          <div className="p-3 border-t bg-background flex items-center gap-2">
            <input
              className="flex-1 px-4 py-2 rounded-full border text-sm bg-muted text-muted-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me something..."
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};
