import { classNames } from '@rain-cafe/react-utils';
import { BadgePlus } from 'lucide-react';
import { Alice } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Profile } from './Profile';
import { Button } from './ui/button';

const font = Alice({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['serif'],
});

export function isEnv(environment: NodeJS.ProcessEnv['NODE_ENV'], generator: () => ReactNode): ReactNode {
  if (process.env.NODE_ENV === environment) {
    return generator();
  }

  return null;
}

export function isDevelopment(generator: () => ReactNode): ReactNode {
  return isEnv('development', generator);
}

export function Header() {
  return (
    <div
      className={
        'sticky z-50 top-0 flex bg-background shadow-background shadow-xl items-center px-4 py-2 sm:px-6 gap-4'
      }
    >
      <Link className={classNames('font-extrabold text-3xl', font.className)} href="/">
        Charcoal
      </Link>
      {isDevelopment(() => (
        <Button variant="secondary" asChild>
          <Link href="/games">Games</Link>
        </Button>
      ))}
      <Button variant="secondary" asChild>
        <Link href="/characters">Characters</Link>
      </Button>
      {isDevelopment(() => (
        <Button variant="secondary" asChild>
          <Link href="/rule-sets">Rule Sets</Link>
        </Button>
      ))}
      <Button variant="secondary" className="ml-auto">
        <BadgePlus />
      </Button>
      <Profile />
    </div>
  );
}
