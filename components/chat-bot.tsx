"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Define the message type
interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Replace the existing botResponses object with a more professional and friendly version
// that includes better greetings and more conversational responses

const botResponses = {
  greeting: [
    "Hello! I'm Vincent Poovarangan Arun's virtual assistant. How are you doing today? I'd be happy to tell you about Arun's experience and skills.",
    "Hi there! Welcome to Arun's portfolio. How are you? I'm here to help you learn more about Arun's work and expertise.",
    "Greetings! How's your day going? I'm here to assist you with any information about Arun's professional background and projects.",
  ],
  skills: [
    "Arun is proficient in JavaScript, TypeScript, React, Node.js, and various other technologies. He specializes in full-stack development with the MERN stack. Is there a specific skill you'd like to know more about?",
    "As a Assoicate software engineer, Arun has expertise in both frontend and backend technologies, including React, Next.js, Express, and MongoDB. Would you like me to elaborate on any particular area?",
  ],
  experience: [
    "Arun currently works as a Assoicate Software Engineer at GUVI Geeks Network Private Limited since 2023, focusing on full-stack development and cloud infrastructure. How does this align with what you're looking for?",
    "Arun has experience in building e-commerce platforms, CRUD applications, and interactive web applications using modern technologies. Is there a specific aspect of his experience you're interested in?",
  ],
  education: [
    "Arun holds a BSc in Information Technology from Devanga Arts and Science College (2019-2022) with a CGPA of 7.6. Would you like to know about his certifications as well?",
  ],
  projects: [
    "Arun has worked on several projects including COMFORT-PATH (an e-commerce platform), a CRUD Application with the MERN stack, and a Tic Tac Toe game. Would you like me to share more details about any of these projects?",
    "You can check out Arun's projects on his GitHub profile or view the live demos linked in the Projects section. Is there a specific project that caught your interest?",
  ],
  contact: [
    "You can reach out to Arun via email at arunramasamy46@gmail.com or connect with him on LinkedIn. Would you like me to provide any additional contact information?",
    "Feel free to send Arun an email or check out his GitHub profile for more information about his work. Is there anything specific you'd like to discuss with him?",
  ],
  default: [
    "I'm not sure I understand. Could you please rephrase your question? I'd be happy to help you learn more about Arun's skills, experience, education, projects, or contact information.",
    "I don't have information about that yet. Would you like to know about Arun's skills, experience, education, projects, or contact information? I'm here to help you connect with Arun.",
    "That's an interesting question! I'd be happy to connect you with Arun directly for more specific information. Would you like his contact details?",
  ],
};

// Function to get a random response from a category
const getRandomResponse = (category: keyof typeof botResponses): string => {
  const responses = botResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Function to determine which category a message belongs to
const categorizeMessage = (message: string): keyof typeof botResponses => {
  message = message.toLowerCase();

  if (
    message.match(
      /hi|hello|hey|greetings|howdy|how are you|how's it going|how is it going|how are things/
    )
  ) {
    return "greeting";
  } else if (
    message.match(
      /skills?|technologies|tech stack|languages|what can you do|capabilities|expertise|proficient|good at/
    )
  ) {
    return "skills";
  } else if (
    message.match(
      /experience|work|job|career|profession|employment|background|history/
    )
  ) {
    return "experience";
  } else if (
    message.match(
      /education|school|college|university|degree|study|qualification|academic/
    )
  ) {
    return "education";
  } else if (
    message.match(
      /projects?|portfolio|work|applications?|apps?|websites?|built|created|developed/
    )
  ) {
    return "projects";
  } else if (
    message.match(
      /contact|email|reach|connect|get in touch|phone|message|talk|speak/
    )
  ) {
    return "contact";
  } else {
    return "default";
  }
};

interface ChatBotProps {
  onClose: () => void;
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm Vincent Poovarangan Arun's virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Calculate a more natural typing delay based on the length of the response
    const calculateTypingDelay = (response: string) => {
      // Average typing speed: ~40 words per minute, or ~200 characters per minute
      // That's about 3.33 characters per second
      const charactersPerSecond = 3.33;
      const minDelay = 1000; // Minimum delay of 1 second
      const maxDelay = 3000; // Maximum delay of 3 seconds

      const delay = Math.min(
        Math.max((response.length / charactersPerSecond) * 1000, minDelay),
        maxDelay
      );
      return delay;
    };

    // Simulate bot thinking and typing
    setTimeout(() => {
      const category = categorizeMessage(userMessage.content);
      const botResponse = getRandomResponse(category);

      // Calculate a natural typing delay
      const typingDelay = calculateTypingDelay(botResponse);

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, typingDelay);
    }, 500); // Initial thinking delay
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 shadow-2xl shadow-primary/20"
    >
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="bg-primary/10 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-primary/20">
                <AvatarImage
                  src="./Images/vp1.jpg?height=32&width=32"
                  alt="Chatbot"
                />
                <AvatarFallback className="bg-primary/20 text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">Vincent Poovarangan</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex items-start gap-2 max-w-[85%]",
                    message.sender === "user" ? "ml-auto" : "mr-auto"
                  )}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mt-0.5 border border-primary/20">
                      <AvatarImage
                        src="./Images/vp1.jpg?height=32&width=32"
                        alt="Chatbot"
                      />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 mt-0.5 border border-primary/20">
                      <AvatarImage
                        src="./Images/vp1.jpg?height=32&width=32"
                        alt="User"
                      />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 max-w-[85%] mr-auto"
                >
                  <Avatar className="h-8 w-8 mt-0.5 border border-primary/20">
                    <AvatarImage
                      src="./Images/vp1.jpg?height=32&width=32"
                      alt="Chatbot"
                    />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 0.1,
                        }}
                        className="h-2 w-2 rounded-full bg-primary/60"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 0.2,
                        }}
                        className="h-2 w-2 rounded-full bg-primary/60"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 0.3,
                        }}
                        className="h-2 w-2 rounded-full bg-primary/60"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="p-3 border-t border-border/50">
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={input.trim() === ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
