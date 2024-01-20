'use client';
import { EnvironmentService, FeatureFlag } from '@/backend/services/environment.service';
import { cn } from '@/lib/utils';
import { classNames } from '@rain-cafe/react-utils';
import { BadgePlus, Dices, LucideIcon, Menu, NotebookPen, Swords, X } from 'lucide-react';
import { Alice } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Profile } from './Profile';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const font = Alice({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['serif'],
});

const links: Header.Link[] = (
  [
    {
      label: 'Campaigns',
      href: '/campaigns',
      icon: Dices,
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
  ] satisfies Header.Link[]
).filter((link) => typeof link.flag === 'undefined' || EnvironmentService.enabled(link.flag));

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
        {links.map((link, index) => (
          <Button key={index} variant="secondary" asChild>
            <Link href={link.href}>
              {link.icon && <link.icon className="mr-2 size-5" />}
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
      <Button variant="secondary" className="ml-auto" size="icon">
        <BadgePlus className="size-6" />
      </Button>
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
            {links.map((link, index) => (
              <Button key={index} variant="ghost" className="gap-4 justify-between" asChild>
                <Link href={link.href}>
                  {link.label}
                  {link.icon && <link.icon />}
                </Link>
              </Button>
            ))}
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
    icon?: LucideIcon;
    flag?: FeatureFlag;
  };
}
