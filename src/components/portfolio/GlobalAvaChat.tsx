import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User, UserCheck } from "lucide-react";
import { queryGeminiWithRetry, getMockChatResponse, RESUME_CONTEXT } from "@/pages/AiLab";

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
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: textToSend }]);
    if (!customText) setInput("");
    setLoading(true);

    // Trigger page-scrolling heuristics based on query keyword matching
    const q = textToSend.toLowerCase();
    let actionFeedback = "";
    if (q.includes("project") || q.includes("work history") || q.includes("portfolio")) {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        actionFeedback = "\n\n*(I have automatically scrolled to the Projects section for you!)*";
      }
    } else if (q.includes("contact") || q.includes("hire") || q.includes("reach") || q.includes("email")) {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        actionFeedback = "\n\n*(I have scrolled down to the Contact details section for you!)*";
      }
    } else if (q.includes("cv") || q.includes("resume") || q.includes("print") || q.includes("download")) {
      onOpenResume();
      actionFeedback = "\n\n*(Opening Malila's resume modal...)*";
    }

    try {
      const apiKey = localStorage.getItem("gemini_api_key");
      let ans = "";
      if (apiKey) {
        const prompt = `${RESUME_CONTEXT}\n\nVisitor's Question: ${textToSend}\n\nDo NOT state that you are an AI, a large language model, or a chatbot. Keep your tone completely human, friendly, and professional. Provide a helpful response to the visitor's question:`;
        ans = await queryGeminiWithRetry(prompt, apiKey);
      } else {
        // Fallback to mock responder
        await new Promise(r => setTimeout(r, 600)); // simulate thinking
        ans = getMockChatResponse(textToSend);
      }
      setMessages(prev => [...prev, { sender: "ava", text: ans + actionFeedback }]);
    } catch (err: any) {
      console.error("Ava Global chatbot error:", err);
      const mockAns = getMockChatResponse(textToSend);
      setMessages(prev => [...prev, { sender: "ava", text: mockAns + actionFeedback }]);
    } finally {
      setLoading(false);
    }
  };

  const chips = [
    "What is your strongest project?",
    "Summarize Malila's experience.",
    "Does he know Ruby on Rails?",
    "Why should I hire you?",
    "View Resume & CV"
  ];

  return (
    <div className="no-print">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full gradient-accent text-primary-foreground flex items-center justify-center shadow-2xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
        aria-label="Toggle Ava Assistant"
      >
        {isOpen ? <X size={20} /> : <Bot size={20} className="animate-pulse" />}
      </motion.button>

      {/* Sidebar Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[calc(100%-3rem)] sm:w-96 h-[480px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-muted/40 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan/15 flex items-center justify-center text-cyan">
                  <Bot size={13} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">Ask Ava</span>
                  <span className="text-[9px] text-cyan uppercase tracking-wider font-bold">Malila's Portfolio Copilot</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat Viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] ${
                    msg.sender === "user" ? "bg-cyan/10 text-cyan" : "bg-muted text-muted-foreground"
                  }`}>
                    {msg.sender === "user" ? <User size={12} /> : <Sparkles size={11} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-[11px] leading-relaxed max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-cyan/10 text-cyan border border-cyan/15 rounded-tr-none"
                      : "bg-muted text-foreground border border-border rounded-tl-none"
                  }`}>
                    {msg.text.split("\n\n").map((para, pi) => (
                      <p key={pi} className={pi > 0 ? "mt-2" : ""}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center animate-spin">
                    <Sparkles size={11} />
                  </div>
                  <div className="bg-muted text-foreground border border-border p-3 rounded-2xl rounded-tl-none text-[11px]">
                    <span className="animate-pulse">Ava is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Chips */}
            <div className="px-4 py-2 border-t border-border flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              {chips.map(chip => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  disabled={loading}
                  className="px-2.5 py-1 text-[9px] font-semibold bg-muted hover:bg-cyan/10 border border-border hover:border-cyan/30 text-muted-foreground hover:text-cyan rounded-full transition-all cursor-pointer"
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
              className="p-3 border-t border-border bg-muted/20 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask me anything about Malila..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-[11px] text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan/40"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-xl bg-cyan text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
