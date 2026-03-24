import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CashsinoPL - Online Casino',
  description: 'Play Roulette, Blackjack, and Uno with multiplayer support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}