import { SvgType } from 'lib/frontend/types/svg';
import { ReactElement } from 'react';
import { Svg } from '../Svg';
import { ButtonTypo } from '../Typo/ButtonText';
import styles from './Button.module.scss';
type ButtonVariant = 'primary' | 'secondary' | 'ternary' | 'transparent' | 'true' | 'false';
export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: SvgType;
  rightIcon?: SvgType;
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
  return (
    <button type={type} className={`${styles.button} ${styles[variant]} ${className}`} {...props}>
      <span>{leftIcon && <Svg type={leftIcon} alt={leftIcon} width={25} height={25} />}</span>
      <ButtonTypo>
        {/* <span className={styles.buttonContent}>{children}</span> */}
        {children}
      </ButtonTypo>
      <span>{rightIcon && <Svg type={rightIcon} alt={rightIcon} width={25} height={25} />}</span>
    </button>
  );
}
