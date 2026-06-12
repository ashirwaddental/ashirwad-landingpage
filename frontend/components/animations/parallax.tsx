"use client"

import { useEffect, useRef, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/hooks/use-in-view"

interface ParallaxProps {
  children: ReactNode
  className?: string
  as?: ElementType
  /**
   * Parallax strength. Positive moves the element slower than scroll (drifts up),
   * negative moves it the opposite way. Typical range -0.4 … 0.4.
   */
  speed?: number
  /** Parallax on the horizontal axis instead of vertical. */
  axis?: "x" | "y"
}

/**
 * Translates its content as the page scrolls to create a depth/parallax effect.
 * Uses requestAnimationFrame for smoothness and respects reduced-motion.
 */
export function Parallax({
  children,
  className,
  as,
  speed = 0.2,
  axis = "y",
}: ParallaxProps) {
  const Component = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || reducedMotion) return

    let frame = 0
    let ticking = false

    const update = () => {
      ticking = false
      const rect = node.getBoundingClientRect()
      const viewportH = window.innerHeight || document.documentElement.clientHeight
      // Distance of the element's center from the viewport center.
      const fromCenter = rect.top + rect.height / 2 - viewportH / 2
      const offset = fromCenter * speed * -1
      node.style.transform =
        axis === "y"
          ? `translate3d(0, ${offset.toFixed(2)}px, 0)`
          : `translate3d(${offset.toFixed(2)}px, 0, 0)`
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        frame = window.requestAnimationFrame(update)
      }
    }

    node.style.willChange = "transform"
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [speed, axis, reducedMotion])

  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  )
}
