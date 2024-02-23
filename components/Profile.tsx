'use client';
import { Code2, LifeBuoy, LogOut, LucideIcon, User, UserRound } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export type ProfileProps = {
  className?: string;
  mobile?: boolean;
};

const links: Profile.Action[] = [
  {
    label: 'Your Profile',
    href: '/profile',
    icon: User,
  },
  {
    label: 'Log out',
    icon: LogOut,
    onClick: () => signOut(),
  },
];

export function Profile({ className, mobile = false }: ProfileProps) {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return (
      <Button className={className} onClick={() => signIn()}>
        Log in
      </Button>
    );
  }

  if (mobile) {
    return (
      <>
        <div className="flex items-center justify-between px-4 gap-4">
          <Avatar>
            {session.user.image && <AvatarImage src={session.user.image} />}
            <AvatarFallback>
              <UserRound />
            </AvatarFallback>
          </Avatar>
          <span>{session.user.email}</span>
        </div>
        {links.map((link, index) => {
          if (link.href) {
            return (
              <Button key={index} variant="ghost" className="gap-4 justify-between" asChild>
                <Link href={link.href}>
                  {link.label}
                  {link.icon && <link.icon />}
                </Link>
              </Button>
            );
          }

          return (
            <Button key={index} variant="ghost" className="gap-4 justify-between" onClick={link.onClick}>
              {link.label}
              {link.icon && <link.icon />}
            </Button>
          );
        })}
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <Avatar>
          {session.user.image && <AvatarImage src={session.user.image} />}
          <AvatarFallback className="transition-colors hover:bg-secondary/80">
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="https://github.com/rain-cafe/charcoal.gg/discussions" target="_blank">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="https://github.com/rain-cafe/charcoal.gg" target="_blank">
            <Code2 className="mr-2 h-4 w-4" />
            <span>Source Code</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export namespace Profile {
  interface BaseAction {
    label: string;
    icon?: LucideIcon;
  }

  interface LinkAction extends BaseAction {
    href: string;
    onClick?: never;
  }

  interface ButtonAction extends BaseAction {
    href?: never;
    onClick: () => void;
  }

  export type Action = LinkAction | ButtonAction;
}
