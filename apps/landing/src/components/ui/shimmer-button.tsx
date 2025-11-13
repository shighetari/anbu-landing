import React, { CSSProperties, ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<'button'> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  asChild?: boolean;
  textColor?: string;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      asChild = false,
      type = 'button',
      style: inlineStyle,
      textColor,
      ...props
    },
    ref
  ) => {
    const computedStyle = {
      '--spread': '90deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
      ...(textColor ? { color: textColor } : {}),
      ...inlineStyle,
    } as CSSProperties;

    const baseClassName = cn(
      'group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-8 py-4 [background:var(--bg)] [border-radius:var(--radius)]',
      'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-anbu-gold focus-visible:ring-offset-black',
      className
    );

    const renderContent = (content: ReactNode) => (
      <>
        <div
          className={cn(
            '-z-30 blur-[2px]',
            'pointer-events-none absolute inset-0 overflow-visible [container-type:size]'
          )}
          aria-hidden="true"
        >
          <div className="animate-shimmer-slide absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        <span className="relative z-10 flex w-full items-center justify-center">{content}</span>

        <div
          className={cn(
            'pointer-events-none absolute inset-0 size-full',
            'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',
            'transform-gpu transition-all duration-300 ease-in-out',
            'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',
            'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]'
          )}
          aria-hidden="true"
        />

        <div
          className={cn(
            'pointer-events-none absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]'
          )}
          aria-hidden="true"
        />
      </>
    );

    if (asChild) {
      if (!React.isValidElement(children)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('ShimmerButton with `asChild` expects a single React element child.');
        }
        return null;
      }

      const child = React.Children.only(children) as ReactElement<Record<string, any>>;
      const mergedStyle = {
        ...(child.props?.style || {}),
        ...computedStyle,
      };

      return React.cloneElement(child, {
        ...props,
        className: cn(baseClassName, child.props?.className),
        style: mergedStyle,
        children: renderContent(child.props?.children),
      });
    }

    return (
      <button style={computedStyle} className={baseClassName} ref={ref} type={type} {...props}>
        {renderContent(children)}
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
