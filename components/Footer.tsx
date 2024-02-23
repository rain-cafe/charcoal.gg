'use client';
import { Code2, LifeBuoy } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from './ui/button';

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={'rounded-lg flex bg-background/70 border border-secondary items-center p-4 py-2 gap-4'} ref={ref}>
      <div className="flex-1">Made with ❤️ by the Rainbow Cafe Team~</div>
      <Button variant="secondary" asChild>
        <Link href="https://github.com/rain-cafe/charcoal.gg/discussions">
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </Link>
      </Button>
      <Button variant="secondary" asChild>
        <Link href="https://github.com/rain-cafe/charcoal.gg">
          <Code2 className="mr-2 h-4 w-4" />
          <span>Source Code</span>
        </Link>
      </Button>
    </div>
  );
}
