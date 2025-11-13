"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number
  duration?: number
  shineColor?: string | string[]
}

/**
 * Shine Border — animated border wrapper that keeps inner content interactive.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  children,
  ...props
}: ShineBorderProps) {
  const gradient = Array.isArray(shineColor) ? shineColor.join(",") : shineColor
  const cssVariables = React.useMemo(
    () =>
      ({
        "--shine-border-width": `${borderWidth}px`,
        "--shine-border-duration": `${duration}s`,
        "--shine-border-gradient": `radial-gradient(transparent, transparent, ${gradient}, transparent, transparent)`,
      }) as React.CSSProperties,
    [borderWidth, duration, gradient],
  )

  return (
    <div
      className={cn("shine-border relative overflow-hidden", className)}
      style={{ ...cssVariables, ...style }}
      suppressHydrationWarning
      {...props}
    >
      <div
        aria-hidden
        className="shine-border__padding pointer-events-none absolute inset-0 rounded-[inherit]"
      >
        <div className="shine-border__glow pointer-events-none absolute inset-0 rounded-[inherit]" />
      </div>

      <div className="relative z-[1] h-full w-full">
        {children}
      </div>
    </div>
  )
}
