'use client';
import { LogOut, LucideIcon, User, UserRound } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button, ButtonProps } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemProps,
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
    variant: 'destructive',
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
          const baseProps: Pick<ButtonProps, 'variant' | 'className'> = {
            variant: link.variant ?? 'ghost',
            className: 'gap-4 justify-between',
          };

          const content = (
            <>
              {link.label}
              {link.icon && <link.icon />}
            </>
          );

          if (link.href) {
            return (
              <Button key={index} {...baseProps} asChild>
                <Link href={link.href}>{content}</Link>
              </Button>
            );
          }

          return (
            <Button key={index} {...baseProps} onClick={link.onClick}>
              {content}
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
      <DropdownMenuContent className="w-52" align="end" alignOffset={-16}>
        <DropdownMenuLabel className="text-md">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-1">
          {links.map((link, index) => {
            const baseProps: Pick<DropdownMenuItemProps, 'variant' | 'className'> = {
              variant: link.variant,
              className: 'text-sm flex justify-between gap-4',
            };

            const content = (
              <>
                <span>{link.label}</span>
                {link.icon && <link.icon className="size-6" />}
              </>
            );

            if (link.href) {
              return (
                <DropdownMenuItem {...baseProps} key={index} asChild>
                  <Link href={link.href}>{content}</Link>
                </DropdownMenuItem>
              );
            }

            return (
              <DropdownMenuItem {...baseProps} key={index} onClick={link.onClick}>
                {content}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export namespace Profile {
  interface BaseAction {
    label: string;
    icon?: LucideIcon;
    variant?: DropdownMenuItemProps['variant'];
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
