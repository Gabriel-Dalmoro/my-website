import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lantern Clinic — Automation Demo',
  description: 'Wasted Hours Calculator & Automation Demo built specifically for Lantern Clinic.',
};

export default function LanternLayout({
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
