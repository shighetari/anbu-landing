import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "framer-motion";

import { AnimatedTooltip } from "@/components/reactbits/animated-tooltip";
import { ShinyText } from "@/components/magicui/shiny-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";
import { buttonVariants, animationVariants, buttonSizes } from "@/lib/button-variants";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
  tooltip?: string;
  gradientClass?: string;
  accentColor?: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full",
        "auto-rows-[11rem] sm:auto-rows-[12rem] md:auto-rows-[13rem] lg:auto-rows-[14rem] xl:auto-rows-[15rem]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  tooltip,
  gradientClass,
  accentColor = "#FFD700",
  ...props
}: BentoCardProps) => {
  return (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden",
      "rounded-xl sm:rounded-2xl",
      "border border-white/[0.08] bg-gradient-to-br from-neutral-950/95 via-neutral-900/90 to-neutral-950/95",
      "shadow-[0_10px_30px_rgba(0,0,0,0.3)] lg:shadow-[0_15px_40px_rgba(0,0,0,0.4)]",
      "transition-all duration-500 ease-out",
      "hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(255,215,0,0.18)] motion-safe:hover:-translate-y-2",
      "hover:border-anbu-gold/40",
      "min-h-[9rem] sm:min-h-[10rem] md:min-h-[11rem] lg:min-h-0",
      "backdrop-blur-sm",
      className,
    )}
    style={{
      "--accent-color": accentColor,
    } as React.CSSProperties}
    {...props}
  >
    <div className="absolute inset-0 opacity-80">
      {background}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60" />
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${accentColor}20, transparent 70%)`,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 30% 30%, ${accentColor}20, transparent 70%)`,
            `radial-gradient(circle at 70% 70%, ${accentColor}20, transparent 70%)`,
            `radial-gradient(circle at 30% 70%, ${accentColor}20, transparent 70%)`,
            `radial-gradient(circle at 70% 30%, ${accentColor}20, transparent 70%)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>

    <div className="relative z-10 flex flex-col h-full">
      <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 xl:p-6 flex flex-col items-center text-center flex-1">
        <div className="flex transform-gpu flex-col items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 transition-all duration-700">
          <motion.div
            className="relative"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="absolute inset-0 blur-2xl"
              style={{ backgroundColor: accentColor }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {tooltip ? (
              <div className="relative inline-flex">
                <AnimatedTooltip label={tooltip}>
                  <Icon
                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-8 lg:w-8 xl:h-9 xl:w-9 transform-gpu transition-all duration-700 ease-out"
                    style={{ color: accentColor }}
                  />
                </AnimatedTooltip>
              </div>
            ) : (
              <Icon
                className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-8 lg:w-8 xl:h-9 xl:w-9 transform-gpu transition-all duration-700 ease-out"
                style={{ color: accentColor }}
              />
            )}
          </motion.div>

          <ShinyText className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-bold" speed={3}>
            <motion.span
              className="bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent"
              whileHover={{
                backgroundImage: `linear-gradient(90deg, white, ${accentColor}, white)`,
              }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.span>
          </ShinyText>

          <motion.p
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            className="max-w-lg text-[10px] sm:text-xs md:text-sm lg:text-sm leading-relaxed text-white/80 group-hover:text-white/95 transition-all duration-500 px-1 sm:px-2"
          >
            {description}
          </motion.p>
        </div>
      </div>

      <div className="relative z-20 p-3 sm:p-4 md:p-5 lg:p-6 mt-auto">
        <motion.div
          className="flex w-full justify-center items-center"
          initial={{ opacity: 0.9, y: 0 }}
          whileHover={{ opacity: 1, y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={href} className="block w-full max-w-[200px]">
            <ShimmerButton
              {...buttonVariants.ghost}
              className={cn(
                buttonVariants.ghost.className,
                "w-full",
                "text-[11px] sm:text-xs md:text-sm lg:text-sm px-6 py-3 sm:px-7 sm:py-3.5 lg:px-8 lg:py-4",
                "font-semibold",
                "border border-white/20 hover:border-white/40",
                "bg-black/60 hover:bg-black/80 backdrop-blur-sm",
                "shadow-lg hover:shadow-2xl",
                "transition-all duration-300",
                "group-hover:border-anbu-gold/60 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              )}
              shimmerSize="0.08em"
              style={{
                "--shimmer-color": accentColor,
              } as React.CSSProperties}
            >
              <span
                className="flex items-center justify-center gap-2 text-white/90 group-hover:text-anbu-gold transition-colors duration-300"
              >
                {cta}
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180" />
                </motion.span>
              </span>
            </ShimmerButton>
          </Link>
        </motion.div>
      </div>
    </div>

    <motion.div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      style={{
        background: `linear-gradient(135deg, transparent, ${accentColor}10, transparent)`,
      }}
    />

    <motion.div
      className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100"
      style={{
        boxShadow: `inset 0 0 40px ${accentColor}15`,
      }}
      animate={{
        boxShadow: [
          `inset 0 0 20px ${accentColor}10`,
          `inset 0 0 40px ${accentColor}20`,
          `inset 0 0 20px ${accentColor}10`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
  );
};

export { BentoCard, BentoGrid };