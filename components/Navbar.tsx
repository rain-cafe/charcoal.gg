'use client';
import { classNames } from '@rain-cafe/react-utils';
import { Alice } from 'next/font/google';
import { useEffect, useRef } from 'react';
import { Button } from './Button';
import * as styles from './Navbar.module.scss';

const font = Alice({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['serif'],
});

export function Navbar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const listener = () => {
      if (window.scrollY > 0) {
        ref.current!.classList.add(styles.pinned as string);
      } else {
        ref.current!.classList.remove(styles.pinned as string);
      }
    };

    window.addEventListener('scroll', listener, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [ref]);

  return (
    <div className={styles.navbar} ref={ref}>
      <div className={classNames(styles.title, font.className)}>Charcoal</div>
      <Button>Sign In</Button>
    </div>
  );
}
