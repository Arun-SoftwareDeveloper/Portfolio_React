"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const { theme } = useTheme()
  const particles = useRef<Array<Particle>>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const mouseIsMoving = useRef<boolean>(false)
  const animationFrame = useRef<number | null>(null)

  const onMouseMove = (e: MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const { w, h } = getCanvasDimensions()
    const x = e.clientX - rect.left - w / 2
    const y = e.clientY - rect.top - h / 2
    if (mouseIsMoving.current === false) {
      mouseIsMoving.current = true
    }
    mouse.current = { x, y }
  }

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      const rect = canvasRef.current!.getBoundingClientRect()
      const { w, h } = getCanvasDimensions()
      const x = e.touches[0].clientX - rect.left - w / 2
      const y = e.touches[0].clientY - rect.top - h / 2
      if (mouseIsMoving.current === false) {
        mouseIsMoving.current = true
      }
      mouse.current = { x, y }
    }
  }

  const getCanvasDimensions = () => {
    const width = canvasContainerRef.current?.clientWidth || window.innerWidth
    const height = canvasContainerRef.current?.clientHeight || window.innerHeight
    return { w: width, h: height }
  }

  const setupCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current) {
      const { w, h } = getCanvasDimensions()
      canvasRef.current.width = w
      canvasRef.current.height = h
      context.current = canvasRef.current.getContext("2d")
    }
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current) {
      const { w, h } = getCanvasDimensions()
      canvasRef.current.width = w
      canvasRef.current.height = h
    }
  }

  const renderCanvas = () => {
    if (context.current && canvasRef.current) {
      const { w, h } = getCanvasDimensions()
      context.current.clearRect(0, 0, w, h)
      context.current.fillStyle = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      context.current.beginPath()
      particles.current.forEach((p) => {
        p.update()
        context.current!.moveTo(p.position.x, p.position.y)
        context.current!.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2)
      })
      context.current.fill()
      animationFrame.current = requestAnimationFrame(renderCanvas)
    }
  }

  class Particle {
    position: { x: number; y: number }
    origin: { x: number; y: number }
    radius: number
    color: string
    ease: number
    friction: number
    stiffness: number
    constructor(x: number, y: number, radius = 1, color = "rgba(255,255,255,0.8)") {
      this.position = { x, y }
      this.origin = { x, y }
      this.radius = radius
      this.color = color
      this.ease = ease
      this.friction = 0.95
      this.stiffness = 0.05
    }

    update() {
      const dx = this.position.x - mouse.current.x
      const dy = this.position.y - mouse.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const repulsionForce = -((staticity || 50) / dist)

      let forceX = 0
      let forceY = 0

      if (dist < 100) {
        const angle = Math.atan2(dy, dx)
        forceX = repulsionForce * Math.cos(angle)
        forceY = repulsionForce * Math.sin(angle)
      }

      const ox = this.position.x - this.origin.x
      const oy = this.position.y - this.origin.y

      const attractionForceX = -this.stiffness * ox
      const attractionForceY = -this.stiffness * oy

      forceX += attractionForceX
      forceY += attractionForceY

      this.position.x += forceX
      this.position.y += forceY

      if (!mouseIsMoving.current) {
        this.position.x += (this.origin.x - this.position.x) * 0.05
        this.position.y += (this.origin.y - this.position.y) * 0.05
      }
    }
  }

  const initParticles = () => {
    particles.current = []
    const { w, h } = getCanvasDimensions()
    const particleCount = quantity
    const particleColor = theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * w - w / 2
      const y = Math.random() * h - h / 2
      const radius = Math.random() * 1.5 + 0.5
      particles.current.push(new Particle(x, y, radius, particleColor))
    }
  }

  useEffect(() => {
    setupCanvas()
    initParticles()
    renderCanvas()

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchmove", onTouchMove)

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [theme, refresh])

  return (
    <div className={cn("fixed inset-0 -z-10", className)} ref={canvasContainerRef}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

