import { FeatureFlag } from '@/backend/services/environment.service';
import { BadgePlus, NotebookPen, Sword } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { FaDiceD20 } from 'react-icons/fa6';
import { NavigationList } from './NavigationList';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export type AddDropdownProps = {
  className?: string;
};

const items: NavigationList.Action<typeof DropdownMenuItem>[] = [
  {
    label: 'Campaign',
    flag: FeatureFlag.Campaigns,
    icon: FaDiceD20,
    onClick: () => console.log('Campaign'),
  },
  {
    label: 'Game',
    flag: FeatureFlag.Games,
    icon: NotebookPen,
    onClick: () => console.log('Game'),
  },
  {
    label: 'Character',
    flag: FeatureFlag.Characters,
    icon: Sword,
    onClick: () => console.log('Character'),
  },
];

export function AddDropdown({ className }: AddDropdownProps) {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className} asChild>
        <Button variant="secondary" size="icon">
          <BadgePlus className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end">
        <div className="flex flex-col gap-1">
          <NavigationList items={items} as={DropdownMenuItem} flip />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
