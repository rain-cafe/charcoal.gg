'use client';
import { FeatureFlag, FeatureFlagService } from '@/backend/services/feature-flags.service';
import { cn } from '@/lib/utils';
import { classNames } from '@rain-cafe/react-utils';
import { BadgePlus } from 'lucide-react';
import { Alice } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Profile } from './Profile';
import { Button } from './ui/button';

const font = Alice({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['serif'],
});

export function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const isCampaignsEnabled = FeatureFlagService.enabled(FeatureFlag.Campaigns);
  const isGamesEnabled = FeatureFlagService.enabled(FeatureFlag.Games);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([e]) => setIsPinned(e.intersectionRatio < 1), {
      threshold: [1],
      rootMargin: '-25px 0px 0px 0px',
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        'sticky top-6 z-50 rounded-lg flex bg-background/70 border border-secondary shadow-secondary items-center p-4 py-2 gap-4',
        isPinned && 'shadow-sm'
      )}
      ref={ref}
    >
      <Link className={classNames('font-extrabold text-3xl', font.className)} href="/">
        Charcoal
      </Link>
      {isCampaignsEnabled && (
        <Button variant="secondary" asChild>
          <Link href="/campaigns">Campaigns</Link>
        </Button>
      )}
      {isGamesEnabled && (
        <Button variant="secondary" asChild>
          <Link href="/games">Games</Link>
        </Button>
      )}
      <Button variant="secondary" asChild>
        <Link href="/characters">Characters</Link>
      </Button>
      <Button variant="secondary" className="ml-auto">
        <BadgePlus />
      </Button>
      <Profile />
    </div>
  );
}
