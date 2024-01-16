import { classNames } from '@rain-cafe/react-utils';
import { Alice } from 'next/font/google';
import Link from 'next/link';
import { Profile } from './Profile';

const font = Alice({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['serif'],
});

export function Header() {
  return (
    <div className={'sticky top-0 flex bg-secondary justify-between items-center px-4 py-2 sm:px-6 gap-4'}>
      <Link className={classNames('font-extrabold text-3xl', font.className)} href="/">
        Charcoal
      </Link>
      <Profile />
    </div>
  );
}
