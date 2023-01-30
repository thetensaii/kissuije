import styles from './InputText.module.scss';
import { forwardRef } from 'react';
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export const InputText = forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref): JSX.Element => <input className={styles.inputText} ref={ref} {...props} />
);
InputText.displayName = 'InputText';
