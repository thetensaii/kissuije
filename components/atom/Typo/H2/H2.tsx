import styles from './H2.module.scss';

type Props = {
  variant?: 'medium' | 'semiBold';
} & React.ButtonHTMLAttributes<HTMLHeadingElement>;

export const H2 = ({ className, variant = 'medium', ...props }: Props): JSX.Element => {
  const classNames = [className, styles.h2, styles[variant]].join(' ');

  return <h2 className={classNames} {...props} />;
};
