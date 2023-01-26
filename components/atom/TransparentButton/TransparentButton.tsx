import styles from './TransparentButton.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const TransparentButton = ({ children, className, ...props }: Props): JSX.Element => {
  return (
    <button className={`${styles.transparentButton} ${className}`} {...props}>
      {children}
    </button>
  );
};
