import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ANBU Solutions — Suites & Command Surfaces',
  description:
    'Explore the ANBU suite of automation pods, motion-first marketing studios, and intelligence toolkits designed for executive delivery teams.',
};

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return children;
}
