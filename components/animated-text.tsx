"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  highlightClassName?: string;
  highlightIndices?: number[];
}

export default function AnimatedText({
  text,
  className,
  highlightClassName,
  highlightIndices = [],
}: AnimatedTextProps) {
  // Split the text into an array of characters
  const characters = text.split("");

  // Create a set of highlight indices for O(1) lookup
  const highlightSet = new Set(highlightIndices);

  // Animation variants for each character
  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 15,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.03, // Faster animation
        duration: 0.4, // Shorter duration
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    }),
  };

  return (
    <motion.h1
      className={cn("flex flex-wrap justify-center", className)}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={characterAnimation}
          custom={index}
          className={cn(
            "inline-block mx-[1px]",
            highlightSet.has(index) ? highlightClassName : ""
          )}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
