import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { IconType } from 'react-icons';
import * as styles from './Button.module.scss';

type BaseButtonProps<C extends ElementType> = {
  as?: C;
} & ComponentPropsWithoutRef<C>;

type ChildButtonProps<C extends ElementType> = BaseButtonProps<C> & {
  children: ReactNode;
};

type IconButtonProps<C extends ElementType> = BaseButtonProps<C> & {
  icon: IconType;
};

export type ButtonProps<C extends ElementType> = ChildButtonProps<C> | IconButtonProps<C>;

function isIconButtonProps<C extends ElementType>(props: ButtonProps<C>): props is IconButtonProps<C> {
  return Boolean(props.icon);
}

export function Button<C extends ElementType = 'button'>(props: ButtonProps<C>) {
  const { as, icon, children, ...extraProps } = props;
  const Component = props.as ?? 'button';

  if (isIconButtonProps(props)) {
    const Icon = props.icon;

    return (
      <Component {...extraProps} className={styles.iconButton}>
        <Icon size={25} />
      </Component>
    );
  }

  return (
    <Component {...extraProps} className={styles.button}>
      {children}
    </Component>
  );
}
