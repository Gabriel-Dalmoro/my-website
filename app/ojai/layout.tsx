import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OJAI — Automation Demo',
  description: 'Wasted Hours Calculator & Automation Demo built specifically for OJAI.',
};

export default function OjaiLayout({
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
