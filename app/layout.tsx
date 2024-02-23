import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
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
  icons: {
    icon: '/favicon.ico',
  },
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
      <body className={cn('flex flex-col min-h-screen font-sans antialiased dark', font.variable)}>
        <div
          className={cn('max-w-screen-2xl w-full flex flex-col gap-4 p-4 pt-12 mx-auto min-h-screen', font.variable)}
        >
          <SessionProvider session={session}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
