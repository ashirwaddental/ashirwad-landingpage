"use client"

import { type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useInView, usePrefersReducedMotion } from "@/hooks/use-in-view"

type Direction = "up" | "down" | "left" | "right" | "none"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Element/tag to render as. Defaults to a div. */
  as?: ElementType
  /** Direction the content travels in from. */
  direction?: Direction
  /** Delay before the animation starts, in milliseconds. */
  delay?: number
  /** Animation duration, in milliseconds. */
  duration?: number
  /** Travel distance in pixels. */
  distance?: number
  /** Also scale up slightly while revealing. */
  scale?: boolean
  /** Animate only the first time it enters view (default true). */
  once?: boolean
  /** Portion visible before triggering (0–1). */
  threshold?: number
  /** Any other props (onClick, role, aria-*, …) are forwarded to the element. */
  [key: string]: unknown
}

const hiddenTransform = (direction: Direction, distance: number, scale: boolean) => {
  const scalePart = scale ? " scale(0.96)" : ""
  switch (direction) {
    case "up":
      return `translate3d(0, ${distance}px, 0)${scalePart}`
    case "down":
      return `translate3d(0, -${distance}px, 0)${scalePart}`
    case "left":
      return `translate3d(${distance}px, 0, 0)${scalePart}`
    case "right":
      return `translate3d(-${distance}px, 0, 0)${scalePart}`
    default:
      return `translate3d(0, 0, 0)${scalePart}`
  }
}

/**
 * Wraps any content and reveals it (fade + slide/scale) when it scrolls into view.
 * Works inside Server Components — just import and use it in JSX.
 */
export function Reveal({
  children,
  className,
  as,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 32,
  scale = false,
  once = true,
  threshold = 0.15,
  ...rest
}: RevealProps) {
  const Component = (as ?? "div") as ElementType
  const reducedMotion = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLElement>({ once, threshold })

  const show = inView || reducedMotion

  return (
    <Component
      {...rest}
      ref={ref}
      className={cn(className)}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : hiddenTransform(direction, distance, scale),
        transition: reducedMotion
          ? undefined
          : `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  )
}
