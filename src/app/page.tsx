"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Send, Loader2, Check, CheckCheck } from "lucide-react";

export default function Home() {
    const [question, setQuestion] = useState("");
    interface Message {
        role: "user" | "bot";
        text: string;
        time: string;
        delivered: boolean;
        seen: boolean;
    }

    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [displayedText, setDisplayedText] = useState("Thinking...");

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const askQuestion = async () => {
        if (!question.trim()) return;

        const userMessage: Message = { role: "user", text: question, time: getCurrentTime(), delivered: true, seen: false };
        setMessages((prev) => [...prev, userMessage]);
        setQuestion("");
        setIsTyping(true);
        setDisplayedText("Thinking...");

        try {
            const response = await fetch("https://ai-agent-assist-bot.onrender.com/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) throw new Error("Failed to fetch response");

            const data = await response.json();
            simulateTyping(data.answer);
        } catch (error) {
            console.error("Error fetching response:", error);
            setIsTyping(false);
            setDisplayedText("");
        }
    };

    const simulateTyping = (text) => {
        let index = 0;
        setDisplayedText("");
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(interval);
                setMessages((prev) => [...prev, { role: "bot", text, time: getCurrentTime(), delivered: true, seen: true }]);
                setIsTyping(false);
                setDisplayedText("");
            }
        }, 10);
    };

    return (
        <div className="flex md:px-12 flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-[#f3edff] to-[#dad0ff] text-black px-6 py-2 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full  bg-white p-4 rounded-2xl shadow-2xl flex flex-col space-y-4 border border-gray-200 h-full"
            >
                <h1 className="text-4xl font-extrabold text-center text-[#5f17c5]">Chat with AI</h1>
                <div className="flex-1 overflow-y-auto p-4 bg-[#f5f5ff] rounded-lg space-y-4">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`p-4 rounded-lg max-w-2xl text-white shadow-md ${msg.role === "user" ? "bg-[#5f17c5]" : "bg-[#5f17c5]/70 text-white"}`}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                <div className="text-xs flex justify-end items-center space-x-1 text-gray-300 mt-1">
                                    <span>{msg.time}</span>
                                    {msg.role === "user" && (msg.seen ? <CheckCheck size={14} /> : <Check size={14} />)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="p-4 rounded-lg max-w-2xl bg-[#5f17c5] text-white shadow-md animate-pulse">
                                <ReactMarkdown>{displayedText}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex space-x-3 items-center">
                    <input
                        className="flex-1 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f17c5] text-black placeholder-gray-500"
                        placeholder="Ask something..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && askQuestion()}
                    />
                    <button
                        className="bg-[#5f17c5] p-3 rounded-full hover:bg-[#4a1396] transition flex items-center justify-center shadow-md w-12 h-12"
                        onClick={askQuestion}
                        disabled={isTyping}
                    >
                        {isTyping ? <Loader2 className="animate-spin" color="white" /> : <Send color="white" />}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
