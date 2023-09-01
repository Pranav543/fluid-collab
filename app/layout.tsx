import './globals.css';

import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import AuthProvider from './AuthProvider';

export const metadata = {
  title: 'Fluid Checkout',
  description:
    'Empowering Creativity: 🌟 Unlock Your Potential with Superfluid Subscription Checkout – Monetize Your Passion, Seamlessly. 💰✨'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" className="h-full bg-gray-50">
        <body className="h-full">
          <Providers>
            <Suspense>
              <Nav />
            </Suspense>
            {children}
            <Analytics />
          </Providers>
        </body>
      </html>
    </AuthProvider>
  );
}
