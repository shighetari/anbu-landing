import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { AnimatedTooltip } from "@/components/reactbits/animated-tooltip";
import { cn } from "@/lib/utils";

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
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
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
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-all",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-6">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-3 transition-all duration-300 lg:group-hover:-translate-y-8">
        {tooltip ? (
          <div className="inline-flex">
            <AnimatedTooltip label={tooltip}>
              <Icon className="h-11 w-11 origin-left transform-gpu text-anbu-gold transition-all duration-300 ease-in-out group-hover:scale-75" />
            </AnimatedTooltip>
          </div>
        ) : (
          <Icon className="h-11 w-11 origin-left transform-gpu text-anbu-gold transition-all duration-300 ease-in-out group-hover:scale-75" />
        )}
        <h3 className="text-xl font-semibold text-white">
          {name}
        </h3>
        <p className="max-w-lg text-sm leading-relaxed text-white/70">{description}</p>
      </div>

      <div
        className={cn(
          "lg:hidden pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <Link
          className="pointer-events-auto inline-flex items-center gap-2 text-sm font-semibold text-anbu-gold transition-colors hover:text-anbu-gold/80"
          href={href}
        >
          {cta}
          <ArrowRightIcon className="ms-1 h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>

    <div
      className={cn(
        "hidden lg:flex pointer-events-none absolute bottom-0 w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Link
        className="pointer-events-auto inline-flex items-center gap-2 text-sm font-semibold text-anbu-gold transition-colors hover:text-anbu-gold/80"
        href={href}
      >
        {cta}
        <ArrowRightIcon className="ms-1 h-4 w-4 rtl:rotate-180" />
      </Link>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/5" />
  </div>
);

export { BentoCard, BentoGrid };
