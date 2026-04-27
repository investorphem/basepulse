import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'BasePulse',
  description: 'Signal dApp on Base',
  applicationName: 'BasePulse',

  keywords: ['Farcaster', 'Base', 'NFT', 'USDC', 'Signals'],

  // ✅ Base App Registry + Talent Protocol verification
  other: {
    'base:app_id': '69ef569be6b83cf73ad1dbc8',

    // ✅ Talent Protocol domain verification
    'talentapp:project_verification':
      '4280000b07ae49a6bd8ff01a8570cc0b2b141ee4e4c0d795696726586c8463b54aaefa689bb9f5ca3fec276c16cc4e687ab537a614b41aad6548045f29cd0b4b',

    // ✅ Farcaster Miniapp / Frame metadata
    'fc:frame': JSON.stringify({
      version: '1',
      id:
        process.env.FARCASTER_MINIAPP_ID ||
        '0199409c-b991-9a61-b1d8-fef2086f7533',
      imageUrl: 'https://basepulse-six.vercel.app/preview.png',
      button: {
        title: 'Open BasePulse',
        action: {
          type: 'launch_frame',
          name: 'BasePulse',
          url: 'https://basepulse-six.vercel.app/',
          splashImageUrl:
            'https://basepulse-six.vercel.app/splashimageurl.png',
          splashBackgroundColor: '#111827',
        },
      },
      buttons: [
        {
          label: 'Send Signal',
          action: {
            type: 'post',
            url: 'https://basepulse-six.vercel.app/api/signal',
          },
        },
        {
          label: 'View Stats',
          action: {
            type: 'post',
            url: 'https://basepulse-six.vercel.app/api/stats',
          },
        },
      ],
    }),
  },

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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}