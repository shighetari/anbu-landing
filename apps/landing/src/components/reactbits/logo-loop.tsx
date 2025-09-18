"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type Logo = {
  src?: string
  alt: string
  href?: string
  render?: React.ReactNode
}

interface LogoLoopProps extends ComponentPropsWithoutRef<"div"> {
  logos: Logo[]
  speed?: number
  direction?: "left" | "right"
  fadeEdges?: boolean
}

/**
 * Subtle marquee inspired by React Bits "logo-loop" interaction.
 */
export function LogoLoop({
  logos,
  className,
  speed = 30,
  direction = "left",
  fadeEdges = true,
  ...props
}: LogoLoopProps) {
  const repeated = [...logos, ...logos]
  const duration = Math.max(12, (repeated.length * speed) / 10)

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        fadeEdges &&
          "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-16 before:bg-gradient-to-r before:from-black before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-16 after:bg-gradient-to-l after:from-black after:to-transparent",
        className,
      )}
      {...props}
    >
      <motion.div
        className="flex w-max items-center gap-10"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((logo, index) => {
          const content = logo.render ? (
            logo.render
          ) : logo.src ? (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className="h-8 w-auto opacity-80 transition-opacity duration-300 hover:opacity-100"
            />
          ) : (
            <span className="text-sm font-semibold text-white/70">{logo.alt}</span>
          )

          const Wrapper = logo.href ? "a" : "div"
          return (
            <Wrapper
              key={`${logo.alt}-${index}`}
              href={logo.href}
              className="flex items-center justify-center"
              target={logo.href ? "_blank" : undefined}
              rel={logo.href ? "noreferrer" : undefined}
            >
              {content}
            </Wrapper>
          )
        })}
      </motion.div>
    </div>
  )
}
