"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRevealCardProps {
  text: string
  revealText: string
  className?: string
}

export function TextRevealCard({ text, revealText, className }: TextRevealCardProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <div
      className={cn(
        "relative w-full max-w-md mx-auto overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-4 group",
        className,
      )}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isRevealed ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="text-center font-medium"
        >
          {text}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="absolute inset-0 text-center font-medium text-primary"
        >
          {revealText}
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: isRevealed ? 1.5 : 0, opacity: isRevealed ? 0.3 : 0.5 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  )
}

