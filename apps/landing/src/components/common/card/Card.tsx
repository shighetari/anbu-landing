'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import Image from 'next/image';
import styles from './Card.module.css';

export interface CardProps {
  variant?: 'default' | 'glass' | 'gradient' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  interactive?: boolean;
  neon?: boolean;
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    position?: 'top' | 'bottom' | 'background';
    width?: number;
    height?: number;
    sizes?: string;
  };
}

type CombinedProps = CardProps & Omit<HTMLMotionProps<'div'>, keyof CardProps>;

const Card = forwardRef<HTMLDivElement, CombinedProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      glow = false,
      interactive = false,
      neon = false,
      children,
      className = '',
      header,
      footer,
      image,
      ...props
    },
    ref
  ) => {
    const cardClasses = [
      styles.card,
      styles[variant],
      styles[`padding-${padding}`],
      hover && styles.hover,
      glow && styles.glow,
      interactive && styles.interactive,
      neon && styles.neon,
      image?.position === 'background' && styles.hasBackgroundImage,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const cardContent = (
      <>
        {image?.position === 'background' && (
          <div
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${image.src})` }}
            role="img"
            aria-label={image.alt}
          />
        )}

        {image?.position === 'top' && (
          <div className={styles.imageTop}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 640}
              height={image.height ?? 360}
              sizes={image.sizes ?? '(max-width: 768px) 90vw, (max-width: 1200px) 420px, 520px'}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {header && <div className={styles.header}>{header}</div>}

        <div className={styles.content}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}

        {image?.position === 'bottom' && (
          <div className={styles.imageBottom}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 640}
              height={image.height ?? 360}
              sizes={image.sizes ?? '(max-width: 768px) 90vw, (max-width: 1200px) 420px, 520px'}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {neon && <div className={styles.neonBorder} />}
      </>
    );

    if (interactive) {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 17,
          }}
          {...props}
        >
          {cardContent}
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        {...props}
      >
        {cardContent}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
