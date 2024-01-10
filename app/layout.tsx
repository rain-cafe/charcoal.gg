import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import * as styles from './layout.module.scss';
import { classNames } from '@rain-cafe/react-utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, styles.body)}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
