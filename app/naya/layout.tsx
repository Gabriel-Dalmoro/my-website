import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Naya Clinic — Automation Demo',
  description: 'Wasted Hours Calculator & Automation Demo built specifically for Naya Clinic.',
};

export default function NayaLayout({
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
