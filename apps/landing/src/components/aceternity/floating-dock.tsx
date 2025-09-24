"use client";

import { cn } from "@/lib/cn";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-xl border border-anbu-gold/30 hover:border-anbu-gold/60 hover:bg-black/70 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300"
                >
                  <div className="h-5 w-5 text-anbu-gold hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-xl border border-anbu-gold/30 hover:border-anbu-gold/60 hover:bg-black/70 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-anbu-gold hover:text-white transition-colors duration-300" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-center gap-2 rounded-2xl bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-2xl px-4 py-2 md:flex border border-anbu-gold/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_40px_rgba(255,215,0,0.15)] transition-all duration-500",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-120, 0, 120], [48, 64, 48]);
  let heightTransform = useTransform(distance, [-120, 0, 120], [48, 64, 48]);

  let widthTransformIcon = useTransform(distance, [-120, 0, 120], [24, 32, 24]);
  let heightTransformIcon = useTransform(
    distance,
    [-120, 0, 120],
    [24, 32, 24]
  );

  let width = useSpring(widthTransform, {
    mass: 0.8,
    stiffness: 300,
    damping: 30,
  });
  let height = useSpring(heightTransform, {
    mass: 0.8,
    stiffness: 300,
    damping: 30,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.8,
    stiffness: 300,
    damping: 30,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.8,
    stiffness: 300,
    damping: 30,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gradient-to-b from-white/10 to-white/5 hover:from-anbu-gold/20 hover:to-anbu-gold/10 border border-anbu-gold/20 hover:border-anbu-gold/50 shadow-lg hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] backdrop-blur-xl transition-colors duration-300 cursor-pointer"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: -5, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute -top-10 left-1/2 w-fit rounded-lg border border-anbu-gold/30 bg-black/90 backdrop-blur-xl px-3 py-1.5 text-xs font-medium whitespace-pre text-white shadow-[0_4px_20px_rgba(255,215,0,0.3)]"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-anbu-gold hover:text-white transition-colors duration-300"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}