'use client';
import { LogOut, LucideIcon, User, UserRound } from 'lucide-react';
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
        {links.map((link, index) => {
          if (link.href) {
            return (
              <DropdownMenuItem asChild key={index}>
                <Link href={link.href}>
                  {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                  <span>{link.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          }

          return (
            <DropdownMenuItem key={index} onClick={link.onClick}>
              {link.icon && <link.icon className="mr-2 h-4 w-4" />}
              <span>{link.label}</span>
            </DropdownMenuItem>
          );
        })}
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
