import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dr. Rachel Lam, ND — Automation Demo',
  description: 'Wasted Hours Calculator & Automation Demo built specifically for Dr. Rachel Lam, ND.',
};

export default function RachelLamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
