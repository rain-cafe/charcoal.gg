import { EnvironmentService, FeatureFlag } from '@/backend/services/environment.service';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps, useMemo } from 'react';
import { IconType } from 'react-icons';
import { Button } from './ui/button';
import { DropdownMenuItem } from './ui/dropdown-menu';

export type NavigationListProps<T extends NavigationList.SupportedParent> = {
  items: NavigationList.Action<T>[];
  as: T;
  flip?: boolean;
  variant?: ComponentProps<T>['variant'];
};

export function NavigationList<T extends NavigationList.SupportedParent>({
  items,
  as,
  flip,
  variant,
}: NavigationListProps<T>) {
  const filteredItems = useMemo(() => {
    return items.filter((item) => typeof item.flag === 'undefined' || EnvironmentService.enabled(item.flag));
  }, [items]);
  const Component = as;

  return (
    <>
      {filteredItems.map((item, index) => {
        const baseProps: Pick<ComponentProps<T>, 'variant' | 'className'> = {
          variant: item.variant ?? variant,
          className: cn('text-sm flex justify-between gap-2', flip && 'flex-row-reverse'),
        };

        const content = (
          <>
            {item.icon && <item.icon className="size-6" />}
            <span>{item.label}</span>
          </>
        );

        if (item.href) {
          return (
            // TODO: Figure out how to get this to stop freaking out
            // @ts-ignore
            <Component {...baseProps} key={index} asChild>
              <Link href={item.href}>{content}</Link>
            </Component>
          );
        }

        return (
          // TODO: Figure out how to get this to stop freaking out
          // @ts-ignore
          <Component {...baseProps} key={index} onClick={item.onClick}>
            {content}
          </Component>
        );
      })}
    </>
  );
}

export namespace NavigationList {
  export type SupportedParent = typeof Button | typeof DropdownMenuItem;

  type BaseAction<T extends SupportedParent> = {
    label: string;
    icon?: LucideIcon | IconType;
    flag?: FeatureFlag;
  } & Pick<ComponentProps<T>, 'variant'>;

  interface LinkAction<T extends SupportedParent> extends BaseAction<T> {
    href: string;
    onClick?: never;
  }

  interface ButtonAction<T extends SupportedParent> extends BaseAction<T> {
    href?: never;
    onClick: () => void;
  }

  export type Action<T extends SupportedParent> = LinkAction<T> | ButtonAction<T>;
}
