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

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={style}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: `${borderWidth}px`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] will-change-[background-position] motion-safe:animate-shine"
          style={{
            backgroundImage: `radial-gradient(transparent, transparent, ${gradient}, transparent, transparent)`,
            backgroundSize: "300% 300%",
            animationDuration: `${duration}s`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>

      <div className="relative z-[1] h-full w-full">
        {children}
      </div>
    </div>
  )
}
