'use client';

import { cn } from '@/lib/utils';
import { IconLayoutNavbarCollapse } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { useRef, useState } from 'react';

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
  const pathname = usePathname();
  const menuId = 'floating-dock-mobile-menu';
  return (
    <div className={cn('relative block md:hidden', className)}>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1]"
              onClick={() => setOpen(false)}
            />
            {/* Horizontal dock container - positioned above the button */}
            <motion.div
              layoutId="dock-mobile"
              className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div
                id={menuId}
                role="menu"
                aria-label="Quick navigation"
                className="flex items-center gap-2 rounded-full border border-anbu-gold/30 bg-black/80 px-3 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
              >
                {items.map((item, idx) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <motion.a
                      key={item.title}
                      href={item.href}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          delay: idx * 0.05,
                          type: 'spring',
                          stiffness: 400,
                          damping: 25,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        transition: {
                          delay: (items.length - 1 - idx) * 0.03,
                        },
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'group relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300',
                        isActive
                          ? 'border-anbu-gold/60 bg-anbu-gold/30'
                          : 'border-white/10 bg-white/5 hover:border-anbu-gold/50 hover:bg-anbu-gold/20'
                      )}
                      onClick={() => setOpen(false)}
                      aria-label={item.title}
                      aria-current={isActive ? 'page' : undefined}
                      role="menuitem"
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    >
                      <div
                        className={cn(
                          'h-5 w-5 transition-colors duration-300',
                          isActive ? 'text-white' : 'text-anbu-gold group-hover:text-white'
                        )}
                      >
                        {item.icon}
                      </div>
                      {/* Tooltip */}
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0, y: 5, scale: 0.8 }}
                        whileHover={{ opacity: 1, y: -8, scale: 1 }}
                        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-anbu-gold/30 bg-black/90 px-2 py-1 text-xs text-white"
                      >
                        {item.title}
                      </motion.span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-anbu-gold/30 bg-black/60 backdrop-blur-xl transition-all duration-300 hover:border-anbu-gold/60 hover:bg-black/70 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Toggle quick navigation dock"
        aria-controls={menuId}
        aria-expanded={open}
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-anbu-gold" />
      </motion.button>
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
        'mx-auto hidden h-16 items-center gap-2 rounded-2xl border border-anbu-gold/30 bg-gradient-to-b from-black/40 to-black/60 px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_8px_40px_rgba(255,215,0,0.15)] md:flex',
        className
      )}
      role="navigation"
      aria-label="Quick navigation dock"
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
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-120, 0, 120], [48, 64, 48]);
  let heightTransform = useTransform(distance, [-120, 0, 120], [48, 64, 48]);

  let widthTransformIcon = useTransform(distance, [-120, 0, 120], [24, 32, 24]);
  let heightTransformIcon = useTransform(distance, [-120, 0, 120], [24, 32, 24]);

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
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      aria-label={title}
      aria-current={isActive ? 'page' : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'relative flex aspect-square cursor-pointer items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-colors duration-300',
          isActive
            ? 'border-anbu-gold/60 bg-anbu-gold/25 shadow-[0_0_25px_rgba(255,215,0,0.4)]'
            : 'border-anbu-gold/20 bg-gradient-to-b from-white/10 to-white/5 hover:border-anbu-gold/50 hover:from-anbu-gold/20 hover:to-anbu-gold/10 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]'
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: -5, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute -top-10 left-1/2 w-fit whitespace-pre rounded-lg border border-anbu-gold/30 bg-black/90 px-3 py-1.5 text-xs font-medium text-white shadow-[0_4px_20px_rgba(255,215,0,0.3)] backdrop-blur-xl"
              aria-hidden="true"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={cn(
            'flex items-center justify-center transition-colors duration-300',
            isActive ? 'text-white' : 'text-anbu-gold hover:text-white'
          )}
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
