import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WineYouWant — Automatisation des Devis',
  description: 'Du PDF vers Google Sheets en quelques secondes.',
};

export default function WywLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
