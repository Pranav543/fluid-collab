import './globals.css';

import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import AuthProvider from './AuthProvider';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
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
