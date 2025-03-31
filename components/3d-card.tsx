"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export function CardBody({ children, className }: CardBodyProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  // Reduce the dampen factor for more subtle movement
  const dampenFactor = 10
  // Adjust spring config for smoother, more professional movement
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }

  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center (normalized from -1 to 1)
    const mouseXRelative = (e.clientX - centerX) / (rect.width / 2)
    const mouseYRelative = (e.clientY - centerY) / (rect.height / 2)

    // Apply rotation (inverted for natural feel) with reduced intensity
    setRotateY(mouseXRelative * dampenFactor)
    setRotateX(-mouseYRelative * dampenFactor)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          transform: "translateZ(0)",
        }}
      >
        {children}
      </div>
      {/* Subtle shadow effect instead of the colored background */}
      <motion.div
        className="absolute -inset-[20px] bg-primary/5 rounded-xl opacity-0"
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
          transform: "translateZ(-20px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      />
    </motion.div>
  )
}

