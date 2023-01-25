import { ReactElement } from 'react';
import styles from './Button.module.scss';
type ButtonType = 'primary' | 'secondary' | 'ternary';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
}

export function Button({ children, buttonType = 'primary', ...props }: Props): ReactElement {
  return (
    <button className={`${styles.button} ${styles[buttonType]}`} {...props}>
      {children}
    </button>
  );
}
