import { ReactElement } from 'react';
import styles from './Button.module.scss';
type ButtonType = 'primary' | 'secondary' | 'ternary';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
}

export function Button({
  children,
  type = 'button',
  buttonType = 'primary',
  className,
  ...props
}: Props): ReactElement {
  return (
    <button type={type} className={`${styles.button} ${styles[buttonType]} ${className}`} {...props}>
      {children}
    </button>
  );
}
