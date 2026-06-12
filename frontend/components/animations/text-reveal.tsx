"use client"

import { type ElementType } from "react"
import { cn } from "@/lib/utils"
import { useInView, usePrefersReducedMotion } from "@/hooks/use-in-view"

interface TextRevealProps {
  /** The text to reveal word by word. */
  text: string
  className?: string
  /** Heading/element to render as (h1, h2, p, span…). Defaults to a span. */
  as?: ElementType
  /** Delay between each word, in milliseconds. */
  stagger?: number
  /** Delay before the first word reveals, in milliseconds. */
  delay?: number
  /** Duration of each word's animation, in milliseconds. */
  duration?: number
  /** Animate only the first time it enters view (default true). */
  once?: boolean
}

/**
 * Reveals text one word at a time as it scrolls into view (rise + fade).
 * Whitespace and wrapping are preserved.
 */
export function TextReveal({
  text,
  className,
  as,
  stagger = 60,
  delay = 0,
  duration = 600,
  once = true,
}: TextRevealProps) {
  const Component = (as ?? "span") as ElementType
  const reducedMotion = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLElement>({ once, threshold: 0.2 })

  const show = inView || reducedMotion
  const words = text.split(" ")

  return (
    <Component ref={ref} className={cn(className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(100%)",
              transition: reducedMotion
                ? undefined
                : `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * stagger}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * stagger}ms`,
              willChange: "opacity, transform",
            }}
          >
            {word}
          </span>
          {/* preserve the space between words */}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Component>
  )
}
