import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ANBU Studio Films — Marketing Studio',
  description:
    'Preview the high-production explainers, walkthroughs, and product marketing assets ANBU crafts for clients.',
};

export default function SocialHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
