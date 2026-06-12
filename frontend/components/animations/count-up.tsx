"use client"

import { useEffect, useRef, useState, type ElementType } from "react"
import { cn } from "@/lib/utils"
import { useInView, usePrefersReducedMotion } from "@/hooks/use-in-view"

interface CountUpProps {
  /** The number to count up to. */
  end: number
  /** Starting number (default 0). */
  start?: number
  /** Animation duration in milliseconds. */
  duration?: number
  /** Text rendered before the number, e.g. "$". */
  prefix?: string
  /** Text rendered after the number, e.g. "+" or "%". */
  suffix?: string
  /** Decimal places to show (default 0). */
  decimals?: number
  /** Add thousands separators (e.g. 5,000). Default true. */
  separator?: boolean
  className?: string
  as?: ElementType
  /** Count only the first time it enters view (default true). */
  once?: boolean
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts up from `start` to `end` when it scrolls into view.
 * Respects reduced-motion by jumping straight to the final value.
 */
export function CountUp({
  end,
  start = 0,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = true,
  className,
  as,
  once = true,
}: CountUpProps) {
  const Component = (as ?? "span") as ElementType
  const reducedMotion = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLElement>({ once, threshold: 0.4 })
  const [value, setValue] = useState(start)
  const frameRef = useRef(0)

  useEffect(() => {
    if (!inView) return

    if (reducedMotion) {
      setValue(end)
      return
    }

    let startTime: number | null = null

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      setValue(start + (end - start) * easeOutCubic(progress))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, reducedMotion, start, end, duration])

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: separator,
  })

  return (
    <Component ref={ref} className={cn(className)}>
      {prefix}
      {formatted}
      {suffix}
    </Component>
  )
}
