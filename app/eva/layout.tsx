import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eva Clinic — Practice Automation Demo',
  description: 'Wasted Hours Calculator & Practice Automation Architecture built specifically for Eva Clinic, Birmingham.',
};

export default function EvaLayout({
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
