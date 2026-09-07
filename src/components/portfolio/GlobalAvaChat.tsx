import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User, FileText } from "lucide-react";
import { queryGeminiWithRetry, getMockChatResponse, AVA_SYSTEM_PROMPT, formatAsHumanResponse, type ChatContent } from "@/pages/AiLab";

interface GlobalAvaChatProps {
  onOpenResume: () => void;
}

export default function GlobalAvaChat({ onOpenResume }: GlobalAvaChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ava"; text: string }>>([
    { sender: "ava", text: "Hello! I am Ava, Malila's AI Assistant. How can I help you explore his experience today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll ONLY the inner chat messages container, NEVER the page window
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [isOpen, messages, loading]);

  useEffect(() => {
    const handleMessage = (e: Event) => {
      const txt = (e as CustomEvent).detail as string;
      if (txt) {
        setMessages(prev => [...prev, { sender: "ava", text: txt }]);
        setIsOpen(true);
      }
    };
    window.addEventListener("ava-message", handleMessage);
    return () => window.removeEventListener("ava-message", handleMessage);
  }, []);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const q = textToSend.toLowerCase();
    if (q.includes("cv") || q.includes("resume") || q.includes("download")) {
      onOpenResume();
    }

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: textToSend }]);
    if (!customText) setInput("");
    setLoading(true);

    try {
      const apiKey = localStorage.getItem("GEMINI_API_KEY") || localStorage.getItem("gemini_api_key") || import.meta.env.VITE_GEMINI_API_KEY || "";
      let ans = "";
      if (apiKey) {
        // Multi-turn conversation history for contextual follow-up questions
        const recentHistory: ChatContent[] = messages
          .slice(-6)
          .filter((m, idx) => !(idx === 0 && m.sender === "ava" && m.text.startsWith("Hello!")))
          .map(m => ({
            role: m.sender === "user" ? ("user" as const) : ("model" as const),
            parts: [{ text: m.text }]
          }));

        const chatPayload: ChatContent[] = [
          ...recentHistory,
          { role: "user" as const, parts: [{ text: textToSend }] }
        ];

        const rawAns = await queryGeminiWithRetry(chatPayload, apiKey, undefined, AVA_SYSTEM_PROMPT, 1, 400, 800);
        ans = formatAsHumanResponse(rawAns);
      } else {
        // Fallback to mock responder
        await new Promise(r => setTimeout(r, 400));
        ans = getMockChatResponse(textToSend);
      }
      setMessages(prev => [...prev, { sender: "ava", text: ans }]);
    } catch (err: any) {
      console.error("Ava Global chatbot error:", err);
      const mockAns = getMockChatResponse(textToSend);
      setMessages(prev => [...prev, { sender: "ava", text: mockAns }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    "Tell me about E-Foleni",
    "Where can I read your technical articles?",
    "What is your core tech stack?",
    "QA & automated testing experience?",
    "Are you open to remote roles?",
    "Why hire Malila?",
    "How can I contact him?"
  ];

  return (
    <div className="no-print">
      {/* Floating Toggle Button - Pinned at bottom right */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full gradient-accent text-primary-foreground flex items-center justify-center shadow-2xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
        aria-label="Toggle Ava Assistant"
      >
        {isOpen ? <X size={20} /> : <Bot size={20} className="animate-pulse" />}
      </motion.button>

      {/* Floating Side Chat Window - Pinned at bottom right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-[100] w-[calc(100%-3rem)] sm:w-96 h-[480px] max-h-[75vh] bg-card border border-border text-card-foreground rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-4 py-2.5 bg-muted/40 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center text-cyan">
                  <Bot size={13} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">Ask Ava</span>
                  <span className="text-[9px] text-cyan uppercase tracking-wider font-bold">Portfolio AI Copilot</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenResume}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-cyan/10 hover:bg-cyan/20 text-cyan border border-cyan/30 transition-all flex items-center gap-1 cursor-pointer"
                  title="View Resume & CV"
                >
                  <FileText size={10} />
                  <span>CV</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Chat Messages Inner Container */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] ${
                    msg.sender === "user" ? "bg-cyan/20 text-cyan" : "bg-white/10 text-slate-300"
                  }`}>
                    {msg.sender === "user" ? <User size={12} /> : <Sparkles size={11} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-[11px] leading-relaxed max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-cyan/15 text-cyan-glow border border-cyan/30 rounded-tr-none"
                      : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none"
                  }`}>
                    {msg.text.split("\n\n").map((para, pi) => (
                      <p key={pi} className={pi > 0 ? "mt-2" : ""}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/10 text-cyan flex items-center justify-center animate-spin">
                    <Sparkles size={11} />
                  </div>
                  <div className="bg-white/5 text-slate-200 border border-white/10 p-3 rounded-2xl rounded-tl-none text-[11px]">
                    <span className="animate-pulse">Ava is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions Chips */}
            <div className="px-3 py-2 border-t border-border/40 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none bg-muted/20">
              <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider pl-1 shrink-0">Ask:</span>
              {suggestedQuestions.map(chip => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  disabled={loading}
                  className="px-2.5 py-1 text-[10px] font-medium bg-secondary/50 hover:bg-cyan/15 border border-border/70 hover:border-cyan/40 text-foreground hover:text-cyan rounded-full transition-all cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-border bg-muted/30 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask me anything about Malila..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-[11px] text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-xl bg-cyan text-slate-950 font-bold flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send size={12} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
