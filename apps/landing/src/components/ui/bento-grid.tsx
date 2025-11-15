import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

import { AnimatedTooltip } from '@/components/reactbits/animated-tooltip';
import { ShinyText } from '@/components/magicui/shiny-text';
import { cn } from '@/lib/utils';

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta: string;
  tooltip?: string;
  gradientClass?: string;
  accentColor?: string;
  onClick?: () => void;
  ctaOnClick?: () => void;
}

const MotionLink = motion.create(Link);

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid w-full',
        'grid-cols-1 xs:grid-cols-2 lg:grid-cols-4',
        'gap-3 sm:gap-4 md:gap-5',
        className
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
  accentColor = '#FFD700',
  onClick,
  ctaOnClick,
  ...props
}: BentoCardProps) => {
  const hasHref = typeof href === 'string' && href.length > 0;

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (ctaOnClick) {
      ctaOnClick();
      return;
    }
    onClick?.();
  };

  const CtaContent = () => (
    <>
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: `linear-gradient(135deg, ${accentColor}15, transparent, ${accentColor}10)`,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}20, transparent 70%)`,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2 text-white/90"
        whileHover={{ color: '#FFD700' }}
        transition={{ duration: 0.3 }}
      >
        {cta}
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180" />
        </motion.span>
      </motion.span>
    </>
  );

  return (
    <div
      key={name}
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden',
        'rounded-xl sm:rounded-2xl',
        'border border-white/[0.08] bg-gradient-to-br from-neutral-950/95 via-neutral-900/90 to-neutral-950/95',
        'shadow-[0_10px_30px_rgba(0,0,0,0.3)] lg:shadow-[0_15px_40px_rgba(0,0,0,0.4)]',
        'transition-all duration-500 ease-out',
        'hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(255,215,0,0.18)] motion-safe:hover:-translate-y-2',
        'hover:border-anbu-gold/40',
        'backdrop-blur-sm',
        onClick && 'cursor-pointer',
        className
      )}
      style={
        {
          '--accent-color': accentColor,
        } as React.CSSProperties
      }
      onClick={onClick}
      {...props}
    >
      <div className="absolute inset-0 opacity-80">
        {background}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60" />
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
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
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center p-2.5 text-center sm:p-3 md:p-4 lg:p-5 xl:p-5">
          <div className="flex transform-gpu flex-col items-center gap-1.5 transition-all duration-700 sm:gap-2 md:gap-3 lg:gap-3">
            <motion.div
              className="relative"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
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
                  ease: 'easeInOut',
                }}
              />
              {tooltip ? (
                <div className="relative inline-flex">
                  <AnimatedTooltip label={tooltip}>
                    <Icon
                      className="h-6 w-6 transform-gpu transition-all duration-700 ease-out sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-8 lg:w-8"
                      style={{ color: accentColor }}
                    />
                  </AnimatedTooltip>
                </div>
              ) : (
                <Icon
                  className="relative h-6 w-6 transform-gpu transition-all duration-700 ease-out sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-8 lg:w-8"
                  style={{ color: accentColor }}
                />
              )}
            </motion.div>

            <ShinyText className="text-xs font-bold sm:text-sm md:text-base lg:text-base" speed={3}>
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
              className="max-w-lg px-1 text-[10px] leading-relaxed text-white/80 transition-all duration-500 group-hover:text-white/95 sm:px-2 sm:text-xs md:text-sm lg:text-sm"
            >
              {description}
            </motion.p>
          </div>
        </div>

        <div className="relative z-20 mt-auto p-3 sm:p-4 md:p-5 lg:p-5">
          <div className="block w-full">
            {hasHref ? (
              <MotionLink
                href={href as string}
                className={cn(
                  'relative block w-full overflow-hidden',
                  'text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-sm',
                  'px-3 py-2 xs:px-4 xs:py-2.5 sm:px-6 sm:py-3 md:px-7 lg:py-3.5',
                  'rounded-full font-semibold',
                  'border border-white/20',
                  'bg-black/60 backdrop-blur-sm',
                  'shadow-lg',
                  'transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-anbu-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                )}
                onClick={(e) => onClick && e.stopPropagation()}
                initial={{ opacity: 0.9, y: 0 }}
                whileHover={{
                  opacity: 1,
                  y: -2,
                  borderColor: 'rgba(255, 215, 0, 0.6)',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.3), 0 10px 40px rgba(0, 0, 0, 0.4)',
                }}
                transition={{ duration: 0.3 }}
              >
                <CtaContent />
              </MotionLink>
            ) : (
              <motion.button
                className={cn(
                  'relative w-full overflow-hidden',
                  'text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-sm',
                  'px-3 py-2 xs:px-4 xs:py-2.5 sm:px-6 sm:py-3 md:px-7 lg:py-3.5',
                  'rounded-full font-semibold',
                  'border border-white/20',
                  'bg-black/60 backdrop-blur-sm',
                  'shadow-lg',
                  'transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-anbu-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                )}
                initial={{ opacity: 0.9, y: 0 }}
                whileHover={{
                  opacity: 1,
                  y: -2,
                  borderColor: 'rgba(255, 215, 0, 0.6)',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.3), 0 10px 40px rgba(0, 0, 0, 0.4)',
                }}
                transition={{ duration: 0.3 }}
                type="button"
                onClick={handleButtonClick}
              >
                <CtaContent />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, transparent, ${accentColor}10, transparent)`,
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 sm:rounded-2xl"
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
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export { BentoCard, BentoGrid };
