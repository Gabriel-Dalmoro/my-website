import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Luxury OS — Scaling the Modern Medical Spa Operating System',
  description: 'An interactive technical proposal and system architecture for a high-value medical spa, showing the integration between Mindbody, Weave, and custom operations software.',
};

export default function LuxuryOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans bg-[#FAF9F6] text-[#222222]">
        {children}
      </body>
    </html>
  );
}
