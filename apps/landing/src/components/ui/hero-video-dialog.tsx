"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out"

interface HeroVideoDialogProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
}

const animationVariants: Record<AnimationStyle, {
  initial: any
  animate: any
  exit: any
}> = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
}

function buildEmbedSrc(src: string) {
  if (!src) return ""
  return src.includes("?")
    ? `${src}&modestbranding=1&rel=0`
    : `${src}?modestbranding=1&rel=0`
}

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoDialogProps) {
  const [open, setOpen] = useState(false)

  const animation = animationVariants[animationStyle]
  const embedSrc = buildEmbedSrc(videoSrc)

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-[32px] border border-white/12 bg-black/40 shadow-[0_45px_140px_rgba(0,0,0,0.55)] backdrop-blur transition duration-300 hover:border-white/20 hover:shadow-[0_55px_160px_rgba(255,195,110,0.25)]"
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl transition duration-300 group-hover:scale-105">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD36E] via-[#FFB85A] to-[#FF995F] shadow-[0_0_45px_rgba(255,195,110,0.45)]">
              <Play className="h-7 w-7 fill-black text-black" />
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
            onClick={() => setOpen(false)}
          >
            <motion.div
              {...animation}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative mx-4 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close video"
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 rounded-full bg-black/70 p-2 text-white shadow-md backdrop-blur"
              >
                <XIcon className="h-5 w-5" />
              </button>

              <iframe
                key={embedSrc}
                src={embedSrc}
                title="Hero video"
                className="aspect-video w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
