'use client';
import { FeatureFlag } from '@/backend/services/environment.service';
import { cn } from '@/lib/utils';
import { classNames } from '@ribbon-studios/react-utils';
import { LucideIcon, Menu, NotebookPen, Swords, X } from 'lucide-react';
import { Alice } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaDiceD20 } from 'react-icons/fa6';
import { AddDropdown } from './AddDropdown';
import { NavigationList } from './NavigationList';
import { Profile } from './Profile';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const font = Alice({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['serif'],
});

const items: NavigationList.Action<typeof Button>[] = [
  {
    label: 'Campaigns',
    href: '/campaigns',
    icon: FaDiceD20,
    flag: FeatureFlag.Campaigns,
  },
  {
    label: 'Games',
    href: '/games',
    icon: NotebookPen,
    flag: FeatureFlag.Games,
  },
  {
    label: 'Characters',
    href: '/characters',
    icon: Swords,
    flag: FeatureFlag.Characters,
  },
];

export function Header() {
  const pathname = usePathname();
  const [isPinned, setIsPinned] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsPinned(window.scrollY > 0);

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'sticky top-12 z-50 rounded-lg flex bg-background/70 border border-secondary shadow-secondary items-center p-4 py-2 gap-4 transition-shadow',
        isPinned && 'shadow-sm'
      )}
    >
      <Link
        className={classNames('font-extrabold text-3xl hover:text-white/80 transition-colors', font.className)}
        href="/"
      >
        Charcoal
      </Link>
      <div className="hidden md:flex gap-4 flex-1">
        <NavigationList items={items} as={Button} variant="ghost" />
      </div>
      <span className="flex-1" />
      <AddDropdown />
      <div className="hidden md:flex">
        <Profile />
      </div>
      <div className="md:hidden">
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsOpen(true)}>
          <Menu />
        </Button>
      </div>
      <div
        className={cn(
          'fixed z-10 inset-0 transition-opacity opacity-0 pointer-events-none',
          isOpen && 'opacity-100 pointer-events-auto'
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 z-10 bg-black/50" onClick={() => setIsOpen(false)} />
        <div className="absolute inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background p-8 pt-14 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              className={classNames('font-extrabold text-3xl hover:text-white/80 transition-colors', font.className)}
              href="/"
            >
              Charcoal
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X />
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <Profile mobile />
            <Separator decorative />
            <NavigationList items={items} as={Button} variant="ghost" flip />
          </div>
        </div>
      </div>
    </div>
  );
}

export namespace Header {
  export type Link = {
    label: string;
    href: string;
    icon?: LucideIcon | IconType;
    flag?: FeatureFlag;
  };
}
