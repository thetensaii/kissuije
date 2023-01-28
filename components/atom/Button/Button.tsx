import { SvgType } from 'lib/frontend/types/svg';
import { ReactElement } from 'react';
import { Svg } from '../Svg';
import styles from './Button.module.scss';
type ButtonType = 'primary' | 'secondary' | 'ternary' | 'transparent';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
  leftIcon?: SvgType;
  rightIcon?: SvgType;
}

export function Button({
  children,
  type = 'button',
  buttonType = 'primary',
  leftIcon,
  rightIcon,
  className,
  ...props
}: Props): ReactElement {
  return (
    <button type={type} className={`${styles.button} ${styles[buttonType]} ${className}`} {...props}>
      {leftIcon ? (
        <span className={styles.leftIcon}>
          <Svg type={leftIcon} alt={leftIcon} width={25} height={25} />
        </span>
      ) : (
        <span></span>
      )}
      <div className={styles.buttonContent}>{children}</div>
      {rightIcon ? (
        <span className={styles.rightIcon}>
          <Svg type={rightIcon} alt={rightIcon} width={25} height={25} />
        </span>
      ) : (
        <span></span>
      )}
    </button>
  );
}
