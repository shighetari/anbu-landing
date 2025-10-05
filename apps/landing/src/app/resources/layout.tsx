import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'ANBU Resource Center — Docs, Playbooks & Proof',
  description:
    'Access ANBU documentation, success libraries, and operator playbooks that keep leadership, operators, and makers aligned.',
}

export default function ResourcesLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
