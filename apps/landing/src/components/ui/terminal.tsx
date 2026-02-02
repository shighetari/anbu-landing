'use client';

import { cn } from '@/lib/utils';
import { motion, MotionProps, useInView } from 'motion/react';
import { Children, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

interface SequenceContextValue {
  completeItem: (index: number) => void;
  activeIndex: number;
  sequenceStarted: boolean;
}

const SequenceContext = createContext<SequenceContextValue | null>(null);

const useSequence = () => useContext(SequenceContext);

const ItemIndexContext = createContext<number | null>(null);
const useItemIndex = () => useContext(ItemIndexContext);

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  startOnView?: boolean;
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}: AnimatedSpanProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    if (!sequence || itemIndex === null) return;
    if (!sequence.sequenceStarted) return;
    if (hasStarted) return;
    if (sequence.activeIndex === itemIndex) {
      setHasStarted(true);
    }
  }, [sequence?.activeIndex, sequence?.sequenceStarted, hasStarted, itemIndex]);

  const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true;

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      className={cn('grid min-h-[1.4em] text-sm font-normal tracking-tight', className)}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 1.4em',
      }}
      onAnimationComplete={() => {
        if (!sequence) return;
        if (itemIndex === null) return;
        sequence.completeItem(itemIndex);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 50,
  delay = 0,
  as: Component = 'span',
  startOnView = true,
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== 'string') {
    throw new Error('TypingAnimation: children must be a string. Received:');
  }

  const MotionComponent = useMemo(
    () =>
      motion.create(Component, {
        forwardMotionProps: true,
      }),
    [Component]
  );

  const [displayedText, setDisplayedText] = useState<string>('');
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  const sequence = useSequence();
  const itemIndex = useItemIndex();

  useEffect(() => {
    if (sequence && itemIndex !== null) {
      if (!sequence.sequenceStarted) return;
      if (started) return;
      if (sequence.activeIndex === itemIndex) {
        setStarted(true);
      }
      return;
    }

    if (!startOnView) {
      const startTimeout = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(startTimeout);
    }

    if (!isInView) return;

    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [
    delay,
    startOnView,
    isInView,
    started,
    sequence?.activeIndex,
    sequence?.sequenceStarted,
    itemIndex,
  ]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
        if (sequence && itemIndex !== null) {
          sequence.completeItem(itemIndex);
        }
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn('relative block min-h-[1.4em] text-sm font-normal tracking-tight', className)}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 1.4em',
        willChange: 'contents',
      }}
      {...props}
    >
      {displayedText}
      {started && displayedText.length < children.length && (
        <motion.span
          className="ml-[1px] inline-block h-4 w-[2px] bg-anbu-gold align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </MotionComponent>
  );
};

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
  sequence?: boolean;
  startOnView?: boolean;
}

export const Terminal = ({
  children,
  className,
  sequence = true,
  startOnView = true,
}: TerminalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceHasStarted = sequence ? !startOnView || isInView : false;

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null;
    return {
      completeItem: (index: number) => {
        setActiveIndex((current) => (index === current ? current + 1 : current));
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    };
  }, [sequence, activeIndex, sequenceHasStarted]);

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children;
    const array = Children.toArray(children);
    return array.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child as React.ReactNode}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequence]);

  const content = (
    <div
      ref={containerRef}
      className={cn('group relative z-0 w-full text-left text-white', className)}
      style={{
        contain: 'layout style paint', // Isolate terminal from external layout
        contentVisibility: 'auto',
      }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-anbu-gold/20 via-anbu-gold/10 to-anbu-gold/20 opacity-0 blur-md transition-all duration-500 group-hover:opacity-100" />

      {/* Matrix rain effect background - optimized for performance */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 215, 0, 0.03) 2px,
              rgba(255, 215, 0, 0.03) 4px
            )`,
            backgroundSize: '100% 100%',
            willChange: 'background-position',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '0% 100%'],
          }}
          transition={{
            duration: 20, // Slower, more subtle effect
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </div>

      {/* Terminal window */}
      <div className="border-white/12 relative rounded-2xl border bg-gradient-to-b from-neutral-950/95 to-black/95 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {/* Terminal header with glowing border */}
        <motion.div
          className="border-white/8 relative flex flex-col gap-3 overflow-hidden rounded-xl border bg-gradient-to-r from-black/60 via-black/45 to-black/60 px-4 py-3.5"
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Animated border beam - optimized for smooth motion */}
          <motion.div
            className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-anbu-gold/50 to-transparent"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 4, // Smoother, less jarring
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <div className="flex items-center gap-2">
            <motion.span
              className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
              whileHover={{ scale: 1.2 }}
              animate={{
                boxShadow: [
                  '0 0 8px rgba(239,68,68,0.5)',
                  '0 0 10px rgba(239,68,68,0.6)',
                  '0 0 8px rgba(239,68,68,0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="h-3 w-3 rounded-full bg-yellow-400/80 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
              whileHover={{ scale: 1.2 }}
              animate={{
                boxShadow: [
                  '0 0 8px rgba(251,191,36,0.5)',
                  '0 0 10px rgba(251,191,36,0.6)',
                  '0 0 8px rgba(251,191,36,0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
            />
            <motion.span
              className="h-3 w-3 rounded-full bg-green-500/75 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
              whileHover={{ scale: 1.2 }}
              animate={{
                boxShadow: [
                  '0 0 8px rgba(34,197,94,0.5)',
                  '0 0 10px rgba(34,197,94,0.6)',
                  '0 0 8px rgba(34,197,94,0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
            />
          </div>
          <div className="absolute left-1/2 top-2 -translate-x-1/2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              anbu@terminal
            </span>
          </div>
        </motion.div>

        {/* Terminal content with enhanced styling and layout containment */}
        <pre
          className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-anbu-gold/20 hover:scrollbar-thumb-anbu-gold/30 relative mt-3 overflow-x-hidden overflow-y-scroll rounded-xl bg-gradient-to-b from-black/50 to-black/30 px-4 py-5 pr-6 font-mono text-[13px]"
          style={{
            height: '260px', // Fixed height - critical for preventing layout shifts
            minHeight: '260px',
            maxHeight: '260px',
            scrollbarGutter: 'stable both-edges',
            contain: 'strict', // Strictest containment to completely isolate layout
            contentVisibility: 'auto',
            willChange: 'scroll-position',
            overflow: 'scroll', // Force scrollbars to always be visible
          }}
        >
          {/* Scanline effect - optimized for smooth performance */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              background: `linear-gradient(
                transparent 50%,
                rgba(255, 215, 0, 0.1) 50%
              )`,
              backgroundSize: '100% 4px',
              willChange: 'background-position',
              backfaceVisibility: 'hidden',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '0px 4px'],
            }}
            transition={{
              duration: 2, // Slower for smoother effect
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <code
            className="relative grid gap-y-2 whitespace-pre-wrap break-words"
            style={{
              contain: 'layout style',
              minHeight: '100%',
              display: 'grid',
            }}
          >
            {wrappedChildren}
          </code>
        </pre>
      </div>
    </div>
  );

  if (!sequence) return content;

  return <SequenceContext.Provider value={contextValue}>{content}</SequenceContext.Provider>;
};
