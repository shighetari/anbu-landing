import { cn } from '@/lib/utils';

type BrandButtonVariant = 'primary' | 'secondary' | 'ghost';
type BrandButtonSize = 'sm' | 'md' | 'lg';

type BrandButtonOptions = {
  variant?: BrandButtonVariant;
  size?: BrandButtonSize;
  className?: string;
};

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-full border font-semibold uppercase tracking-[0.22em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-anbu-gold focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-60';

const buttonSizes: Record<BrandButtonSize, string> = {
  sm: 'px-4 py-2 text-[0.6rem] sm:text-[0.65rem] lg:text-[0.7rem]',
  md: 'px-6 py-2.5 text-[0.68rem] sm:text-[0.75rem] lg:text-[0.8rem]',
  lg: 'px-8 py-3 text-[0.75rem] sm:text-xs lg:text-sm',
};

const buttonVariants: Record<BrandButtonVariant, string> = {
  primary:
    'border-anbu-gold/60 bg-gradient-to-br from-[#FFD700] via-[#FFC94A] to-[#FFB347] text-anbu-ink shadow-[0_12px_30px_rgba(255,215,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(255,215,0,0.35)] active:translate-y-0',
  secondary:
    'border-white/15 bg-white/[0.08] text-white/85 hover:border-anbu-gold/45 hover:bg-white/[0.12] hover:text-anbu-gold',
  ghost:
    'border-transparent text-anbu-gold/80 hover:border-anbu-gold/40 hover:bg-anbu-gold/10 hover:text-anbu-gold',
};

export function brandButton({
  variant = 'primary',
  size = 'md',
  className,
}: BrandButtonOptions = {}) {
  return cn(buttonBase, buttonSizes[size], buttonVariants[variant], className);
}

export const brandPillBadge =
  'inline-flex items-center gap-2 rounded-full border border-anbu-gold/25 bg-anbu-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-anbu-gold';
