"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HoverEffectProps {
  items: {
    title: string
    description: string
    icon?: React.ReactNode
  }[]
  className?: string
}

export function HoverEffect({ items, className }: HoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative z-10">
            <motion.div
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 h-full flex flex-col justify-between transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:border-primary/50"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                {item.icon && <div className="mb-4">{item.icon}</div>}
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          </div>
          {hoveredIndex === idx && (
            <motion.div
              className="absolute inset-0 z-0 bg-primary/10 blur-xl rounded-lg"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

