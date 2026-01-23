// app/layout.tsx
import './globals.css'; // your global CSS
import { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'BasePulse',
    template: '%s · BasePulse',
  },
  description: 'Signal dApp on Base — private signals and real-time insights from Farcaster.',
  keywords: [
    'Farcaster',
    'Base',
    'Signals',
    'Web3',
    'Crypto',
    'Frames',
  ],

  metadataBase: new URL('https://basepulse-six.vercel.app'),

  openGraph: {
    title: 'BasePulse — Signal dApp on Base',
    description: 'Private signals and real-time insights from Farcaster.',
    url: 'https://basepulse-six.vercel.app',
    siteName: 'BasePulse',
    type: 'website',
    images: [
      {
        url: 'https://basepulse-six.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BasePulse Preview Image',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'BasePulse',
    description: 'Private signals and real-time insights from Farcaster.',
    images: ['https://basepulse-six.vercel.app/og-image.png'],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
