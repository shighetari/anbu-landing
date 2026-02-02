import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ANBU Documentation Hub — AI-Powered Docs',
  description:
    'Experience intelligent documentation with vector search, RAG chatbots, and instant code examples. The future of developer documentation.',
};

export default function DocsHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
