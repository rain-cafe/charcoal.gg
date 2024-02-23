import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { auth } from './api/auth/[...nextauth]/auth';
import './globals.css';

const font = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://charcoal.gg'),
  title: 'Charcoal',
  description: 'The next generation of TTRPG',
  openGraph: {
    title: 'Charcoal',
    type: 'website',
    url: '/',
    description: 'The next generation of TTRPG',
    images: 'https://raw.githubusercontent.com/rain-cafe/logos/main/charcoal/social-media.png',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={cn('min-h-screen bg-background font-sans antialiased dark', font.variable)}>
        <SessionProvider session={session}>
          <Header />
          <main className="flex-auto w-full max-w-screen-2xl px-4 py-4 mx-auto sm:px-6 md:py-6">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
