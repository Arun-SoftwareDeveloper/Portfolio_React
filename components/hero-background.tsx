"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    originalX: number
    originalY: number
    density: number

    constructor(x: number, y: number, size: number, color: string, density: number) {
      this.x = x
      this.y = y
      this.originalX = x
      this.originalY = y
      this.size = size
      this.speedX = 0
      this.speedY = 0
      this.color = color
      this.density = density
    }

    draw() {
      if (!contextRef.current) return
      contextRef.current.beginPath()
      contextRef.current.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      contextRef.current.fillStyle = this.color
      contextRef.current.fill()
    }

    update() {
      // Calculate distance between particle and mouse
      const dx = mouseRef.current.x - this.x
      const dy = mouseRef.current.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const forceDirectionX = dx / distance
      const forceDirectionY = dy / distance

      // The closer the particle is to the mouse, the stronger the force
      const maxDistance = 100
      let force = (maxDistance - distance) / maxDistance
      if (force < 0) force = 0

      const directionX = forceDirectionX * force * this.density
      const directionY = forceDirectionY * force * this.density

      if (distance < maxDistance) {
        this.speedX -= directionX
        this.speedY -= directionY
      } else {
        if (this.x !== this.originalX) {
          const dx = this.x - this.originalX
          this.speedX -= dx * 0.05
        }
        if (this.y !== this.originalY) {
          const dy = this.y - this.originalY
          this.speedY -= dy * 0.05
        }
      }

      this.x += this.speedX
      this.y += this.speedY

      // Apply friction
      this.speedX *= 0.92
      this.speedY *= 0.92

      this.draw()
    }
  }

  const initCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    contextRef.current = canvas.getContext("2d")

    // Create fewer, more subtle particles
    particlesRef.current = []
    const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 80)

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 1.5 + 0.5 // Smaller particles
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      // More professional, subtle colors with lower opacity
      const color = `hsla(220, 60%, 70%, ${Math.random() * 0.15 + 0.05})`
      const density = Math.random() * 8 + 3 // Less reactive

      particlesRef.current.push(new Particle(x, y, size, color, density))
    }
  }

  const animate = () => {
    if (!contextRef.current || !canvasRef.current) return

    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    particlesRef.current.forEach((particle) => {
      particle.update()
    })

    animationFrameRef.current = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
    }
  }

  const handleResize = () => {
    if (!canvasRef.current) return

    canvasRef.current.width = window.innerWidth
    canvasRef.current.height = window.innerHeight

    initCanvas()
  }

  useEffect(() => {
    initCanvas()
    animate()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-to-b from-background/10 via-primary/5 to-background/10"
      />
    </motion.div>
  )
}

