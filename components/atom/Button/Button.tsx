import { ReactElement } from 'react';
import { Icon } from '../Icon/Icon';
import { IconVariant } from '../Icon/types';
import { ButtonTypo } from '../Typo/ButtonText';
import styles from './Button.module.scss';
type ButtonVariant = 'primary' | 'secondary' | 'ternary' | 'transparent' | 'true' | 'false';
export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: IconVariant;
  rightIcon?: IconVariant;
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  leftIcon,
  rightIcon,
  className,
  ...props
}: Props): ReactElement {
  const classNames = [styles.button, styles[variant], className].join(' ');

  return (
    <button type={type} className={classNames} {...props}>
      <span>{leftIcon && <Icon variant={leftIcon} width={25} height={25} />}</span>
      <ButtonTypo>{children}</ButtonTypo>
      <span>{rightIcon && <Icon variant={rightIcon} width={25} height={25} />}</span>
    </button>
  );
}
