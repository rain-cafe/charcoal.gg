'use client';
import { LogOut, LucideIcon, User, UserRound } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { NavigationList } from './NavigationList';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
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

const items: NavigationList.Action<typeof Button | typeof DropdownMenuItem>[] = [
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
        <NavigationList items={items} as={Button} variant="ghost" />
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
          <NavigationList items={items} as={DropdownMenuItem} />
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
