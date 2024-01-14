import { ReactNode } from 'react';
import * as styles from './Typography.module.css';

export type TypographyProps = {
  as?: 'h1' | 'div';
  children: ReactNode;
};

export function Typography({ as, children }: TypographyProps) {
  const Component = as ?? 'div';
  return <Component className={styles.typography}>{children}</Component>;
}
