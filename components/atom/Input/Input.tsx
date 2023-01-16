import styles from './Input.module.scss';
import { forwardRef } from 'react';
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  (props, ref): JSX.Element => <input className={styles.input} ref={ref} {...props} />
);
Input.displayName = 'Input';
