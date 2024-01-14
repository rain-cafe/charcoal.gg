'use client';
import { cn } from '@/lib/utils';
import { classNames } from '@rain-cafe/react-utils';
import { Alice } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as styles from './Header.module.css';
import { Profile } from './Profile';

const font = Alice({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['serif'],
});

export function Header() {
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const listener = () => {
      setIsPinned(window.scrollY > 0);
    };

    window.addEventListener('scroll', listener, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <div className={cn(styles.navbar, isPinned && styles.pinned)}>
      <Link className={classNames(styles.title, font.className)} href="/">
        Charcoal
      </Link>
      <Profile />
    </div>
  );
}
