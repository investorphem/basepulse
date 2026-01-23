// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'BasePulse',
  description: 'Signal dApp on Base',
  applicationName: 'BasePulse',
  keywords: ['Farcaster', 'Base', 'NFT', 'USDC', 'Signals'],
  openGraph: {
    title: 'BasePulse - Signal dApp on Base',
    description: 'Private signals from Farcaster, displayed on Base network.',
    url: 'https://basepulse-six.vercel.app/',
    siteName: 'BasePulse',
    images: [
      {
        url: 'https://basepulse-six.vercel.app/preview.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BasePulse',
    description: 'Signal dApp on Base — private signals from Farcaster.',
    images: ['https://basepulse-six.vercel.app/preview.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster Miniapp Frame */}
        <meta
          name="fc:frame"
          content={JSON.stringify({
            version: "1",
            id: process.env.FARCASTER_MINIAPP_ID || "0199409c-b991-9a61-b1d8-fef2086f7533",
            imageUrl: "https://basepulse-six.vercel.app/imageurl.png",
            button: {
              title: "Open BasePulse",
              action: {
                type: "launch_frame",
                name: "BasePulse",
                url: "https://basepulse-six.vercel.app/",
                splashImageUrl: "https://basepulse-six.vercel.app/splashimageurl.png",
                splashBackgroundColor: "#111827",
              },
            },
            buttons: [
              {
                label: "Send Signal",
                action: { type: "post", url: "https://basepulse-six.vercel.app/api/signal" },
              },
              {
                label: "View Stats",
                action: { type: "post", url: "https://basepulse-six.vercel.app/api/stats" },
              },
            ],
          })}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
