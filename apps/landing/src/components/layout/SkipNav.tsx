'use client';

export default function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-anbu-gold focus:px-6 focus:py-3 focus:font-semibold focus:text-anbu-ink focus:outline-none focus:ring-2 focus:ring-anbu-gold focus:ring-offset-2 focus:ring-offset-black focus:transition-all"
    >
      Skip to main content
    </a>
  );
}
