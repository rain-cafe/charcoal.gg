'use client';
import { Code2, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from './ui/button';

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={'rounded-lg flex bg-background/70 border border-secondary items-center p-4 py-2 gap-4'} ref={ref}>
      <div className="flex-1 sm:hidden">Made with ❤️</div>
      <div className="flex-1 hidden sm:flex">Made with ❤️ by the Rainbow Cafe Team~</div>
      <Button variant="secondary" asChild>
        <Link href="https://github.com/rain-cafe/charcoal.gg/discussions" target="_blank">
          <LifeBuoy className="md:mr-2 size-6 md:size-5" />
          <span className="hidden md:flex">Support</span>
        </Link>
      </Button>
      <Button variant="secondary" asChild>
        <Link href="https://github.com/rain-cafe/charcoal.gg" target="_blank">
          <Code2 className="md:mr-2 size-6 md:size-5" />
          <span className="hidden md:flex">Source Code</span>
        </Link>
      </Button>
    </div>
  );
}
