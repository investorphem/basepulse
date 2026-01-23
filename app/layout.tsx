// app/layout.tsx
import './globals.css'; // optional, your global CSS
import { ReactNode } from 'react';

export const metadata = {
  title: 'BasePulse',
  description: 'Signal dApp on Base',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
