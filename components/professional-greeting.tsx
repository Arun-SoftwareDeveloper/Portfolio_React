"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfessionalGreetingProps {
  className?: string;
}

export default function ProfessionalGreeting({
  className,
}: ProfessionalGreetingProps) {
  const [greeting, setGreeting] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const greetings = [
    "Welcome to my portfolio",
    "Thank you for visiting",
    "Let's build something great together",
    "Turning ideas into reality",
    "Crafting digital experiences",
  ];

  useEffect(() => {
    let currentIndex = 0;

    const changeGreeting = () => {
      setIsVisible(false);

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % greetings.length;
        setGreeting(greetings[currentIndex]);
        setIsVisible(true);
      }, 500);
    };

    // Set initial greeting
    setGreeting(greetings[0]);

    // Change greeting every 5 seconds
    const interval = setInterval(changeGreeting, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("h-8 overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.p
            key={greeting}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            {greeting}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
