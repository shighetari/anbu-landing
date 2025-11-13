'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.css';

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
  ripple?: boolean;
  pulse?: boolean;
  nerdIcon?: string;
  asChild?: boolean;
}

type CombinedProps = ButtonProps & Omit<HTMLMotionProps<'button'>, keyof ButtonProps>;

const Button = forwardRef<HTMLButtonElement, CombinedProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      glow = false,
      ripple = true,
      pulse = false,
      nerdIcon,
      disabled = false,
      asChild = false,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !disabled && !loading) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }

      if (onClick && !disabled && !loading) {
        onClick(e);
      }
    };

    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      glow && styles.glow,
      pulse && styles.pulse,
      loading && styles.loading,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {loading && (
          <span className={styles.spinner}>
            <svg className={styles.spinnerIcon} viewBox="0 0 24 24">
              <circle
                className={styles.spinnerCircle}
                cx="12"
                cy="12"
                r="10"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </span>
        )}

        {!loading && icon && iconPosition === 'left' && (
          <span className={styles.iconLeft}>{icon}</span>
        )}

        {!loading && nerdIcon && iconPosition === 'left' && (
          <span className={`${styles.iconLeft} nf-icon ${nerdIcon}`} />
        )}

        <span className={styles.content}>{children}</span>

        {!loading && icon && iconPosition === 'right' && (
          <span className={styles.iconRight}>{icon}</span>
        )}

        {!loading && nerdIcon && iconPosition === 'right' && (
          <span className={`${styles.iconRight} nf-icon ${nerdIcon}`} />
        )}

        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className={styles.ripple}
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
      </>
    );

    if (asChild) {
      return (
        <span className={buttonClasses} ref={ref as any} {...(props as any)}>
          {content}
        </span>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
        whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
