import styles from './TransparentButton.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const TransparentButton = ({ children, type = 'button', className, ...props }: Props): JSX.Element => {
  return (
    <button type={type} className={`${styles.transparentButton} ${className}`} {...props}>
      {children}
    </button>
  );
};
