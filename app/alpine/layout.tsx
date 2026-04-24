import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alpine Massage — Automation Demo',
  description: 'Wasted Hours Calculator & Automation Demo built specifically for Alpine Massage.',
};

export default function AlpineLayout({
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
