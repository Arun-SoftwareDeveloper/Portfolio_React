"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SparklesProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  particleImage?: string
  speed?: number
}

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  speed = 1,
  particleDensity = 100,
  particleColor = "#FFF",
  particleImage,
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    image: HTMLImageElement | null

    constructor(
      x: number,
      y: number,
      size: number,
      speedX: number,
      speedY: number,
      image: HTMLImageElement | null = null,
    ) {
      this.x = x
      this.y = y
      this.size = size
      this.speedX = speedX
      this.speedY = speedY
      this.image = image
    }

    update() {
      this.x += this.speedX * speed
      this.y += this.speedY * speed

      if (this.x < 0 || this.x > window.innerWidth) {
        this.speedX = -this.speedX
      }

      if (this.y < 0 || this.y > window.innerHeight) {
        this.speedY = -this.speedY
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.image) {
        ctx.drawImage(this.image, this.x, this.y, this.size * 10, this.size * 10)
      } else {
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  const initializeParticles = (width: number, height: number) => {
    const newParticles: Particle[] = []
    const particleCount = Math.min(Math.floor((width * height) / 10000) * particleDensity, 1000)

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize
      const x = Math.random() * width
      const y = Math.random() * height
      const speedX = (Math.random() - 0.5) * 0.3
      const speedY = (Math.random() - 0.5) * 0.3

      if (particleImage) {
        const img = new Image()
        img.src = particleImage
        img.crossOrigin = "anonymous"
        newParticles.push(new Particle(x, y, size, speedX, speedY, img))
      } else {
        newParticles.push(new Particle(x, y, size, speedX, speedY))
      }
    }

    setParticles(newParticles)
  }

  const animate = () => {
    if (!context) return

    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    particles.forEach((particle) => {
      particle.update()
      particle.draw(context)
    })

    animationRef.current = requestAnimationFrame(animate)
  }

  const handleResize = () => {
    if (canvasRef.current && context) {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      resizeTimeoutRef.current = setTimeout(() => {
        canvasRef.current!.width = window.innerWidth
        canvasRef.current!.height = window.innerHeight
        initializeParticles(window.innerWidth, window.innerHeight)
      }, 200)
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const ctx = canvas.getContext("2d")
      setContext(ctx)

      if (ctx) {
        initializeParticles(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (context && particles.length > 0) {
      animate()
    }
  }, [context, particles])

  return <canvas ref={canvasRef} id={id} className={cn("absolute inset-0", className)} style={{ background }} />
}

