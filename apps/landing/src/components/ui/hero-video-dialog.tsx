"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Play, XIcon } from "@/components/ui/lucide-safe"
import Image from "next/image"

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
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const animation = animationVariants[animationStyle]
  const embedSrc = buildEmbedSrc(videoSrc)

  useEffect(() => {
    if (!open) return

    previousActiveElement.current = document.activeElement as HTMLElement | null
    const dialogEl = dialogRef.current
    if (dialogEl) {
      dialogEl.focus()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], iframe, [tabindex]:not([tabindex="-1"])',
        )

        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement as HTMLElement | null

        if (event.shiftKey && active === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      previousActiveElement.current?.focus()
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-[32px] border border-white/12 bg-black/40 shadow-[0_45px_140px_rgba(0,0,0,0.55)] backdrop-blur transition duration-300 hover:border-white/20 hover:shadow-[0_55px_160px_rgba(255,195,110,0.25)]"
      >
        <Image
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="aspect-video w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          priority={false}
          suppressHydrationWarning
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl transition duration-300 group-hover:scale-105">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD36E] via-[#FFB85A] to-[#FF995F] shadow-[0_0_45px_rgba(255,195,110,0.45)]">
              <Play className="h-7 w-7 fill-anbu-ink text-anbu-ink" />
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
            ref={dialogRef}
            {...animation}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative mx-4 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-anbu-gold"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={thumbnailAlt}
            tabIndex={-1}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-black/70 p-2 text-white shadow-md backdrop-blur transition hover:bg-black/80"
            >
              <XIcon className="h-5 w-5" />
            </button>

              <iframe
                key={embedSrc}
                src={embedSrc}
                title="Hero video"
                className="aspect-video w-full"
                tabIndex={0}
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
